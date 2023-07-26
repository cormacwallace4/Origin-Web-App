import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trivia.css';


function Trivia() {
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [questionsRemaining, setQuestionsRemaining] = useState(20);
  
    useEffect(() => {
        if (questionsRemaining > 0) {
            fetchQuestion();
        }
    }, [questionsRemaining]);
  
    const fetchQuestion = async () => {
        const res = await axios.get('http://localhost:8080/randomQuestion');
        setQuestion(res.data);
        const ans = await axios.get(`http://localhost:8080/answers/${res.data.id}`);
        setAnswers(ans.data);
    }

    const validateAnswer = async (answerId) => {
        const res = await axios.post('http://localhost:8080/validateAnswer', { id: answerId });
        if (res.data) {
            setScore(score + 1);
        }
        setQuestionsRemaining(questionsRemaining - 1);
    }
  
    const restartQuiz = () => {
        setQuestion({});
        setAnswers([]);
        setScore(0);
        setQuestionsRemaining(20);
    }
  
    return (
        <div className="trivia-page">
            <div className="trivia-container">
                <div className="trivia-titles">
                    <div className="trivia-title">History Trivia Game</div>
                    <div className="trivia-subtitle">Test your Irish history knowledge!</div>
                </div>
                
                {questionsRemaining > 0 ? (
                    <>
                        <div className="question-text">{question.question}</div>
                        {answers.map(answer => (
                            <button key={answer.id} onClick={() => validateAnswer(answer.id)}>{answer.answer}</button>
                        ))}
                        <div className="counter-container">
                            <p className="score-counter">Score: {score}</p>
                            <p className="questions-counter">Questions Remaining: {questionsRemaining}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="question-text">Quiz Over! Your Final Score is {score}!</div>
                        <button onClick={restartQuiz} className="restart-button">Restart Quiz</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Trivia;




