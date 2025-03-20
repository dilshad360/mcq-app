import React from "react";

const Navigation = ({ questions, currentQuestionIndex, handleNavigate, getButtonClass }) => {
    return (
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
            <div className="space-y-2">
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
                    Yet to Attend
                </span>
            </div>
        </div>
    );
};

export default Navigation;
