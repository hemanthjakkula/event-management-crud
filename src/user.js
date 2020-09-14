import React from "react";
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
} from "react-admin";

//import { Box } from "@material-ui/core";
//import { makeStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  event_name: { display: "inline-block" },
  event_date: { dsiplay: "inline-block", marginLeft: 32 },
  event_start_time: { display: "inline-block" },
  event_end_time: { display: "inline-block", marginLeft: 32 },
});

// const SectionTitle = ({ label }: { label: string }) => {
//   const translate = useTranslate();

//   return (
//     <Typography variant="h6" gutterBottom>
//       {translate(label)}
//     </Typography>
//   );
// };

export const UserEventList = (props) => {
  //for every action checks whether the user is authenticated or not
  useAuthenticated();
  return (
    <div>
      <List {...props} title="Users">
        <Datagrid rowClick="edit">
          <TextField source="event_id" />
          <TextField source="event_name" />
          <DateField
            source="event_date"
            options={{ year: "numeric", month: "long", day: "numeric" }}
          />
          <TextField source="event_start_time" />
          <TextField source="event_end_time" />
          <EditButton />
        </Datagrid>
      </List>
    </div>
  );
};

export const UserCreateEvent = (props) => {
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

export const UserEditEvent = (props) => {
  useAuthenticated();
  return (
    <div>
      <Edit {...props}>
        <SimpleForm>
          <TextInput source="event_name" />
          <DateInput source="event_date" />
          <TextInput source="event_start_time" type="time" />
          <TextInput source="event_end_time" type="time" />
        </SimpleForm>
      </Edit>
    </div>
  );
};
