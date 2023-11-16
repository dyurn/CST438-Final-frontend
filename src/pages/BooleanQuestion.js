import React, { useState, useEffect } from 'react';

function BooleanQuestion() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetchRandomBooleanQuestion();
    }, []);

    function fetchRandomBooleanQuestion() {
        fetch('http://localhost:8080/questions/boolean/random') // Remplacez par votre URL backend
            .then(response => response.json())
            .then(data => {
                setCurrentQuestion(data);
                setSelectedAnswer('');
                setFeedback('');
            })
            .catch(error => console.error('Error fetching boolean question:', error));
    }

    function handleSubmit() {
        if (!selectedAnswer) {
            alert('Veuillez sélectionner une réponse.');
            return;
        }

        // Envoyer la réponse pour vérification
        fetch('http://localhost:8080/results/check/boolean', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                question: currentQuestion.question,
                selectedAnswer: selectedAnswer
            })
        })
        .then(response => response.text())
        .then(data => setFeedback(data))
        .catch(error => console.error('Error submitting boolean answer:', error));
    }

    function handleOptionChange(e) {
        setSelectedAnswer(e.target.value);
    }

    if (!currentQuestion) return <div>Loading boolean question...</div>;

    return (
        <div className="boolean-game">
            <h2>{currentQuestion.question}</h2>
            <form>
                <div>
                    <input type="radio" id="true" name="answer" value="True" onChange={handleOptionChange} checked={selectedAnswer === 'True'} />
                    <label htmlFor="true">True</label>
                </div>
                <div>
                    <input type="radio" id="false" name="answer" value="False" onChange={handleOptionChange} checked={selectedAnswer === 'False'} />
                    <label htmlFor="false">False</label>
                </div>
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
            {feedback && <p>{feedback}</p>}
            <button onClick={fetchRandomBooleanQuestion}>Next question</button>
        </div>
    );
}

export default BooleanQuestion;
