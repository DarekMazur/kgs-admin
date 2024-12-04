import UnauthorisedView from "../UnauthorisedView/UnauthorisedView.tsx";
import {RootState, switchIsLoading, useGetUsersQuery} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Header from "../../components/Header/Header.tsx";

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
					<Header />
					{!isAuthorised ? <UnauthorisedView /> : (
						<>
							<h3>Welcome</h3>
							<ul>
								{users ? users.map(user => (<li key={user.id}>{user.username}</li>)) : null}
							</ul>
						</>
					)}
					<footer>
						<p>Lorem Ipsum</p>
					</footer>
				</>
			)}
		</>
	)
}

export default Root