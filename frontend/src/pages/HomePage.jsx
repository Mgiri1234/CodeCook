import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProblemCard from '../components/ProblemCard';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../Axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function HomePage() {
  
  const [problems, setProblems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Create a state variable for isAdmin

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await axiosInstance.post("/users/isloggedin");
        console.log(response);
        setIsAdmin(response.data.data.isAdmin); // Use the setter function to update isAdmin
      } catch (error) {
        console.log(error);
        const extractedMessage = error.response.data.message;
        toast.error(extractedMessage, { autoClose: 2000 });
        navigate('/');
      }
    };
    isLoggedIn();
  }, []);


  useEffect(() => {
    axiosInstance.get('/tasks/')
      .then(response => {
        setProblems(response.data.data);    //axios wraps the response in a data object and server response is an api
      })
      .catch(error => {
        console.error('There was an error!', error);
        const extractedMessage = error.response.data.message;
        toast.error(extractedMessage, { autoClose: 2000 });
      });
  }, []);

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-600">Problems</h1>
      <div className="flex flex-wrap">
        {problems.map((task) => (
          <ProblemCard key={task._id} problem={task} isAdmin={isAdmin} />
        ))}
      </div>
      {isAdmin && (
        <div className="flex justify-center items-center mt-4">
        <Link
          to="/createTask"
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105"
        >
          Add Task
        </Link>
      </div>
      )}
      <Footer />
    </div>
  );
}

export default HomePage;