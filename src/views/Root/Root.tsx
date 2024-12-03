import UnauthorisedView from "../UnauthorisedView/UnauthorisedView.tsx";
import {RootState, switchIsLoading, useGetUsersQuery} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Logo from '../../assets/logoFullW.png'
import {Box, Divider, Paper, Typography} from "@mui/material";

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
					<Paper component='header' sx={{
						display: 'flex',
						padding: '2rem'
					}}>
						<Box component='img' sx={{
							width: '45%'
						}} alt='Logo' src={Logo} />
						<Divider orientation="vertical" variant="middle" flexItem />
						<Box component='div' sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<Typography variant='h1'>Korona Gór Świętokrzyskich</Typography>
							<Typography variant='h2'>Panel administracyjny</Typography>
						</Box>
					</Paper>
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