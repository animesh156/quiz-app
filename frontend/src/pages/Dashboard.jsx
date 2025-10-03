import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizStore from "../store";
import QuickQuiz from "../components/QuickQuiz";

function Dashboard() {
  const navigate = useNavigate();

  const { setCategory, setDifficulty, setTotalQuestions, setType, category, difficulty, totalQuestion, type } =
    useQuizStore();

  const [activeTab, setActiveTab] = useState("custom");

  const userName = localStorage.getItem("userName") || "guest";

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/quiz");
  };

  return (
    <div className="px-3">
      <section className=" mb-2 mt-2">
        <h1 className="text-3xl text-center dark:text-rose-700">
          Welcome{" "}
          <span className="font-extrabold uppercase text-pink-500">
            {userName}
          </span>
        </h1>
      </section>

      {/* Tabs for Custom Quiz & Quick Quiz */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("custom")}
          className={`px-6 py-2 rounded-lg ${
            activeTab === "custom" ? "bg-teal-500 text-white" : "bg-gray-200"
          }`}
        >
          Custom Quiz
        </button>
        <button
          onClick={() => setActiveTab("quick")}
          className={`px-6 py-2 rounded-lg ${
            activeTab === "quick" ? "bg-teal-500 text-white" : "bg-gray-200"
          }`}
        >
          Quick Quiz
        </button>
      </div>

      {/* Render content based on active tab */}
      {activeTab === "custom" ? (
        <div className="h-screen">
          <form
            className="max-w-md bg-cyan-100 mx-auto text-center border-cyan-300 border-2 px-5 py-3 rounded-2xl shadow-md"
            onSubmit={onSubmit}
          >
            {/* Category */}
            <label
              htmlFor="small"
              className="block mb-2 text-md text-gray-900 dark:text-orange-400 font-bold"
            >
              Category
            </label>
            <select
              id="small"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="block w-full p-2 mb-6 text-sm text-gray-900 border
            border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
            focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
            dark:focus:border-blue-500"
            >
              <option value="17">Science</option>
              <option value="23">History</option>
              <option value="21">Sports</option>
              <option value="27">Animal</option>
              <option value="20">Mythology</option>
            </select>

            {/* Difficulty */}
            <label
              htmlFor="small"
              className="block mb-2 text-sm text-gray-900 dark:text-orange-400 font-bold"
            >
              Difficulty
            </label>
            <select
              id="small"
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* Total Questions */}
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-orange-400"
            >
              Total Question
            </label>
            <select
              id="small"
              onChange={(e) => setTotalQuestions(e.target.value)}
              value={totalQuestion}
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>

            {/* Type */}
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-orange-400"
            >
              Type
            </label>
            <select
              id="small"
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True or False</option>
            </select>

            <button
              type="submit"
              className="text-black font-mono bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Start Quiz
            </button>
          </form>
        </div>
      ) : (
        <QuickQuiz />
      )}
    </div>
  );
}

export default Dashboard;
