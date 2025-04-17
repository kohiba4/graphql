import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserData, { fetchTransactionData, fetchFinishedProjects, fetchSkillData } from "../queries";
import Profile from "./profile";
import XpOverTimeChart from "./xpovertime";
import FinishedProjects from "./finishedprojects";
import UserSkill from "./userskill";

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
      const projectData = await fetchFinishedProjects(token);
      const skillData = await fetchSkillData(token);
    
      if (data && transactionData) {
        setUserData({
          user: data.user,
          event_user: data.event_user,
          transactions: transactionData.transaction || [], // Use only filtered transactions
          finishedProjects: projectData, // Use the entire projectData object
          skills: skillData // Add skills data
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
      <h2>Your last 10 finished projects</h2>
      {userData && <FinishedProjects projects={userData.finishedProjects} />}
      <h2>Your Skills Distribution</h2>
      {userData && <UserSkill skillData={userData.skills} />}
    </div>
  );
};

export default Dashboard;
