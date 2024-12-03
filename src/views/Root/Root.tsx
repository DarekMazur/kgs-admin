import UnauthorisedView from "../UnauthorisedView/UnauthorisedView.tsx";
import {RootState, switchIsLoading, useGetUsersQuery} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

const Root = () => {
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();
	const dispatch = useDispatch();
	const isLoading = useSelector<RootState>((state) => state.isLoading);
	const isAuthorised = true

	useEffect(() => {
		dispatch(switchIsLoading(usersLoading))
	}, [usersLoading])

	return (
		<>
			{isLoading ? (<h1>Loading...</h1>) : (
				<>
					<header>
						<h1>Lorem Ipsum</h1>
						<h2>Dolor sit amet</h2>
					</header>
					{!isAuthorised ? <UnauthorisedView /> : (
						<>
							<h3>Welcome</h3>
							<ul>
								{users ? users.map(user => (<li key={user.id}>{user.username}</li>)) : null}
							</ul>
						</>
					)}
				</>
			)}
		</>
	)
}

export default Root