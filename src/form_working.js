import * as React from "react";
import { useState } from "react";
import { useLogin, useNotify, Notification } from "react-admin";
import { ThemeProvider } from "@material-ui/styles";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  username: { display: "inline-block" },
  joining_date: { dsiplay: "inline-block", marginLeft: 32 },
  email: { width: 544 },
  password: { display: "inline-block" },
  confirm_password: { display: "inline-block", marginLeft: 32 },
  address: { maxWidth: 544 },
  referee_name: { dsiplay: "inline-block" },
  referee_mobile: { display: "inline-block", marginLeft: 32 },
  advance_amount: { dsiplay: "inline-block" },
  experience: { display: "inline-block", marginLeft: 32 },
});

const SignupForm = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const login = useLogin();
  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch("http://localhost/api_sarayulabs/user_registration.php", {
      method: "POST",
      body: data,
    });
    //login({ email, password }).catch(() => notify("Invalid email or password"));
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label>Enter email:</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Enter password:</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Enter Confirm password:</label>
        <input
          name="confirm_password"
          type="password"
          value={confirm_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
      <Notification />
    </div>
  );
};

export default SignupForm;
