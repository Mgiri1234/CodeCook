import React from 'react';
import { Link } from 'react-router-dom';

function SubmissionCard({ submission, handle }) {

  return (
    <div className="submissionCard bg-white shadow-lg rounded-lg p-6 mb-6 w-full flex flex-row items-center justify-between">
      <div>
        <h1 className="font-bold text-2xl mb-3 text-blue-800">{submission.taskName}</h1>
        <div className="mb-3 text-sm text-gray-600">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2">
            {submission.language}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2">
            {submission.verdict}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2">
            {handle}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <Link className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105"
            to={`/pastSubmissions/${submission._id}`}
        >
          View Verdict
        </Link>
      </div>
    </div>
  );
}

export default SubmissionCard;
