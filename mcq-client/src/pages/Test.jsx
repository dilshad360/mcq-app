import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { getQuestions, getResults, submitTest } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Test = () => {
    const { logout, user } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await getResults(user.user.id);
                if (response.data.length > 0) {
                    navigate('/result');
                }
            } catch (error) {
                console.error('❌ Error fetching questions:', error.message);
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await getQuestions();
                setQuestions(response.data);
            } catch (error) {
                console.error('❌ Error fetching questions:', error.message);
            }
        };

        fetchResults();
        fetchQuestions();
    }, [navigate, user]);

    // ✅ Handle Option Selection
    const handleOptionChange = (questionId, selectedOption) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };

    // ✅ Submit Test
    const handleSubmit = async () => {
        if (questions.every((question) => selectedAnswers[question._id])) {
            const data = {
                userId: user.user.id,
                selectedAnswers,
            };

            try {
                await submitTest(data);
                navigate('/result');
            } catch (error) {
                console.error('❌ Error submitting test:', error.message);
            }
        } else {
            alert('Please answer all questions before submitting.');
        }
    };

    // ✅ Navigation Handlers
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNavigate = (index) => {
        setCurrentQuestionIndex(index);
    };

    // ✅ Determine Navigation Button Color
    const getButtonClass = (index) => {
        const questionId = questions[index]._id;

        if (selectedAnswers[questionId]) {
            return 'bg-green-500 text-white';  // 🟢 Attended
        } else if (index < currentQuestionIndex) {
            return 'bg-yellow-500 text-white';  // 🟡 Not Attended
        } else {
            return 'bg-gray-300 text-black';  // ⚪ Yet to Attend
        }
    };

    return (
        <div className="p-6">
            <button onClick={logout} className="btn btn-error mb-4">Logout</button>
            <h1 className="text-3xl font-bold mb-4">Multiple-Choice Questions</h1>

            <div className="flex">
                {/* ✅ Navigation Sidebar */}
                <div className="w-1/4">
                    <h2 className="text-lg font-semibold mb-2">Navigate</h2>
                    <ul>
                        {questions.map((question, index) => (
                            <li key={question._id} className="mb-2">
                                <button
                                    onClick={() => handleNavigate(index)}
                                    className={`btn btn-sm w-full ${getButtonClass(index)} ${index === currentQuestionIndex ? 'border-2 border-blue-500' : ''
                                        }`}
                                >
                                    Question {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ✅ Question Content */}
                <div className="w-3/4 p-4">
                    {questions.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">
                                {questions[currentQuestionIndex].question}
                            </h3>

                            <div className="form-control">
                                {questions[currentQuestionIndex].options.map((option, index) => (
                                    <label key={index} className="label cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`question-${questions[currentQuestionIndex]._id}`}
                                            className="radio radio-primary"
                                            value={option}
                                            checked={selectedAnswers[questions[currentQuestionIndex]._id] === option}
                                            onChange={() => handleOptionChange(questions[currentQuestionIndex]._id, option)}
                                        />
                                        <span className="label-text ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>

                            {/* ✅ Navigation Buttons */}
                            <div className="mt-6">
                                {currentQuestionIndex > 0 && (
                                    <button onClick={handlePrevious} className="btn btn-secondary mr-2">
                                        Previous
                                    </button>
                                )}
                                {currentQuestionIndex < questions.length - 1 ? (
                                    <button onClick={handleNext} className="btn btn-primary">
                                        Next
                                    </button>
                                ) : (
                                    <button onClick={handleSubmit} className="btn btn-success">
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Test;
