import { useState, useEffect } from "react";
import randomWords from "random-words";

const NUMB_OF_WORDS = 200;
const SECONDS = 60;

function App() {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currentInput, setCurrentInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");

  useEffect(() => {
    //Sets our words state to be an array of generated words using the random-words package
    setWords(generateWords());
  }, []);

  function generateWords() {
    // Returns an array of random words
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  }

  function start() {
    if (status === "finished") {
      setWords(generateWords());
      setCurrentWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
    }
    if (status !== "started") {
      setStatus("started");
      let interval = setInterval(() => {
        setCountDown((prevCountDown) => {
          if (prevCountDown === 0) {
            clearInterval(interval);
            setStatus("finished");
            setCurrentInput("");
            return SECONDS;
          } else {
            return prevCountDown - 1;
          }
        });
      }, 1000);
    }
  }

  function handleKeyDown({ keyCode }) {
    if (keyCode === 32) {
      checkMatch();
      setCurrentInput("");
      setCurrentWordIndex(currentWordIndex + 1);
    }
  }

  function checkMatch() {
    const wordToCompare = words[currentWordIndex];
    const doesMatch = wordToCompare === currentInput.trim();
    if (doesMatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  }

  return (
    <div className="App">
      <div className="section">
        <div className="is-size-1 has-text-centered has-text-primary">
          <h2>{countDown}</h2>
        </div>
      </div>
      <div className="control is-expanded section">
        <input
          disabled={status !== "started"}
          type="text"
          className="input"
          onKeyDown={handleKeyDown}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
        />
      </div>
      <div className="section">
        <button className="button is-info is-fullwidth" onClick={start}>
          Start
        </button>
      </div>
      {status === "started" && (
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="content">
                {words.map((word, i) => {
                  return (
                    <span key={i}>
                      <span>
                        {word.split("").map((char, idx) => (
                          <span key={idx}>{char}</span>
                        ))}
                      </span>
                      <span> </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "finished" && (
        <div className="section">
          <div className="columns">
            <div className="column has-text-centered">
              <p className="is-size-5">Words Per Minute:</p>
              <p className="has-text-primary is-size-1">{correct}</p>
            </div>
            <div className="column has-text-centered">
              <p className="is-size-5">Accuracy:</p>
              <p className="has-text-info is-size-1">
                {Math.round((correct / (correct + incorrect)) * 100) + "%"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
