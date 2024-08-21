import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../Axios';

function PastVerdictPage() {

  const [verdict, setVerdict] = useState({});

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerdict = async () => {
      try {
        const { data } = await axiosInstance.post(`/submissions/one`, { id:window.location.pathname.split('/')[2]});
        let verdictData = data.data.submission;
        verdictData.handle = data.data.handle;
        verdictData.taskName = data.data.taskName;
        delete verdictData.userId;
        delete verdictData.taskId;
        delete verdictData.__v;
        setVerdict(verdictData);

      } catch (error) {
        console.error('Error fetching verdict:', error);
      }
    };
    fetchVerdict();
  }, []);


  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32">
        <h1 className="text-4xl font-bold text-center my-8">VerdictPage</h1>
        <hr className="border-2 border-gray-200 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Source Code</h2>

            <div className="border rounded p-4 bg-gray-100">
              <pre className="whitespace-pre-wrap">
                {verdict.code}
              </pre>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Submission Info</h2>
            <div className="border rounded p-4 bg-gray-100">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold mr-2">Submission ID:</h3>
                <p className="text-lg">{verdict._id}</p>
              </div>
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold mr-2">Language:</h3>
                <p className="text-lg">{verdict.language}</p>
              </div>
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold mr-2">Verdict:</h3>
                <p className="text-lg">{verdict.verdict}</p>
              </div>
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold mr-2">Submission Time:</h3>
                <p className="text-lg">{new Date(verdict.submissionTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
              </div>
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold mr-2">Handle:</h3>
                <p className="text-lg">{verdict.handle}</p>
              </div>
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold mr-2">Task Name:</h3>
                <p className="text-lg">{verdict.taskName}</p>
              </div>
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold mr-2">Time Taken:</h3>
                <p className="text-lg">{verdict.timeTaken}ms</p>
              </div>
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold mr-2">Memory Used:</h3>
                <p className="text-lg">{verdict.memoryUsed}MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PastVerdictPage;