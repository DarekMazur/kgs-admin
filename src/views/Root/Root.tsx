import UnauthorisedView from "../UnauthorisedView/UnauthorisedView.tsx";
import {RootState, switchIsLoading, useGetUsersQuery} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Header from "../../components/Header/Header.tsx";
import {headerLogo} from "../../components/Header/Header.styles.ts";
import Logo from "../../assets/images/logoW.png";
import {Box, Paper, Typography, Link} from "@mui/material";

const currentYear = () => {
	const today = new Date(Date.now())

	return today.getFullYear()
}

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
					<Paper component='footer' sx={{padding: '1rem'}}>
						<Box sx={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
							<Box component='img' sx={{width: 50, margin: '0 1rem'}} alt='Logo' src={Logo} />
							<p>Korona Gór Świętokrzyskich &copy; {currentYear()}</p>
						</Box>
						<Typography align='right'>
							by <Link href='https://nerdistry.pl' color='secondary' underline='hover' sx={{fontWeight: 700}}>Nerdistry.pl</Link>
						</Typography>
					</Paper>
				</>
			)}
		</>
	)
}

export default Root