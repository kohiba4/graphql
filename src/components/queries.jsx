const query = `
  query User {
    user {
      attrs
      auditRatio
      email
      firstName
      lastName
      login
      totalDown
      totalUp
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
        ]
      }
        order_by: { amount: desc }
        limit: 10
    ) {
      amount
      path
      type
      userLogin
      eventId
      createdAt
    }
  }
`;

const FinishedProjects = `
  query FinishedProjectsByUser {
    result(
      where: {
        _and: [
          { isLast: { _eq: true } }
          { grade: { _gt: 1 } }
        ]
      }
      order_by: { createdAt: desc }
      limit: 10
    ) {
      createdAt
      grade
      path
      eventId
      campus
      object {
        name
      }
    }
  }
`;

const skillQuery = `
  query Skill {
    user {
      firstName
      lastName
      id
      login
      auditRatio
      email
      campus
      totalUp
      totalDown
      createdAt
    }
    transaction(
      where: {type: {_iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])"}, event: {path: {_eq: "/bahrain/bh-module"}}}
      order_by: {createdAt: asc}
    ) {
      amount
      type
      createdAt
      objectId
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
    return json.data;
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};

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
    return json.data;
  } catch (err) {
    console.error("Error fetching transaction data:", err);
    return null;
  }
};

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
    return json.data;
  } catch (err) {
    console.error("Error fetching finished projects:", err);
    return null;
  }
};

const fetchSkillData = async (token) => {
  try {
    const res = await fetch("https://learn.reboot01.com/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: skillQuery }),
    });

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error fetching skill data:", err);
    return null;
  }
};

export default fetchUserData;
export { fetchTransactionData, fetchFinishedProjects, fetchSkillData };
