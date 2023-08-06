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
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <form className="form" onSubmit={handleClick}>
      <h1 className="text-3xl">Add New Contest</h1>
      <input
              className="flex justify-start items-start p-4 w-[100%] rounded-lg border-2 border-gray-300"

        type="text"
        placeholder="Contest Title"
        name="title"
        onChange={handleChange}
        required
      />
      <textarea
        className="flex justify-start items-start p-4 w-[100%] rounded-lg border-2 border-gray-400"
        type="text"
        placeholder="Contest Description"
        name="desc"
        required
        onChange={handleChange}
      />
      <input
              className="flex justify-start items-start p-4 w-[100%] rounded-lg border-2 border-gray-300"
        required
        type="number"
        placeholder="Contest Duration in Minutes"
        name="duration"
        onChange={handleChange}
      />          
     
      <button  type="submit" className="rounded-lg bg-green-600">Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Contests</Link>
    </form>
  );
};

export default Add;
