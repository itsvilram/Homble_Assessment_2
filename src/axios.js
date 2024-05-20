import axios from "axios";

//GET - get all products - /products
//GET - get product by ud - /products/:id
//POST - create product - /products - Content Type - "application/json"
//GET - get dashboard data - /dashboard

const envBaseUrl = "https://frontend-assessment-server.onrender.com/api";

const instance = axios.create({
  baseURL: envBaseUrl,
});

export const getRequest = async (url, params = {}, responseType = "json") => {
  return instance.get(url, {
    params,
    responseType,
  });
};

export const postRequest = async (url, data, options) => {
  if (options && options.contentType) {
    instance.defaults.headers["Content-Type"] =
      options.contentType === "multipart/form-data"
        ? undefined
        : options.contentType;
  }
  const response = await instance.post(url, data);
  instance.defaults.headers["Content-Type"] = "application/json";
  return response;
};
