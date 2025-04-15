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
  }
`;

const tansactionQuery = `
  query Transaction {
transaction(
      where: {
        _and: [
          { type: { _eq: "xp" } },
          { path: { _like: "/bahrain/bh-module%" } },
          { eventId: {_eq: 20}},
          { amount: { _gt: 600 } }
        ]
      }
    ) {
      amount
      path
      type
      userLogin
      eventId
    }
  }
`;

const FinishedProjects = `
  query FinishedProjectsByUser {
  progress(
    where: {
        _and: [
      {isDone: { _eq: true }},
      {grade: { _gt: 1}},
        ]
    },
    order_by: { updatedAt: desc },
    limit: 10
  ) {
    path
    isDone
    createdAt
    updatedAt
    eventId
    grade
    user {
      login
    }
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

const fetchTransactionData = async (token) => {
  try {
    const res = await fetch("https://learn.reboot01.com/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: tansactionQuery }),
    });

    const json = await res.json();
    return json.data; // This contains { user, event_user, transaction }
  } catch (err) {
    console.error("Error fetching transaction data:", err);
    return null;
  }
}
export { fetchTransactionData };

const fetchFinishedProjects = async (token) => {
  try {
    const res = await fetch("https://learn.reboot01.com/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: FinishedProjects }),
    });

    const json = await res.json();
    return json.data; // This contains { user, event_user, transaction }
  } catch (err) {
    console.error("Error fetching transaction data:", err);
    return null;
  }
}
export { fetchFinishedProjects };