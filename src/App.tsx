import { useState, useEffect } from 'react'
import './App.css'

interface Question {
  question: string
  options: string[]
  correctAnswer: number
  value: string
}

const questions: Question[] = [
  {
    question: "¿Cuál es el símbolo universal de la paz?",
    options: ["Una rosa", "Una paloma", "Un corazón", "Una estrella"],
    correctAnswer: 1,
    value: "$1,000"
  },
  {
    question: "¿Quién fue el líder de la resistencia no violenta en la India?",
    options: ["Nelson Mandela", "Martin Luther King Jr.", "Mahatma Gandhi", "Dalai Lama"],
    correctAnswer: 2,
    value: "$2,000"
  },
  {
    question: "¿Cuál es el Día Internacional de la Paz?",
    options: ["21 de septiembre", "1 de enero", "25 de diciembre", "10 de diciembre"],
    correctAnswer: 0,
    value: "$5,000"
  },
  {
    question: "¿Qué organización internacional fue creada para mantener la paz mundial?",
    options: ["UNESCO", "ONU", "Cruz Roja", "UNICEF"],
    correctAnswer: 1,
    value: "$10,000"
  },
  {
    question: "¿Quién dijo 'La paz no es la ausencia de conflicto, sino la presencia de justicia'?",
    options: ["Martin Luther King Jr.", "Nelson Mandela", "Mahatma Gandhi", "Mother Teresa"],
    correctAnswer: 0,
    value: "$25,000"
  },
  {
    question: "¿Cuál de estos es un principio fundamental de la cultura de paz?",
    options: ["Competencia", "Tolerancia", "Individualismo", "Dominación"],
    correctAnswer: 1,
    value: "$50,000"
  },
  {
    question: "¿En qué año se firmó la Declaración Universal de los Derechos Humanos?",
    options: ["1945", "1948", "1950", "1953"],
    correctAnswer: 1,
    value: "$100,000"
  },
  {
    question: "¿Cuál es el objetivo principal de la mediación en conflictos?",
    options: ["Ganar", "Castigar", "Reconciliar", "Competir"],
    correctAnswer: 2,
    value: "$500,000"
  },
  {
    question: "¿Qué significa 'Ubuntu' en la filosofía africana de paz?",
    options: ["Yo soy porque nosotros somos", "La fuerza hace el derecho", "Cada uno por sí mismo", "El poder sobre otros"],
    correctAnswer: 0,
    value: "$1,000,000"
  }
]

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [gameState, setGameState] = useState<'start' | 'playing' | 'correct' | 'wrong' | 'winner'>('start')
  const [score, setScore] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)

  // Timer effect
  useEffect(() => {
    let timer: number
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('wrong')
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameState])

  const startGame = () => {
    setGameState('playing')
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowAnswer(false)
    setTimeLeft(30)
  }

  const selectAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || showAnswer) return
    setSelectedAnswer(answerIndex)
    setShowAnswer(true)
    
    setTimeout(() => {
      if (answerIndex === questions[currentQuestion].correctAnswer) {
        const newScore = score + (currentQuestion + 1) * 1000
        setScore(newScore)
        if (currentQuestion === questions.length - 1) {
          setGameState('winner')
        } else {
          setGameState('correct')
        }
      } else {
        setGameState('wrong')
      }
    }, 2000)
  }

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1)
    setSelectedAnswer(null)
    setShowAnswer(false)
    setGameState('playing')
    setTimeLeft(30)
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setGameState('start')
    setScore(0)
    setShowAnswer(false)
    setTimeLeft(30)
  }

  const getAnswerClass = (index: number) => {
    if (!showAnswer) return 'answer-option'
    if (index === questions[currentQuestion].correctAnswer) return 'answer-option correct'
    if (index === selectedAnswer && selectedAnswer !== questions[currentQuestion].correctAnswer) return 'answer-option wrong'
    return 'answer-option'
  }

  // Pantalla de inicio
  if (gameState === 'start') {
    return (
      <div className="game-container">
        <div className="start-screen">
          <h1 className="game-title">🕊️ ¿QUIÉN QUIERE SER MILLONARIO? 🕊️</h1>
          <h2 className="game-subtitle">Edición: Cultura de Paz</h2>
          <div className="peace-symbols">
            <div className="symbol">☮️</div>
            <div className="symbol">🌍</div>
            <div className="symbol">🤝</div>
          </div>
          <p className="instructions">
            Responde correctamente las preguntas sobre paz y cultura de no violencia.
            <br />
            Tienes 30 segundos para cada pregunta.
            <br />
            ¡Cada respuesta correcta te acerca más a ser un millonario de la paz!
          </p>
          <button onClick={startGame} className="start-button">
            ▶️ COMENZAR JUEGO
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'winner') {
    return (
      <div className="game-container">
        <div className="result-screen winner">
          <h1 className="result-title">🎉 ¡FELICIDADES! 🎉</h1>
          <h2 className="result-subtitle">¡ERES UN MILLONARIO DE LA PAZ!</h2>
          <div className="final-score">${score.toLocaleString()}</div>
          <p className="winner-message">
            ¡Increíble! Has demostrado ser un verdadero embajador de la paz.
            Tu conocimiento ayuda a construir un mundo mejor.
          </p>
          <button onClick={restartGame} className="restart-button">
            🔄 JUGAR DE NUEVO
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'wrong') {
    return (
      <div className="game-container">
        <div className="result-screen wrong">
          <h1 className="result-title">😔 ¡Respuesta Incorrecta!</h1>
          <div className="final-score">Puntuación Final: ${score.toLocaleString()}</div>
          <p className="wrong-message">
            La respuesta correcta era: <strong>{questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}</strong>
          </p>
          <p className="encouragement">
            ¡No te desanimes! Cada pregunta es una oportunidad para aprender más sobre la paz.
          </p>
          <button onClick={restartGame} className="restart-button">
            🔄 INTENTAR DE NUEVO
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'correct') {
    return (
      <div className="game-container">
        <div className="result-screen correct">
          <h1 className="result-title">✅ ¡Correcto!</h1>
          <div className="points-earned">+{((currentQuestion + 1) * 1000).toLocaleString()} puntos</div>
          <div className="current-score">Puntuación: ${score.toLocaleString()}</div>
          <p className="correct-message">
            ¡Excelente! Tu conocimiento sobre la paz es admirable.
          </p>
          <button onClick={nextQuestion} className="next-button">
            ➡️ SIGUIENTE PREGUNTA
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="progress-info">
          <span className="question-number">Pregunta {currentQuestion + 1}/9</span>
          <span className="timer">⏱️ {timeLeft}s</span>
        </div>
        <div className="current-value">Por: {questions[currentQuestion].value}</div>
        <div className="score">Puntuación: ${score.toLocaleString()}</div>
      </div>
      
      <div className="question-container">
        <h2 className="question">{questions[currentQuestion].question}</h2>
        
        <div className="answers-grid">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={getAnswerClass(index)}
              onClick={() => selectAnswer(index)}
              disabled={showAnswer}
            >
              <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
              <span className="answer-text">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
