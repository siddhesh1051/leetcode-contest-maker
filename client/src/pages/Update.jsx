import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [contest, setContest] = useState({
    title: "",
    desc: "",
    duration: 0,
    
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const contestId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setContest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/contests/${contestId}`, contest);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Contest</h1>
      <input
              className="flex justify-start items-start p-4 w-[100%] rounded-lg border-2 border-gray-300"

        type="text"
        placeholder="Contest Title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        className="flex justify-start items-start p-4 w-[100%] rounded-lg border-2 border-gray-400"
        type="text"
        placeholder="Contest Description"
        name="desc"
        
        onChange={handleChange}
      />
      <input
              className="flex justify-start items-start p-4 w-[100%] rounded-lg border-2 border-gray-300"

        type="number"
        placeholder="Contest Duration in Minutes"
        name="duration"
        onChange={handleChange}
      />
      <button  className="rounded-lg"  onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Contests</Link>
    </div>
  );
};

export default Update;