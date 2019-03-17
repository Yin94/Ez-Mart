import React from "react";
import styles from "./Auth.css";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";
import { tryAuth, commitStatus } from "../../store_redux/auth/auth";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";

const mps = state => ({
  error: state.auth.error,
  loading: state.auth.loading,
  succceed: state.auth.succeed
});

const mpd = dispatch => ({
  submitSignUp: (email, pswd) => dispatch(tryAuth(email, pswd, false)),
  submitSignIn: (email, pswd) => dispatch(tryAuth(email, pswd, true)),
  commitStatus: () => dispatch(commitStatus())
});
export default connect(
  mps,
  mpd
)(
  class extends React.Component {
    state = {
      email: "",
      pswd: ""
    };
    submitHandler = async (e, mode) => {
      e.preventDefault();
      const { email, pswd } = this.state;

      parseInt(mode)
        ? this.props.submitSignIn(email, pswd)
        : this.props.submitSignUp(email, pswd);
    };
    onCancelHandler = () => {
      this.props.history.goBack();
    };
    onSwitchHandler = (e, path) => {
      e.preventDefault();
      this.props.history.push(path);
    };

    shouldComponentUpdate = (nextProps, nextState) => {
      //check here before render to enhance performance
      if (nextProps.succceed) this.props.history.push("/");
      return true;
    };
    componentWillUnmount = () => {
      //reset status may cause bug in lazy loading
      this.props.commitStatus();
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
      let displayTxt =
        this.props.match.params["mode"] === "0" ? "Signup" : "Signin";
      const error = this.props.error;

      return (
        <form
          className={styles.Form}
          onSubmit={e => this.submitHandler(e, mode)}>
          <div className={styles.FormHeader}>
            <h2>Please {displayTxt}</h2>
          </div>
          <div className={styles.ControlGroup}>
            <label htmlFor='email'>Email:</label>
            <input
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              type='email'
              autoFocus
            />
          </div>
          <div className={styles.ControlGroup}>
            <label htmlFor='pswd'>Password:</label>
            <input
              value={this.state.pswd}
              onChange={e => this.setState({ pswd: e.target.value })}
              type='password'
            />
          </div>
          <div>
            {this.props.loading && <Spinner style={{ left: "45%" }} />}

            {error && (
              <strong className={styles.errorSpan}>
                {" "}
                {displayTxt} failed: <span> {"__" + error}</span>
              </strong>
            )}
          </div>
          <div className={styles.ButtonGroup}>
            <Button type='submit'>Submit</Button>
            <Button
              className='btn ginger'
              type='button'
              onClick={this.onCancelHandler}>
              Cancel
            </Button>
            <Button
              className='btn succeed'
              onClick={e => this.onSwitchHandler(e, switchPath)}>
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
);
