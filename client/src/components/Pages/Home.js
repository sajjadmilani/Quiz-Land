import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { loginWithPopup, logout, isAuthenticated, user } = useAuth0();
  return <>
    {console.log(user)}
    <button onClick={() => logout()}>Sign Out</button>
    <button onClick={() => loginWithPopup()}>Sign In</button>
  </>;
};

export default Home;