import React, { useState, useEffect } from 'react';
import he from 'he';
import './BooleanQuestions.css';

function BooleanQuestion2() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [lives, setLives] = useState(3); // Nombre de vies du joueur
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

        if (isCorrect) {
        } else {
            if (lives > 0) {
                setLives(lives - 1);
                if (lives == 0){
                    alert("GAME OVER!")
                }
            }
        }
    }

    function handleNextQuestion() {
        if (lives > 0) {
            setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % questions.length);
            setSelectedAnswer('');
            setFeedback('');
            setIsAnswered(false);
        }
    }

    if (questions.length === 0) return <div>Loading questions...</div>;

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
                <button type="button" onClick={handleSubmit} disabled={isAnswered || lives <= 0}>Submit</button>
            </form>
            {feedback && <p className={feedback === 'Correct!' ? 'correct' : 'incorrect'}>{feedback}</p>}
            <button onClick={handleNextQuestion} disabled={lives <= 0} className={`next-button ${lives <= 0 ? 'disabled' : ''}`}>Next question</button>
            <br></br>
            <br></br>
            <div className="hearts">
                {Array.from({ length: lives }, (_, index) => (<span key={index}>❤️</span>))}
            </div>

        </div>
    );
}

export default BooleanQuestion2;