import { useState, useEffect } from "react"
import randomWords from "random-words"

const NUMB_OF_WORDS = 200
const SECONDS = 60

function App() {
  const [words, setWords] = useState([])
  const [countDown, setCountDown] = useState(SECONDS)

  useEffect(() => {
    //Sets our words state to be an array of generated words using the random-words package
    setWords(generateWords())
  }, [])

  function generateWords() {
    // Returns an array of random words
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords())
  }

  function start() {
    setInterval(() => {
      setCountDown((prevCountDown) => prevCountDown - 1)
    } , 1000)
  }

  return (
    <div className='App'>
      <div className="section">
        <div className="is-size-1 has-text-centered has-text-primary">
          <h2>{countDown}</h2>
        </div>
      </div>
      <div className="control is-expanded section">
        <input type="text"className="input"/>
      </div>
      <div className="section">
        <button className="button is-info is-fullwidth" onClick={start}>
          Start
        </button>
      </div>
      <div className='section'>
        <div className='card'>
          <div className='card-content'>
            <div className='content'>
              {words.map((word, i) => {
                return (
                  <>
                    <span>{word} </span>
                    <span></span>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
