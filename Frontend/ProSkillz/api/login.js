import axios from "axios"

const baseUrl = 'http://192.168.0.104:3000/api/login'

let token = null

const setToken = newToken => {
	token = `Bearer ${token}`
}

const user = async credentials => {
	const response = await axios.post(`${baseUrl}/user`, credentials)
	return response.data
} 

export default { setToken, user }