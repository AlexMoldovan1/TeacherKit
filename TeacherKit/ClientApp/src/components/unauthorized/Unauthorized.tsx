import * as React from "react";
import { Button } from "../../../node_modules/@blueprintjs/core";
import students from "../../shared/UtilsImages/students.png";
import "./unauthorized.css";
import { Link } from "react-router-dom";
import Bg from "../../loginBackground.jpg";

interface Props {
  handleClickLogged: Function;
  updateState: Function;
  registered: boolean;
}

class Unauthorized extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <img className="background-image" src={Bg} alt="no img" />
        <div>
          <label className="notLoggedFont">You are not logged in!</label>
        </div>
        <img style={{ width: 450, height: 450 }} src={students} alt="no img" />
        <div>
          <Link to="/user/login">
            <Button
              className="log-in-button"
              onClick={(e: any) => {
                this.props.handleClickLogged(e);
                this.props.updateState();
              }}
            >
              Log In
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Unauthorized;
