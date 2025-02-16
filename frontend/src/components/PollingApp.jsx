import { useState, useEffect } from "react";
import axios from "axios";

export default function PollingApp() {
  const [poll, setPoll] = useState(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [votes, setVotes] = useState({});
  const [creatingPoll, setCreatingPoll] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      if (creatingPoll) return; // Stop fetching when creating a new poll
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/poll`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setPoll(data);
      setVotes(data.votes);
    };
    fetchPoll();
    const interval = setInterval(fetchPoll, 5000);
    return () => clearInterval(interval);
  }, [creatingPoll]);

  const createPoll = async () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) return;
    setCreatingPoll(true); // Stop auto-fetching
    const newPoll = { question, options };
    const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/poll`, {
      method: "POST",
      body: JSON.stringify(newPoll),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setPoll(data);
    setVotes(data.votes);
    setCreatingPoll(false); // Resume auto-fetching
  };

  const vote = async (option) => {
    await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/vote`, { option });
    setVotes((prev) => ({ ...prev, [option]: prev[option] + 1 }));
  };

  const recreatePoll = () => {
    setCreatingPoll(true); // Prevent auto-fetching while creating a new poll
    setPoll(null);
    setQuestion("");
    setOptions([""]);
    setVotes({});
  };

  console.log("This is poll", poll);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      {!poll ? (
        <div>
          <h2 className="text-xl font-bold">Create a Poll</h2>
          <input
            type="text"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          {options?.map((opt, index) => (
            <input
              key={index}
              type="text"
              placeholder="Enter an option"
              value={opt}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              className="w-full p-2 border rounded mt-2"
            />
          ))}
          <button
            onClick={() => setOptions([...options, ""])}
            className="mt-2 px-3 py-1 bg-gray-300 rounded"
          >
            Add Option
          </button>
          <button
            onClick={createPoll}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            Create Poll
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">{poll?.question}</h2>
          {poll?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => vote(option)}
              className="block w-full p-2 bg-gray-200 mt-2 rounded"
            >
              {option} ({votes[option]})
            </button>
          ))}
          <button
            onClick={recreatePoll}
            className="mt-4 px-3 py-1 bg-red-500 text-white rounded"
          >
            Recreate Poll
          </button>
        </div>
      )}
    </div>
  );
}
