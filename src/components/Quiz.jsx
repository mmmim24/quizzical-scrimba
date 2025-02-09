import React, { useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../Data/qs.js";

const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

export default function Quiz() {
    const [shuffledData, setShuffledData] = useState([]);
    const [selected, setSelected] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    React.useEffect(() => {
        const randomizedData = data.map((q) => ({
            ...q,
            answers: shuffleArray(q.answers)
        }));
        setShuffledData(shuffleArray(randomizedData));
    }, []);

    const selectAnswer = (question, answer) => {
        setSelected((prev) => ({
            ...prev,
            [question]: answer
        }));
    };

    const correctAnswers = data.map((q) => q.answers[0]);
    const score = Object.keys(selected).filter(
        (q) => selected[q] === correctAnswers.find(
            (ans) => ans === selected[q])
    ).length;

    return (
        <div className="px-16 py-16 grid grid-cols-1 gap-8">
            {shuffledData.map((item) => (
                <div key={item.q}>
                    <h2 className="text-[#293264] text-lg font-semibold">{item.q}</h2>
                    <div className="flex flex-row gap-4 mt-4">
                        {item.answers.map((answer) => {
                            const isCorrect = isSubmitted && answer === item.answers[0];
                            const isSelected = selected[item.q] === answer;
                            const isWrong = isSubmitted && isSelected && !isCorrect;

                            return (
                                <button
                                    key={answer}
                                    className={`p-2 border-[#293264] rounded-xl border-2 
                                        ${isSelected ? "bg-[#293264] text-white" : "text-[#293264]"} 
                                        ${isCorrect ? "bg-[#94D7A2] text-[#293264] border-0" : ""} 
                                        ${isWrong ? "bg-[#F8BCBC] text-[#293264] border-0" : ""}
                                        ${isSubmitted && !isSelected ? "opacity-50" : ""}
                                    `}
                                    onClick={() => selectAnswer(item.q, answer)}
                                    disabled={isSubmitted} // Disable selection after submitting
                                >
                                    {answer}
                                </button>
                            );
                        })}
                    </div>
                    <hr className="mt-8 border-2"></hr>
                </div>
            ))}

            <div className="flex gap-8 items-center justify-center">
                {isSubmitted ? (
                    <>
                        <p className="my-16 text-[#293264] text-md font-semibold">
                            You scored {score}/{data.length} correct answers
                        </p>
                        <Link to="/">
                            <button className="my-16 bg-[#4D5B9E] text-white text-sm w-[128px] h-[32px] rounded-lg">
                                Play again
                            </button>
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={() => setIsSubmitted(true)}
                        className="my-16 bg-[#4D5B9E] text-white text-sm w-[128px] h-[32px] rounded-lg"
                    >
                        Check answers
                    </button>
                )}
            </div>
        </div>
    );
}
