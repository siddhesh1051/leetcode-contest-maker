import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ContestDetails = () => {
  const [contest, setContest] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const contestId = useParams().id;

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/contests/${contestId}`);
        setContest(res.data);
        setTimer(res.data.duration * 60); // Convert duration to seconds
      } catch (err) {
        console.log(err);
      }
    };
    fetchContestDetails();
  }, [contestId]);

  useEffect(() => {
    let interval;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRunning(false);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(contest.duration * 60); // Convert duration to seconds
  };

  if (!contest) {
    return <p>Loading...</p>;
  }

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  return (
    <div className="w-full bg-gray-900 flex items-center justify-center">
      <div className="w-full bg-gray-800 rounded-lg shadow-md p-6">

        <div className='flex justify-around'>
        <div className='flex-[0.7]'>

        <h2 className="text-3xl font-bold mb-4 text-white">{contest.title}</h2>
        <p className="text-gray-400 mb-2">{contest.desc}</p>
        <p className="text-gray-200 mb-6 text-xl">
          ⏱️ {Math.floor(contest.duration / 60)}hrs {contest.duration % 60}mins
        </p>
        </div>
        <div className="flex items-center space-x-4 mb-6 flex-[0.3]">
          <p className="text-gray-400 text-xl">
            Timer: {hours}h {minutes}m {seconds}s
          </p>
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-4 py-1 text-white bg-blue-700 rounded-lg"
            >
              Start
            </button>
          ) : (
            <button
              onClick={resetTimer}
              className="px-4 py-1 text-white bg-red-700 rounded-lg"
            >
              Reset
            </button>
          )}
        </div>
        </div>
        
        
        <div className="w-full overflow-x-auto bg-gray-700 py-2  rounded-md">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="text-gray-400  border-b-black border-t-gray-700 border-x-gray-700 border-2">
                <th className="text-center py-2 " style={{ width: '30%' }}>
                  LC Number
                </th>
                <th className="text-center py-2" style={{ width: '50%' }}>
                  Question
                </th>
                <th className="text-center py-2">Link</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {contest.questions.map((question, index) => (
                <tr key={index} className="text-white">
                  <td className="py-4 my-2">{question.LC_number}</td>
                  <td className="py-4 my-2">{question.name}</td>
                  <td className="py-4 my-2">
                    {question.link !== "" ? (
                      <a
                        href={question.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-green-700 px-3 py-1 rounded-lg"
                      >
                        Solve
                      </a>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
