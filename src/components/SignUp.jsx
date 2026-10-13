import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function SignUp() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  function onSubmit(data) {

    const success = signUp(data);

    if (!success) {
      // show the error under the email field
      setError("email", { message: "Email is already registered" });
      return;
    }

    alert(
      `Registration successfully.`,
    );

    navigate('/sign-in');
  }

  return (
    <div className=" w-full h-full flex justify-center items-start">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="mb-2">
          <h1 className="text-center font-bold my-1 text-3xl">Register</h1>
          <label htmlFor="email" className="block font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email"
            className="border rounded p-1 w-full"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block font-bold">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your Password"
            className="border rounded p-1 w-full"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password length must be at least 8 character",
              },
              maxLength: {
                value: 30,
                message: "Password maximum lenght is 30 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-2 text-center">
          <input
            type="submit"
            value="Register"
            className="bg-green-300 px-3 py-1 rounded "
          />
        </div>
        <div className="mb-2">
          <p>
            Doesnt have an account?{" "}
            <Link to="/sign-in" className="text-blue-500">
              Sign-in
            </Link>
          </p>
        </div>
      </form>
      {/* <p>Email:{email}</p>
        <p>Password:{password}</p> */}
    </div>
  );
}

export default SignUp;
