import { Button, Card, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Topbar from '../../../Components/topbar/Topbar'
import axios from '../../../Helper/axios'
import styles from './Questions.module.css'
import { limitString } from '../../../Helper/limitString'
import { useHistory } from 'react-router'
const Questions = () => {
    let history=useHistory();
    const [questions, setQuestions] = useState([])
    const [questionsShow, setQuestionsShow] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [askDiv,setAskDiv]=useState(false)
    useEffect(() => {
        console.log("sure");
        axios.get("/api/qa")
            .then(res => {
                const response = res.data.data
                console.log(response.questions);
                setQuestions(response.questions)
                setQuestionsShow(response.questions)
            })
    }, [])

    useEffect(() => {
        setQuestionsShow(questions.filter(ques => ques.question.toLowerCase() === searchValue || ques.question.toLowerCase().includes(searchValue)))
    }, [searchValue])

    const searchInputHandler = (event) => {
        setSearchValue(event.target.value)
    }


    const askQuestion=()=>{
        setAskDiv(true)
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
                    <Button onClick={askQuestion} variant="contained" className={styles.askQuestionButton}>Ask a question</Button>
                </div>
            </div>
            <div className={styles.questions}>
                {
                    questionsShow.map((question, index) => {
                        return (
                            <Card onClick={() => cardClicked(question.id)} style={question.answers.length === 0 ? { backgroundColor: '#EAEAEA63' } : { backgroundColor: '#EFF5E9' }} className={styles.questionCard}>
                                <p className={styles.question}>{limitString(question.question, 400)}</p><p className={styles.answers}>Answers: {question.answers.length}</p>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Questions
