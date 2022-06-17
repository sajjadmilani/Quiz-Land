import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Organizer from '..';
import Loading from '../../Loading';

const Authorized = () => {
  const { user } = useAuth0();
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();


  const redirect = localStorage.getItem("redirectURL");

  useEffect(() => {
    if (user) {
      setStatus("loading");
      fetch("/api/user/authorize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 200) {
            console.log(window.location.origin);
            if (redirect) {
              localStorage.removeItem("redirectURL");
              navigate(redirect);
            } else
              navigate("/panel/quizzes");
          }
        });
      setStatus("idle");
    }
  }, [user]);  // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "idle") {
    return <Organizer></Organizer>;
  }
  else {
    return <Loading />;
  }

};
export default Authorized;