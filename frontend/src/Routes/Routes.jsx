import React, { useState, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "../Helper/userContext";
import Login from "../Pages/Authentication/LoginPage/Login";
import SignUp from "../Pages/Authentication/SignUpPage/SignUp";
import ThankYou from "../Pages/Authentication/VerificationPage/ThankYou";
import Verification from "../Pages/Authentication/VerificationPage/Verification";
import ProtectedRoute from "./ProtectedRoute";
import FindProf from "../Pages/FindProfessionalPage/FindProf";
import QuestionPage from "../Pages/Q&A/QuestionPage/QuestionPage";
import Questions from "../Pages/Q&A/Questions/Questions";
import Home from "../Pages/HomePage/Home";
const Routes = () => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <Switch>
      <Route path={"/login"} exact component={Login} />
      <Route path={"/home"} exact component={Home} />
      <Route path={"/findProfessionals"} exact component={FindProf} />
      <Route path={"/questions"} exact component={Questions}></Route>

      {/* <Route path={"/professional/:id"} exact component={Professional} />
                <Route path={"/professional/:id/appointment"} exact component={Appointment} />
                <Route path={"/blogs"} exact component={BlogHomePage} />
                <Route path={"/blogs/new"} exact component={CreatePost} />
                <Route path={"/blogs/post/:id"} exact component={BlogPost} /> */}
      <Route path={"/question/:id"} exact component={QuestionPage}></Route>
      <ProtectedRoute exact path={"/"} component={Home} />
      <UserContext.Provider value={value}>
        <Route path={"/signUp"} exact component={SignUp} />
        <Route path={"/verification"} exact component={Verification} />
        <Route path={"/signUp/ThankYou"} exact component={ThankYou} />
      </UserContext.Provider>
    </Switch>
  );
};

export default Routes;
