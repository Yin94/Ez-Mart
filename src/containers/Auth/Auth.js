import React from 'react';
import styles from './Auth.css';
import Button from '../../UI/Button/Button';
import { Link } from 'react-router-dom';
import { tryAuth, commitStatus } from '../../store_redux/auth/auth';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import ErrorBlock from './ErrorBlock/ErrorBlock';
import Joi from 'joi';
const schema = Joi.object().keys({
  email: Joi.string()
    .max(30)
    .required()
    .error(new Error('0Email must be shorter than 30 characters')),
  pswd: Joi.string()
    .regex(/(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=.,`]).*$/)
    .min(8)
    .max(20)
    .required()
    .error(
      new Error(
        '1Password must between 8 and 20 charactors, and must have at least one uppercase, one lowercase,one number, and one character of "@#$ %^&+=.,`"'
      )
    ),
  confirmPswd: Joi.ref('pswd'),
  username: Joi.string()
    .max(15)
    .min(5)
    .required()
    .error(new Error('3Username must between 5 and 15 characters')),
  tel: Joi.string()
    .regex(/[0-9]+/)
    .min(10)
    .max(10)
    .error(
      new Error(
        '4Tel number not valie, please input 10 digits USA phone number'
      )
    )
});

const mps = state => ({
  error: state.auth.error,
  loading: state.auth.loading,
  succceed: state.auth.succeed
});
const mpd = dispatch => ({
  submitSignUp: form => dispatch(tryAuth(form, false)),
  submitSignIn: form => dispatch(tryAuth(form, true)),
  commitStatus: () => dispatch(commitStatus())
});
export default connect(
  mps,
  mpd
)(
  class extends React.Component {
    state = {
      email: '',
      pswd: '',
      confirmPswd: '',
      username: '',
      tel: '',
      errorArray: []
    };

    submitHandler = async (e, mode) => {
      e.preventDefault();
      const { errorArray, ...form } = this.state;

      if (!parseInt(mode)) {
        const ob = this;
        Joi.validate(form, schema, function(err, value) {
          if (!err) {
            ob.props.submitSignUp(form);
          } else {
            const error = err ? err.message : null;
            const errorArray = [];
            if (error[0] === 'c') errorArray[2] = '2Two passwords not the same';
            else errorArray[error[0]] = error;
            ob.setState({
              errorArray
            });
          }
        });
      } else {
        this.props.submitSignIn(form);
      }
    };
    onCancelHandler = () => {
      this.props.history.goBack();
    };
    onSwitchHandler = (e, path) => {
      e.preventDefault();
      this.setState({ errorArray: [] });
      this.props.history.push(path);
      this.props.commitStatus();
    };

    shouldComponentUpdate = (nextProps, nextState) => {
      if (nextProps.succceed) this.props.history.push('/items');
      return true;
    };
    componentWillUnmount = () => {
      this.props.commitStatus();
    };

    render() {
      const mode = this.props.match.params['mode'];
      let switchText = '',
        switchPath = '';
      if (mode === '0') {
        switchText = 'Signin';
        switchPath = '/auth1';
      } else {
        switchText = 'Signup';
        switchPath = '/auth0';
      }
      let displayTxt =
        this.props.match.params['mode'] === '0' ? 'Signup' : 'Signin';
      const error = this.props.error;
      const validationErr = this.state.errorArray;
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
              required
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              type='email'
              autoFocus
            />
            <ErrorBlock
              className={styles.errorSpan}
              errMsg={validationErr[0]}
            />
          </div>
          <div className={styles.ControlGroup}>
            <label htmlFor='pswd'>Password:</label>
            <input
              required
              value={this.state.pswd}
              onChange={e => this.setState({ pswd: e.target.value })}
              type='password'
            />
            <ErrorBlock
              className={styles.errorSpan}
              errMsg={validationErr[1]}
            />
          </div>
          {mode === '0' && (
            <div id='signUpPanel'>
              <div className={styles.ControlGroup}>
                <label htmlFor='confirmPswd'>Confirm Password:</label>
                <input
                  required
                  value={this.state.confirmPswd}
                  onChange={e => this.setState({ confirmPswd: e.target.value })}
                  type='password'
                />
                <ErrorBlock
                  className={styles.errorSpan}
                  errMsg={validationErr[2]}
                />
              </div>
              <div className={styles.ControlGroup}>
                <label htmlFor='username'>Username:</label>
                <input
                  required
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                  type='text'
                />
                <ErrorBlock
                  className={styles.errorSpan}
                  errMsg={validationErr[3]}
                />
              </div>
              <div className={styles.ControlGroup}>
                <label htmlFor='tel'>TEL:</label>
                <input
                  required
                  value={this.state.tel}
                  onChange={e => this.setState({ tel: e.target.value })}
                />
                <ErrorBlock
                  className={styles.errorSpan}
                  errMsg={validationErr[4]}
                />
              </div>
            </div>
          )}
          <div>
            {this.props.loading && <Spinner style={{ left: '45%' }} />}

            {error && (
              <strong className={styles.errorSpan}>
                {' '}
                {displayTxt} failed: <span> {'__' + error}</span>
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
              {'Forgot password? go'} <Link to='resetpswd'>reset</Link>{' '}
            </small>
          </div>
        </form>
      );
    }
  }
);
