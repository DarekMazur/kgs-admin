import { Box, Breadcrumbs, Link, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

const BreadcrumbsNav = ({ name }: { name?: string }) => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: '2rem'
      }}
    >
      <Breadcrumbs>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1
          const to = `/${pathnames.slice(0, index + 1).join('/')}`

          const newVal = (value: string) => {
            switch (value) {
              case 'posts':
                return 'wpisy'
              case 'users':
                return 'użytkownicy'
              case 'team':
                return 'zaspół'
              default:
                return value
            }
          }

          return last ? (
            <Typography key={to} sx={{ color: 'text.primary' }}>
              {name ? name : newVal(value)}
            </Typography>
          ) : (
            <>
              <Link underline="hover" color="inherit" href={to} key={to}>
                {newVal(value)}
              </Link>
            </>
          )
        })}
      </Breadcrumbs>
    </Box>
  )
}

export default BreadcrumbsNav
