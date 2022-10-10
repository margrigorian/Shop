import axios from "axios";

function request(method, url) {
    return axios({method, url})
}

export default request;