import UnauthorisedView from "./views/UnauthorisedView/UnauthorisedView.tsx";
import {RootState, switchIsLoading, useGetUsersQuery} from "../store";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

const App = () => {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const dispatch = useDispatch();
  const isLoading = useSelector<RootState>((state) => state.isLoading);
  const isAuthorised = true

  useEffect(() => {
    dispatch(switchIsLoading(usersLoading))
  }, [usersLoading])

  return (
    <>
      {isLoading ? (<h1>Loading...</h1>) : (
        <>
          <h1>Lorem Ipsum</h1>
          {!isAuthorised ? <UnauthorisedView /> : (
            <>
              <h3>Welcome</h3>
              <ul>
                {users ? users.map(user => (<li key={user.id}>{user.username}</li>)) : null}
              </ul>
            </>
          )}
        </>
      )}
    </>
  )
}

export default App
