import React, { useState, useEffect } from 'react';
import './AdminPage.css';

function AdminPage() {
    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const token = sessionStorage.getItem("jwt");
    
    useEffect(() => {
        fetchQuestions();
    }, []);

    function fetchQuestions() {
        fetch('http://localhost:8080/questions/mcq', {
        headers: {
            'Authorization': token
        }
    })
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('User must be log to add questions', error));
    }

    function handleAddOrUpdateQuestion(questionData) {
        const url = editingQuestion ? `http://localhost:8080/questions/${editingQuestion.question_id}` : 'http://localhost:8080/questions';
        const method = editingQuestion ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {'Content-Type': 'application/json', 'Authorization': token,},
            body: JSON.stringify(questionData)
        })
        .then(() => {
            fetchQuestions();
            setEditingQuestion(null);
        })
        .catch(error => console.error('Error:', error));
    }

    function handleEditQuestion(question) {
        setEditingQuestion(question);
    }

    function handleDeleteQuestion(questionId) {
        fetch(`http://localhost:8080/questions/${questionId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        })
        .then(() => fetchQuestions())
        .catch(error => console.error('Error:', error));
    }

    function renderQuestionForm() {
        const initialFormState = editingQuestion || { question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_answer: '' };

        return (
            <form onSubmit={e => {
                e.preventDefault();
                handleAddOrUpdateQuestion({
                    question_text: e.target.question_text.value,
                    option_a: e.target.option_a.value,
                    option_b: e.target.option_b.value,
                    option_c: e.target.option_c.value,
                    option_d: e.target.option_d.value,
                    correct_answer: e.target.correct_answer.value
                });
            }}>
                <input name="question_text" defaultValue={initialFormState.question_text} placeholder="Question Text" />
                <input name="option_a" defaultValue={initialFormState.option_a} placeholder="Option A" />
                <input name="option_b" defaultValue={initialFormState.option_b} placeholder="Option B" />
                <input name="option_c" defaultValue={initialFormState.option_c} placeholder="Option C" />
                <input name="option_d" defaultValue={initialFormState.option_d} placeholder="Option D" />
                <select name="correct_answer" defaultValue={initialFormState.correct_answer}>
                <option value="{initialFormState.correct_answer}">{initialFormState.correct_answer}</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
                <button type="submit">{editingQuestion ? 'Update' : 'Add'} Question</button>
                <br></br><br></br>
            </form>
        );
    }

    return (
        <div className="admin-page">
            <h2>Create your own game with the questions of your choice</h2>
            <br></br>
            {renderQuestionForm()}
            <div className="questions-list">
                {questions.map(question => (
                    <div key={question.question_id}>
                        <p>{question.question_text}</p>
                        <button onClick={() => handleEditQuestion(question)}>Edit</button>
                        <button onClick={() => handleDeleteQuestion(question.question_id)}>Delete</button>
                        <br></br><br></br>
                        <hr></hr>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
}

//export default AdminPage;
export {AdminPage} ;
