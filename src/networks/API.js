import axios from "axios";
const BASE_URL = "http://localhost:3001";

const client = axios.create({
    baseURL: BASE_URL, // Đặt base host của bạn ở đây,
    headers: {
        "form-key": localStorage.getItem("form-key"),
        "chat-id": localStorage.getItem("chat-id"),
        Authorization: document.cookie
    },
});


const API = {

    sendMessage: async (query) => {
        return await client.post(`/question`, {
            q: query
        });
    }

}
export default API;