import { useState } from "react";

function App() {
  const [countingList, setCountingList] = useState({});
  const [topic, setTopic] = useState("");

  const handleNewTopic = async (e) => {
    e.preventDefault();
    await setCountingList({
      ...countingList,
      [topic]: 0,
    });

    setTopic("");
  };

  const handleDeleteTopic = async (target) => {
    await setCountingList(
      Object.keys(countingList)
        .filter((key) => key !== target)
        .reduce((result, current) => {
          result[current] = countingList[current];
          return result;
        }, {})
    );
  };

  const handleNewCount = async (key, value) => {
    await setCountingList({
      ...countingList,
      [key]: value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center p-8">
      <h1 className="text-2xl font-semibold">State Counting</h1>
      <form className="my-4" onSubmit={handleNewTopic}>
        <label htmlFor="new-topic">New Topic :</label>
        <input
          type="text"
          placeholder="New Topic"
          onInput={(e) => setTopic(e.target.value)}
          value={topic}
          id="new-topic"
          className="px-4 py-1 border border-gray-400 rounded-l-full ml-4 outline-none w-32"
        />
        <button className="rounded-r-full bg-blue-700 px-4 py-1 text-white border border-blue-700 hover:bg-opacity-80">
          Search
        </button>
      </form>

      <div className="w-72">
        {Object.entries(countingList).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-row justify-between items-center my-2"
          >
            <div>
              {key} : {value}
            </div>
            <div>
              <button
                onClick={() => handleNewCount(key, value + 1)}
                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-opacity-80"
              >
                +
              </button>
              <button
                onClick={() => handleNewCount(key, value - 1)}
                className="bg-red-500 text-white py-1 px-2 rounded ml-2 hover:bg-opacity-80"
              >
                -
              </button>
              <button
                onClick={() => handleDeleteTopic(key)}
                className="bg-red-500 text-white py-1 px-2 rounded ml-2 hover:bg-opacity-80"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
