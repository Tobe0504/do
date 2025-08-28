"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Draggable.module.css";

interface DraggableProps {
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
}

const Draggable: React.FC<DraggableProps> = ({
  children,
  defaultPosition = { x: 100, y: 100 },
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging.current) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <section
      className={styles.draggable}
      style={{ top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </section>
  );
};

export default Draggable;
