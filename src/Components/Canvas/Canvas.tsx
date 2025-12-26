import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Rect,
  Circle as FabricCircle,
  Line,
  Triangle,
  Textbox,
  Group,
  PencilBrush,
  Polygon,
  Pattern,
  Object as FabricObject,
  Path,
  Point,
  util,
  Control,
  Canvas as FacricCanvas,
  TPointerEvent,
} from "fabric";
import {
  Plus,
  Type,
  Pencil,
  Square,
  Circle as CircleIcon,
  Trash2,
  Move,
  Undo2,
  Redo2,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Download,
  Diamond,
  Triangle as LucideTriange,
  MoveDiagonal,
  Maximize,
  Copy, // <-- Added for Duplication
} from "lucide-react";
import Button from "../Button/Button";
import classes from "./Canvas.module.css";
// import { AnyCommands } from "@tiptap/react"; // Removed unused import

const GRID_BASE = 30;
const ALIGN_THRESHOLD = 6;
const BASE_BRUSH_WIDTH = 3; // Added constant
const MIN_BRUSH_WIDTH = 1; // Added constant
const MAX_BRUSH_WIDTH = 20; // Added constant

type BezierCommand = ["M" | "Q", number, number, number?, number?];

interface CustomFabricObject extends FabricObject {
  __isCurve?: boolean;
}

export default function Canvas() {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<FacricCanvas | null>(null);

  const historyRef = useRef<string[]>([]);
  const redoRef = useRef<string[]>([]);
  const saveDebounceTimer = useRef<number | null>(null);
  const isApplyingRef = useRef(false);

  const [tool, setTool] = useState<"select" | "draw">("select");
  const [zoom, setZoom] = useState<number>(1);
  const [gridEnabled, setGridEnabled] = useState<boolean>(true);
  const [color, setColor] = useState<string>("#e63e21");
  const [brushColor, setBrushColor] = useState<string>("#ffffff");
  const [brushWidth, setBrushWidth] = useState<number>(BASE_BRUSH_WIDTH); // Added brush width state

  const getCanvas = () => {
    if (!canvasRef.current) throw new Error("Canvas not initialized");
    return canvasRef.current;
  };

  // --- History helpers ---
  const pushHistory = useCallback(() => {
    try {
      const c = getCanvas();
      const originalBg = c.backgroundColor;
      c.backgroundColor = "#000";
      const json = JSON.stringify(
        (c as any).toJSON({ propertiesToInclude: ["selectable", "__isCurve"] })
      );
      c.backgroundColor = originalBg;
      if (historyRef.current[historyRef.current.length - 1] !== json) {
        historyRef.current.push(json);
        if (historyRef.current.length > 200) historyRef.current.shift();
        redoRef.current = [];
      }
    } catch (err) {
      console.warn("pushHistory failed", err);
    }
  }, []);

  const schedulePushHistory = useCallback(() => {
    if (saveDebounceTimer.current) {
      window.clearTimeout(saveDebounceTimer.current);
    }
    saveDebounceTimer.current = window.setTimeout(() => {
      pushHistory();
      saveDebounceTimer.current = null;
    }, 220);
  }, [pushHistory]);

  // --- Grid drawing ---
  const drawGrid = useCallback((scale = 1) => {
    const c = getCanvas();
    if (!c) return;

    const tileSize = Math.max(8, Math.round(GRID_BASE * scale));
    const tile = document.createElement("canvas");
    tile.width = tileSize;
    tile.height = tileSize;
    const ctx = tile.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, tileSize, tileSize);

    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(tileSize - 0.5, 0);
    ctx.lineTo(tileSize - 0.5, tileSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, tileSize - 0.5);
    ctx.lineTo(tileSize, tileSize - 0.5);
    ctx.stroke();

    try {
      // Use Pattern constructor if available, otherwise fallback
      c.backgroundColor = new Pattern({
        source: tile,
        repeat: "repeat",
      }) as any;
    } catch {
      c.backgroundColor = { source: tile, repeat: "repeat" } as any;
    }
    c.renderAll();
  }, []);

  const clearGuides = useCallback(() => {
    const c = getCanvas();
    c.getObjects()
      .slice()
      .forEach((o: any) => {
        if (o?.__isGuideLine) c.remove(o);
      });
  }, []);

  const applySnapAndGuides = useCallback(
    (movingObj: FabricObject) => {
      const c = getCanvas();
      clearGuides();

      const objs = c
        .getObjects()
        .filter((o: any) => o !== movingObj && !(o as any).__isGuideLine);

      // Scale the alignment threshold by the current zoom level for consistent visual snapping
      const scaledThreshold = ALIGN_THRESHOLD / c.getZoom();

      let mvCenterX =
        (movingObj.left ?? 0) +
        ((movingObj.width ?? 0) * (movingObj.scaleX ?? 1)) / 2;
      let mvCenterY =
        (movingObj.top ?? 0) +
        ((movingObj.height ?? 0) * (movingObj.scaleY ?? 1)) / 2;

      const xCenters: number[] = [];
      const yCenters: number[] = [];

      objs.forEach((o: any) => {
        const oCenterX = (o.left ?? 0) + ((o.width ?? 0) * (o.scaleX ?? 1)) / 2;
        const oCenterY = (o.top ?? 0) + ((o.height ?? 0) * (o.scaleY ?? 1)) / 2;
        xCenters.push(oCenterX);
        yCenters.push(oCenterY);
      });

      let minXDelta = scaledThreshold + 1;
      let snapX: number | null = null;
      xCenters.forEach((cx) => {
        const delta = Math.abs(cx - mvCenterX);
        if (delta <= scaledThreshold && delta < minXDelta) {
          minXDelta = delta;
          snapX = cx;
        }
      });

      let minYDelta = scaledThreshold + 1;
      let snapY: number | null = null;
      yCenters.forEach((cy) => {
        const delta = Math.abs(cy - mvCenterY);
        if (delta <= scaledThreshold && delta < minYDelta) {
          minYDelta = delta;
          snapY = cy;
        }
      });

      if (snapX !== null) {
        movingObj.left =
          snapX - ((movingObj.width ?? 0) * (movingObj.scaleX ?? 1)) / 2;
        mvCenterX = snapX;
      }
      if (snapY !== null) {
        movingObj.top =
          snapY - ((movingObj.height ?? 0) * (movingObj.scaleY ?? 1)) / 2;
        mvCenterY = snapY;
      }

      const lines: any[] = [];
      xCenters.forEach((cx) => {
        if (Math.abs(cx - mvCenterX) <= 0.5) {
          const line = new Line([cx, 0, cx, c.getHeight() ?? 0], {
            selectable: false,
            evented: false,
            stroke: "rgba(255,255,255,0.28)",
            strokeWidth: 1,
          }) as any;
          line.__isGuideLine = true;
          lines.push(line);
        }
      });

      yCenters.forEach((cy) => {
        if (Math.abs(cy - mvCenterY) <= 0.5) {
          const line = new Line([0, cy, c.getWidth() ?? 0, cy], {
            selectable: false,
            evented: false,
            stroke: "rgba(255,255,255,0.28)",
            strokeWidth: 1,
          }) as any;
          line.__isGuideLine = true;
          lines.push(line);
        }
      });

      lines.forEach((l) => c.add(l));
      c.renderAll();
    },
    [clearGuides]
  );

  const renderCircleControl = (
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    styleOverride: any,
    fabricObject: FabricObject
  ) => {
    ctx.save();
    ctx.translate(left, top);
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.restore();
  };

  const attachBezierControls = useCallback((obj: FabricObject | undefined) => {
    if (
      !obj ||
      !(obj instanceof Path) ||
      !(obj as CustomFabricObject).__isCurve
    ) {
      return;
    }

    const pathObj = obj as Path;
    const path = pathObj.path as BezierCommand[] | undefined;

    if (
      !path ||
      path.length !== 2 ||
      path[0][0] !== "M" ||
      path[1][0] !== "Q"
    ) {
      return;
    }

    const getMatrix = () => pathObj.calcTransformMatrix();

    const startPos = () => new Point(path[0][1], path[0][2]);
    const ctrlPos = () => new Point(path[1][1], path[1][2]);
    const endPos = () => new Point(path[1][3]!, path[1][4]!);

    const updatePath = () => {
      pathObj.set({ path: path, dirty: true });
      pathObj.setCoords();
      getCanvas().requestRenderAll();
    };

    const dragHandler = (
      posGetter: () => Point,
      isStart: boolean,
      xIdx: number,
      yIdx: number
    ) => {
      return (
        eventData: TPointerEvent,
        transform: { target: FabricObject },
        x: number,
        y: number
      ): boolean => {
        const globalPoint = new Point(x, y);
        const inverseMatrix = util.invertTransform(
          pathObj.calcTransformMatrix()
        );
        const localPoint = util.transformPoint(globalPoint, inverseMatrix);
        path[isStart ? 0 : 1][xIdx] = localPoint.x;
        path[isStart ? 0 : 1][yIdx] = localPoint.y;
        updatePath();
        return true;
      };
    };

    pathObj.controls = {
      start: new Control({
        positionHandler: () => util.transformPoint(startPos(), getMatrix()),
        actionHandler: dragHandler(startPos, true, 1, 2),
        actionName: "modifyStart",
        render: renderCircleControl,
      }),
      ctrl: new Control({
        positionHandler: () => util.transformPoint(ctrlPos(), getMatrix()),
        actionHandler: dragHandler(ctrlPos, false, 1, 2),
        actionName: "modifyCtrl",
        render: renderCircleControl,
      }),
      end: new Control({
        positionHandler: () => util.transformPoint(endPos(), getMatrix()),
        actionHandler: dragHandler(endPos, false, 3, 4),
        actionName: "modifyEnd",
        render: renderCircleControl,
      }),
    };

    pathObj.hasControls = true;
    pathObj.setCoords();
  }, []);

  const attachStickyBehavior = useCallback((group: Group) => {
    const items = group.getObjects();
    if (
      items.length !== 2 ||
      !(items[0] instanceof Rect) ||
      !(items[1] instanceof Textbox)
    ) {
      return;
    }

    const rect = items[0] as Rect;
    const text = items[1] as Textbox;

    (group as any).noteRect = rect;
    (group as any).noteText = text;

    const adjustBackgroundSize = () => {
      // Just rerender — don't resize background
      getCanvas().renderAll();
    };

    text.off("changed");
    text.on("changed", adjustBackgroundSize);

    adjustBackgroundSize();
  }, []);

  const loadState = useCallback(
    (json: string) => {
      const c = getCanvas();
      isApplyingRef.current = true;
      c.loadFromJSON(json, () => {
        c.renderAll();
        if (gridEnabled) {
          drawGrid(zoom);
        } else {
          c.backgroundColor = "#000";
        }
        c.getObjects().forEach((o: any) => {
          if (o instanceof Group && (o as any).noteText) {
            attachStickyBehavior(o);
          }
          if ((o as CustomFabricObject).__isCurve) {
            attachBezierControls(o);
          }

          if (o instanceof Group) {
            const items = o.getObjects();
            if (
              items.length === 2 &&
              items[0] instanceof Rect &&
              items[1] instanceof Textbox
            ) {
              attachStickyBehavior(o);
            }
          }

          // Re-attach curve controls if the object was a custom curve
          if ((o as CustomFabricObject).__isCurve) {
            attachBezierControls(o);
          }
        });
        isApplyingRef.current = false;
      });
    },
    [gridEnabled, zoom, drawGrid, attachStickyBehavior, attachBezierControls]
  );

  const updateBrushWidth = useCallback((width: number) => {
    setBrushWidth(width);
    try {
      const c = getCanvas();
      if (c.freeDrawingBrush) {
        c.freeDrawingBrush.width = width;
      }
    } catch {}
  }, []);

  // --- Initialization ---
  useEffect(() => {
    if (!canvasElRef.current) return;

    const c = new FacricCanvas(canvasElRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      selection: true,
      preserveObjectStacking: true,
      backgroundColor: "#000",
    });
    canvasRef.current = c;
    (FabricObject.prototype as any).objectCaching = false;

    try {
      // Initialize freeDrawingBrush with current state values
      c.freeDrawingBrush = new (PencilBrush as any)(c);
    } catch {
      // @ts-ignore
      c.freeDrawingBrush = new (fabric as any).PencilBrush(c);
    }
    if (c.freeDrawingBrush) {
      c.freeDrawingBrush.width = brushWidth;
      c.freeDrawingBrush.color = brushColor;
    }

    pushHistory();
    redoRef.current = [];

    if (gridEnabled) drawGrid(1);

    c.on("object:moving", (evt: any) => {
      const obj = evt.target as FabricObject;
      if (!obj) return;

      // Snap to absolute grid
      const snapX = Math.round((obj.left ?? 0) / GRID_BASE) * GRID_BASE;
      const snapY = Math.round((obj.top ?? 0) / GRID_BASE) * GRID_BASE;
      obj.set({ left: snapX, top: snapY });

      applySnapAndGuides(obj);
      schedulePushHistory();
    });

    c.on("object:scaling", (opt: any) => {
      const group = opt.target as Group;
      if (!(group instanceof Group) || !(group as any).noteText) return;

      const text = (group as any).noteText as Textbox;
      const rect = (group as any).noteRect as Rect;

      // Handle scaling for the sticky note group
      rect.set({
        width: (rect.width ?? 0) * (group.scaleX ?? 1),
        height: (rect.height ?? 0) * (group.scaleY ?? 1),
      });
      text.set({
        width: (rect.width ?? 0) - 20, // Adjust for padding
        fixedWidth: true,
        lockScalingX: true,
        lockScalingY: true,
      });

      group.set({ scaleX: 1, scaleY: 1 });
      group.setCoords();
    });

    c.on("object:modified", (opt: any) => {
      const group = opt.target as Group;
      if (!(group instanceof Group) || !(group as any).noteText) return;

      const text = (group as any).noteText as Textbox;
      const rect = (group as any).noteRect as Rect;

      // Ensure the background rect is tall enough for the text
      const padding = 16;
      const minHeight = Math.max(100, (text.height ?? 0) + padding);
      if ((rect.height ?? 0) < minHeight) {
        rect.set({ height: minHeight });
        group.setCoords();
        c.renderAll();
      }

      schedulePushHistory();
    });

    const guardedEvent = () => {
      if (!isApplyingRef.current) {
        schedulePushHistory();
      }
    };
    c.on("object:added", guardedEvent);
    c.on("object:removed", guardedEvent);

    c.on("mouse:dblclick", (opt: any) => {
      let target = opt.target;
      if (opt.subTargets && opt.subTargets.length) {
        target = opt.subTargets[0];
      }
      if (target instanceof Textbox) {
        target.enterEditing();
        target.hiddenTextarea?.focus();
      }
    });

    c.on("selection:created", (opt: any) => {
      if (opt.target) {
        attachBezierControls(opt.target);
      }
      clearGuides();
    });

    c.on("selection:updated", (opt: any) => {
      if (opt.target) {
        attachBezierControls(opt.target);
      }
      clearGuides();
    });

    const wheelHandler = (opt: any) => {
      const ev = opt.e as WheelEvent;
      if (!ev) return;

      if (ev.ctrlKey || ev.metaKey) {
        const delta = ev.deltaY;
        let newZoom = c.getZoom() * (delta > 0 ? 0.95 : 1.05);
        newZoom = Math.min(Math.max(newZoom, 0.4), 3);

        const pointer = c.getPointer(ev);
        c.zoomToPoint({ x: pointer.x, y: pointer.y } as any, newZoom);
        setZoom(newZoom);

        if (gridEnabled) drawGrid(newZoom);
      } else {
        let vpt = c.viewportTransform?.slice(0) ?? [1, 0, 0, 1, 0, 0];
        vpt[4] -= ev.deltaX;
        vpt[5] -= ev.deltaY;
        c.setViewportTransform(vpt as any);
        c.renderAll();
      }

      ev.preventDefault();
      ev.stopPropagation();
    };

    c.on("mouse:wheel", wheelHandler as any);

    c.on("selection:cleared", clearGuides);
    c.on("before:selection:cleared", clearGuides);

    // Duplication function needs to be available in scope
    const duplicationCallback = () => {
      // Temporary helper function to call duplicate, which is defined outside useEffect
      // This is a pattern to allow external, stateful functions to be called inside useEffect
      // without excessive dependency tracking, though `duplicate` is included in the cleanup deps.
      const activeObject = c.getActiveObject();
      if (!activeObject) return;

      c.discardActiveObject();

      (activeObject.clone as any)(
        (clonedObj: FabricObject) => {
          clonedObj.set({
            left: (clonedObj.left ?? 0) + 10,
            top: (clonedObj.top ?? 0) + 10,
            evented: true,
          });

          if (clonedObj instanceof Group && (clonedObj as any).noteText) {
            attachStickyBehavior(clonedObj as Group);
          }
          if ((clonedObj as CustomFabricObject).__isCurve) {
            attachBezierControls(clonedObj);
          }

          c.add(clonedObj);
          c.setActiveObject(clonedObj);
          c.renderAll();
          schedulePushHistory();
        },
        ["__isCurve", "selectable"]
      );
    };

    const keyHandler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const metaKey = isMac ? e.metaKey : e.ctrlKey;

      const active = c.getActiveObject() as any;
      const editing = !!(active && active.isEditing);

      if (!editing && (e.key === "Delete" || e.key === "Backspace")) {
        const selected = c.getActiveObjects();
        if (selected.length) {
          selected.forEach((o) => c.remove(o));
          c.discardActiveObject();
          c.renderAll();
          schedulePushHistory();
        }
      }

      // Undo/Redo
      if (metaKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          if (redoRef.current.length) {
            const next = redoRef.current.pop()!;
            historyRef.current.push(next);
            loadState(next);
          }
        } else {
          if (historyRef.current.length > 1) {
            const cur = historyRef.current.pop()!;
            redoRef.current.push(cur);
            const prev = historyRef.current[historyRef.current.length - 1];
            loadState(prev);
          }
        }
      }

      if (metaKey && e.key.toLowerCase() === "y") {
        e.preventDefault();
        if (redoRef.current.length) {
          const next = redoRef.current.pop()!;
          historyRef.current.push(next);
          loadState(next);
        }
      }

      // Duplication Shortcut (Ctrl/Cmd + D)
      if (!editing && metaKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        duplicationCallback();
      }
    };
    window.addEventListener("keydown", keyHandler);

    const resize = () => {
      c.setHeight(window.innerHeight);
      c.setWidth(window.innerWidth);
      if (gridEnabled) drawGrid(c.getZoom());
      c.renderAll();
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", keyHandler);
      c.off("mouse:wheel", wheelHandler as any);
      c.off("object:moving");
      c.off("object:scaling");
      c.off("object:modified");
      c.off("object:added");
      c.off("object:removed");
      c.off("mouse:dblclick");
      c.off("selection:created");
      c.off("selection:updated");
      c.off("selection:cleared");
      c.off("before:selection:cleared");
      c.dispose();
      canvasRef.current = null;
    };
  }, [
    brushColor,
    brushWidth, // Added brushWidth dependency
    drawGrid,
    gridEnabled,
    clearGuides,
    attachStickyBehavior,
    attachBezierControls,
    applySnapAndGuides,
    loadState,
    schedulePushHistory,
    pushHistory,
  ]);

  const addStickyNote = useCallback(() => {
    const c = getCanvas();

    const rect = new Rect({
      width: 180,
      height: 100,
      rx: 6,
      ry: 6,
      fill: `${color}88`,
      stroke: color,
      strokeWidth: 1,
      objectCaching: false,
    });

    const text = new Textbox("Your idea...", {
      fontSize: 14,
      fill: "#fff",
      width: rect.width - 20,
      left: 10,
      top: 8,
      fontFamily: "Inter",
      editable: true,
      lineHeight: 1.4,
      objectCaching: false,
    });

    const group = new Group([rect, text], {
      left: 120,
      top: 120,
      hasControls: true,
      subTargetCheck: true,
      objectCaching: false,
    });

    c.add(group);
    attachStickyBehavior(group);
    c.setActiveObject(group);
    c.renderAll();

    schedulePushHistory();
  }, [color, schedulePushHistory, attachStickyBehavior]);

  const addText = useCallback(() => {
    const c = getCanvas();
    const t = new Textbox("Type here...", {
      left: 150,
      top: 150,
      fontSize: 14,
      fill: "#fff",
      fontFamily: "Inter, Arial",
      editable: true,
    });
    c.add(t);
    c.setActiveObject(t);
    c.renderAll();
    schedulePushHistory();
  }, [schedulePushHistory]);

  const addShape = useCallback(
    (
      shape: "square" | "circle" | "triangle" | "diamond" | "arrow" | "curve"
    ) => {
      const c = getCanvas();
      let obj: FabricObject | null = null;
      const strokeColor = color;
      const bgColor = `${color}55`;

      switch (shape) {
        case "square":
          obj = new Rect({
            width: 100,
            height: 60,
            left: 200,
            top: 200,
            fill: bgColor,
            stroke: strokeColor,
            strokeWidth: 1,
          });
          break;
        case "circle":
          obj = new FabricCircle({
            radius: 40,
            left: 200,
            top: 200,
            fill: bgColor,
            stroke: strokeColor,
            strokeWidth: 2,
          });
          break;
        case "triangle":
          obj = new Triangle({
            width: 100,
            height: 80,
            left: 200,
            top: 200,
            fill: bgColor,
            stroke: strokeColor,
            strokeWidth: 2,
          });
          break;
        case "diamond":
          obj = new Polygon(
            [
              { x: 50, y: 0 },
              { x: 100, y: 50 },
              { x: 50, y: 100 },
              { x: 0, y: 50 },
            ],
            {
              left: 200,
              top: 200,
              fill: bgColor,
              stroke: strokeColor,
              strokeWidth: 2,
            }
          );
          break;
        case "arrow": {
          const line = new Line([50, 50, 180, 50], {
            stroke: strokeColor,
            strokeWidth: 2,
            selectable: true,
          });
          const head = new Triangle({
            left: 180,
            top: 50 - 6,
            width: 12,
            height: 12,
            angle: 90,
            fill: strokeColor,
            selectable: false,
            strokeWidth: 1,
          });
          obj = new Group([line, head], {
            left: 150,
            top: 150,
            objectCaching: false,
          });
          break;
        }
        case "curve": {
          obj = new Path("M 0 50 Q 100 -50 200 50", {
            left: 200,
            top: 200,
            stroke: strokeColor,
            strokeWidth: 2,
            fill: "",
            objectCaching: false,
          });
          (obj as CustomFabricObject).__isCurve = true;
          break;
        }
      }

      if (obj) {
        c.add(obj);
        c.setActiveObject(obj);
        if ((obj as CustomFabricObject).__isCurve) {
          attachBezierControls(obj);
        }
        c.renderAll();
        schedulePushHistory();
      }
    },
    [color, schedulePushHistory, attachBezierControls]
  );

  // --- New Duplication Feature ---
  const duplicate = useCallback(() => {
    const c = getCanvas();
    const activeObject = c.getActiveObject();
    if (!activeObject) return;

    c.discardActiveObject();

    // ✅ Fixed Code (Using 'as any')
    (activeObject.clone as any)(
      (clonedObj: FabricObject) => {
        // Offset the new object slightly
        clonedObj.set({
          left: (clonedObj.left ?? 0) + 10,
          top: (clonedObj.top ?? 0) + 10,
          evented: true,
        });

        if (clonedObj instanceof Group && (clonedObj as any).noteText) {
          attachStickyBehavior(clonedObj as Group);
        }
        // Note: __isCurve property is now present on clonedObj because we passed it in the arguments
        if ((clonedObj as CustomFabricObject).__isCurve) {
          attachBezierControls(clonedObj);
        }

        c.add(clonedObj);
        c.setActiveObject(clonedObj); // Select the new object
        c.renderAll();
        schedulePushHistory();
      },
      ["__isCurve", "selectable"]
    ); // This argument is now accepted by TS// Include custom properties in clone
  }, [schedulePushHistory, attachStickyBehavior, attachBezierControls]);

  // --- Fixed Drawing Mode Toggle ---
  const enableDraw = useCallback(() => {
    const c = getCanvas();
    c.isDrawingMode = true;

    if (!c.freeDrawingBrush) {
      // @ts-ignore
      c.freeDrawingBrush = new (fabric as any).PencilBrush(c);
    }

    if (c?.freeDrawingBrush) {
      // Ensure color and width are set from state
      c.freeDrawingBrush.color = brushColor;
      c.freeDrawingBrush.width = brushWidth;
    }

    setTool("draw");
  }, [brushColor, brushWidth]); // Added brushWidth dependency

  const disableDraw = useCallback(() => {
    const c = getCanvas();
    c.isDrawingMode = false;
    setTool("select");
  }, []);

  const clearAll = useCallback(() => {
    const c = getCanvas();
    if (window.confirm("Clear all drawings and notes?")) {
      c.getObjects().forEach((o: any) => c.remove(o));
      if (gridEnabled) drawGrid(c.getZoom());
      c.renderAll();
      schedulePushHistory();
    }
  }, [drawGrid, gridEnabled, schedulePushHistory]);

  const undo = useCallback(() => {
    if (historyRef.current.length > 1) {
      const cur = historyRef.current.pop()!;
      redoRef.current.push(cur);
      const prev = historyRef.current[historyRef.current.length - 1];
      loadState(prev);
    }
  }, [loadState]);

  const redo = useCallback(() => {
    if (redoRef.current.length) {
      const next = redoRef.current.pop()!;
      historyRef.current.push(next);
      loadState(next);
    }
  }, [loadState]);

  const zoomIn = useCallback(() => {
    const c = getCanvas();
    const newZoom = Math.min(c.getZoom() * 1.15, 3);
    const center = c.getCenter();
    c.zoomToPoint(
      { x: center.left, y: center.top } as any, // Zoom to center if no object active
      newZoom
    );
    setZoom(newZoom);
    if (gridEnabled) drawGrid(newZoom);
  }, [drawGrid, gridEnabled]);

  const zoomOut = useCallback(() => {
    const c = getCanvas();
    const newZoom = Math.max(c.getZoom() / 1.15, 0.4);
    const center = c.getCenter();
    c.zoomToPoint({ x: center.left, y: center.top } as any, newZoom);
    setZoom(newZoom);
    if (gridEnabled) drawGrid(newZoom);
  }, [drawGrid, gridEnabled]);

  const fitToScreen = useCallback(() => {
    const c = getCanvas();
    const objs = c.getObjects().filter((o: any) => !o.__isGuideLine);
    if (!objs.length) {
      // If no objects, reset zoom/pan
      c.setZoom(1);
      c.setViewportTransform([1, 0, 0, 1, 0, 0]);
      setZoom(1);
      if (gridEnabled) drawGrid(1);
      c.renderAll();
      return;
    }

    const boundingRects = objs.map((o) => o.getBoundingRect()); // Use true to include object transforms
    const allPoints = boundingRects.flatMap((r: any) => [
      new Point(r.left, r.top),
      new Point(r.left + r.width, r.top + r.height),
    ]);
    const bounds = util.makeBoundingBoxFromPoints(allPoints);

    if (!bounds) return;

    const padding = 100;
    const canvasW = c.width ?? window.innerWidth;
    const canvasH = c.height ?? window.innerHeight;
    const scaleX = (canvasW - padding * 2) / bounds.width;
    const scaleY = (canvasH - padding * 2) / bounds.height;
    const newZoom = Math.min(1, Math.min(scaleX, scaleY));

    c.setZoom(newZoom);
    setZoom(newZoom);

    let vpt = c.viewportTransform?.slice(0) ?? [1, 0, 0, 1, 0, 0];
    vpt[4] = canvasW / 2 - (bounds.left + bounds.width / 2) * newZoom;
    vpt[5] = canvasH / 2 - (bounds.top + bounds.height / 2) * newZoom;
    c.setViewportTransform(vpt as any);

    if (gridEnabled) drawGrid(newZoom);
    c.renderAll();
  }, [drawGrid, gridEnabled]);

  const exportPNG = useCallback(() => {
    const c = getCanvas();
    const data = c.toDataURL({
      format: "png",
      quality: 1,
      multiplier: Math.min(2, Math.max(1, zoom)),
    });
    const a = document.createElement("a");
    a.href = data;
    a.download = "do-board.png";
    a.click();
  }, [zoom]);

  const toggleGrid = useCallback(() => {
    setGridEnabled((g) => {
      const next = !g;
      try {
        const c = getCanvas();
        if (next) drawGrid(c.getZoom());
        else {
          c.backgroundColor = "#000";
          c.renderAll();
        }
      } catch {}
      return next;
    });
  }, [drawGrid]);

  // --- UI ---
  return (
    <div className={classes.container}>
      <div className={classes.toolBar}>
        <Button
          onClick={() => disableDraw()}
          type={tool === "select" ? "tertiary" : "secondary"}
        >
          <Move size={14} strokeWidth={2} />
        </Button>

        <Button onClick={addStickyNote} type="tertiary">
          <Plus size={14} strokeWidth={2} />
        </Button>

        <Button onClick={addText} type="tertiary">
          <Type size={14} strokeWidth={2} />
        </Button>

        <Button onClick={() => addShape("square")} type="tertiary">
          <Square size={14} strokeWidth={2} />
        </Button>

        <Button onClick={() => addShape("circle")} type="tertiary">
          <CircleIcon size={14} strokeWidth={2} />
        </Button>

        <Button onClick={() => addShape("triangle")} type="tertiary">
          <LucideTriange size={14} strokeWidth={2} />
        </Button>

        <Button onClick={() => addShape("diamond")} type="tertiary">
          <Diamond size={14} strokeWidth={2} />
        </Button>

        <Button onClick={() => addShape("arrow")} type="tertiary">
          <ArrowRight size={14} strokeWidth={2} />
        </Button>

        <Button onClick={() => addShape("curve")} type="tertiary">
          <MoveDiagonal size={14} strokeWidth={2} />
        </Button>

        {/* Duplication Button */}
        <Button onClick={duplicate} type="tertiary">
          <Copy size={14} strokeWidth={2} />
        </Button>

        <Button
          onClick={() => enableDraw()}
          type={tool === "draw" ? "tertiary" : "secondary"}
        >
          <Pencil size={14} strokeWidth={2} />
        </Button>

        <Button onClick={undo} type="tertiary">
          <Undo2 size={14} strokeWidth={2} />
        </Button>

        <Button onClick={redo} type="tertiary">
          <Redo2 size={14} strokeWidth={2} />
        </Button>

        <Button onClick={zoomIn} type="tertiary">
          <ZoomIn size={14} strokeWidth={2} />
        </Button>

        <Button onClick={zoomOut} type="tertiary">
          <ZoomOut size={14} strokeWidth={2} />
        </Button>

        <Button onClick={fitToScreen} type="tertiary">
          <Maximize size={14} strokeWidth={2} />
        </Button>

        <Button onClick={exportPNG} type="tertiary">
          <Download size={14} strokeWidth={2} />
        </Button>

        <Button onClick={toggleGrid} type="tertiary">
          {gridEnabled ? "Grid: On" : "Grid: Off"}
        </Button>

        <Button onClick={clearAll} type="tertiary">
          <Trash2 size={14} strokeWidth={2} />
        </Button>

        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginLeft: 8,
          }}
        >
          <input
            aria-label="shape color"
            title="Shape color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={classes.color}
          />
          <input
            aria-label="brush color"
            title="Brush color"
            type="color"
            value={brushColor}
            onChange={(e) => {
              setBrushColor(e.target.value);
              try {
                const c = getCanvas();
                if (c.freeDrawingBrush)
                  c.freeDrawingBrush.color = e.target.value;
              } catch {}
            }}
            className={classes.color}
          />

          {/* Brush Size Control */}
          <div
            className={classes.sliderContainer} // <-- ADD THIS CLASS
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "80px",
            }}
          >
            <label
              style={{ fontSize: "10px", color: "#ccc", textAlign: "center" }}
            >
              Brush Size
            </label>
            <input
              aria-label="brush size"
              title="Brush size"
              type="range"
              min={MIN_BRUSH_WIDTH}
              max={MAX_BRUSH_WIDTH}
              step={1}
              value={brushWidth}
              onChange={(e) => updateBrushWidth(Number(e.target.value))}
            />
            <span style={{ fontSize: "10px", color: "#ccc" }}>
              {brushWidth}px
            </span>
          </div>
        </div>
      </div>

      <div className={classes.canvasContainer}>
        <canvas ref={canvasElRef} />
      </div>
    </div>
  );
}
