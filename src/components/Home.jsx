import React from 'react'

export default function Home() {

    function startQuiz() {
        window.location.href = '/quiz'
    }

    return (
        <>
            <div className="flex flex-col min-h-[90vh] items-center justify-center">
                <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#293264]'>Quizzical</h1>
                <h3 className='text-md sm:text-xl md:text-2xl lg:text-3xl py-4 sm:py-6 md:py-7 lg:py-8 text-[#293264]'>Design provided by scrimba</h3>
                <button onClick={startQuiz} className='bg-[#4D5B9E] text-[#F5F7FB] text-md sm:text-xl md:text-2xl lg:text-3xl px-8 sm:px-12 md:px-14 lg:px-16 py-2 sm:py-[10px] md:py-[13px] lg:py-4 rounded-lg' to="/quiz">Start Quiz</button>
            </div>
        </>
    )
}
