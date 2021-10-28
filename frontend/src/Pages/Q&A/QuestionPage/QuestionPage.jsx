import React, { useEffect, useState } from 'react'
import { Button, Card, TextField } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from './QuestionPage.module.css'
import Topbar from '../../../Components/topbar/Topbar'
import axios from '../../../Helper/axios'
import Cookies from 'universal-cookie'
const QuestionPage = (props) => {
    const cookies = new Cookies()
    const id = props.match.params.id
    const [question, setQuestion] = useState("")
    const [answers, setAnswers] = useState([])
    const [liked, setLiked] = useState([])
    const [userId, setUserId] = useState("")
    useEffect(() => {
        axios.get(`/api/qa/${id}`)
            .then(res => {
                const response = res.data.data
                setUserId(response.id)
                setQuestion(response.question.question)
                setAnswers(response.question.answers)
            })
    }, [])

    const heartClicked = (index, answerId) => {
        axios.patch(`/api/qa/answers/${answerId}`)
            .then(res => {
                console.log(res);
                setLiked(prev => [...prev, index])
            }).catch(err => {
                console.log(err);
            })
    }

    const unheartClicked = (index, answerId) => {
        console.log(index,answerId);
        axios.patch(`/api/qa/answers/${answerId}`)
            .then(res => {
                console.log(res);
                setLiked(liked=>liked.filter(like => like !== index))
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <Topbar list={["Group Chat", "Q&A", "Blogs", "Find Professionals"]} />
            <Card className={styles.questionCard}>
                Q. {question}
            </Card>
            {
                answers.map((answer, index) => {
                    return (
                        <Card className={styles.answer} key={index}>
                            <div className={styles.ansCrd}>
                                <span className={styles.answerHeader}><p>Answer From<span style={{ color: '#86D382' }}> {answer.answeredBy} </span>: </p>  </span>
                                {liked.includes(index) || answer.upvotes.includes(userId) ? <FavoriteIcon onClick={() => unheartClicked(index, answer._id)} className={styles.icon} /> : <FavoriteBorderIcon onClick={() => heartClicked(index, answer._id)} className={styles.icon} />}
                            </div>
                            <p> {answer.answer} </p>
                        </Card>
                    )
                })
            }
            {
                cookies.get("assistr") === "professional" ?
                    <Card className={styles.newAnswerCard}>
                        <TextField
                            className={styles.answerBox}
                            label="Write An Answer"
                            multiline
                            rows={6}
                            maxRows={6}
                        />
                        <Button className={styles.submitButton}>Submit</Button>
                    </Card> : null
            }
        </div>
    )
}

export default QuestionPage
