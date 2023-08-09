import { useEffect, useState } from 'react';
import DataGridDemo from './DataGrid';



function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        // mode: "no-cors", 
        // cache: "no-cache", 
        // credentials: "same-origin", 
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // redirect: "follow", 
        // referrerPolicy: "no-referrer", 
        body: JSON.stringify(data), 
      });
      return response.json();
    }

    async function getData(url = "") {
      const response = await fetch(url, {
        method: "GET",
        // mode: "no-cors", 
        // cache: "no-cache", 
        // credentials: "same-origin", 
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // redirect: "follow", 
        // referrerPolicy: "no-referrer", 
      });
      return response.json();
    }

    postData("https://medical-result-5df91-default-rtdb.firebaseio.com/visits.json", { timestamp: new Date(), appCodeName : navigator.appCodeName, appName : navigator.appName, userAgent : navigator.userAgent }).then((data) => {
      console.log(data); 
    });

    getData("https://medical-result-5df91-default-rtdb.firebaseio.com/visits.json").then((data) => {
      // console.log(data); 
      setCount(Object.keys(data).length);
    });


  }, [])
  return (
    <div className="App">
      <h1 style={{textAlign : 'center'}}>NEET-PG Counselling Seats Allotment -2023 Round 1 | Result Filter Application</h1>
        <DataGridDemo />
      <h6 style={{textAlign : 'center'}}>Managed by Sandeep and Manish, The Application is meant for fair use only. For Feedback/comments mail us at redsoiltechnologies7@gmail.com </h6>
      <h6 style={{textAlign : 'center'}}>Visit Counter: {count}</h6>
    </div>
  );
}

export default App;
