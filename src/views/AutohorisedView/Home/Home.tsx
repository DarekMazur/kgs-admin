import { RootState, switchIsLoading, useGetUsersQuery } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { FC, ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { Box, Paper, styled, Tab, Tabs, Typography } from '@mui/material'
import Loader from '../../../components/Loader/Loader.tsx'
import { IUser } from '../../../utils/types.ts'
import HomeUsers from '../../../components/Home/HomeUsers/HomeUsers.tsx'
import HomePosts from '../../../components/Home/HomePosts/HomePosts.tsx'
import HomeAdmins from '../../../components/Home/HomeAdmins/HomeAdmins.tsx'

interface ITabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

interface IStyledTabProps {
  label: string
}

const Home = () => {
  const { isLoading: usersLoading } = useGetUsersQuery()
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((store) => store.globalUser)
  const dispatch = useDispatch()
  const isLoading = useSelector<RootState>((state) => state.isLoading)
  const [value, setValue] = useState(0)

  useEffect(() => {
    dispatch(switchIsLoading(usersLoading))
  }, [usersLoading])

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const TabPanel: FC<ITabPanelProps> = ({ children, value, index, ...props }) => {
    return (
      <Box role="tabpanel" hidden={value !== index} {...props} {...props}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Box>
    )
  }

  const CustomTab = styled((props: IStyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      color: theme.palette.text.primary
    })
  )

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {globalUser ? (
            <Paper elevation={0}>
              <Box sx={{ flexGrow: 1, m: '2rem 3rem' }}>
                <Typography component="h3" variant="h2" color="secondary">
                  Witaj, {globalUser.username}
                </Typography>
                <Box>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                  >
                    <CustomTab label="Użytkownicy" />
                    <CustomTab label="Wpisy" />
                    <CustomTab label="Adminstracja" />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <HomeUsers />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <HomePosts />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <HomeAdmins />
                </TabPanel>
              </Box>
            </Paper>
          ) : null}
        </>
      )}
    </>
  )
}

export default Home
