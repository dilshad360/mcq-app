import React from "react";

const Navigation = ({ questions, currentQuestionIndex, handleNavigate, getButtonClass , onClose }) => {
    return (
        <div className="w-[20%] flex flex-col  ">
            <div>
                <div className="flex justify-end" >
                <img onClick={onClose} src="/assets/svg/layout.svg" className="mb-4" width={24} height={24} ></img>
                </div>
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
            <div className="space-y-2 md:mt-56">
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
