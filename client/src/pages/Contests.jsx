import React, { useEffect, useState } from 'react'
import ContestDiv from "./ContestDiv.jsx"
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      <div className='bg-white px-2'>
      <div className='flex flex-col mt-10 justify-start items-start px-4 '>
          <div className='flex flex-col w-[100%]'>
              

             
             
                      <div className='text-3xl font-medium'>Contests</div>

              <div className='flex flex-col items-center justify-center mt-10'>
                  <div className='flex flex-col items-center justify-center'>
                      <Link to='/add'>
                          <div className='flex flex-row items-center justify-center ml-4'>
                              <div className='text-xl font-medium py-2 px-4 bg-green-600 rounded-lg'>➕  Create Contest</div> 
                          </div>
                      </Link>
                  </div>

                  



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
    );
}

export default Contests
