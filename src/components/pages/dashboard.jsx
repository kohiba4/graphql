import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import Chart from "react-apexcharts"; // you can leave this for now, even if unused

const query = `
  query User {
    user {
      auditRatio
      email
      firstName
      lastName
      login
      totalDown
      totalUp
      groupsByCaptainid {
        campus
        captainId
        captainLogin
        createdAt
        eventId
        id
        objectId
        path
        status
        updatedAt
      }
    }
    event_user(where: { eventId: { _in: [72, 20, 250] } }) {
      level
      userId
      userLogin
      eventId
    }
    transaction {
      amount
      path
      type
      userLogin
      eventId
    }
  }
`;

// const query = `query Audit_aggregate {
//   audit_aggregate (
//     where: {
//     result: {path: {_like: "/bahrain/bh-module"}}
//     grade: {_gte: "1"}
//     }
//   ) {
//     aggregate {
//       count
//     }
// }
//   }`;

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/");
      return;
    }

    // Fetch the GraphQL data here
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
          }
        );
        const result = await response.json();
        console.log("GraphQL Data:", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
    </div>
  );
};

export default Dashboard;
