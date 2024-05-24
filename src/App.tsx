import React, {useState} from "react";
import Meteors from "./component/Meteor";
import logo from "./assets/logo.png";
interface History{
  id:number;
  title:string;
  URL:string;
  date:string;
}
const App: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  const [history, setHistory] = useState<History[]>([]);

  const handleSubmit = () => {


    const openUrl='https://oreil.ly/'+url
    console.log(openUrl)
    const date=new Date()
    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    //使用 all origins 處理 cors
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(openUrl)}`)
    .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        // 使用 DOMParser 解析 HTML 字符串
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        const titleElement = doc.querySelector('title');
        const title = titleElement ? titleElement.innerText : 'No title';
        console.log('Page title:', title);
        setHistory([...history,{id:history.length+1,title:"123",URL:openUrl,date:formattedDate}])
    })
    .catch(error => {
        console.error('Error:', error);
    });
    //
    

  

    window.open(openUrl, '_blank');
  };

  return (
    <>
      <div className="relative flex  w-full items-center justify-center overflow-hidden bg-gray-900 ">
        <Meteors number={80} />

        <div className="w-full flex flex-col pt-20  items-center min-h-screen z-10 text-gray-100">
          <div className="flex">
            <img src={logo} style={{width: "200px", height: "200px"}} alt="" />
            <h1 className="text-[72px] font-bold flex items-center ">OrOpen</h1>
          </div>
          <div className="flex mt-12">
            <p className="text-xl text-center p-2">https://oreil.ly/</p>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 border-2 border-gray-700 bg-gray-800 p-2 mr-2 rounded text-gray-300"
              placeholder="path"
            />
            <button
              onClick={handleSubmit}
              className="btn bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              前往
            </button>
          </div>
          <div className="container my-12">
            <h3 className="text-3xl">歷史查詢</h3>
            <div className="history w-full bg-gray-800 border border-gray-700 shadow-lg min-h-[23rem] overflow-auto p-2 mt-8 rounded">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="history-item p-1 py-3 border-b border-gray-600"
                >
                  <div className="flex gap-4 content-center">
                    <p className="flex items-center">{item.id}</p>
                    <p className="bg-slate-600 p-1 px-2 flex items-center  rounded-md">{item.title}</p>
                    <a className="underline flex items-center" href={item.URL}>{item.URL}</a>
                    <p className="text-gray-400 flex items-center ">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
