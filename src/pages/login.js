import React,{useState} from "react"
import styles from "../css/login.module.css"
import {saveData} from "../utils/storage"
import {useNavigate} from "react-router-dom"
const loginHandler = async(email,Password,navigate)=>{
//VALIDATE PASSWORD
if(email.length<=0)return alert("invalid email")
if(Password.length<=0)return alert("invalid password")
//SEND LOGIN
const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/auth/login`,{
    method:"POST",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify({
        email:email,
        password:Password
    })
})
//CHECK STATUS
const status  = response.status

if(status>202)return alert("An error occurred try again")
const body = await response.json()
//Save to local storage
saveData(body)
//NAVIGATE TO MAIN MENU PAGE
navigate("/dashboard")
}
const LoginPage = (props)=>{
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
return <section>
    <div className={styles.loginMain} >
        <div className={styles.loginHeader}>
            <h1>POWERMAX</h1>
            <small className={styles.small}>ADMIN</small>
        </div>
        <div className={styles.formCont} >
            
            <input onInput={(e)=>setEmail(e.target.value)} value={email} required type={"email"} className={styles.input} placeholder="Email"/>
            <br/>
            <input onInput={(e)=>setPassword(e.target.value)} value={password} type={"password"} className={styles.input} placeholder="password"/>
            
            <div className={styles.btnCont}>
                <button type="submit" className={styles.btn} onClick={()=>loginHandler(email,password,navigate)}>Login</button>
            </div>
            
        </div>
    </div>
</section>
}
export default LoginPage