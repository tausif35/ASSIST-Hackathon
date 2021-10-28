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
    const [answerValue,setAnswerValue]=useState("")
    useEffect(() => {
        axios.get(`/api/qa/${id}`)
            .then(res => {
                const response = res.data.data
                setUserId(response.id)
                setQuestion(response.question.question)
                setAnswers(response.question.answers)
            })
    }, [])

    const changeAnswerValue = (event) =>{
        setAnswerValue(event.target.value)
    }

    const heartClicked = (index, answerId) => {
        axios.patch(`/api/qa/answers/${answerId}`)
            .then(res => {
                setLiked(prev => [...prev, index])
            }).catch(err => {
                console.log(err);
            })
    }

    const unheartClicked = (index, answerId) => {
        axios.patch(`/api/qa/answers/${answerId}`)
            .then(res => {
                setLiked(liked=>liked.filter(like => like !== index))
            }).catch(err => {
                console.log(err);
            })
    }

    const answerButtonHander=()=>{
        const body={
            answer:answerValue
        }
        axios.post(`/api/qa/${id}`,body)
            .then(res=>{
                setAnswerValue("")
                setAnswers(prev=>[...prev,res.data.data.newAnswer])
            }).catch(err=>{
                console.log(err);
            })
    }

    return (
        <div>
            <Topbar list={[{link:"groupChat",base:"Group Chat"}, {link:"questions", base:"Q&A"}, {link:"blogs",base:"Blogs"}, {link:"findProfessionals", base:"Find Professionals"}]} />
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
                            value={answerValue}
                            label="Write An Answer"
                            multiline
                            onChange={(event)=>{changeAnswerValue(event)}}
                            rows={6}
                            maxRows={6}
                        />
                        <Button onClick={answerButtonHander} className={styles.submitButton}>Submit</Button>
                    </Card> : null
            }
        </div>
    )
}

export default QuestionPage
