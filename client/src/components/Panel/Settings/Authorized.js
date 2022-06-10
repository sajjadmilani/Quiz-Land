import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Authorized = () => {
  const { user, Authorized } = useAuth0();
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      fetch("")
        .then(res => res.json())
        .then(data => {
          if (data.status === 200) {
            navigate("/panel/settings");
          }
        });
    }
  }, [user]);

};
export default Authorized;