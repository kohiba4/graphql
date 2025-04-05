import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  //runs when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      // alert('You are not logged in!');
      navigate('/'); // redirect to login if no token
    }
  }, [navigate]); //[value] makes it run whenever the value changes but navigate doesn't change

  const deleteToken = () => {
    localStorage.removeItem('jwt');
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <div>
      <button onClick={deleteToken}>Logout</button>
      <h1>Welcome to your dashboard!</h1>
    </div>
  );
};

export default Dashboard;
