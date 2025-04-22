const Profile = ({ user }) => {
    if (!user) {
      return <div>Loading...</div>;
    }

    console.log("user: ", user);

    return (
      <div className="profile-card">
        <h2 className="profile-title"style={{fontSize: "35px"}}>Profile</h2>
        <div className="profile-info" style={{fontSize: "30px"}}>
          <div className="info-item">
            <span className="info-label">Name: </span>
            <span className="info-value">{user[0].firstName} {user[0].lastName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Username: </span>
            <span className="info-value">{user[0].login}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email: </span>
            <span className="info-value">{user[0].email}</span>
          </div>
          <div classNmae="info-item">
            <span className="info-label">Phone: </span>
            <span className="info-value">{user[0].attrs.Phone}</span>
          </div>
          <div classNmae="info-item">
            <span className="info-label">Certificate: </span>
            <span className="info-value">{user[0].attrs.qualification}</span>
          </div>
          <div className="audit-ratio">
            <span className="info-label">Audit Ratio: </span>
            <span className="info-value">{user[0].auditRatio.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Profile;
