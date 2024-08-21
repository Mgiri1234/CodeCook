import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../Axios";

function SignUp(){

    const [data,setData]=useState({
        email:"",
        fullName:"",
        handle:"",
        password:"",
        confirmPassword:"",
        dob:""
    });
        
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        
        if(data.password!==data.confirmPassword){
            alert("Passwords do not match");
            return;
        }

        try {
            await axiosInstance.post("/users/register", data)
            .then((res) => {
                console.log(res);
                alert("User registered successfully");
                navigate("/");
            })
            .catch((error) => {
                const htmlResponse = error.response.data.message;
                console.log('Extracted message:', htmlResponse);
                toast.error(htmlResponse, { autoClose: 2000 });
            });
        } catch (error) {
            console.log('Axios Error')
            console.log(error);
        }
        
    }
    

    return (
        <>
    <ToastContainer />
    <div className="container mx-auto px-4 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={registerUser} className="space-y-4">
        <input
            type="email"
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
        />
        <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
        />
        <input
            type="text"
            placeholder="Handle"
            onChange={(e) => setData({ ...data, handle: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
        />
        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
        />
        <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
        />
        <input
            type="date"
            placeholder="Date of Birth"
            onChange={(e) => setData({ ...data, dob: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">Sign Up</button>
        </form>
        <button type="button" onClick={() => navigate("/")} className="w-full px-4 py-2 bg-red-500 text-white rounded mt-4">Log In</button>
    </div>
</>    
    );
}

export default SignUp;