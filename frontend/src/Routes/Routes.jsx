import React, { useState, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "../Helper/userContext";
import Login from "../Pages/Authentication/LoginPage/Login";
import SignUp from "../Pages/Authentication/SignUpPage/SignUp";
import ThankYou from "../Pages/Authentication/VerificationPage/ThankYou";
import Verification from "../Pages/Authentication/VerificationPage/Verification";
import BlogHomePage from "../Pages/Blog/BlogHomePage/BlogHomePage";
import CreatePost from "../Pages/Blog/CreateBlogPage/CreateBlogPage";
import BlogPost from "../Pages/Blog/BlogPostPage/BlogPost";
import ProtectedRoute from "./ProtectedRoute";
import FindProf from "../Pages/FindProfessionalPage/FindProf";
import UserChat from "../Pages/Chat/UserChat/UserChat";
import Home from "../Pages/HomePage/Home";
import VideoChat from "../Pages/videoChat/VideoChat";
import Appointment from "../Pages/Professional/AppointmentPage/Appointment";
import Professional from "../Pages/Professional/ProfessionalPage/Professional";
import QuestionPage from "../Pages/Q&A/QuestionPage/QuestionPage";
import Questions from "../Pages/Q&A/Questions/Questions";
import GroupChatHome from "../Pages/GroupChat/GroupChatHome";
import GroupChatRoom from "../Pages/GroupChat/GroupChatRoom";
import AdminPanel from "../Pages/Admin/AdminPanel";
import Profile from "../Pages/Profile/Profile";
const Routes = () => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <Switch>
      <Route path={"/login"} exact component={Login} />
      <Route path={"/home"} exact component={Home} />
      <Route path={"/findProfessionals"} exact component={FindProf} />
      <Route path={"/questions"} exact component={Questions}></Route>
      <Route path={"/question/:id"} exact component={QuestionPage}></Route>
      <Route path={"/chat"} exact component={UserChat} />
      <Route path={"/chat/:id"} exact component={UserChat} />
      <Route path={"/professional/:id"} exact component={Professional} />
      <Route
        path={"/professional/:id/appointment"}
        exact
        component={Appointment}
      />
      <Route path={"/VideoCall/:id"} exact component={VideoChat} />
      <Route path={"/blogs"} exact component={BlogHomePage} />
      <Route path={"/blogs/new"} exact component={CreatePost} />
      <Route path={"/blogs/post/:id"} exact component={BlogPost} />
      <Route path={"/groupchat"} exact component={GroupChatHome} />
      <Route path={"/groupchat/room/:id"} exact component={GroupChatRoom} />
      <Route path={"/admin"} exact component={AdminPanel} />
      <Route path={"/profile"} exact component={Profile} />

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
