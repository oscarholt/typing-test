import { useState, useEffect } from "react";
import randomWords from "random-words";

const NUMB_OF_WORDS = 200;
const SECONDS = 60;

function App() {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currentInput, setCurrentInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    //Sets our words state to be an array of generated words using the random-words package
    setWords(generateWords());
  }, []);

  function generateWords() {
    // Returns an array of random words
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  }

  function start() {
    let interval = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 0) {
          clearInterval(interval);
          return;
        } else {
          return prevCountDown - 1;
        }
      });
    }, 1000);
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
    console.log(doesMatch);
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
    </div>
  );
}

export default App;
