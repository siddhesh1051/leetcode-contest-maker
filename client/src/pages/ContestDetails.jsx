import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ContestDetails = () => {
  const [contest, setContest] = useState(null);

  const contestId = useParams().id;

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/contests/${contestId}`);
        setContest(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchContestDetails();
  }, [contestId]);

  if (!contest) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full bg-gray-900 flex items-center justify-center">
      <div className="w-full bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-4 text-white">{contest.title}</h2>
        <p className="text-gray-400 mb-2">{contest.desc}</p>
        <p className="text-gray-400 mb-6 ">
          ⏱️ {Math.floor(contest.duration / 60)}hrs {contest.duration % 60}mins
        </p>
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 ">
                <th className="text-center py-2 " style={{ width: '30%' }}>
                  LC Number
                </th>
                <th className="text-center py-2" style={{ width: '50%' }}>
                Question
                </th>
                <th className="text-center py-2">Link</th>
              </tr>
            </thead>
            <tbody>
              {contest.questions.map(question => (
                <tr key={question.id} className="text-white">
                  <td className="py-2 my-2">{question.LC_number}</td>
                  
                  <td className="py-2 my-2">{question.name}</td>
                  <td className="py-2 my-2">
                    <a
                      href={question.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-green-700 px-3 py-1 rounded-lg  "
                    >
                      Solve
                    </a>
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
