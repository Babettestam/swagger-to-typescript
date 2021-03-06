import * as React from "react";
import "./App.scss";
import { swaggerJsonToTypescript } from "../../utils/generate";
import InputSide from "../inputSide/InputSide";
import OutputSide from "../outputSide/OutputSide";
import Header from "../header/Header";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

interface IState {
  tsData: string | null;
}

class App extends React.Component<{}, IState> {
  state = {
    tsData: null
  };

  render() {
    return (
      <div className="App">
        <ToastContainer autoClose={3000} transition={Slide} />

        <Header />
        <div className="content">
          <InputSide
            onClickGenerate={this.handleClickGenerage}
            clearGenerated={this.clearGenerated}
          />
          <OutputSide tsData={this.state.tsData} />
        </div>

      </div>
    );
  }

  handleClickGenerage = async (jsonData: JSON) => {
    try {
      const tsData = await swaggerJsonToTypescript(jsonData);
      this.setState({ tsData });
    } catch (err) {
      console.error(err);
      toast.error("an error occurred: ", err.message);
    }
  };

  clearGenerated = () => {
    this.setState({ tsData: null });
  };
}

export default App;
