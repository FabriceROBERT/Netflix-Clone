import React from "react";
import "../css/ProfileScreen.css";
import "../components/PlansScreen";
import { useSelector } from "react-redux";
import { selectUser } from "../features/counter/userSlice";
import Nav from "../components/Navbar";
import { auth } from "../Firebase";
import PlansScreen from "../components/PlansScreen";
const ProfileScreen = () => {
  const user = useSelector(selectUser);

  return (
    <div className="profileScreen">
      <Nav />
      <div className="PS_Body">
        <h1>Edit Profile</h1>
        <div className="PS_Info">
          <img
            src="https://ih1.redbubble.net/image.618427277.3222/flat,400x400,075,f.u2.jpg"
            alt=""
          />
          <div className="PS_details">
            <h2>{user.email} </h2>
            <div className="PS_plans">
              <h3>Plans</h3>
              <PlansScreen />
              <button onClick={() => auth.signOut()} className="PS_SO">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
