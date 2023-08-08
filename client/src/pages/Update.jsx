import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [contest, setContest] = useState({
    title: "",
    desc: "",
    duration: 0,
    questions: [{ LC_number: "", name: "", link: "" }],
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const contestId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/contests/${contestId}`);
        const contestData = res.data;
        const { title, desc, duration, questions } = contestData;
        setContest({
          title,
          desc,
          duration,
          questions: questions.map(question => ({ LC_number: question.LC_number, name: question.name, link: question.link })),
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchContestDetails();
  }, [contestId]);

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
      await axios.put(`http://localhost:8800/contests/${contestId}`, contest);
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
      <h1 className="text-3xl text-white">Update the Contest</h1>
      <input
        className="flex justify-start items-start p-4 w-[100%] rounded-lg border-2 border-gray-300"
        required
        type="text"
        placeholder="Contest Title"
        name="title"
        value={contest.title}
        onChange={handleChange}
      />
      <textarea
        className="flex justify-start items-start p-4 w-[100%] rounded-lg border-2 border-gray-400"
        type="text"
        placeholder="Contest Description"
        name="desc"
        value={contest.desc}
        required
        onChange={handleChange}
      />
      <input
        className="flex justify-start items-start p-4 w-[100%] rounded-lg border-2 border-gray-300"
        required
        type="number"
        placeholder="Contest Duration in Minutes"
        name="duration"
        value={contest.duration}
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
            value={question.LC_number}
            onChange={handleChange}
            required={index === 0}
          />
          <input
            className="flex-1 p-2 rounded-lg border-2 border-gray-300"
            type="text"
            placeholder={`Question ${index + 1} Name`}
            name={`question-${index}-name`}
            data-field="name"
            value={question.name}
            onChange={handleChange}
            required={index === 0}
          />
          <input
            className="flex-1 p-2 rounded-lg border-2 border-gray-300"
            type="text"
            placeholder={`Question ${index + 1} Link`}
            name={`question-${index}-link`}
            data-field="link"
            value={question.link}
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
      <button type="submit" className="rounded-lg bg-black mt-2">
        Update
      </button>
      {error && "Something went wrong!"}
      <Link to="/">See all Contests</Link>
    </form>
  );
};

export default Update;
