import React from "react"
import styles from "../css/nav.module.css"
import {LogoutOutlined} from "@ant-design/icons"
import {clearData} from "../utils/storage"
import { useNavigate } from "react-router-dom"
const Nav = (props)=>{  
          const navigate = useNavigate()
    const logout = ()=>{
        clearData()
        navigate("/login")
    }
    return <nav className={styles.nav}>
        <div className={styles.navMain}>
            <h1>POWERMAX</h1>
            <button onClick={logout}><LogoutOutlined style={{color:"#cccc",fontSize:"1.3em"}}/></button>
        </div>
    </nav>
}
export default Nav