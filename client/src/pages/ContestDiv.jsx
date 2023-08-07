import React from 'react';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import contestImg from './contest.png';

const ContestDiv = ({ title, duration, desc, id, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm bg-[#282828] border border-white rounded-lg shadow-xl dark:bg-[#282828] dark:border-[#282828] text-start hover:scale-105 duration-300">
      <Link to={`/contest/${id}`}>
        <img className="rounded-t-lg w-full" src={contestImg} alt="" />
      </Link>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}{' '}
          <span className="text-gray-500 text-lg ml-3">
            ⏱️{Math.round(duration / 60)}hrs {duration % 60}mins
          </span>
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{desc}</p>
        <Link
          to={`/contest/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View More
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
        <button
          onClick={() => {
            navigate(`/update/${id}`);
          }}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ml-4  duration-150"
        >
          Update
          <LuPencil className="text-white scale-125 ml-2" />
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-4 duration-150"
        >
          Delete
          <LuTrash2 className="text-white scale-125 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ContestDiv;
