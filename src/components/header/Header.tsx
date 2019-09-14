import * as React from "react";
import "./Header.scss";
import swaggerLogo from "../../images/swagger.png";
import typescriptLogo from "../../images/typescript.png";

interface IProps {}

const Header: React.StatelessComponent<IProps> = ({}) => {
  return (
    <>
      <div className="header">
        <div>
          <h2>Swagger</h2>
        </div>
        <div>
          <h2>Typescript</h2>
        </div>
        <div className="logos-wrapper">
          <img className="logo logo-swagger" src={swaggerLogo} alt="swagger" />
          <i className="fa fa-angle-right" />
          <img
            className="logo logo-typescript"
            src={typescriptLogo}
            alt="typescript"
          />
        </div>
      </div>
      <div className="subtitle">
        <h1>Swagger to Typescript online tool</h1>
      </div>
    </>
  );
};

export default Header;
