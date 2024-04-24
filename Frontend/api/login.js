import axios from "axios"
import { API_HOST } from "@env";

const baseUrl = `${API_HOST}/api/login`

console.log(API_HOST);

let token = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const user = async (credentials) => {
	const response = await axios.post(`${baseUrl}/user`, credentials)
	return response.data
}

export default { setToken, user }