import * as React from 'react'
import './InputSide.scss'
import { getJsonDataFromUrl, urlNotFound } from '../../utils/generate';
import { toast } from 'react-toastify';

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
  const [loading, setLoading] = React.useState(false)
  const [lastChanged, setLastChanged] = React.useState<'URL' | 'JSON'>('URL')

  return (
    <div className={`input-side ${lastChanged}`}>
      <form className="input-side-form" onSubmit={handleSubmitForm}>
        <div> 
          <input value={urlInput} placeholder="Paste your Swagger (.json) URL here" onChange={handleChangeUrl}  onClick={() => setLastChanged('URL')}/>
        </div>
        <div className="or-line"></div>
        <div>
          <textarea value={jsonInput} placeholder="Or paste your Swagger JSON here" onChange={handleChangeJson} onClick={() => setLastChanged('JSON')}/>
        </div>
        <button type="submit">
          { loading
            ? <i className="fa fa-spin fa-spinner"/>
            : <i className="fa fa-arrow-right"/>
          }
        </button>
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
    setLoading(true)

    let jsonData = null
    if(lastChanged === 'URL' && urlInput) {
      jsonData = await getJsonDataFromUrl(urlInput)
    } else if(jsonInput) {
      jsonData = JSON.parse(jsonInput)
    } else {
      toast.warn('Make sure you add an url or add the swagger json content before submitting')
      setLoading(false)
      return
    }

    if(jsonData) {
      onClickGenerate(jsonData)
    } else {
      clearGenerated()
      urlNotFound()
    }
    setLoading(false)
  }
}

export default InputSide