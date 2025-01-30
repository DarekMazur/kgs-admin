export const getAuth = (userRoleId: number, loggedUserRoleId: number) => {
  if (loggedUserRoleId > 2) {
    return false
  }

  if (loggedUserRoleId === 1) {
    return true
  }

  return loggedUserRoleId <= userRoleId
}
