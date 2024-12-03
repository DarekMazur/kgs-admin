import {createTheme} from "@mui/material";

export const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#272724',
			paper: '#272724'
		},
		text: {
			primary: '#eef7eb',
			secondary: '#d99e1a'
		},
		primary: {
			main: '#000',
			light: '#1e1e2d',
			contrastText: '#232533'
		},
		secondary: {
			main: '#d99e1a',
			light: '#ecc976',
			contrastText: '#da9c07'
		}
	},
	typography: {
		fontFamily: '"Montserrat Variable", sans-serif;',
		fontSize: 16,
		h1: {
			fontFamily: '"Russo One", sans-serif;',
			fontSize: '2rem',
			lineHeight: '1.5',
			textAlign: 'center'
		},
		h2: {
			fontFamily: '"Russo One", sans-serif;',
			lineHeight: '1.5'
		},
		h3: {
			fontFamily: '"Russo One", sans-serif;',
			fontSize: '1.5rem',
			lineHeight: '1.5'
		},
		h4: {
			fontFamily: '"Russo One", sans-serif;',
			lineHeight: '1.5'
		},
		h5: {
			fontFamily: '"Russo One", sans-serif;',
			lineHeight: '1.5'
		},
		h6: {
			fontFamily: '"Russo One", sans-serif;',
			lineHeight: '1.5'
		}
	}
});