import React from "react";
import Progress from "./Progress";

const QuestionCard = ({
    currentQuestion,
    currentQuestionIndex,
    questionsLength,
    handleOptionChange,
    selectedAnswers,
    handlePrevious,
    handleNext,
    handleSubmit,
}) => {
    if (!currentQuestion) return null;

    return (
        <div className="w-[80%] px-16 py-4">
            <Progress currentQuestion={currentQuestionIndex} questionsLength={questionsLength} />
            <div className="bg-[#f4f4f4] rounded-lg p-5">
                <div className="flex gap-4 items-center pb-8">
                    <div className="text-xl font-semibold w-[50px] h-[50px] bg-primary flex items-center justify-center text-white rounded-full">
                        {currentQuestionIndex + 1}
                    </div>
                    <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>
                </div>
                <div className="form-control flex flex-col gap-8 bg-white py-10 px-10 rounded-lg">
                    {currentQuestion.options.map((option, index) => (
                        <label key={index} className="label cursor-pointer">
                            <input
                                type="radio"
                                name={`question-${currentQuestion._id}`}
                                className="radio radio-primary radio-sm"
                                value={option}
                                checked={selectedAnswers[currentQuestion._id] === option}
                                onChange={() => handleOptionChange(currentQuestion._id, option)}
                            />
                            <span className="label-text ml-2">{option}</span>
                        </label>
                    ))}
                </div>

                {/* Controls Inside QuestionCard */}
                <div className="mt-6 flex justify-end">
                    {currentQuestionIndex > 0 && (
                        <button onClick={handlePrevious} className="btn btn-primary mr-2">
                            Previous
                        </button>
                    )}
                    {currentQuestionIndex < questionsLength - 1 ? (
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
        </div>
    );
};

export default QuestionCard;
