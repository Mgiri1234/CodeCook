import React from 'react';
import deleteIcon from '../assets/delete.jpg';
import axiosInstance from '../Axios';
import { Link } from 'react-router-dom';

function ProblemCard({ problem, isAdmin }) {

  return (
    <div className="problemCard bg-white shadow-lg rounded-lg p-6 mb-6 w-full flex flex-row items-center justify-between">
    <div>
      <h1 className="font-bold text-2xl mb-3 text-blue-800">{problem.name}</h1>
      <div className="mb-3 text-sm text-gray-600">
        {problem.tag.map((tag, index) => (
          <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2">
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div className="flex items-center">
      {isAdmin && (
        <>
          <Link
            to={`/editTask/${problem._id}`}
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold py-2 px-4 rounded-full shadow-md mr-3 transition duration-300 transform hover:scale-105"
          >
            Edit
          </Link>
          <Link
            to={`/testcases/${problem._id}`}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-2 px-4 rounded-full shadow-md mr-3 transition duration-300 transform hover:scale-105"
          >
            Edit Testcases
          </Link>
        </>
      )}
      <Link
        to={`/task/${problem._id}`}
        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105"
      >
        Solve
      </Link>
      {isAdmin && (
        <img
          src={deleteIcon}
          onClick={() => {
            console.log(problem._id);
            axiosInstance.delete(`/tasks/${problem._id}`)
              .then((response) => {
                console.log(response);
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          className="ml-3 w-6 h-6 cursor-pointer transition duration-300 transform hover:scale-110"
        />
      )}
    </div>
  </div>
  );
}

export default ProblemCard;