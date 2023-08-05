import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
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
    try {
      await axios.delete(`http://localhost:8800/contests/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Leetcode Contest Maker</h1>
      <div className="books">
        {contests.map((contest) => (
          <div key={contest.id} className="book">
            <img src={contest.cover} alt="" />
            <h2>{contest.title}</h2>
            <p>{contest.desc}</p>
            <span>⏱️{Math.round(contest.duration/60)}:{contest.duration%60}</span>
            <button className="delete" onClick={() => handleDelete(contest.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${contest.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new Contest
        </Link>
      </button>
    </div>
  );
};

export default Books;
