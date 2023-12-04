//version avec les points 

import React, { useState, useEffect } from 'react';
import he from 'he';
import './BooleanQuestions.css';

function BooleanQuestion2() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [correctStreak, setCorrectStreak] = useState(0);
    const token = sessionStorage.getItem("jwt");

    useEffect(() => {
        fetch('http://localhost:8080/questions/boolean', {
            headers: { 'Authorization': token },
        })
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const currentQuestion = questions[currentQuestionIndex] || {};

    function handleOptionChange(e) {
        setSelectedAnswer(e.target.value);
    }

    function handleSubmit() {
        if (!selectedAnswer) {
            alert('Select an answer');
            return;
        }

        const isCorrect = currentQuestion.correct_answer.toLowerCase() === selectedAnswer.toLowerCase();
        setFeedback(isCorrect ? 'Correct!' : 'Incorrect');
        setIsAnswered(true);

        // Mise à jour du score et de la série de bonnes réponses
        if (isCorrect) {
            const multiplier = correctStreak + 1; // Le multiplicateur augmente à chaque bonne réponse
            setScore(score + 10 * multiplier);
            setCorrectStreak(correctStreak + 1);
        } else {
            setScore(score - 10); // Perte de points sur une mauvaise réponse
            setCorrectStreak(0); // Réinitialisation de la série de bonnes réponses
        }
    }

    function handleNextQuestion() {
        setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % questions.length);
        setSelectedAnswer('');
        setFeedback('');
        setIsAnswered(false);
    }

    if (questions.length === 0) return <div>You must be login!</div>;

    return (
        <div className="boolean-question">
            <h2>{he.decode(currentQuestion.question)}</h2>
            
            <form>
                <div>
                    <input type="radio" id="true" name="answer" value="True" onChange={handleOptionChange} checked={selectedAnswer === 'True'} disabled={isAnswered} />
                    <label htmlFor="true">True</label>
                </div>
                <div>
                    <input type="radio" id="false" name="answer" value="False" onChange={handleOptionChange} checked={selectedAnswer === 'False'} disabled={isAnswered} />
                    <label htmlFor="false">False</label>
                </div>
                <button type="button" onClick={handleSubmit} disabled={isAnswered}>Submit</button>
            </form>
            {feedback && <p>{feedback}</p>}
            <button onClick={handleNextQuestion}>Next question</button>
            <br></br>
            <div>Score: {score}</div>
        </div>
    );
}

export default BooleanQuestion2;
