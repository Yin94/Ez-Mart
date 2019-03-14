import React from "react";

export default class extends React.Component {
  render() {
    return (
      <form onSubmit=''>
        <label htmlFor='email'>Email</label>
        <input type='email' text='' />
        <label htmlFor='pswd'>Password</label>
        <input type='password' text='' />
      </form>
    );
  }
}
