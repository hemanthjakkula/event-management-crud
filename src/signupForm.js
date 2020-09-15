import * as React from "react";
import {
  TextInput,
  SimpleForm,
  required,
  PasswordInput,
  email
} from "react-admin";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  usename: { display: "inline-block" },
  email: { width: 544 },
  password: { display: "inline-block" },
  confirm_password: { display: "inline-block", marginLeft: 32 }
});

const onSave = props => {
  const data = { ...props };

  const request = new Request(
    "https://api-sarayulabs.herokuapp.com/user_registration.php",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  );
  return fetch(request)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      console.log(response);
      return response.json();
    })
    .then(({ email }) => {
      console.log(email);
      if (email === "AlreadyExists") {
        alert("Email already exists, Please Login");
        window.location = "/#/login";
      } else {
        if (email === "success") {
          console.log("return called");
          alert("Account Created");
          window.location = "/#/login";
        }
      }
    });
};

const SignupForm = props => {
  const classes = useStyles();
  const requiredValidate = [required()];
  //const validateEmail = email();
  return (
    <div>
      <h5>Please enter the details to create the account.</h5>
      <h6>
        It automatically redirects to login page after new account creation.
      </h6>
      <h7>
        It also detects the already registered users if they try to create new
        account, can test it.
      </h7>
      <SimpleForm save={onSave}>
        <TextInput
          autoFocus
          source="username"
          formClassName={classes.event_name}
          validate={requiredValidate}
        />

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
    </div>
  );
};

export default SignupForm;
