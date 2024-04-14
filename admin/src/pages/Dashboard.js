import { useQuery } from "@apollo/client"

import { ENTITY_COUNT } from "../services/gql/queries"

import CountCard from "../components/Dashboard/CountCard"
import Loading from "../components/Loading"

const Dashboard = () => {

	// const {loading, error, data} = useQuery(ENTITY_COUNT)
	// if(!loading){
	// 	console.log(data.getEntityCount)
	// }

	return (
		<div className="h-full">
			<div className="h-dvh flex justify-between gap-5 py-5 mx-16 max-sm:flex-col max-sm:mx-5 overflow-y-auto">
				{/* {loading?(
					<Loading/>
				):(data.getEntityCount.map(entity => (
						<CountCard key={entity.name} name={entity.name} count={entity.count}/>
					))
				)} */}
				<Loading/>
			</div>
		</div>
	)

}

export default Dashboard