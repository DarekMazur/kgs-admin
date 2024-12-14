import { FC, ReactNode } from 'react'
import { Box } from '@mui/material'

interface ITabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

const TabPanel: FC<ITabPanelProps> = ({ children, value, index, ...props }) => {
  return (
    <Box role="tabpanel" hidden={value !== index} {...props} {...props}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  )
}

export default TabPanel
