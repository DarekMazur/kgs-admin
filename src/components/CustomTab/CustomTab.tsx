import { styled, Tab } from '@mui/material'

interface IStyledTabProps {
  label: string
}

const CustomTab = styled((props: IStyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    color: theme.palette.text.primary
  })
)

export default CustomTab
