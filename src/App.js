// App.js
import { useEffect, useState } from "react";
import "./App.css";
import Fetch from "./Fetch";
import Filter from "./Filter";

function App() {
  const [input, setInput] = useState("");
  const [apiData, setApiData] = useState([]);
  const [filter, setFilter] = useState("");
  const [postOfficeFilter, setPostOfficeFilter] = useState("");
  let placeholder = "Pincode";
  let header = "Enter Pincode";

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handlePostOfficeFilterChange = (value) => {
    setPostOfficeFilter(value);
  };

  let handleButtonClick = async () => {
    try {
      const data = await Fetch(input);
      header = `Pincode ${input}`;
      setApiData(data);
      setFilter(""); // Reset filter when new data is fetched
      setPostOfficeFilter(""); // Reset post office filter when new data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1 className="header">{header}</h1>

      <input
        onChange={handleInputChange}
        className="input"
        placeholder={placeholder}
        type="number"
      ></input>
      <br></br>
      <button onClick={handleButtonClick} className="btn">
        LookUp
      </button>

      {apiData && apiData.length > 0 && (
        <div className="result">
          <h2>Result:</h2>
          <div>
            <label htmlFor="postOfficeFilter">Filter by Post Office:</label>
            <input
              id="postOfficeFilter"
              type="text"
              onChange={(e) => handlePostOfficeFilterChange(e.target.value)}
              value={postOfficeFilter}
            />
          </div>
          <ul>
            {apiData
              .filter((entry) =>
                entry.PostOffice.some(
                  (postOffice) =>
                    postOffice.Name.toLowerCase().includes(
                      postOfficeFilter.toLowerCase()
                    ) &&
                    postOffice.Name.toLowerCase().includes(filter.toLowerCase())
                )
              )
              .map((entry, index) => (
                <li key={index} className="parent-list">
                  {entry.PostOffice.filter((postOffice) =>
                    postOffice.Name.toLowerCase().includes(
                      postOfficeFilter.toLowerCase()
                    )
                  ).map((postOffice, innerIndex) => (
                    <div className="list" key={innerIndex}>
                      {postOffice.Name}
                      <br></br>
                      {postOffice.BranchType}
                      <br></br>
                      {postOffice.DeliveryStatus}
                      <br></br>
                      {postOffice.District}
                      <br></br>
                      {postOffice.State}
                    </div>
                  ))}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
