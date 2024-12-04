const UnauthorisedView = () => {
  return (
    <div>
      <h3>You are not authorised</h3>
      <p>
        We regret to inform you that your current user permissions do not allow access to this
        particular section of the application. If you believe this is in error or require further
        assistance, please contact your system administrator.
      </p>
      <button type="button">Go back</button>
    </div>
  )
}

export default UnauthorisedView
