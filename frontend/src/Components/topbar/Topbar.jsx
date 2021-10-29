import React from 'react'
import { NavLink } from 'react-router-dom';
import assist from './assist.png'
import { useHistory } from 'react-router';
import './topbar.css'
const Topbar = (props) => {
  const linksLength = props.list.length
  const history=useHistory()
  const logoClickListener=()=>{
    history.push("/")
  }

  return (
    <div className="topbarDiv" style={{ backgroundColor: "white" }}>
      <img onClick={logoClickListener} className={linksLength === 0 ? "middleLogoImage" : "logoImage"} src={assist} alt="Assist"></img>
      <ul className="topMenu">
        {props.list.map(link => {
          return <li> <NavLink className="navbarLinks" to={`/${link.link}`} exact activeClassName="selected"> {link.base.toUpperCase()}</NavLink></li>
        })}

      </ul>
    </div>
  )
}


export default Topbar


