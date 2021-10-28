import React, { useState, useMemo } from 'react'
import { Route, Switch } from 'react-router-dom'
import { UserContext } from '../Helper/userContext'
import Login from '../Pages/Authentication/LoginPage/Login'
import SignUp from '../Pages/Authentication/SignUpPage/SignUp'
import ThankYou from '../Pages/Authentication/VerificationPage/ThankYou'
import Verification from '../Pages/Authentication/VerificationPage/Verification'
import BlogHomePage from '../Pages/Blog/BlogHomePage/BlogHomePage'
import CreatePost from '../Pages/Blog/CreateBlogPage/CreateBlogPage'
import BlogPost from '../Pages/Blog/BlogPostPage/BlogPost'
import ProtectedRoute from './ProtectedRoute'
import FindProf from '../Pages/FindProfessionalPage/FindProf'
import UserChat from '../Pages/Chat/UserChat/UserChat'
import Home from '../Pages/HomePage/Home'
import VideoChat from '../Pages/videoChat/VideoChat'
const Routes = () => {
    const [user, setUser] = useState(null);

    const value = useMemo(() => ({ user, setUser }), [user, setUser]);
    return (
        <Switch>


            <Route path={"/login"} exact component={Login} />
            <Route path={"/home"} exact component={Home} />
            <Route path={"/findProfessionals"} exact component={FindProf} />
            {/* <Route path={"/questions"} exact component={Questions}></Route>
            <Route path={"/question/:id"} exact component={QuestionPage}></Route> */}

            {/* <Route path={"/professional/:id"} exact component={Professional} />
                <Route path={"/professional/:id/appointment"} exact component={Appointment} /> */}
                
                <Route path={"/blogs"} exact component={BlogHomePage} />
                <Route path={"/blogs/new"} exact component={CreatePost} />
                <Route path={"/blogs/post/:id"} exact component={BlogPost} />
            <ProtectedRoute exact path={"/"} component={Home} />
            <Route path={"/chat"} exact component={UserChat}></Route>
            <Route path={"/chat/:id"} exact component={UserChat}></Route>
            <Route path={"/videoCall/:id"} exact component={VideoChat} />
            <UserContext.Provider value={value}>


                <Route path={"/signUp"} exact component={SignUp} />
                <Route path={"/verification"} exact component={Verification} />
                <Route path={"/signUp/ThankYou"} exact component={ThankYou} />

            </UserContext.Provider>
        </Switch>
    )
}

export default Routes
