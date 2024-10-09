import SyntaxHighlighter from 'react-syntax-highlighter';
import { lightfair } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const YamlViewer = ({yaml}: {yaml: string}) => {
  return (
    <div style={{maxHeight: '600px', overflowY: 'auto'}}>
      <SyntaxHighlighter  
        language="yaml"
        style={lightfair}
        showLineNumbers
        wrapLines
        wrapLongLines
      >
        {yaml}
      </SyntaxHighlighter>
    </div>
  )
}

export default YamlViewer