import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        // dont forget to add tbe fixed class
      <header className="sticky top-0 inset-x-0 bg-white drop-shadow-md z-50">
        <nav className="navbar container mx-auto  py-3">
          <div className="navbar-container flex flex-wrap justify-between items-center">
            <Link to="/" className="inline-block transition duration-300 ease-in-out navbar-brand font-bold text-2xl hover:-rotate-6 hover:scale-130 hover:text-blue-500">
              Shophub
            </Link>
            <div className="navbar-links flex justify-center items-center gap-3">
              <Link
                to="/"
                className="inline-block transition duration-300 ease-in-out font-bold hover:text-blue-500 text-xl transform hover:scale-120"
              >
                Home
              </Link>
              <Link
                to="/checkout"
                className="inine-block transition duration-300 ease-in-out font-bold hover:text-blue-500 text-xl transform hover:scale-120"
              >
                Cart
              </Link>
            </div>
            <div className="navbar-auth">
              <div className="navbar-auth-links flex gap-3">
                <Link
                  to="/auth"
                  className="btn bg-gray-500  py-2 px-4 rounded text-white "
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="btn bg-blue-500  py-2 px-4 rounded text-white"
                >
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
}

export default Navbar;
