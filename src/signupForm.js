import * as React from "react";
import { useState } from "react";
import { useLogin, useNotify, Notification } from "react-admin";
import { Link } from "react-router-dom";

const SignupForm = (props) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch("https://api-sarayulabs.herokuapp.com/user_registration.php", {
      method: "POST",
      body: data,
    });
    alert(
      "New User Created, Kindly press LOGIN Button below to go to Login page"
    );
    //login({ email, password }).catch(() => notify("Invalid email or password"));
  };

  return (
    <div>
      <form onSubmit={submit}>
        <p>Enter Username:</p>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <p>Enter email:</p>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <p>Enter password:</p>
        <input
          name="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Form Validations will get in future, </p>
        <p>Please fill all the fields </p>
        <br />

        <button type="submit" value="Submit">
          SUBMIT
        </button>

        <p>Submit button creates the user</p>
      </form>
      <br />
      <Link to="/login">
        <button type="button">REDIRECTS TO LOGIN</button>
      </Link>
    </div>
  );
};

export default SignupForm;
