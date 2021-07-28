import React, { useState } from "react";
import "./quotes.css";
import getStatistisc from "../utils/stats";

export default function Quotes() {
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState({});

  let startTime = 0;
  const start = () => {
    const socket = new WebSocket(
      "wss://trade.trademux.net:8800/?password=1234"
    );
    socket.onopen = () => {
      startTime = performance.now();
    };
    socket.onerror = function (error) {
      console.log(`${error.message}`);
      socket.onclose();
    };
    socket.onmessage = (event) => {
      let response = JSON.parse(event.data);
      setData((prev) => [...prev, response.value]);
    };
  };

  // useEffect(() => {
  //   return (socket.onclose = function (event) {
  //     if (event.wasClean) {
  //       alert(
  //         `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
  //       );
  //     } else {
  //       alert("[close] Соединение прервано");
  //     }
  //   });
  // }, []);

  const StatsClick = () => {
    if (data.length) {
      setStatistics(getStatistisc(data, startTime));
    }
  };

  return (
    <div className="quotes">
      <h1 className="quotes__title">Stock quotes statistics</h1>
      <div className="quotes__buttons">
        <button className="button" onClick={start}>
          Start
        </button>
        <button className="button" disabled={!data.length} onClick={StatsClick}>
          Statistics
        </button>
      </div>

      <div className="stats">
        <div className="stats__row">
          <p className="stats__item">Average value:</p>
          <p className="stats__item">
            {statistics.averageValue ? statistics.averageValue : 0}
          </p>
        </div>
        <div className="stats__row">
          <p className="stats__item"> Standard deviation:</p>
          <p className="stats__item">
            {statistics.standartDeviation ? statistics.standartDeviation : 0}
          </p>
        </div>
        <div className="stats__row">
          <p className="stats__item"> Mode:</p>
          <p className="stats__item">{statistics.mode ? statistics.mode : 0}</p>
        </div>
        <div className="stats__row">
          <p className="stats__item"> Median:</p>
          <p className="stats__item">
            {statistics.median ? statistics.median : 0}
          </p>
        </div>
        <div className="stats__row">
          <p className="stats__item"> Number of lost quotes:</p>
          <p className="stats__item">
            {statistics.lostQuotes ? statistics.lostQuotes : 0}
          </p>
        </div>
        <div className="stats__row">
          <p className="stats__item"> Settlement time:</p>
          <p className="stats__item">
            {statistics.settlementTime ? statistics.settlementTime : 0}
          </p>
        </div>
      </div>
    </div>
  );
}
