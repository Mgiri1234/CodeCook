import { useNavigate } from "react-router-dom";
import axiosInstance from "../Axios";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Login() {


    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        console.log(data);

        try {
            const res = await axiosInstance.post("/users/login", data);
            console.log(res);
            localStorage.setItem('handle', res.data.data.user.handle);
            navigate("/home");
        } catch (error) {
            const extractedMessage = error.response.data.message;
            toast.error(extractedMessage, { autoClose: 2000 });
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-md w-full space-y-8">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Algo Forces</h1>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Login
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={loginUser}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" onChange={(e) => setData({ ...data, email: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    Not Registered?
                    <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => navigate('/register')}>
                        Sign Up
                    </button>
                    <div className="mt-2">
                        <button className="text-indigo-500 hover:text-indigo-700" onClick={(e) => navigate('/forgot-password')}>
                            Forgot Password?
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;