import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/features/authSlice";
import { login as loginApi } from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")


    const user = useSelector((state: RootState) => state.auth.user)
    const isAdmin = useSelector((state: RootState) => state.auth.isAdmin)
     const loged=useSelector((state:RootState)=>state.auth.logged)

    useEffect(() => {
        console.log(user, isAdmin,loged)
        if (user) {
            if (isAdmin) {
       
                navigate('/adminDashboard');
            } else {
         
                navigate('/');
            }
        }

    }, [user, isAdmin, navigate]);





    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        setEmailError("")
        setPasswordError("")
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!email || !emailRegex.test(email)) {
            setEmailError("Invalid email");
            return;
        }
        if (!password || password.length < 4) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        
        try {
            const data = await loginApi({ email, password ,isAdmin})
            dispatch(login(data))
            console.log(data ,"iam olny the data")
            console.log(data.isAdmin ,"ima the admin from data")
            if (data.isAdmin) {
                navigate("/adminDashboard")
                console.log("njan annu map njanu mop the admin map")
            } else {
                navigate("/")
            }

        } catch (error) {
            setError("Invalid email or password")
        }
    }


    return (
        <section className="bg-gray-50 dark:bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-black">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6 " action="#" onSubmit={handleSubmit}>
                            {error && <p className="text-red-500">{error}</p>}
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
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-balck dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your email"
                                    required
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
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="bg-white border border-black text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500dark:text-black"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-black dark:text-black">
                                Don’t have an account yet?{" "}
                                <a
                                    href="/signup"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
