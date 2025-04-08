// const $token = localStorage.getItem("jwt");
// queries.js
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

const fetchUserData = async (token) => {
  try {
    const res = await fetch("https://learn.reboot01.com/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    return json.data; // This contains { user, event_user, transaction }
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};

export default fetchUserData;
