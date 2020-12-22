import React,{useState} from 'react'
import data from './data'
import SingleQuestion from './Question'
import './Accordion.css'
function Accordion() {

    const [questions, setQuestions] = useState(data);

    return (
        <main>
            <div className="accordion-container">
                <h3>questions and answers about login</h3>
                <section className="accordion-info">
                    {
                        questions.map((question)=>{
                            return <SingleQuestion key={question.id} {...question}/>
                        })
                    }
                </section>
            </div>
        </main>
       
    )
}

export default Accordion
