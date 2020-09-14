import React from "react";
import { Admin, Resource } from "react-admin";
import { UserCreateEvent, UserEditEvent, UserEventList } from "./user";
import authProvider from "./authProvider";
import StorageIcon from "@material-ui/icons/Storage";
import dataProvider from "./dataprovider";
import customRoutes from "./customRoutes";
import LoginPage from "./LoginPage";

function App() {
  return (
    <Admin
      title="Admin"
      customRoutes={customRoutes}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
    >
      <Resource
        name="Events.php"
        options={{ label: "Events" }}
        list={UserEventList}
        create={UserCreateEvent}
        edit={UserEditEvent}
        icon={StorageIcon}
      />
    </Admin>
  );
}

export default App;
