import React from 'react'
import { data } from '../Data/qs.js'

export default function Question() {
    const [selected, setSelected] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
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
        console.log(answers);
    }
    return (
        <React.Fragment>
            <div onClick={selectAnswer} className="px-16 py-16 grid grid-cols-1 gap-8 place-content-center">
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
        </React.Fragment>
    )
}
