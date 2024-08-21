import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../assets/back.jpg';
import axiosInstance from '../Axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function TestcaseGen() {

  const [testcases, setTestcases] = useState([{_id:"", input: "", output: "" }]);

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await axiosInstance.post("/users/isloggedin");
        console.log(response);
        if (!response.data.data.isAdmin) {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    };
    isLoggedIn();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(`/testcases/fetchtestcases`, { taskId: window.location.pathname.split("/")[2] });
        console.log(response.data.data);
        setTestcases(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const handleAddTestcase = () => {
    setTestcases([...testcases, { id:"", input: "", output: "" }]);
  };

  const handleDeleteTestcase = (index) => {
    setTestcases(testcases.filter((_, i) => i !== index));
  };

  const handleTestcaseChange = (testcaseIndex, field, value) => {
    const newTestcases = [...testcases];
    newTestcases[testcaseIndex][field] = value;
    setTestcases(newTestcases);
  };

  const handleSubmit = async () => {
    try {
      const taskId = window.location.pathname.split("/")[2];
      const response = await axiosInstance.put(`/testcases?taskId=${taskId}`, {testcases} );
      console.log(response);
      navigate(`/task/${taskId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap -mx-3 mb-6 bg-white rounded shadow p-4 sm:w-3/4 lg:w-1/2 mx-auto">
        <h2 className="w-full px-3 mb-3 text-2xl font-bold text-gray-700">Test Cases</h2>
        {testcases.map((testcase, testcaseIndex) => (
          <div key={testcaseIndex} className="w-full px-3 mb-6 bg-gray-200 rounded shadow p-4">
            <h3 className="mb-3 text-xl font-bold text-gray-700">Testcase {testcaseIndex + 1}</h3>
            <div className="w-full px-3 mb-3">
              <textarea
                className="w-full px-4 py-3 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder={`Input`}
                value={testcase.input}
                onChange={(e) => handleTestcaseChange(testcaseIndex, 'input', e.target.value)}
              />
            </div>
            <div className="w-full px-3 mb-3">
              <textarea
                className="w-full px-4 py-3 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder={`Output`}
                value={testcase.output}
                onChange={(e) => handleTestcaseChange(testcaseIndex, 'output', e.target.value)}
              />
            </div>
            <button type="button" onClick={() => handleDeleteTestcase(testcaseIndex)}
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline">Delete Test Case</button>
          </div>
        ))}
        <button type="button" onClick={handleAddTestcase}
          className="w-full px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">Add Test Case</button>
        <button type="button" onClick={handleSubmit}
          className="w-full px-4 py-2 mt-3 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline">Submit</button>
      </div>
      <Footer />
    </>
  )
}

export default TestcaseGen;