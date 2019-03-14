import React from "react";
import styles from "./Auth.css";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";
export default class extends React.Component {
  state = {
    email: "",
    pswd: ""
  };
  submitHandler = e => {
    e.preventDefault();
  };
  onCancelHandler = () => {
    this.props.history.goBack();
  };
  onSwitchHandler = path => {
    this.props.history.push(path);
  };
  render() {
    const mode = this.props.match.params["mode"];
    let switchText = "",
      switchPath = "";
    if (mode === "0") {
      switchText = "Signin";
      switchPath = "/auth1";
    } else {
      switchText = "Signup";
      switchPath = "/auth0";
    }

    return (
      <form className={styles.Form} onSubmit={this.submitHandler}>
        <div className={styles.FormHeader}>
          <h2>
            Please{" "}
            {this.props.match.params["mode"] === "0" ? "Signup" : "Signin"}
          </h2>
        </div>
        <div className={styles.ControlGroup}>
          <label htmlFor='email'>Email:</label>
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type='email'
            autoFocus

            // placeholder='please enter email'
          />
        </div>
        <div className={styles.ControlGroup}>
          <label htmlFor='pswd'>Password:</label>
          <input
            value={this.state.pswd}
            onChange={e => this.setState({ pswd: e.target.value })}
            type='password'

            // placeholder='please enter password'
          />
        </div>

        <div className={styles.ButtonGroup}>
          <Button type='submit'>Submit</Button>
          <Button
            className='Ginger'
            type='button'
            onClick={this.onCancelHandler}>
            Cancel
          </Button>
          <Button
            className='Succeed'
            onClick={() => this.onSwitchHandler(switchPath)}>
            Switch to {switchText}
          </Button>
          <small>
            {"Forgot password? go"} <Link to='resetpswd'>reset</Link>{" "}
          </small>
        </div>
      </form>
    );
  }
}
