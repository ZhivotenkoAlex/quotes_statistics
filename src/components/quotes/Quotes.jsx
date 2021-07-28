import React, { useState, useRef } from "react";
import "./quotes.css";
import getStatistisc from "../../utils/stats";
import { useWebWorker } from "../../hooks/useWebWorker";

export default function Quotes() {
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState({});
  const socket = useRef();

  let startTime = 0;

  const start = () => {
    socket.current = new WebSocket(
      "wss://trade.trademux.net:8800/?password=1234"
    );
    socket.current.onopen = () => {
      startTime = performance.now();
    };
    socket.current.onmessage = (event) => {
      let response = JSON.parse(event.data);
      setData((prev) => [...prev, response.value]);
    };
    socket.current.onclose = () => {};
    socket.current.onerror = (error) => {
      console.log(`${error.message}`);
      socket.onclose();
    };
  };

  const startWorker = useWebWorker(start);

  const statisticHandler = () => {
    startWorker.run(data);
    setStatistics(getStatistisc(data, startTime));
  };

  return (
    <div className="quotes">
      <h1 className="quotes__title">Stock quotes statistics</h1>
      <div className="quotes__buttons">
        <button className="button" onClick={start}>
          Start
        </button>
        <button
          className="button"
          disabled={!data.length}
          onClick={statisticHandler}
        >
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
