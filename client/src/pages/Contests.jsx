import React, { useEffect, useState } from 'react'
import ContestDiv from "./ContestDiv.jsx"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LuPlus } from 'react-icons/lu';

const Contests = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/contests");
        setContests(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(contests);

  const handleDelete = async (id) => {
    console.log(id)
    try {
      await axios.delete(`http://localhost:8800/contests/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='bg-[#1A1A1A] px-2'>
      <div className='flex flex-col mt-5 justify-center  items-center px-4 '>
        <div className='flex flex-col w-[100%]'>





          <div className='text-4xl font-medium text-white'>Contests</div>
          <div className='flex flex-col items-start justify-start mt-5'>
            <div className='flex flex-col items-center justify-center hover:scale-105 active:scale-95 duration-200'>
              <Link to='/add'>
                <div className='flex flex-row mb-8 justify-center items-center bg-green-600 text-xl font-medium py-2 px-4  rounded-lg text-white'>
                <LuPlus className='inline scale-150  '/>
                  <div className='text-xl font-medium py-2 px-4 bg-green-600 rounded-lg text-white inline'>  Create Contest</div>
                </div>
              </Link>
            </div>




            <div className='grid gap-6 grid-cols-3'>

              {
                contests.map((contest) => (
                  <ContestDiv
                    key={contest.id}
                    id={contest.id}
                    duration={contest.duration}
                    desc={contest.desc}
                    title={contest.title}
                    handleDelete={handleDelete}
                  />
                ))

              }
            </div>
          </div>

        </div>






      </div>
    </div>
  );
}

export default Contests
