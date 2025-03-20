import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getQuestions, getResults, submitTest } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import QuestionCard from "../components/QuestionCard";
import Progress from "../components/Progress";
import toast from "react-hot-toast";

const Test = () => {

    const { user } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [showNavigation, setShowNavigation] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await getResults(user.user.id);
                if (response.data.length > 0) {
                    navigate("/result");
                }
            } catch (error) {
                // console.error("❌ Error fetching results", error.message);
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
            toast('Please answer all questions before submitting.', {
                icon: '⚠️',
            });
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
        <div className="px-2 md:px-6 pb-6 pt-24">
            <h1 className="text-xl md:text-3xl text-center text-primary font-bold mb-4">

                Assess Your  <span className="relative inline-block" > Intelligence
                <span className="absolute bottom-2 left-0 w-full h-[8px] bg-[#fac167] z-[-1]"></span>
                </span>
            </h1>
            <div className="flex justify-center ">

                {showNavigation ? (
                    <Navigation
                        onClose={() => setShowNavigation(false)}
                        questions={questions}
                        currentQuestionIndex={currentQuestionIndex}
                        handleNavigate={handleNavigate}
                        getButtonClass={getButtonClass}
                    />

                ) : <div className="flex items-start pt-3" > <img onClick={() => setShowNavigation(true)} src="/assets/svg/layout.svg" className="mb-4" width={24} height={24} ></img></div>}


                <QuestionCard
                    currentQuestion={questions[currentQuestionIndex]}
                    currentQuestionIndex={currentQuestionIndex}
                    questionsLength={questions.length}
                    handleOptionChange={handleOptionChange}
                    selectedAnswers={selectedAnswers}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Test;
