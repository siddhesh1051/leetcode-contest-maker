import axios from 'axios';
import React from 'react'
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { Link, Navigate, useNavigate } from 'react-router-dom';

const ContestDiv = ({ title, duration, desc, id, handleDelete }) => {

  const navigate = useNavigate();

  return (
    <div

      className='w-[1200px] h-16 flex justify-start items-center shadow-lg border-2 border-[#dfded7] mt-4 rounded-xl hover:shadow-2xl duration-200'>
      <div className='flex-1  flex justify-center text-lg font-medium'>{title}</div>
      {/* <div className='flex-1  flex justify-center text-lg font-medium'>{contest.desc}</div> */}
      <div className='flex-1  flex justify-center text-lg font-medium'>{Math.round(duration/60)}:{duration%60}</div>
      {/* <div className='flex-1  flex justify-center text-lg font-medium'>sdd</div> */}
      <div>

        
        {/* <Link className='px-4 py-2'
          to={`/update/${id}`}
        > 
          <LuPencil className='text-gray-500 scale-150' />
        </Link> */}
        <button className='px-4 py-2  text-red ' onClick={()=>{
          navigate(`/update/${id}`)
        }}><LuPencil className='text-gray-600 scale-150' /></button>
        <button className='px-4 py-2 mr-3  text-red ' onClick={() => handleDelete(id)}><LuTrash2 className='text-red-500 scale-150' /></button>
      </div>

    </div>
  )
}

export default ContestDiv
