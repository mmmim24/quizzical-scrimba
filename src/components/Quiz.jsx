import React from 'react'
import Question from './Question.jsx';
import { Link } from 'react-router-dom';

export default function Quiz() {
    return (
        <React.Fragment>
            <Question />
            <div className='flex gap-8 items-center justify-center'>
                {/* <p className='text-[#293264] text-md font-semibold'>You scored {correct}/{data.length} correct answers</p> */}
                <Link to={'/result'}><button className='mb-16 bg-[#4D5B9E] text-[#F5F7FB] text-sm w-[128px] h-[32px] rounded-lg'>Check answers</button> </Link>
            </div>
        </React.Fragment >
    )
}
