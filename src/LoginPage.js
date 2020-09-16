import React from "react";
import { useLogin } from "react-admin";
import { Link } from "react-router-dom";
import {
  TextInput,
  SimpleForm,
  required,
  PasswordInput,
  email
} from "react-admin";
import Button from "react-bootstrap/Button";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  email: { width: 544 },
  password: { display: "inline-block" }
});

export const LoginPage = props => {
  const classes = useStyles();
  const requiredValidate = [required()];
  const login = useLogin();
  const OnSave = props => {
    //console.log(data);
    login({ ...props });
  };

  return (
    <div>
      <h2>HI THIS IS LOGIN PAGE</h2>
      <h5>Please Enter your credentials</h5>
      <SimpleForm save={OnSave}>
        <TextInput
          type="email"
          source="email"
          validation={{ email: true }}
          fullWidth
          formClassName={classes.email}
          validate={[required(), email()]}
        />

        <PasswordInput
          type="password"
          source="password"
          formClassName={classes.password}
          validate={requiredValidate}
        />
      </SimpleForm>
      <br />
      <div className="mb-2">
        <Button href="#/signup" varient="secondary" size="lg">
          Signup
        </Button>{" "}
      </div>
    </div>
  );
};

export default LoginPage;
