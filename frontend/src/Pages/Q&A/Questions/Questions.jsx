import { Button, Card, TextField } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import Topbar from '../../../Components/topbar/Topbar'
import axios from '../../../Helper/axios'
import styles from './Questions.module.css'
import { limitString } from '../../../Helper/limitString'
import { useHistory } from 'react-router'
import AskQuestion from '../../../Components/AskQuestion/AskQuestion'
const Questions = () => {
    let history=useHistory();
    const buttonRef=useRef()
    const [questions, setQuestions] = useState([])
    const [questionsShow, setQuestionsShow] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [askDiv,setAskDiv]=useState(false)
    const [question,setQuestion] = useState("")
    useEffect(() => {
        console.log("sure");
        axios.get("/api/qa")
            .then(res => {
                const response = res.data.data
                setQuestions(response.questions)
                setQuestionsShow(response.questions)
            })
    }, [])

    useEffect(() => {
        setQuestionsShow(questions.filter(ques => ques.question.toLowerCase() === searchValue || ques.question.toLowerCase().includes(searchValue)))
    }, [searchValue])

    useEffect(()=>{
        if(askDiv){
            buttonRef.current.innerText="Questions"
        }else{
            buttonRef.current.innerText="Ask A QUestion"
        }
    },[askDiv])

    const searchInputHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const questionInputHandler=(event)=>{
        setQuestion(event.target.value)
    }

    const askQustionHandler=()=>{
        const body={question}
        axios.post("/api/qa",body)
            .then(res=>{
                window.location.reload(false);
            }).catch(err=>{
                console.log(err);
            })
    }

    useEffect(()=>{
        console.log(questions);
    },[questions])

    const askQuestion=()=>{
        setAskDiv(prev=>!prev)
    }

    const cardClicked = (id) => {
        history.push(`question/${id}`)
    }

    const searchButtonClicked = () => {
        if (searchValue === "") {
            setQuestionsShow(questions)
        } else {
            setQuestionsShow(questions.filter(ques => ques.question.toLowerCase() === searchValue || ques.question.toLowerCase().includes(searchValue)))
        }
    }



    return (
        <div>
            <Topbar list={[{link:"groupChat",base:"Group Chat"}, {link:"questions", base:"Q&A"}, {link:"blogs",base:"Blogs"}, {link:"findProfessionals", base:"Find Professionals"}]} />
            <div className={styles.topDiv}>
                <div className={styles.searchDiv}>
                    <TextField onChange={(event) => { searchInputHandler(event) }} className={styles.searchInput} label="Search A Question" />
                    {/* this button should be removed */}
                </div>
                <div className={styles.askQuestion}>
                    <Button onClick={askQuestion} variant="contained" ref={buttonRef} className={styles.askQuestionButton}>Ask a question</Button>
                </div>
            </div>
            {
                !askDiv? <div className={styles.questions}>
                {
                    questionsShow.slice(0).reverse().map((question, index) => {
                        return (
                            <Card onClick={() => cardClicked(question.id)} style={question.answers.length === 0 ? { backgroundColor: '#EAEAEA63' } : { backgroundColor: '#EFF5E9' }} className={styles.questionCard}>
                                <p className={styles.question}>{limitString(question.question, 400)}</p><p className={styles.answers}>Answers: {question.answers.length}</p>
                            </Card>
                        )
                    })
                }
            </div>: 
            <div className={styles.askQuestionDiv}>
                <AskQuestion
                click={askQustionHandler}
                change={(event)=>questionInputHandler(event)}
            />
            </div>
            }
        </div>
    )
}

export default Questions
