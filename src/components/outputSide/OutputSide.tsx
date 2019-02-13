import * as React from 'react'
import './OutputSide.scss'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'

interface IProps {
  tsData: string | null
}

const OutputSide: React.StatelessComponent<IProps> = ({
  tsData
}) => {  

  const options = {
    lineNumbers: true,
    mode: 'javascript'
  };
  return (
    <div className="output-side">
      <textarea placeholder="Here will be your generated Typescript definitions file (.d.ts)" value={tsData || undefined}/>
      {/* {tsData ?
      <CodeMirror value={tsData || undefined} options={options} />
      : null } */}
    </div>
  )
}

export default OutputSide