import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Profile() {
    
    const { currentUser,isAuth } = useContext(AuthContext);
    return (
      <>
        <h1 className="font-bold my-1 text-9xl">Profile</h1>
        <h3>email: {isAuth ? currentUser.email : "none"}</h3>
        <h3>password:{isAuth ? "*".repeat(currentUser.passwordLength) : "none"}</h3>
      </>
    );
}

export default Profile;