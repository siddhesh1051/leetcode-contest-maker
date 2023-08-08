import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [contest, setContest] = useState({
    title: "",
    desc: "",
    duration: 120,
    questions: [{ LC_number: "", name: "", link: "" }],
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name.startsWith("question")) {
      const questionIndex = Number(e.target.name.split("-")[1]);
      const updatedQuestions = [...contest.questions];
      updatedQuestions[questionIndex][e.target.dataset.field] = e.target.value;
      setContest((prev) => ({ ...prev, questions: updatedQuestions }));
    } else {
      setContest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/contests", contest);
      const contestId = res.data.insertId;
      
      // Send API requests to add questions to the contest
      for (const question of contest.questions) {
        await axios.post(`http://localhost:8800/contests/${contestId}/questions`, question);
      }
      
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleAddQuestion = () => {
    if (contest.questions.length < 4) {
      setContest((prev) => ({
        ...prev,
        questions: [...prev.questions, { LC_number: "", name: "", link: "" }],
      }));
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
        type="number"
        placeholder="Contest Duration in Minutes"
        name="duration"
        onChange={handleChange}
      />
      {contest.questions.map((question, index) => (
        <div key={index} className="flex space-x-2">
          <input
            className="flex-1 p-2 rounded-lg border-2 border-gray-300"
            type="text"
            placeholder={`Question ${index + 1} LC Number`}
            name={`question-${index}-LC_number`}
            data-field="LC_number"
            onChange={handleChange}
            required={index === 0}
          />
          <input
            className="flex-1 p-2 rounded-lg border-2 border-gray-300"
            type="text"
            placeholder={`Question ${index + 1} Name`}
            name={`question-${index}-name`}
            data-field="name"
            onChange={handleChange}
            required={index === 0}
          />
          <input
            className="flex-1 p-2 rounded-lg border-2 border-gray-300"
            type="text"
            placeholder={`Question ${index + 1} Link`}
            name={`question-${index}-link`}
            data-field="link"
            onChange={handleChange}
            required={index === 0}
          />
        </div>
      ))}
      {contest.questions.length < 4 && (
        <button
          type="button"
          className="rounded-lg bg-blue-600 mt-2"
          onClick={handleAddQuestion}
        >
          Add Question
        </button>
      )}
      <button type="submit" className="rounded-lg bg-green-600 mt-2">
        Add
      </button>
      {error && "Something went wrong!"}
      <Link to="/">See all Contests</Link>
    </form>
  );
};

export default Add;
