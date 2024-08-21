import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../assets/back.jpg';
import axiosInstance from '../Axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function UpdateTask() {

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await axiosInstance.post("/users/isloggedin");
        console.log(response);
        if (!response.data.data.isAdmin) {
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      }
    };
    isLoggedIn();
  }, []);

  const [data, setData] = useState({
    name: "",
    statement: "",
    constraints: "",
    format: "",
    testcases: [{ input: [""], output: [""] }, { input: [""], output: [""] }],
    tag: [],
    timeLimit: 1,
    memoryLimit: 256
  });

  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const taskId = window.location.pathname.split('/')[2];
      try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        const task = response.data.data;

        setId(task._id);
        setData({
          name: task.name,
          statement: task.statement,
          format: task.format,
          timeLimit: task.timeLimit,
          memoryLimit: task.memoryLimit,
          constraints: task.constraints,
          tag: task.tag,
          testcases: task.testcases
        });
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchData();
  }, []);

  const updateTask = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.put(`/tasks/${id}`, data);
      console.log(res);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
    //console.log(data);
  }

  const handleAddTestcase = () => {
    setData(prevData => {
      const newTestcases = [...prevData.testcases, { input: [""], output: [""] }];
      return { ...prevData, testcases: newTestcases };
    });
  };

  const handleDeleteTestcase = (index) => {
    setData(prevData => {
      const newTestcases = prevData.testcases.filter((_, i) => i !== index);
      return { ...prevData, testcases: newTestcases };
    });
  };

  const handleTestcaseChange = (testcaseIndex, field, index, value) => {
    setData(prevData => {
      const newTestcases = [...prevData.testcases];
      newTestcases[testcaseIndex][field][index] = value;
      return { ...prevData, testcases: newTestcases };
    });
  };

  const handleTagChange = (value) => {
    setData(prevData => ({ ...prevData, tag: value.split(',') }));
  };

  const handleInputChange = (field, value) => {
    setData(prevData => ({ ...prevData, [field]: value }));
  };

  return (
    <>
      <Navbar />
      <form onSubmit={updateTask} className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="mb-5 text-3xl font-bold text-gray-700">Update Problem</h1>
        <div className="w-full max-w-[50rem]">


          <div className="mb-6 bg-white rounded shadow p-4">
            <h2 className="w-full px-3 mb-3 text-1xl font-bold text-gray-700">Name</h2>
            <div className="w-full px-3">
              <textarea
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Name"
                value={data.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6 bg-white rounded shadow p-4">
            <h2 className="w-full px-3 mb-3 text-1xl font-bold text-gray-700">Statement</h2>
            <div className="w-full px-3">
              <textarea
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Statement"
                value={data.statement}
                onChange={(e) => handleInputChange('statement', e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6 bg-white rounded shadow p-4">
            <h2 className="w-full px-3 mb-3 text-1xl font-bold text-gray-700">Constraints</h2>
            <div className="w-full px-3">
              <textarea
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Constraints"
                value={data.constraints}
                onChange={(e) => handleInputChange('constraints', e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6 bg-white rounded shadow p-4">
            <h2 className="w-full px-3 mb-3 text-1xl font-bold text-gray-700">Format</h2>
            <div className="w-full px-3">
              <textarea
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Format"
                value={data.format}
                onChange={(e) => handleInputChange('format', e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6 bg-white rounded shadow p-4">
            <h2 className="w-full px-3 mb-3 text-2xl font-bold text-gray-700">Test Cases</h2>
            {data.testcases.map((testcase, testcaseIndex) => (
              <div key={testcaseIndex} className="w-full px-3 mb-6 bg-gray-200 rounded shadow p-4">
                <h3 className="mb-3 text-xl font-bold text-gray-700">Testcase {testcaseIndex + 1}</h3>
                {testcase.input.map((input, index) => (
                  <div className="w-full px-3 mb-3">
                    <textarea
                      className="w-full px-4 py-3 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                      key={index}
                      placeholder={`Input ${index + 1}`}
                      value={input}
                      onChange={(e) => handleTestcaseChange(testcaseIndex, 'input', index, e.target.value)}
                    />
                  </div>
                ))}

                {testcase.output.map((output, index) => (
                  <div className="w-full px-3 mb-3">
                    <textarea
                      className="w-full px-4 py-3 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                      key={index}
                      placeholder={`Output ${index + 1}`}
                      value={output}
                      onChange={(e) => handleTestcaseChange(testcaseIndex, 'output', index, e.target.value)}
                    />
                  </div>
                ))}
                <button type="button" onClick={() => handleDeleteTestcase(testcaseIndex)} className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline">Delete Test Case</button>
              </div>
            ))}
            <button type="button" onClick={handleAddTestcase} className="w-full px-4 py-2 mt-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">Add Test Case</button>
          </div>

          <div className="mb-6 bg-white rounded shadow p-4">
            <h2 className="w-full px-3 mb-3 text-1xl font-bold text-gray-700">Time Limit (in seconds)</h2>
            <div className="w-full px-3">
              <textarea
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Time Limit"
                value={data.timeLimit}
                onChange={(e) => handleInputChange('timeLimit', e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6 bg-white rounded shadow p-4">
            <h2 className="w-full px-3 mb-3 text-1xl font-bold text-gray-700">Memory Limit (in MB)</h2>
            <div className="w-full px-3">
              <textarea
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Memory Limit"
                value={data.memoryLimit}
                onChange={(e) => handleInputChange('memoryLimit', e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6 bg-white rounded shadow p-4">
            <h2 className="w-full px-3 mb-3 text-1xl font-bold text-gray-700">Tags</h2>
            <div className="w-full px-3">
              <input
                className="w-full px-4 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                placeholder="Tags (comma separated)"
                value={data.tag.join(',')}
                onChange={(e) => handleTagChange(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Task
              </button>
            </div>
          </div>

        </div>
      </form>
      <Footer />
    </>
  )
}

export default UpdateTask;