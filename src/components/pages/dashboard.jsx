import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserData, { fetchTransactionData, fetchFinishedProjects, fetchSkillData } from "../queries";
import Profile from "./profile";
import XpOverTimeChart from "./xpovertime";
import FinishedProjects from "./finishedprojects";
import UserSkill from "./userskill";
import { FaUser, FaLock, FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseError = () => {
    setShowError(false);
    navigate("/")
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log("token: ", token);
    if (!token) {
      let timeout;
      setErrorMessage("Please log in to access your dashboard.");
      setShowError(true);
      timeout = setTimeout(() => {
        setShowError(false);
      }, 5000);

      // navigate("/");
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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome to your dashboard!</h1>
        <button className="logout-btn" onClick={deleteToken}>Logout</button>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          {userData && <Profile user={userData.user} />}
        </div>
        <div className="dashboard-card">
          {userData && <UserSkill skillData={userData.skills} />}
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          {userData && <XpOverTimeChart transactions={userData.transactions} />}
        </div>
        <div className="dashboard-card">
          {userData && <FinishedProjects projects={userData.finishedProjects} />}
        </div>
      </div>
      <div className={`error-modal-overlay ${showError ? 'show' : ''}`} onClick={handleCloseError}>
              <div className={`error-modal ${showError ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                <FaExclamationTriangle className="error-icon" />
                <div className="error-message">{errorMessage}</div>
                <button className="error-close-btn" onClick={handleCloseError}>
                  Close
                </button>
              </div>
            </div>
    </div>
  );
};

export default Dashboard;
