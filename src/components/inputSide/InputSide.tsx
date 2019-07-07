import * as React from 'react'
import './InputSide.scss'
import { getJsonDataFromUrl, urlNotFound } from '../../utils/generate';

interface IProps {
  onClickGenerate: (jsonData: JSON) => void
  clearGenerated: () => void
}

const InputSide: React.StatelessComponent<IProps> = ({
  onClickGenerate,
  clearGenerated
}) => {
  const [urlInput, setUrlInput] = React.useState('')
  const [jsonInput, setJsonInput] = React.useState('')
  const [lastChanged, setLastChanged] = React.useState<'URL' | 'JSON'>('URL')

  return (
    <div className={`input-side ${lastChanged}`}>
      <form className="input-side-form" onSubmit={handleSubmitForm}>
        <div> 
          <input value={urlInput} placeholder="Paste your Swagger URL here" onChange={handleChangeUrl}  onClick={() => setLastChanged('URL')}/>
        </div>
        <div className="or-line"></div>
        <div>
          <textarea value={jsonInput} placeholder="Or paste your Swagger JSON here" onChange={handleChangeJson} onClick={() => setLastChanged('JSON')}/>
        </div>
        <button type="submit"><i className="fa fa-arrow-right"/></button>
      </form>
    </div>
  )

  function handleChangeUrl(e: React.ChangeEvent<any>) {
    const value = e.target.value
    setUrlInput(value)
    setLastChanged('URL')
    console.log(value)
  }

  function handleChangeJson(e: React.ChangeEvent<any>) {
    const value = e.target.value
    setJsonInput(value)
    setLastChanged('JSON')
  }

  async function handleSubmitForm(e: React.ChangeEvent<any>) {
    e.preventDefault();

    let jsonData = null
    if(lastChanged === 'URL') {
      jsonData = await getJsonDataFromUrl(urlInput)
    } else {
      jsonData = JSON.parse(jsonInput)
    }

    if(jsonData) {
      onClickGenerate(jsonData)
    } else {
      clearGenerated()
      urlNotFound()
    }
  }
}

export default InputSide