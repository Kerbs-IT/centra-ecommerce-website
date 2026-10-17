import { Spinner } from "@/components/ui/spinner";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "@/AuthContext";

function Auth({ mode }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
    const [loading, setLoading] = useState(false);
    const { signUp, login } = useContext(AuthContext);
    const navigate = useNavigate();
  async function onSubmit(data) {
    
      setLoading(true);
       await new Promise((r) => setTimeout(r, 1000));
     if (mode === "signup") {
       const success = signUp(data);
       if (!success) {
         setError("email", { message: "Email is already registered" });
       } else {
         navigate("/");
       }
     } else {
       const success = login(data);
       if (!success) {
         setError("root", { message: "Incorrect email or password" });
       } else {
         navigate("/");
       }
     }

    setLoading(false);
  }

  return (
    <div className="page min-h-[calc(100dvh-4rem)] w-full flex flex-col items-center justify-center">
      <div className="auth-container bg-white  p-5 rounded-b-lg max-w-1/3">
        <h1 className="page-title font-bold text-4xl text-center mb-5">
          {mode === "signup" ? "Register" : "Sign-In"}
        </h1>
        <form action={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label htmlFor="email" className="block font-bold">
              Email:
            </label>
            <input
              type="email"
              className="p-2 border rounded"
              id="email"
              placeholder="Enter your email address border"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="font-bold block">
              Password:
            </label>
            <input
              type="password"
              className="border p-2 rounded"
              placeholder="Enter your password"
              id="password"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password length must be at least 8 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password length must not exceed 30 characters",
                },
              })}
            />

            {/* error for password */}
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            {errors.root && (
              <p className="text-red-500">{errors.root.message}</p>
            )}
          </div>
          <div className="mb-5 w-full flex justify-center">
            <button
              disabled={loading}
              className="py-2 px-5 disabled:opacity-50 flex gap-1 items-center justify-center  font-bold rounded  bg-blue-600 text-white"
            >
              {loading && <Spinner />}
              {mode === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
          <div className="mb-2">
            <p className="text-center">
              {mode === "signup"
                ? "Already have an account? "
                : "Don't have an account? "}
              <Link
                to={mode === "signup" ? "/sign-in" : "/sign-up"}
                className="text-blue-600"
              >
                {mode === "signup" ? "Login" : "Register"}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;
