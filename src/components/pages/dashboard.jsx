import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserData from "../queries";
import Profile from "./profile";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/");
      return;
    }

    const getData = async () => {
      const data = await fetchUserData(token);
      if (data) setUserData(data);
    };
    // console.log("data: ", userData);

    getData();
  }, [navigate]);

  const deleteToken = () => {
    localStorage.removeItem("jwt");
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div>
      <button onClick={deleteToken}>Logout</button>
      <h1>Welcome to your dashboard!</h1>
      {userData && <Profile user={userData.user} />}
    </div>
  );
};

export default Dashboard;
