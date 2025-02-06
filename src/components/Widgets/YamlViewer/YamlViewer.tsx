import SyntaxHighlighter from 'react-syntax-highlighter';
import { lightfair } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import yaml from 'js-yaml';

const YamlViewer = ({ json }: { json: Record<string, any> }) => {
  const yamlString = yaml.dump(json, { indent: 2 });
  
  return (
    <div style={{maxHeight: '600px', overflowY: 'auto'}}>
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
  )
}

export default YamlViewer