
import { useContext, useState } from 'react';
import './App.css'
import SignUp from './components/SignUp';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import { AuthContext } from "./AuthContext";
function Home() {
  const { currentUser,isAuth } = useContext(AuthContext);
  return (
    <div className="h-full flex-row justify-center align-middle">
      <h1 className="text-9xl font-bold">Centra</h1>
      <h3 className="px-3 text-3xl">
        Welcome to our dear customer,
        <span className='font-bold text-red-400'>{isAuth ? currentUser.email : "Guest"}</span>
      </h3> 
    </div>
  );
}



function App() {
  const {isAuth,logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Are you sure?")) {
      logout();
      navigate("/sign-in");
    }
    
  };

  return (
    <div className="container mx-auto w-full h-full">
      {/* wrap the whole code to apply the auth and accessibility across */}
     
        <nav className="flex w-full justify-end gap-4 py-3 mb-5 items-center">
          <Link to="/home" className="text-blue-500">
            Home
          </Link>
          <Link to="/profile" className="text-blue-500">
            {" "}
            Profile
          </Link>
          {isAuth ? (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 rounded py-1 px-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/sign-in"
              className="text-white bg-green-600 rounded py-1 px-2"
            >
              Sign-in
            </Link>
          )}
        </nav>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />}></Route>

          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="*"
            element={<h1 className="text-center">404 Not Found</h1>}
          />
        </Routes>
    </div>
  );
}

export default App
