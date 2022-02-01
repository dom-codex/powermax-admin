import React, { useState } from "react"
import styles from "../css/login.module.css"
import { loginAdmin } from "../utils/login"
import { useNavigate } from "react-router-dom"
import { saveData } from "../utils/storage"

const Login = props => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoader] = useState(false)
    const navigate = useNavigate()
    return <section className={styles.section}>
        <div>
            <div className={styles.title}>
                <h2>POWERMAX</h2>
                <h2>ADMIN</h2>
            </div>
            <div className={styles.container}>
                <div className={styles.formCard}>

                    <label>Email</label>
                    <input type={"email"} placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type={"password"} placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className={styles.btnCont}>
                        <button onClick={() => login(email, password, setLoader, navigate)}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
export default Login
const login = async (email, password, setLoader, navigate) => {
    const response = await loginAdmin(email, password, setLoader)
    if (response.canLogin) {
        saveData(response)
        navigate("/dashboard")
    }
}