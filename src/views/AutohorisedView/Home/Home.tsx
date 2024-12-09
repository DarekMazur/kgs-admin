import { RootState, switchIsLoading, useGetUsersQuery } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { FC, ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material'
import Loader from '../../../components/Loader/Loader.tsx'
import { IUser } from '../../../utils/types.ts'
import { PieChart } from '@mui/x-charts/PieChart'
import HomeUsers from '../../../components/HomeUsers/HomeUsers.tsx'

interface ITabPanelProps {
  children?: ReactNode
  index: number
  value: number
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
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="Użytkownicy" />
                    <Tab label="Wpisy" />
                    <Tab label="Adminstracja" />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <HomeUsers />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 46, label: 'Nowe Wpisy' },
                          { id: 2, value: 31, label: 'Ukryte wpisy' },
                          { id: 3, value: 523, label: 'Pozostałe' }
                        ]
                      }
                    ]}
                    width={800}
                    height={300}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 10, label: 'Moderatorzy' },
                          { id: 1, value: 6, label: 'Administratorzy' },
                          { id: 2, value: 2, label: 'Super Administratorzy' }
                        ]
                      }
                    ]}
                    width={800}
                    height={300}
                  />
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
