import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SamplePage from './pages/SamplePage'


const App = () => {

	/** HOOKS */

	// const [admin, setAdmin] = useState({name: "junaid"})
	const [admin, setAdmin] = useState(null)

	// hook to see if admin is already logged in
	useEffect(() => {
		const loggedAdmin = window.localStorage.getItem('loggedProSkillzAdmin')
		if (loggedAdmin) {
			setAdmin(JSON.parse(loggedAdmin))
		}
	})

	/** FUNCTIONS */

	// handle logout
	const handleLogout = () => {
		window.localStorage.removeItem('loggedProSkillzAdmin')
		setAdmin(null)
	}

	/** COMPONENTS */

	// sample comp
	// const LoggedIn = () => {
	// 	return (
	// 		<>
	// 			{admin}
	// 			<button onClick={handleLogout}>Logout</button>
	// 		</>
	// 	)
	// }

	return (
		<Router>
			<Routes>
				{admin === null ? (
					<Route path="*" element={<LoginPage setAdmin={setAdmin} />} />
				) : (
					// If admin is logged in, navigate to MainPage
					<>
						{/* Redirect from root to /main */}
						<Route path="/" element={<Navigate to="/main" />} />
						<Route path="/main/*" element={<MainPage />} />
						<Route path="/profile" element={<SamplePage title={"Admin Profile"} />} />
					</>
				)}
				<Route path="*" element={<p>No Path Found</p>} />
			</Routes>
		</Router>
	)

}

export default App;
