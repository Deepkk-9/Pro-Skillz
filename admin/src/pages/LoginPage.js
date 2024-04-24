import { useState } from "react"
import { useNavigate } from "react-router-dom"

import LoginForm from "../components/LoginForm"
import loginServices from '../services/api/login'

const LoginPage = (props) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')

	const navigate = useNavigate()

	const { setAdmin } = props

	const handleLogin = async (event) => {

		event.preventDefault()

		try {
			const admin = await loginServices.login({
				username, password
			})

			console.log("ashdkjasd : ", username, password);

			window.localStorage.setItem(
				'loggedProSkillzAdmin', JSON.stringify(admin.token)
			)
			console.log(admin)
			setAdmin(admin.token)
			setUsername('')
			setPassword('')
			setLoginError('')
		} catch (exception) {
			setLoginError('Invalid Username or Password')
			console.log(exception)
		}

	}

	return (
		<LoginForm
			handleLogin={handleLogin}
			username={username}
			setUsername={setUsername}
			password={password}
			setPassword={setPassword}
			loginError={loginError}
			setLoginError={setLoginError}
		/>
	)

}

export default LoginPage