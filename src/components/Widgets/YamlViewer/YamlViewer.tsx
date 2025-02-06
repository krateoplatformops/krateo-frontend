import SyntaxHighlighter from 'react-syntax-highlighter'
import { lightfair } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import yaml from 'js-yaml'
import { Button } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import styles from './styles.module.scss'
import { useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const YamlViewer = ({ json }: { json: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const parsedJson = JSON.parse(json)
  const yamlString = yaml.dump(parsedJson)
  
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        {isCopied && 'Copied to clipboard'}
        
        <CopyToClipboard
          onCopy={() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2500)
          }}
          text={yamlString}
        >
          <Button icon={<CopyOutlined />} size='large' />
        </CopyToClipboard>
      </div>

      <div className={styles.codeViewer}>
        <SyntaxHighlighter  
          language="yaml"
          style={lightfair}
          showLineNumbers
          wrapLines
          wrapLongLines
        >
          {yamlString}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default YamlViewer