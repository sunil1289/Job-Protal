
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useEffect } from "react";

const TextEditor = (props: any) => {
  useEffect(() => {
    editor?.commands.setContent(props.data);
  }, [props.data]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: props.form.getValues().description,
    onUpdate({ editor }) {
      props.form.setFieldValue("description", editor.getHTML());
    },
  });

  return (
    <RichTextEditor
      editor={editor}
      className="!bg-white dark:!bg-mine-shaft-900 !border-mine-shaft-300 dark:!border-mine-shaft-700"
    >
      <RichTextEditor.Toolbar
        sticky
        stickyOffset={60}
        className="
          !bg-mine-shaft-50 dark:!bg-mine-shaft-800
          !border-mine-shaft-200 dark:!border-mine-shaft-700
          !flex !flex-wrap !gap-1 !w-full
          [&_.mantine-RichTextEditor-controlsGroup]:!bg-transparent
          [&_.mantine-RichTextEditor-controlsGroup]:!flex
          [&_.mantine-RichTextEditor-controlsGroup]:!flex-wrap
          [&_.mantine-RichTextEditor-control]:!bg-white dark:[&_.mantine-RichTextEditor-control]:!bg-mine-shaft-800
          [&_.mantine-RichTextEditor-control]:!border-mine-shaft-200 dark:[&_.mantine-RichTextEditor-control]:!border-mine-shaft-600
          [&_.mantine-RichTextEditor-control]:!text-mine-shaft-600 dark:[&_.mantine-RichTextEditor-control]:!text-mine-shaft-300
          [&_.mantine-RichTextEditor-control:hover]:!bg-mine-shaft-100 dark:[&_.mantine-RichTextEditor-control:hover]:!bg-mine-shaft-700
          [&_.mantine-RichTextEditor-control:hover]:!text-bright-sun-500 dark:[&_.mantine-RichTextEditor-control:hover]:!text-bright-sun-400
          [&_.mantine-RichTextEditor-control[data-active]]:!text-bright-sun-500 dark:[&_.mantine-RichTextEditor-control[data-active]]:!text-bright-sun-400
          [&_.mantine-RichTextEditor-control[data-active]]:!bg-bright-sun-50 dark:[&_.mantine-RichTextEditor-control[data-active]]:!bg-mine-shaft-700
          [&_svg]:!text-inherit
          [&_svg]:!fill-current
        "
      >
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content className="!bg-white dark:!bg-mine-shaft-900 [&_.ProseMirror]:!text-mine-shaft-800 dark:[&_.ProseMirror]:!text-mine-shaft-100 [&_.ProseMirror]:!bg-white dark:[&_.ProseMirror]:!bg-mine-shaft-900 [&_.ProseMirror]:min-h-[150px]" />
    </RichTextEditor>
  );
};

export default TextEditor;
