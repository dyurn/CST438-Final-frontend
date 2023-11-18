import React, { useState, useEffect } from 'react';
import './BooleanQuestions.css';

function BooleanQuestion2() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isAnswered, setIsAnswered] = useState(false); // Nouvel état

    // Charger les questions au lancement du jeu
    useEffect(() => {
        fetch('http://localhost:8080/questions/boolean')
            .then(response => response.json())
            .then(data => {
                setQuestions(data);
                setSelectedAnswer('');
                setFeedback('');
                setIsAnswered(false); // Réinitialisation de l'état
            })
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
        setIsAnswered(true); // Marquer la question comme répondue
    }

    function handleNextQuestion() {
        setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % questions.length);
        setSelectedAnswer('');
        setFeedback('');
        setIsAnswered(false); // Réinitialiser l'état pour la nouvelle question
    }

    if (questions.length === 0) return <div>Loading questions...</div>;

    return (
        <div className="boolean-question">
            <h2>{currentQuestion.question}</h2>
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
        </div>
    );
}

export default BooleanQuestion2;
