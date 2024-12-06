import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { FaExchangeAlt } from "react-icons/fa";

const { Option } = Select;

const Home = () => {
  const [input, setInput] = useState("");
  const [fromCountry, setFromCountry] = useState("USD");
  const [toCountry, setToCountry] = useState("PKR");
  const [countryNames, setCountryNames] = useState({});
  const [rate, setRate] = useState(null);

  //   console.log(toCountry);

  const handleFetch = async () => {
    try {
      const url =
        "https://api.currencyapi.com/v3/latest?apikey=cur_live_XTWga2fLKx63ueHcAIVfBD27TbY7vBXQN0YVTjxT";
      const response = await fetch(url);
      const result = await response.json();
      //   console.log(result.data);
      setCountryNames(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleClick = () => {
    if (fromCountry === toCountry) {
      setRate(1);
    } else {
      const fromRate = countryNames[fromCountry].value;
      const toRate = countryNames[toCountry].value;
      const ratePrice = fromRate / toRate;
      setRate(ratePrice);
    }
  };
  return (
    <>
      <div className="container">
        <h2>Currency Converter</h2>
        <form>
          <label>Enter Amount:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        <div className="text">
          <p>From</p>
          <p>To</p>
        </div>
        <div className="selection-container">
          <div className="cont">
            <Select
              className="select"
              value={fromCountry}
              showSearch
              onChange={(value) => setFromCountry(value)}
            >
              {Object.keys(countryNames).map((c) => (
                <Option value={c} key={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </div>
          <div className="cont">
            <FaExchangeAlt />
          </div>
          <div className="cont">
            <Select
              className="select"
              value={toCountry}
              showSearch
              onChange={(value) => setToCountry(value)}
            >
              {Object.keys(countryNames).map((c) => (
                <Option value={c} key={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {rate && (
          <h3 className="last">
            {input} {fromCountry} = {(input * rate).toFixed(2)} {toCountry}
          </h3>
        )}
        <button onClick={handleClick}>
          <FaExchangeAlt /> Convert Currency
        </button>
      </div>
    </>
  );
};

export default Home;
