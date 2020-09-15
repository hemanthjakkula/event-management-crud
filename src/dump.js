import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  TextInput,
  SimpleForm,
  Create,
  Edit,
  DateField,
  DateInput,
  required,
  useAuthenticated,
  PasswordInput,
  email,
  number
} from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
const ValidateEmail = email();
const useStyles = makeStyles({
  usename: { display: "inline-block" },
  email: { width: 544 },
  password: { display: "inline-block" },
  confirm_password: { display: "inline-block", marginLeft: 32 }
});

const onSave = props => {
  const userdata = new FormData(e.target);
  console.log(...userdata);
  window.location = "/#/login";
};

const SignupForm = props => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  const requiredValidate = [required()];
  const redirect = (basePath, id, data) => `https://www.google.com`;
  const submit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const request = new Request(
      "https://api-sarayulabs.herokuapp.com/user_registration.php",
      {
        method: "POST",
        body: data
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
          //localStorage.setItem("token", token);
          //console.log(localStorage.getItem("token"));
          //alert("Email already exists, Please Login");
          //return Promise.reject({ redirectTo: "/Login" });
          window.location = "/#/login";
        } else {
          if (email === "success") {
            console.log("return called");
            //alert("New User Created");
            //return Promise.reject({ redirectTo: "/login" });
            window.location = "/#/login";
          }
        }
      });
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
          onChange={e => setUserName(e.target.value)}
        />
        <br />
        <p>Enter email:</p>
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <p>Enter password:</p>
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p>Form Validations will get in future, </p>
        <p>Please fill all the fields </p>
        <br />

        <button type="submit" value="Submit">
          SUBMIT
        </button>
        <p>Submit button creates the user</p>
      </form>
      <div>
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
            validate={ValidateEmail}
          />

          <PasswordInput
            type="password"
            source="password"
            formClassName={classes.password}
            validate={requiredValidate}
          />

          <PasswordInput
            type="password"
            source="confirm_password"
            formClassName={classes.confirm_password}
            validate={requiredValidate}
          />
        </SimpleForm>
      </div>
    </div>
  );
};

export const UserCreateEvent1 = props => {
  useAuthenticated();
  const classes = useStyles();
  const redirect = (basePath, id, data) => `/Events.php`;

  return (
    <div>
      <Create {...props}>
        <SimpleForm redirect={redirect}>
          <TextInput
            autoFocus
            source="event_name"
            formClassName={classes.event_name}
            validate={requiredValidate}
          />

          <DateInput source="event_date" validate={requiredValidate} />

          <TextInput
            autoFocus
            source="event_start_time"
            type="time"
            formClassName={classes.event_start_time}
            validate={requiredValidate}
          />

          <TextInput
            autoFocus
            source="event_end_time"
            type="time"
            formClassName={classes.event_end_time}
            validate={requiredValidate}
          />
        </SimpleForm>
      </Create>
    </div>
  );
};

const requiredValidate = [required()];

export default SignupForm;
