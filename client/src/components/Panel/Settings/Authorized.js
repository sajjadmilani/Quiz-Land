import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Organizer from '..';

const Authorized = () => {
  const { user, Authorized } = useAuth0();
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
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
            navigate("/panel/settings");
          }
        });
    }
  }, [user]);
  return <Organizer>{console.log(user)}</Organizer>;
};
export default Authorized;