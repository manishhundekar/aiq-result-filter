import { useEffect } from 'react';
import DataGridDemo from './DataGrid';



function App() {

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

    postData("https://medical-result-5df91-default-rtdb.firebaseio.com/visits.json", { timestamp: new Date() }).then((data) => {
      console.log(data); 
    });
  }, [])
  return (
    <div className="App">
      <h1>NEET-PG Counselling Seats Allotment -2023 Round 1 | Result Filter Application</h1>
      <h6>Click on the Column Name, Three Vertical Dots, Filter to filter the table data, Best Viewed on Big Screens</h6>
      <DataGridDemo />
      <h6>The Application is meant for fair use only. For Feedback/comments mail us at redsoiltechnologies7@gmail.com </h6>
    </div>
  );
}

export default App;
