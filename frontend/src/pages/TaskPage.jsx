import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskSubmissionPage() {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    name: '',
    statement: '',
    format: '',
    constraints: '',
    testcases: [],
    timeLimit: 1,
    memoryLimit: 256,
    tag: []
  });
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        await axiosInstance.post("/users/isloggedin");
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    };
    isLoggedIn();
  }, [navigate]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskId = window.location.pathname.split('/')[2];
        const { data } = await axiosInstance.get(`/tasks/${taskId}`);
        setTask(data.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      problem_id: task._id
    };

    try {
      const { data } = await axiosInstance.post('/submissions/submit', payload);
      toast.success('Submission successful!', { autoClose: 1000 });
      setTimeout(() => {
        navigate('/verdict');
      }, 1000);
    } catch (error) {
      let compilationError=error.response.data;
      const errorMessage = (compilationError.message && compilationError.message.length <= 60) ? compilationError.message : 'Submission error';
      const stderr = compilationError.error || '';
      setError(stderr);
      toast.error(errorMessage, { autoClose: 2000 });
    }
  };

  const handleCompile = async () => {
    const payload = {
      language,
      code,
      input
    };

    try {
      const { data } = await axiosInstance.post('/submissions/compile', payload);
      setOutput(data.output);
      setError(''); // Clear any previous errors
      toast.success('Compilation successful!', { autoClose: 1000 });
    } catch (error) {
      
      let compilationError=error.response.data;
      const errorMessage = (compilationError.message && compilationError.message.length <= 60) ? compilationError.message : 'Compilation error';
      const stderr = compilationError.error || '';
      setError(stderr);
      toast.error(errorMessage, { autoClose: 2000 });
    }
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const { selectionStart, selectionEnd } = e.target;
        const newValue = code.substring(0, selectionStart) + '    ' + code.substring(selectionEnd);
        setCode(newValue);
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 4;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <ToastContainer />
            <div className="container mx-auto flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 px-4">
                <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
                    <h1 className="font-bold text-3xl mb-4">{task.name}</h1>
                    <h2 className="font-bold text-2xl mb-2">Problem Statement</h2>
                    <div className="mb-4 p-4 bg-gray-100 rounded" style={{ whiteSpace: 'pre-wrap' }}>{task.statement}</div>
                    <h2 className="font-bold text-2xl mb-2">Format</h2>
                    <div className="mb-4 p-4 bg-gray-100 rounded" style={{ whiteSpace: 'pre-wrap' }}>{task.format}</div>
                    <h2 className="font-bold text-2xl mb-2">Constraints</h2>
                    <div className="mb-4 p-4 bg-gray-100 rounded" style={{ whiteSpace: 'pre-wrap' }}>{task.constraints}</div>
                    <h2 className="font-bold text-2xl mb-2">Test Cases</h2>
                    <div>
                        {task.testcases.map((testcase, index) => (
                            <div key={index} className="mb-4 p-4 bg-gray-100 rounded">
                                <h2 className="font-bold text-xl mb-2">Input</h2>
                                <p className="mb-2" style={{ whiteSpace: 'pre-wrap' }}>{testcase.input}</p>
                                <h2 className="font-bold text-xl mb-2">Output</h2>
                                <p className="mb-2" style={{ whiteSpace: 'pre-wrap' }}>{testcase.output}</p>
                            </div>
                        ))}
                    </div>
                    <h2 className="font-bold text-2xl mb-2">Time Limit</h2>
                    <p className="mb-4">{task.timeLimit}s</p>
                    <h2 className="font-bold text-2xl mb-2">Memory Limit</h2>
                    <p className="mb-4">{task.memoryLimit}MB</p>
                    <h2 className="font-bold text-2xl mb-2">Tags</h2>
                    <ul className="list-disc pl-5 mb-4">
                        {task.tag.map((onetag, index) => (
                            <li key={index} className="mb-1">{onetag}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex-1">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Editor</h2>
                        <div className="mb-4 flex space-x-2">
                            <button
                                onClick={() => setLanguage('c')}
                                className={`px-4 py-2 rounded ${language === 'c' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                C
                            </button>
                            <button
                                onClick={() => setLanguage('cpp')}
                                className={`px-4 py-2 rounded ${language === 'cpp' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                C++
                            </button>
                            <button
                                onClick={() => setLanguage('java')}
                                className={`px-4 py-2 rounded ${language === 'java' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Java
                            </button>
                            <button
                                onClick={() => setLanguage('python')}
                                className={`px-4 py-2 rounded ${language === 'python' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Python
                            </button>
                        </div>
                        <div className="mb-4">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onKeyDown={handleTextareaKeyDown}
                                className="w-full h-64 border border-gray-300 rounded-md p-2 font-mono text-sm"
                                placeholder="Write your code here..."
                                style={{ minHeight: '50vh' }}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Input:</label>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full h-32 border border-gray-300 rounded-md p-2 font-mono text-sm"
                                placeholder="Enter input here..."
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Output:</label>
                            <textarea
                                value={output}
                                readOnly
                                className="w-full h-32 border border-gray-300 rounded-md p-2 font-mono text-sm bg-gray-100"
                                placeholder="Output will be displayed here..."
                            />
                        </div>
                        <div className="mb-4">
                            {error && (
                                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                                    <span className="font-medium">Error:</span> {error}
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleCompile}
                                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
                            >
                                Compile
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
);
}

export default TaskSubmissionPage;
