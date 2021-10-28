import { Button, Card, TextField } from '@mui/material'
import React from 'react'
import styles from './AskQuestion.module.css'
const AskQuestion = (props) => {
    return (
        <Card className={styles.askQuestionDiv}>
            <h1>Ask Your Question</h1>
            <TextField multiline rows={6} maxRows={6} className={styles.textField} onChange={props.change} label="Your Question Here" ></TextField>
            <Button className={styles.askButton} onClick={props.click}>Ask</Button>
        </Card>
    )
}

export default AskQuestion
