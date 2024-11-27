const domain = "http://54.91.151.16/";
const baseUrl = `${domain}api/`;

const Endpoints = {
  domain,
  login: `${baseUrl}login`,
  dashboard: `${baseUrl}dashboard`,
  generalSettings: `${baseUrl}general-setting`,
  register: `${baseUrl}register`,
};

export default Endpoints;
