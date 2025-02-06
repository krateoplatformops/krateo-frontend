import SyntaxHighlighter from 'react-syntax-highlighter'
import { lightfair } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import yaml from 'js-yaml'
import { Button } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import styles from './styles.module.scss'
import { useState } from 'react'

const YamlViewer = ({ json }: { json: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const parsedJson = JSON.parse(json)
  const yamlString = yaml.dump(parsedJson)
  
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        {isCopied && 'Copied to clipboard'}
        
        <Button 
          icon={<CopyOutlined />}
          onClick={() => {
            setIsCopied(true)
            navigator.clipboard.writeText(yamlString)
            setTimeout(() => setIsCopied(false), 2500)
          }}
          size='large' 
        />
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