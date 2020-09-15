export default {
  // called when the user attempts to log in
  login: ({ email, password }) => {
    const request = new Request(
      "https://api-sarayulabs.herokuapp.com/authenticate.php",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json"
        })
      }
    );
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        //console.log(response);
        return response.json();
      })
      .then(({ token }) => {
        if (token !== "Invalid") {
          localStorage.setItem("token", token);
          //console.log(localStorage.getItem("token"));
          return Promise.resolve();
        } else {
          //console.log("return called");
          return Promise.reject({ redirectTo: "/login" });
        }
      });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("token")
      ? Promise.resolve()
      : Promise.reject({ redirectTo: "/login" });
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve()
};
