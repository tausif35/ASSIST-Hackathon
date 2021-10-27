import React, { useState, useEffect, useRef,useContext } from 'react'
import Topbar from '../../../Components/topbar/Topbar'
import {issues} from '../../../Helper/mentalHealthProblems'
import {
  Button, TextField, FormControlLabel, FormLabel, Box, Checkbox, Card, CardHeader, Divider, List, ListItem,
  ListItemIcon, ListItemText, Grid
} from '@mui/material'
import styles from './Verification.module.css'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useHistory } from "react-router-dom"
import axios from '../../../Helper/axios';
import Cookies from 'universal-cookie';
import { UserContext } from '../../../Helper/userContext';
const cookies=new Cookies()

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const Verification = () => {
  const {user,setUser}=useContext(UserContext)
  const [degrees, setdegrees] = useState("")
  const [edu, setedu] = useState("")
  const [work, setwork] = useState("")
  const [research, setresearch] = useState("")
  const [achievment, setAchievment] = useState("")
  const [phone,setPhone]=useState("")

  let history = useHistory();
  const formRef = React.useRef();
  //check
  const [checked, setChecked] = React.useState([]);

  const [left, setLeft] = React.useState(issues);

  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleChange = (event, type) => {
    switch (type) {
      case "edu":
        setedu(event.target.value);
        break;
      case "degrees":
        setdegrees(event.target.value);
        break;
      case "work":
        setwork(event.target.value);
        break;
      case "research":
        setresearch(event.target.value);
        break;
      case "achievment":
        setAchievment(event.target.value);
        break;
      case "phone":
        setPhone(event.target.value);
        break;
      default:
        break;
    }
  };

  const submit = () => {
    const body = {
      ...user,
      edu,
      degrees,
      work,
      research,
      achievment,
      phone,
      specialization:right
    }
    if(formRef.current.reportValidity()){
      axios.post("/api/users/signup",body)
      .then(res=>{
        console.log(res);
        history.push("/thankYou")
      }).catch(err=>{
        console.log(err);
      })

    }
  };
  useEffect(() => {
    document.title = "Doctor Info - ASSIST";

  }, []);


  window.onload = function() {
    history.push("signUp")
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
      />
      <Divider />
      <List
        sx={{
          width: 400,
          height: 250,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  // Check

  return (
    <div className={styles.mainDiv} style={{ backgroundColor: "#EFF5E9" }}>
      <Topbar list={[]} />
      <div className={styles.mainSignUpDiv}>
        <form ref={formRef} className={styles.signUpDiv}>
          <p className={styles.signUpText}>Verification For Professionals</p>
          <TextField
            onChange={(event) => {
              handleChange(event, "edu");
            }}
            className={styles.infoField}
            id="outlined-multiline-flexible"
            label="Educational Qualifications"
            maxRows={6}
            rows={4}
            placeholder="Your Educational Qualifications Here..."
            multiline
          />
          <TextField
            onChange={(event) => {
              handleChange(event, "degrees");
            }}
            className={styles.infoField}
            id="outlined-multiline-flexible"
            label="Degrees"
            maxRows={6}
            rows={4}
            placeholder="Degrees You Have Achieved Here..."
            multiline
          />
          <TextField
            onChange={(event) => {
              handleChange(event, "work");
            }}
            className={styles.infoField}
            id="outlined-multiline-flexible"
            label="Work Experience"
            maxRows={6}
            rows={4}
            placeholder="Your Work Experience Here..."
            multiline
          />
          <TextField
            onChange={(event) => {
              handleChange(event, "research");
            }}
            className={styles.infoField}
            id="outlined-multiline-flexible"
            label="Research and Publications"
            maxRows={6}
            rows={4}
            placeholder="Your Research and Publications Here..."
            multiline
          />
          <TextField
            onChange={(event) => {
              handleChange(event, "achievment");
            }}
            className={styles.infoField}
            id="outlined-multiline-flexible"
            label="Achievements"
            maxRows={6}
            rows={4}
            placeholder="Your Achievements Here..."
            multiline
          />

          {/* //check */}
          <Grid
            className={styles.specializationChecker}
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>{customList("Specializations", left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList("Chosen Specializations", right)}</Grid>
          </Grid>
          {/* //check */}

          <TextField
            required="true"
            onChange={(event) => {
              handleChange(event, "phone");
            }}
            className={styles.infoField}
            id="outlined-multiline-flexible"
            label="Phone Number"
            placeholder="Your Phone Number Here..."
          />

          <Button
            className={styles.btn}
            onClick={submit}
            variant="contained"
            endIcon={<DoubleArrowIcon />}
          >
            Request For Verification
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
