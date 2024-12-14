import { RootState } from '../../../../store'
import { useSelector } from 'react-redux'
import { SyntheticEvent, useState } from 'react'
import { Box, Paper, Tabs, Typography } from '@mui/material'
import { IUser } from '../../../utils/types.ts'
import HomeUsers from '../../../components/Home/HomeUsers/HomeUsers.tsx'
import HomePosts from '../../../components/Home/HomePosts/HomePosts.tsx'
import HomeAdmins from '../../../components/Home/HomeAdmins/HomeAdmins.tsx'
import CustomTab from '../../../components/CustomTab/CustomTab.tsx'
import TabPanel from '../../../components/TabPanel/TabPanel.tsx'

const Home = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((store) => store.globalUser)
  const [value, setValue] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
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
  )
}

export default Home
