import React from 'react'
import { Redirect, Route } from "react-router-dom";
import Cookies from 'universal-cookie';
function ProtectedRoute({ component: Component, role:role}) {
    const cookies = new Cookies();
    return (
        <Route
            render={(props) =>

                role?(cookies.get("assistc") && (cookies.get("assistr")) && (role===cookies.get("assistr"))) ? <Component {...props}/> : <Redirect to="/login" />:
                (cookies.get("assistc") && (cookies.get("assistr"))) ? <Component {...props}/> : <Redirect to="/login" />
            }
        />
    )
}

export default ProtectedRoute
