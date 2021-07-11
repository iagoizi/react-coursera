import { Component } from "react";
import "./App.css";
import { Menu } from "./components/MenuComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { DISHES } from "./shared/dishes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }
  render() {
    return <Menu dishes={this.state.dishes} />;
  }
}

export default App;
