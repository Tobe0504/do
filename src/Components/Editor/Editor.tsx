import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenu from "@tiptap/extension-bubble-menu";
// import SlashCommand from '@tiptap/extension-slash-command'; // Custom or from examples
import React, { useState } from "react";

// Custom slash command extension (adapt from docs)
// const CustomSlashCommand = SlashCommand.configure({
//   commands: [
//     { name: 'heading1', title: 'Heading 1', command: ({ editor }) => editor.chain().focus().toggleHeading({ level: 1 }).run() },
//     { name: 'bulletList', title: 'Bullet List', command: ({ editor }) => editor.chain().focus().toggleBulletList().run() },
//     { name: 'image', title: 'Image', command: ({ editor }) => {
//       const url = prompt('Enter image URL');
//       if (url) editor.chain().focus().setImage({ src: url }).run();
//     }},
//     // Add more: todo lists, code blocks, etc.
//   ],
// });

const ProjectEditor = () => {
  const [content, setContent] = useState(
    '<p>Start typing your project notes... Press "/" for commands.</p>'
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      BubbleMenu, // For inline formatting menu
      //   CustomSlashCommand,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML()); // Save to state or backend
    },
  });

  if (!editor) return null;

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", background: "#fff" }}>
      <EditorContent editor={editor} />
      <button onClick={() => editor.chain().focus().undo().run()}>Undo</button>
    </div>
  );
};

export default ProjectEditor;
