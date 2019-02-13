import * as React from 'react'
import './Header.scss'
import swaggerLogo from '../../images/swagger.png'
import typescriptLogo from '../../images/typescript.png'

interface IProps {
}

const Header: React.StatelessComponent<IProps> = ({}) => {
  
  return (
    <div className="header">
      <div>
        <h1>Swagger</h1>
      </div>
      <div>
        <h1>Typescript</h1>
      </div>
      <div className="logos-wrapper">
        <img className="logo logo-swagger" src={swaggerLogo} />
        <i className="fa fa-angle-right"/>
        <img className="logo logo-typescript" src={typescriptLogo} />
      </div>
    </div>
  )
}

export default Header