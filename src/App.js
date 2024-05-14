import React, { useState, useEffect } from 'react';
import Displayjobs from "./components/displayjobs";

function App() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        "limit": 50,
        "offset": 0
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
      };

      try {
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const result = await response.json();
        setJobs(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{margin: "3% 5% 3% 5%"}}>Weekday Jobs</h1>
      <Displayjobs jobs={jobs} />
    </div>
  );
}

export default App;
 