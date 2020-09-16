import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const fetchJson = (url, options = {}) => {
  options.user = {
    authenticated: true,
    token: localStorage.getItem("token")
  };
  return fetchUtils.fetchJson(url, options);
};

const apiUrl = "https://api-sarayulabs.herokuapp.com";
const httpClient = fetchJson;

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter)
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    switch (resource) {
      case "Events.php":
        return httpClient(url).then(({ headers, json }) => ({
          data: json.map(resource => ({
            ...resource,
            id: resource.event_id
          })),
          // total: parseInt(headers.get('content-range').split('/').pop(), 10),
          total: parseInt(20, 10)
        }));
      default:
    }
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: { ...json, id: json.event_id }
    })),

  create: (resource, params) =>
    httpClient(`${apiUrl}/create_event.php`, {
      method: "POST",
      body: JSON.stringify(params.data)
    }).then(({ json }) => ({
      data: { ...params.data, id: json.event_id }
    })),

  update: (resource, params) =>
    httpClient(`${apiUrl}/update_event.php`, {
      method: "PUT",
      body: JSON.stringify(params.data)
    }).then(({ json }) => ({
      data: { ...params.data, id: json.event_id }
    })),

  delete: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.id })
    };
    return httpClient(
      `${apiUrl}/delete_single_event.php/?${stringify(query)}`,
      {
        method: "DELETE",
        body: JSON.stringify(params.data)
      }
    ).then(({ json }) => ({
      data: json.map(resource => ({
        ...resource,
        id: resource.event_id
      }))
    }));
  },

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids })
    };
    return httpClient(`${apiUrl}/delete_event.php?${stringify(query)}`, {
      method: "DELETE",
      body: JSON.stringify(params.data)
    }).then(({ json }) => ({ data: json.event_id }));
  }
};

export default dataProvider;
