import React, { useState } from "react";
import { useForm } from "react-hook-form";


function Auth() {
    const [mode, setMode] = useState("signup");
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    
    function OnSubmit(data) {
        
    }
    
    return (
      <div className="page min-h-[calc(100dvh-4rem)] w-full flex flex-col items-center justify-center">
        <div className="auth-container bg-white p-3 rounded-b-lg">
          <h1 className="page-title font-bold text-4xl text-center mb-5">
            {mode === "signup" ? "Register" : "Sign-In"}
          </h1>
          <form action={handleSubmit(OnSubmit)}>
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
            </div>
            <div className="mb-5 w-full flex justify-center">
              <input
                type="submit"
                className="py-2 px-5  font-bold rounded  bg-blue-600 text-white"
                value={mode === "signup" ? "Sign Up" : "Sign In"}
              />
            </div>
            <div className="mb-2">
              <p className="text-center">
                {mode === "signup"
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() =>
                    setMode(mode === "signup" ? "login" : "signup")
                  }
                >
                  {mode === "signup" ? "Login" : "Sign-up"}
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Auth;