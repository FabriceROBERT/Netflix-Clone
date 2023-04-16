import React from "react";
import "../css/SignUpScreen.css";

const SignUpScreen = () => {
  return (
    <div className="SignUp">
      <form>
        <h1>Sign In</h1>
        <input placeholder="Email" type="email" />
        <input type="password" placeholder="Password" />
      </form>
    </div>
  );
};

export default SignUpScreen;
