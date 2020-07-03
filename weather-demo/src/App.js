import React, { useEffect, useCallback, useState } from "react";
import "./App.css";

const API_KEY = "a62675dca961443baa64357649e4fe63";
// CITY_ID 1819730 is for Hong Kong Special Administrative Region
const CITY_ID = "1819730"; //This is for HK

const FONT_SIZE = 80;

const MONTH_LIST = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const WEEKDAYS = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

function App() {
  const [data, setData] = useState(null);

  const fetchData = useCallback(() => {
    console.log("Fetching weather ...");
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch()
      .finally(() => {});
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // useEffect(() => {
  //   const _interval = setInterval(() => {
  //     fetchData();
  //   }, 10000);

  //   return () => clearInterval(_interval);
  // }, [fetchData]);

  const year = new Date().getFullYear();
  const month = MONTH_LIST[new Date().getMonth()];
  const date = ("0" + (new Date().getDate() + 1)).slice(-2);
  const day = WEEKDAYS[new Date().getDay()];

  const { main, weather = [] } = data || {};

  const { temp } = main || {};
  const { icon } = weather[0] || {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "black",
        height: 230,
        width: 1630,
        justifyContent: "flex-start",
        alignItems: "center",
        // clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)",
      }}
      className="App"
    >
      <div
        style={{
          marginLeft: "10vh",
          fontFamily: "Source Sans Pro",
          fontWeight: "bold",
          fontSize: FONT_SIZE,
          color: "white",
        }}
      >
        {date} {month} {year}
      </div>
      <div
        style={{
          fontFamily: "Source Sans Pro",
          fontSize: FONT_SIZE,
          color: "white",
          marginLeft: 40,
        }}
      >
        {day}
      </div>
      {!data ? (
        <div
          style={{
            fontFamily: "Source Sans Pro",
            fontSize: FONT_SIZE,
            color: "white",
            marginLeft: 10,
          }}
        >
          Loading...
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            style={{ width: FONT_SIZE * 1.5, height: FONT_SIZE * 1.5, marginLeft: 40 }}
            id="wicon"
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt="Weather icon"
          />
          <div
            style={{
              fontFamily: "Source Sans Pro",
              fontSize: FONT_SIZE,
              color: "white",
              marginLeft: 40,
            }}
          >
            {(temp - 273.15).toFixed(0)} &deg;C
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
