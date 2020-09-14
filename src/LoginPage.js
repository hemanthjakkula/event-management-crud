import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { fetchUtils } from "react-admin";
import { useLogin, useNotify, Notification } from "react-admin";
import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = (props) => {
  //useAuthenticated();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
    login({ username, password }).catch(() =>
      notify("Invalid email or password")
    );
  };

  return (
    <div>
      <h1>HI THIS IS LOGIN PAGE</h1>
      <h2>
        React-admin theme adapted but for signup page created a basic-login
        page, As more focus is on API
      </h2>
      <form onSubmit={submit}>
        <p>Enter the email: </p>
        <input
          name="email"
          type="email"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Enter Password: </p>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <br />

      <Link to="/signup">
        <button type="button">SIGNUP</button>
      </Link>
    </div>
  );
};

export default LoginPage;
