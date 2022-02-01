import React,{useContext} from "react"
import IconBtn from "./icon-btn"
import logo from "../logo.svg"
import styles from "../css/nav.module.css"
import { AppContext } from "../App"
import { clearData } from "../utils/storage"
import { useNavigate } from "react-router-dom"
const Nav  = (props)=>{
    const naviagte = useNavigate()
    const {setShowSideNav} = useContext(AppContext)
    const logout = ()=>{
        clearData()
        naviagte("/login")
}
return <nav style={{backgroundColor:"#fff"}} className={styles.nav}>
    <div className={styles.container}>
        <div style={{display:"flex",alignItems:"center"}}>
        <button className={styles.menu} onClick={(e)=>setShowSideNav((prev)=>!prev)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
        <div className={styles.imageContainer}>
            <img src={logo} alt="logo"/>
        </div>
        <div><p>POWERMAX</p></div>
        </div>
        <div className={styles.buttonContainer}>
            <IconBtn clickHandler={logout} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>}/>
        </div>
    </div>
</nav>
}
export default Nav