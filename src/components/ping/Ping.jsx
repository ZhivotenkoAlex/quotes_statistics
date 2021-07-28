import { useRef, useState } from "react";
import "./ping.css";

export default function App() {
  const inputElement = useRef(null);
  const [ping, setPing] = useState(null);
  const [message, setMessage] = useState(`Enter a server URL`);

  const onButtonClick = async () => {
    const regExp = new RegExp("[http(s?)-ww(s?)](://)([a-zA-z0-9-_]+)");

    const url = inputElement.current.value;

    //variable that returns time in ms. it`s need for calculating ping
    const start = performance.now();

    try {
      if (regExp.test(url)) {
        await fetch(url, {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });

        // calculating ping like the difference beetwen time before the fetch request and the time after it`s response.
        setPing((performance.now() - start).toFixed(2));
      } else {
        setPing(null);
        setMessage(`Please, enter a valid server URL`);
      }
    } catch (error) {
      setPing(null);
      setMessage("Server is unavailable");
    }
  };

  return (
    <div className="ping">
      <h1>Ping to server</h1>
      <input
        className="ping__input"
        ref={inputElement}
        type="text"
        placeholder="https://example.com"
      />
      <button className="ping__button" onClick={onButtonClick}>
        Проверить
      </button>
      <p className="ping__result">{ping ? `Ping : ${ping}ms` : message}</p>
    </div>
  );
}
