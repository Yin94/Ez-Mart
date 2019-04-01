import React, { useState } from 'react';
import styles from '../../containers/Auth/Auth.css';
import { resetPswd } from '../../db_api/db_auth';
import Button from '../../UI/Button/Button';
import ErrorBlock from '../../containers/Auth/ErrorBlock/ErrorBlock';
const submitResetPswdHandler = async (e, setError, history) => {
  e.preventDefault();

  const err = await resetPswd(e.target[0].value);
  if (err) setError(err);
  else history.push('/auth1');
};
export default function ResetPswd({ email, history }) {
  const [error, setError] = useState(null);
  return (
    <div>
      <form
        className={styles.Form}
        onSubmit={e => submitResetPswdHandler(e, setError, history)}>
        <div className={styles.FormHeader}>
          <h2>Please input your email</h2>
        </div>
        <div className={styles.ControlGroup}>
          <label htmlFor='email'>Email:</label>
          <input required defaultValue={email} type='email' autoFocus />
          <ErrorBlock className={styles.errorSpan} errMsg={error} />
        </div>
        <div
          className={styles.ButtonGroup}
          style={{ gridTemplateColumns: '1fr 1fr' }}>
          <Button type='submit'>Submit</Button>
          <Button onClick={history.goBack} className='btn ginger' type='button'>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
