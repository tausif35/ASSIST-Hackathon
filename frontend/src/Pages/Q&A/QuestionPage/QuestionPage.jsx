import React, { useEffect, useState } from "react";
import { Button, Card, TextField } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./QuestionPage.module.css";
import Topbar from "../../../Components/topbar/Topbar";
import axios from "../../../Helper/axios";
import Cookies from "universal-cookie";
const QuestionPage = (props) => {
  const cookies = new Cookies();
  const id = props.match.params.id;
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [liked, setLiked] = useState([]);
  const [userId, setUserId] = useState("");

  const heartClicked = (index, answerId) => {
    setLiked((prev) => [...prev, index]);
  };

  const unheartClicked = (index, answerId) => {
    setLiked((liked) => liked.filter((like) => like !== index));
  };

  return (
    <div>
      <Topbar
        list={[
          { link: "groupChat", base: "Group Chat" },
          { link: "questions", base: "Q&A" },
          { link: "blogs", base: "Blogs" },
          { link: "findProfessionals", base: "Find Professionals" },
        ]}
      />
      <Card className={styles.questionCard}>
        Q. How can i improve my mental health?
      </Card>
      <Card className={styles.answer} key={0}>
        <div className={styles.ansCrd}>
          <span className={styles.answerHeader}>
            <p>
              Answer From
              <span style={{ color: "#86D382" }}> {"Mohit Kamal"} </span>:{" "}
            </p>{" "}
          </span>
          {liked.includes(0) ? (
            <FavoriteIcon
              onClick={() => unheartClicked(0, 2)}
              className={styles.icon}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={() => heartClicked(1, 3)}
              className={styles.icon}
            />
          )}
        </div>
        <p>
          {" "}
          Activity and exercise are essential in maintaining good mental health.
          Being active not only gives you a sense of achievement, but it boosts
          the chemicals in your brain that help put you in a good mood.
          Exercising can help eliminate low mood, anxiety, stress and feeling
          tired and lazy. It is also linked to living a longer life.{" "}
        </p>
      </Card>
      {cookies.get("assistr") === "professional" ? (
        <Card className={styles.newAnswerCard}>
          <TextField
            className={styles.answerBox}
            label="Write An Answer"
            multiline
            rows={6}
            maxRows={6}
          />
          <Button className={styles.submitButton}>Submit</Button>
        </Card>
      ) : null}
    </div>
  );
};

export default QuestionPage;
