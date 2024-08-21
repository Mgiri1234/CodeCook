import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SubmissionCard from '../components/SubmissionCard'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';

function SubmissionsPage(){
    const [submissions, setSubmissions] = useState([
        {
        }
    ]);
    const [handle, setHandle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = async () => {
          try {
            const response = await axiosInstance.post("/users/isloggedin");
          } catch (error) {
            console.log(error);
            navigate('/');
          }
        };
        isLoggedIn();
    }, []);

    useEffect(() => {
        axiosInstance.get('/submissions/')
          .then(response => {
            setSubmissions(response.data.data.submissions);
            setHandle(response.data.data.handle);
            console.log(response.data.data.submissions,response.data.data.handle);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }, []);

    return (
        <div>
            <Navbar />
            
            <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-600">Submissions</h1>
            <div className="flex flex-wrap">
                {submissions.map((submission) => (
                    <SubmissionCard key={submission._id} submission={submission} handle={handle} />
                ))}
            </div>
            
            <Footer />
        </div>
    );
}

export default SubmissionsPage;