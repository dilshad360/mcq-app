import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getQuestions, getResults, submitTest } from "../../services/api";
import { useNavigate } from "react-router-dom";

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
                    navigate("/result");
                }
            } catch (error) {
                console.error("❌ Error fetching questions:", error.message);
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await getQuestions();
                setQuestions(response.data);
            } catch (error) {
                console.error("❌ Error fetching questions:", error.message);
            }
        };

        fetchResults();
        fetchQuestions();
    }, [navigate, user]);


    const handleOptionChange = (questionId, selectedOption) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };

    const handleSubmit = async () => {
        if (questions.every((question) => selectedAnswers[question._id])) {
            const data = {
                userId: user.user.id,
                selectedAnswers,
            };

            try {
                await submitTest(data);
                navigate("/result");
            } catch (error) {
                console.error("❌ Error submitting test:", error.message);
            }
        } else {
            alert("Please answer all questions before submitting.");
        }
    };

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

    const getButtonClass = (index) => {
        const questionId = questions[index]._id;

        if (selectedAnswers[questionId]) {
            return "bg-[#2bb673]";
        } else if (index < currentQuestionIndex) {
            return "bg-[#a79e9e]";
        } else {
            return "bg-white text-black";
        }
    };

    return (
        <div className="px-6 pb-6 pt-24">
            <h1 className="text-3xl text-center text-primary font-bold mb-4">
                Asses Your Intelligence{" "}
            </h1>

            <div className="flex">
                <div className="w-[20%] flex flex-col justify-between min-h-[calc(100vh-200px)]">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Navigate</h2>
                        <ul className="grid grid-cols-4 gap-2">
                            {questions.map((question, index) => (
                                <li key={question._id} className="mb-2">
                                    <button
                                        onClick={() => handleNavigate(index)}
                                        className={`btn btn-md text-lg font-normal py-6 w-full ${getButtonClass(
                                            index
                                        )} ${index === currentQuestionIndex
                                            ? "border-2 border-primary"
                                            : "border-primary border"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2" >
                        <span className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 bg-[#2bb673] rounded-full" />
                            Attended
                        </span>
                        <span className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 bg-[#a79e9e] rounded-full" />
                            Not Attended
                        </span>
                        <span className="flex items-center gap-2 text-xs">
                            <div className="w-3 h-3 border rounded-full" />
                            Yet to Attended
                        </span>
                    </div>
                </div>

                <div className="w-[80%] px-16 py-4">
                    {questions.length > 0 && (
                        <div className="bg-[#f4f4f4] rounded-lg p-5" >

                            <div className="flex gap-4 items-center pb-8" >
                                <div className="text-xl font-semibold w-[50px] h-[50px] bg-primary flex items-center justify-center text-white rounded-full">
                                    {currentQuestionIndex + 1}
                                </div>
                                <h3 className="text-xl font-semibold ">
                                    {questions[currentQuestionIndex].question}
                                </h3>
                            </div>

                            <div className="form-control flex flex-col gap-8 bg-white  py-10 px-10 rounded-lg">
                                {questions[currentQuestionIndex].options.map(
                                    (option, index) => (
                                        <label key={index} className="label cursor-pointer">
                                            <input
                                                type="radio"
                                                name={`question-${questions[currentQuestionIndex]._id}`}
                                                className="radio radio-primary radio-sm"
                                                value={option}
                                                checked={
                                                    selectedAnswers[
                                                    questions[currentQuestionIndex]._id
                                                    ] === option
                                                }
                                                onChange={() =>
                                                    handleOptionChange(
                                                        questions[currentQuestionIndex]._id,
                                                        option
                                                    )
                                                }
                                            />
                                            <span className="label-text ml-2">{option}</span>
                                        </label>
                                    )
                                )}
                            </div>

                            {/* ✅ Navigation Buttons */}
                            <div className="mt-6 flex justify-end">
                                {currentQuestionIndex > 0 && (
                                    <button
                                        onClick={handlePrevious}
                                        className="btn btn-primary mr-2"
                                    >
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
