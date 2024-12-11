const { default: axios } = require("axios")

const app = axios.create({
    baseURL: "http://localhost:3000/api",

})

export default app