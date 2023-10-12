const baseUrl = 'http://192.168.0.104:3000/api/user'

let token = null

const setToken = newToken => {
	token = `Bearer ${token}`
}

export default { setToken }