import React, { useState, useEffect } from "react";
import axios from "axios";
import { Api } from "../utils/API";

function LoginAndSignUp() {
  const [loginData, setLoginData] = useState({});
  const [signUpData, setSignUpData] = useState({});
  const [loginOrSignUp, setLoginOrSignUp] = useState("login");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [data, setData] = useState(null);

  // ? LOGIN HANDLER
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginData);

    setLoginData({});
  };

  useEffect(() => {
    async function postData() {
      try {
        const response = await axios.post(`${Api}/create/user`, signUpData);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (formSubmitted) {
      postData();
    }
  }, [signUpData, formSubmitted]);

  // ? REGISTRATION HANDLER
  const handleRegistration = (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    console.log(signUpData);
  };

  return (
    <div
      className={`px-[80px] ${
        loginOrSignUp === "signUp" ? "my-[80px]" : "my-[230px]"
      }  py-[40px]  rounded-lg bg-[#635f5f8c]`}
      style={{
        boxShadow: "0px 2px 30px rgba(0, 0, 0, 0.25)",
        backgroundColor: "blur(8px)",
      }}
    >
      <div
        className={`flex justify-center mt-[25px] mb-[25px]
        ${loginOrSignUp === "mobileNumberForPassword" ? "hidden" : "block"}
        ${loginOrSignUp === "forgotPassword" ? "hidden" : "block"}   ${
          loginOrSignUp === "passwordResetPopup" ? "hidden" : "block"
        }`}
      >
        <button
          type="button"
          onClick={() => setLoginOrSignUp("login")}
          className={` ${
            loginOrSignUp === "login"
              ? "text-[#FFFFFF] bg-[#033A01]"
              : "text-[#033A01] bg-[#FFFFFF]"
          } py-[5px] max-w-[200px] w-full border-[#033A01] leading-[19px] text-base border gap-[1px] rounded-l-lg px-[55px]`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setLoginOrSignUp("signUp")}
          className={`  ${
            loginOrSignUp === "signUp"
              ? "text-[#FFFFFF] bg-[#033A01]"
              : "text-[#033A01] bg-[#FFFFFF]"
          } py-[5px] max-w-[200px] w-full border-[#033A01] leading-[19px] text-base border gap-[1px] rounded-r-lg px-[55px]`}
        >
          Sign Up
        </button>
      </div>

      {loginOrSignUp === "login" ? (
        <form className="rounded-lg max-w-[400px] py-4" onSubmit={handleLogin}>
          <div className="py-4">
            <input
              className="border rounded-md focus:border-b-[#033A01] py-2 pl-4 bg-gray-200 focus:outline-none max-w-[440px] w-full"
              type={"tel"}
              name={"phone"}
              onChange={(e) =>
                setLoginData({ ...loginData, [e.target.name]: e.target.value })
              }
              placeholder="Phone"
              required
              maxLength={30}
            />
          </div>

          <div className="py-4">
            <input
              name={"password"}
              className="border rounded-md focus:border-b-[#033A01] py-2 pl-4 bg-gray-200 focus:outline-none max-w-[440px] w-full"
              onChange={(e) =>
                setLoginData({ ...loginData, [e.target.name]: e.target.value })
              }
              type={"password"}
              placeholder="Password"
              required
              maxLength={28}
            />
          </div>

          <a className="flex justify-end text-[#ccffe6] cursor-pointer">
            {" "}
            Forgot Password ?{" "}
          </a>

          <div className="flex justify-end">
            <button
              className="mt-5 rounded-lg px-[45px] py-[15px] mb-4 bg-[#033A01] text-white cursor-pointer"
              type={"submit"}
            >
              Login
            </button>
          </div>
          <div className="flex gap-2 items-center justify-start text-[#ccffe6] cursor-pointer">
            <span className="text-xs font-normal	"> New User ? </span>
            <span
              onClick={() => setLoginOrSignUp("signUp")}
              className="text-sm font-medium underline"
            >
              Sign Up Here.{" "}
            </span>
          </div>
        </form>
      ) : (
        <form
          className="rounded-lg max-w-[400px] py-4"
          onSubmit={handleRegistration}
        >
          <div className="py-4">
            <input
              className="border rounded-md focus:border-b-[#033A01] py-2 pl-4 bg-gray-200 focus:outline-none max-w-[440px] w-full"
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  [e.target.name]: e.target.value,
                })
              }
              type={"text"}
              name={"name"}
              placeholder="Name"
              required
              maxLength={30}
            />
          </div>

          <div className="py-4">
            <input
              className="border rounded-md focus:border-b-[#033A01] py-2 pl-4 bg-gray-200 focus:outline-none max-w-[440px] w-full"
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  [e.target.name]: e.target.value,
                })
              }
              name="contact"
              type={"tel"}
              placeholder="Mobile"
              required
              maxLength={15}
              minLength={10}
            />
          </div>

          <div className="py-4">
            <input
              className="border rounded-md focus:border-b-[#033A01] py-2 pl-4 bg-gray-200 focus:outline-none max-w-[440px] w-full"
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  [e.target.name]: e.target.value,
                })
              }
              type={"date"}
              name="dob"
              placeholder="DOB"
              required
              maxLength={10}
            />
          </div>

          <div className="py-4">
            <input
              className="border rounded-md focus:border-b-[#033A01] py-2 pl-4 bg-gray-200 focus:outline-none max-w-[440px] w-full"
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  [e.target.name]: e.target.value,
                })
              }
              type={"email"}
              name="email"
              placeholder="E-Mail"
              required
              maxLength={30}
            />
          </div>

          <div className="py-4">
            <input
              className="border rounded-md focus:border-b-[#033A01] py-2 pl-4 bg-gray-200 focus:outline-none max-w-[440px] w-full"
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  [e.target.name]: e.target.value,
                })
              }
              type={"password"}
              name="password"
              placeholder="Password"
              required
              maxLength={30}
              minLength={5}
            />
          </div>

          <div className="py-4">
            <input
              className="border rounded-md focus:border-b-[#033A01] py-2 pl-4 bg-gray-200 focus:outline-none max-w-[440px] w-full"
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  [e.target.name]: e.target.value,
                })
              }
              type={"password"}
              name="conformPassword"
              placeholder="Conform-Password"
              required
              maxLength={30}
              minLength={5}
            />
          </div>

          <a className="flex justify-end text-[#ccffe6] cursor-pointer">
            {" "}
            Forgot Password ?{" "}
          </a>

          <div className="flex justify-end">
            <button
              className="mt-5 rounded-lg px-[45px] py-[15px] mb-4 bg-[#033A01] text-white cursor-pointer"
              type={"submit"}
            >
              Sign Up
            </button>
          </div>

          <div className="flex gap-2 items-center justify-start text-[#ccffe6] cursor-pointer">
            <span className="text-xs font-normal	"> Already Registered? </span>
            <span
              onClick={() => setLoginOrSignUp("login")}
              className="text-sm font-medium underline"
            >
              Login Here.{" "}
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginAndSignUp;
