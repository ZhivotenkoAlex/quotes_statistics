import { useRef, useState } from "react";
import "./ping.css";

export default function App() {
  const inputEl = useRef(null);
  const [ping, setPing] = useState(null);
  const [message, setMessage] = useState(`Enter a server URL`);

  //   const message = "Server is no available";

  const onButtonClick = async () => {
    const regExp = new RegExp("[http(s?)-ww(s?)](://)([a-zA-z0-9-_]+)");
    const url = inputEl.current.value;
    const start = performance.now();
    try {
      if (regExp.test(url)) {
        await fetch(url, {
          mode: "no-cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        setPing((performance.now() - start).toFixed(2));
      } else {
        setPing(null);
        setMessage(`Please, enter a valid server URL`);
      }
    } catch (error) {
      setPing(null);
      setMessage("Server is unavailable");
    } finally {
      console.log(inputEl);
    }
  };

  return (
    <div className="ping">
      <h1>Ping to server</h1>
      <input
        className="ping__input"
        ref={inputEl}
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
