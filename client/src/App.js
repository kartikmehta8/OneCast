import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/");
      setData(result.data);
    };
    fetchData();
  }, []);

  return <div className="App">{JSON.stringify(data)}</div>;
}

export default App;
