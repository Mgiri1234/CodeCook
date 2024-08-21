import logo from '../assets/AlgoForces.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';

function Navbar() {
  const navigate = useNavigate();
  let handle = localStorage.getItem('handle');

  const logOutHandler = async () => {
    try {
      await axiosInstance.post("/users/logout");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error('Failed to log out:', error);
    }

  }

  return (
    <nav className="mt-0 mb-0 flex justify-between bg-gradient-to-r from-blue-600 to-blue-800 text-white w-full p-4 shadow-md">
      <div className="flex items-center p-1">
        <img src={logo} alt="logo" className="h-10 w-10 rounded-full shadow-lg" />
        <h1
          className="inline-block ml-3 text-2xl font-semibold cursor-pointer hover:text-blue-300 transition duration-300"
          onClick={(e) => {
            e.preventDefault();
            navigate('/home');
          }}
        >
          <a href="/home" className="no-underline">AlgoForces</a>
        </h1>
        <h1
          className="inline-block ml-3 text-2xl font-semibold cursor-pointer hover:text-blue-300 transition duration-300"
          onClick={(e) => {
            e.preventDefault();
            navigate('/mysubmissions');
          }}
        >
          <a href="/mysubmissions" className="no-underline">MySubmissions</a>
        </h1>
      </div>
      <div className="flex items-center">
        <button
          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 px-4 rounded-full shadow-md mr-3 transition duration-300 transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
             navigate('/profile'); 
            }
          }
        >
        <a href="/profile" className="no-underline">{handle}</a>
        </button>
        <button
          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105"
          onClick={logOutHandler}
        >
          Logout
        </button>
      </div>
    </nav>


  );
}

export default Navbar;