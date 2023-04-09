import axiosClient from "../axiosClient";
const responseBody = (res) => res.data;
const requester = {
    get: (url, params, config = {}) =>
            axiosClient
        .get(url, {
          params,
          ...config
        })
        .then(responseBody),
  
    post: (url, data, config = {}) =>
            axiosClient
.post(url, data, config).then(responseBody),
    postFormData: (url, data, config = {}) => {
      const bodyFormData = new FormData();
      bodyFormData.append('file', data);
      return       axiosClient
({
        method: 'post',
        url,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(responseBody);
    },
    put: (url, data, config = {}) =>
            axiosClient
.put(url, data, config).then(responseBody),
    delete: (url, data) =>       axiosClient
.delete(url, { data }).then(responseBody)
  };
  
  export default requester;
  