import { Button, TextField } from '@mui/material'
import React from 'react'
import styles from './AskQuestion.module.css'
const AskQuestion = (props) => {
    return (
        <div className={styles.askQuestionDiv}>
            <TextField multiline rows={6} maxRows={6} className={styles.textField} onChange={props.change} label="Ask a Question"></TextField>
            <Button className={styles.askButton} onClick={props.click}>Ask</Button>
        </div>
    )
}

export default AskQuestion
