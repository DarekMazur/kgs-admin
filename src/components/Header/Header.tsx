import {Box, Divider, Paper, Typography} from "@mui/material";
import Logo from "../../assets/logoFullW.png";

const Header = () => {
	return (
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
	)
}

export default Header;