import React from 'react'
import { Link } from 'react-router-dom';
import { data } from '../Data/qs.js'

export default function Quiz() {
    const [selected, setSelected] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [result, setResult] = React.useState(false);
    const [correct, setCorrect] = React.useState([]);


    const selectAnswer = (e) => {
        let tel = e.target;
        if (tel.tagName === 'P') {
            tel.parentElement.childNodes.forEach((item) => {
                item.style.backgroundColor = '#F5F7FB';
                item.style.color = '#293264';
            })
            tel.style.backgroundColor = '#293264';
            tel.style.color = '#F5F7FB';
            let obj = {
                q: tel.parentElement.parentElement.firstChild.innerText,
                a: tel.innerText
            }
            selected.map((item, index) => {
                if (item.q === obj.q) {
                    selected.splice(index, 1);
                }
            })
            selected.push(obj);
        }
        setSelected(selected);
        console.log(selected);
    };

    const checkAnswers = (e) => {
        e.preventDefault();
        selected.map((item, index) => {
            data.map((dataItem, index) => {
                if (item.q === dataItem.q) {
                    if (item.a === dataItem.answers[0]) {
                        correct.push({ q: item.q, a: item.a });
                    }
                }
            })
        })
        setCorrect(correct);
        data.map((item, index) => {
            answers.push({ q: item.q, a: item.answers[0] });
        })
        let qs = document.getElementById('qs');
        qs.childNodes.forEach((item) => {
            item.childNodes[1].childNodes.forEach((answer) => {
                if (answers.find((ans) => ans.a === answer.innerText)) {
                    answer.style.backgroundColor = '#94D7A2';
                    answer.style.color = '#293264';
                    answer.style.border = 'none';
                }
                else if (selected.find((sel) => sel.a === answer.innerText)) {
                    answer.style.backgroundColor = '#F8BCBC';
                    answer.style.color = '#293264';
                    answer.style.border = 'none';
                }
                else {
                    answer.style.opacity = '0.5';
                }
            })
        })
        setResult(!result);
        setAnswers(answers);
        console.log(answers);
    };

    return (
        <React.Fragment>
            <div id="qs" onClick={selectAnswer} className="px-16 py-16 grid grid-cols-1 gap-8 place-content-center">
                {
                    data.map((item, index) => {
                        return (
                            <div key={index}>
                                <h2 className='text-[#293264] text-lg font-semibold'>{item.q}</h2>
                                <div className='flex flex-row gap-16 mt-4'>
                                    {
                                        item.answers.map((answer, index) => {
                                            return (
                                                <p className='p-2 border-[#293264] rounded-xl border-2 text-[#293264] hover:bg-[#293264] hover:text-[#F5F7FB]' key={index}>
                                                    {answer}
                                                </p>
                                            );
                                        })
                                    }
                                </div>
                                <hr className='mt-8 border-2'></hr>
                            </div>
                        )
                    })
                }
            </div>
            {
                result ?
                    <div className='flex gap-8 items-center justify-center'>
                        <p className='my-16 text-[#293264] text-md font-semibold'>You scored {correct.length}/{data.length} correct answers</p>
                        <div>
                            <Link to={'/'}>
                                <button className='my-16 bg-[#4D5B9E] text-[#F5F7FB] text-sm w-[128px] h-[32px] rounded-lg'>Play again</button>
                            </Link>
                        </div>
                    </div>
                    :
                    <div className='flex gap-8 items-center justify-center'>
                        <button onClick={checkAnswers} className='my-16 bg-[#4D5B9E] text-[#F5F7FB] text-sm w-[128px] h-[32px] rounded-lg'>Check answers</button>
                    </div>
            }
        </React.Fragment>
    )
}
