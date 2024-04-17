
import { Button, Drawer, Space } from "antd";
import styles from "./styles.module.scss";
import { useState } from "react";
import { MDXEditor, markdownShortcutPlugin, diffSourcePlugin, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css'
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const EditableContent = ({text}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [content, setContent] = useState<string>("");
  
  const onEdit = async () => {
    // call API to update
    // await .... (content)
    setIsOpen(false);
  }

  return (
    <>
      <Button type="link" onClick={() => setIsOpen(true)}>edit</Button>
      <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      
      <Drawer
        rootClassName={styles.panel}
        title="Edit Content"
        size="large"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        closable={true}
        destroyOnClose={true}
        extra={
          <Space>
            <Button type="link" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={onEdit}>Update</Button>
          </Space>
        }
      >
        <MDXEditor
          // onChange={(value) => setContent(value)}
          markdown={text}
          plugins={[
            markdownShortcutPlugin(),
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            diffSourcePlugin({ readOnlyDiff: true, viewMode: 'source' }),
            // toolbarPlugin({
            //   toolbarContents: () => (
            //     <>
            //       <UndoRedo />
            //       <BoldItalicUnderlineToggles />
            //       {' '}
            //     </>
            //   )
            // })
          ]}
        />
      </Drawer>
    </>
  )
}

export default EditableContent;