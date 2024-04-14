import { Link } from "react-router-dom";

import { RiProfileLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const LogoutDropdown = ({hidden}) => {

	const navigate = useNavigate()

	const handleLogout = () => {

		window.localStorage.removeItem('loggedProSkillzAdmin');
		navigate('/');
		console.log('handleLogout');

	}

	return (
		<div className={`${hidden?"hidden":"block"} relative bg-indigo-800 text-gray-300 m-3 shadow-lg rounded-md overflow-hidden`}>
			<Link to="/profile" className="flex items-center m-2 p-2 rounded-md cursor-pointer hover:bg-indigo-900 hover:text-white">
				<RiProfileLine/>
				<label className="pl-2">
					Profile
				</label>
			</Link>
			<div 
				className="flex items-center m-2 p-2 rounded-md cursor-pointer hover:bg-indigo-900 hover:text-white"
				onClick={handleLogout}
			>
				<MdOutlineLogout/>
				<label className="pl-2" >
					Logout
				</label>
			</div>
		</div>
	)

}

export default LogoutDropdown