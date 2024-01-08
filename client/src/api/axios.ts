import axios from "axios";
import getApiBaseUrl from "../lib/getApiBaseUrl";

export default axios.create({ baseURL: getApiBaseUrl() });
