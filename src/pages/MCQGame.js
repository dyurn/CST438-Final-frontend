import React, { useState, useEffect } from 'react';
import './MCQGame.css';

function MCQGame() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState(null);

    // Récupérer une question aléatoire
    useEffect(() => {
        fetchRandomQuestion();
    }, []);

    function fetchRandomQuestion() {
        fetch('http://localhost:8080/questions/mcq/random') // Remplacez par votre URL backend
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setCurrentQuestion(data);
                setSelectedAnswer('');
                setFeedback('');
            })
            .catch(error => {
                console.error('Error fetching question:', error);
                setError('Error fetching question');
            });
    }

    function handleSubmit() {
        if (!selectedAnswer) {
            alert('Veuillez sélectionner une réponse.');
            return;
        }
    
        console.log('Submitting answer:', selectedAnswer); // Pour le débogage
    
        // Envoyer la réponse pour vérification
        fetch('http://localhost:8080/results/check/mcq', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                questionId: currentQuestion.question_id,
                selectedAnswer: selectedAnswer
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            console.log('Received data:', data); // Pour le débogage
            setFeedback(data);
        })
        .catch(error => {
            console.error('Error submitting answer:', error);
            setError('Error submitting answer');
        });
    }

    function handleOptionChange(e) {
        setSelectedAnswer(e.target.value);
    }

    if (error) return <div>{error}</div>;
    if (!currentQuestion) return <div>Loading question...</div>;

    return (
        <div className="mcq-game" key={currentQuestion ? currentQuestion.question_id : 'loading'}>
            <h2>{currentQuestion.question_text}</h2>
            <form>
                <div>
                    <input type="radio" id="optionA" name="answer" value="A" onChange={handleOptionChange} checked={selectedAnswer === 'A'} />
                    <label htmlFor="optionA">{currentQuestion.option_a}</label>
                </div>
                <div>
                    <input type="radio" id="optionB" name="answer" value="B" onChange={handleOptionChange} checked={selectedAnswer === 'B'} />
                    <label htmlFor="optionB">{currentQuestion.option_b}</label>
                </div>
                <div>
                    <input type="radio" id="optionC" name="answer" value="C" onChange={handleOptionChange} checked={selectedAnswer === 'C'} />
                    <label htmlFor="optionC">{currentQuestion.option_c}</label>
                </div>
                <div>
                    <input type="radio" id="optionD" name="answer" value="D" onChange={handleOptionChange} checked={selectedAnswer === 'D'} />
                    <label htmlFor="optionD">{currentQuestion.option_d}</label>
                </div>
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
            {feedback && <p>{feedback}</p>}
            <button onClick={fetchRandomQuestion}>Next question</button>
        </div>
    );
}

export default MCQGame;
