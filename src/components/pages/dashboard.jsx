import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserData from "../queries";
import fetchTransactionData from "../queries";
import Profile from "./profile";
import XpOverTimeChart from "./xpovertime";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log("token: ", token);
    if (!token) {
      navigate("/");
      return;
    }

    const getData = async () => {
      const data = await fetchUserData(token);
      const transactionData = await fetchTransactionData(token);
    
      if (data && transactionData) {
        setUserData({
          ...data,                 // { user, event_user, transaction }
          transactions: transactionData.transaction, // store XP-only transactions separately
        });
      }
    };
    

    getData();
    console.log("data: ", userData);
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
      <h2>Your XP over time</h2>
      {userData && <XpOverTimeChart transactions={userData.transactions} />}
      </div>
  );
};

export default Dashboard;
