import axios from "axios"

const server = axios.create({
    baseURL: 'https://react-burger-faa5a.firebaseio.com/'
})

export default server;