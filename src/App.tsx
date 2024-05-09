import React, {useState} from "react";

const App: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const handleSubmit = () => {
    if (url) {
      setHistory([url, ...history]);
      setUrl("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <h1 className="text-4xl font-bold mb-6">網頁瀏覽器</h1>
      <div className="flex mb-8">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border-2 border-gray-700 bg-gray-800 p-2 mr-2 rounded text-gray-300"
          placeholder="輸入網址"
        />
        <button
          onClick={handleSubmit}
          className="btn bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          前往
        </button>
      </div>
      <div className="history w-full bg-gray-800 border border-gray-700 shadow-lg max-h-40 overflow-auto p-2 rounded">
        {history.map((item, index) => (
          <div
            key={index}
            className="history-item p-1 border-b border-gray-600"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
