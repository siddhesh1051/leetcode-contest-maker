import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [contest, setContest] = useState({
    title: "",
    desc: "",
    duartion: 120
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setContest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/contests", contest);
      navigate("/v1");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Contest</h1>
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
     
      <button className="rounded-lg" onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Contests</Link>
    </div>
  );
};

export default Add;
