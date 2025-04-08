import fetchUserData from "../queries";

const Profile = ({ user }) => {
    // console.log("user: ", user);
    if (!user) {
      return <div>Loading...</div>;
    }
    // console.log("user email: ", user[0].email);
    return (
      <div>
        <h1>Profile</h1>
        <h3>Email: {user[0].email}</h3>
        <h3>Name: {user[0].firstName} {user[0].lastName}</h3>
      </div>
    );
  };
  
  export default Profile;
  