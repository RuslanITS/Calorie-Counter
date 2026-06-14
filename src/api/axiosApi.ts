import * as axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://hw56js-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi