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
    <form className="form" onSubmit={handleClick}>
      <h1 className="text-3xl text-black">Update the Contest</h1>
      <input
              className="flex justify-start items-start p-4 w-[100%] rounded-lg border-2 border-gray-300"
        required
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
        required="true"
        onChange={handleChange}
      />
      <input
              className="flex justify-start items-start p-4 w-[100%] rounded-lg border-2 border-gray-300"
        required="true"
        type="number"
        placeholder="Contest Duration in Minutes"
        name="duration"
        onChange={handleChange}
      />
      <button type="submit"  className="rounded-lg bg-black ">Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Contests</Link>
    </form>
  );
};

export default Update;
