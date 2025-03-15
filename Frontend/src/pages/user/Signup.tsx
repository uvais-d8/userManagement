import { useDispatch } from "react-redux";
import { signup as signupApi } from "../../services/auth";
import React, { useState } from "react";
import { AppDispatch } from "../../redux/store/store";

import { login } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswords] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserNameError("");
    setPasswordError("");
    setEmailError("");
    setconfirmPasswordError("");

    if (!userName || userName.length < 3) {
      setUserNameError("User name must be at least 3 letters");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email ||!emailRegex.test(email)) {
      setEmailError("Invalid email");
      return;
    }
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if(!confirmPassword||password!=confirmPassword){
        setConfirmPassword("Passwords do not match")
        return;
    }

    try {
      const data = await signupApi({ userName, email, password });
console.log(data)
      dispatch(login(data));
      navigate("/");
    } catch (error) {
      setError("Invalid Username and password");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-black">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Sign up for a new account
            </h1>
            <form
              className="space-y-4 md:space-y-6 "
              action="#"
              onSubmit={handleSubmit}
            >
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm/tight font-medium text-gray-100 dark:text-black"
                >
                  Your full name
                </label>
                {userNameError && <p className="text-red-500">{userNameError}</p>}
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your name"
                
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-100 dark:text-black"
                >
                  Your email
                </label>
                {emailError && <p className="text-red-500">{emailError}</p>}
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your email"
                
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Password
                </label>
                {passwordError && <p className="text-red-500">{passwordError}</p>}
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPasswords(e.target.value)}
                  id="password"
                  placeholder="Enter your password"
                  className="bg-white border border-black text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black"
                  
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Confirm Password
                </label>
                {confirmPassword && <p className="text-red-500">{confirmPasswordError}</p>}
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  placeholder="Re enter your password"
                  className="bg-white border border-black text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black"
                  
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agree"
                      aria-describedby="agree"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="agree"
                      className="text-gray-500 dark:text-black"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>

              <p className="text-sm font-light text-black dark:text-black">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
