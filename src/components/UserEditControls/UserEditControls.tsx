import { IUser } from '../../utils/types.ts'
import { IconButton, Tooltip } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import BlockIcon from '@mui/icons-material/Block'
import { getAuth } from '../../utils/helpers/getAuth.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

const UserEditControls = ({
  user,
  handleSuspend,
  handleBan
}: {
  user: IUser
  handleSuspend: (id: string) => void
  handleBan: (id: string) => void
}) => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((store) => store.globalUser)

  const { suspensionTimeout, isBanned, role, id } = user

  return (
    <>
      {user && globalUser ? (
        <>
          <Tooltip title="Zawieś Użytkownika">
            <IconButton
              disabled={
                (suspensionTimeout && new Date(suspensionTimeout).getTime() > Date.now()) ||
                isBanned ||
                !getAuth(role.id, globalUser.role.id)
              }
              onClick={() => handleSuspend(id)}
            >
              <WarningAmberIcon
                color={
                  (suspensionTimeout && new Date(suspensionTimeout).getTime() > Date.now()) ||
                  isBanned ||
                  !getAuth(role.id, globalUser.role.id)
                    ? 'disabled'
                    : 'warning'
                }
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zablokuj Użytkownika">
            <IconButton
              disabled={isBanned || !getAuth(role.id, globalUser.role.id)}
              onClick={() => handleBan(id)}
            >
              <BlockIcon
                color={isBanned || !getAuth(role.id, globalUser.role.id) ? 'disabled' : 'error'}
              />
            </IconButton>
          </Tooltip>
        </>
      ) : null}
    </>
  )
}

export default UserEditControls
