import UnauthorisedView from "./views/UnauthorisedView/UnauthorisedView.tsx";

const App = () => {
  const isAuthorised = false
  return (
    <>
      <h1>Lorem Ipsum</h1>
      {isAuthorised ? (<UnauthorisedView />) : <h3>Welcome</h3>}
    </>
  )
}

export default App
