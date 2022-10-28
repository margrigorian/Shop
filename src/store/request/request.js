import axios from "axios";  

function request(method, url, payload, token) {
    return axios({method, url, data: payload, headers: {
        "Authorization": `Bearer ${token}` 
    }})
}

export default request;


// function request(payload, token) {
//     const instance = axios.create({
//         baseUrl: "https://shop-api.aitschool.am",
//         header: {
//             "Authorization": `Bearer ${token}` 
//         },
//         data: payload
//     })
// }

// export default request;

// вызов через request.get("/home/products", undefined, token)

