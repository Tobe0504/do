import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";
import type { Block } from "@blocknote/core";
import { createBlockConfig } from "@blocknote/core";
import { v4 } from "uuid";

interface Props {
  state: Block[];
  setState: React.Dispatch<React.SetStateAction<Block[]>>;
  initial?: any;
}

export default function Editor({ state, setState, initial }: Props) {
  const editor = useCreateBlockNote({
    initialContent: initial,
  });

  useEffect(() => setState(editor.document), []);

  return (
    <div>
      <BlockNoteView
        editor={editor}
        onChange={() => {
          setState(editor.document);
        }}
      />
    </div>
  );
}
