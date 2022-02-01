import React,{useState} from "react";
import Nav from "../components/nav";
import styles from "../css/settings.module.css"
import { createAdmin, changePassword } from "../utils/settings";
const Settings = props => {
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [comfirmNewPassword,setComfirmNewPassword] = useState("")
    const [userName,setUserName] = useState("")
    const [newAdminPassword,setNewAdminPassword]=useState("")
    const [newAdminConfirmPassword,setNewAdminConfirmPassword] = useState("")
    const [name,setAdminName] =useState("")
    const updateHandler=async()=>{
        const data = {newPassword,oldPassword} 
        const response = await changePassword(data)
        clearInput()
    }
    const clearInput = ()=>{
        setOldPassword("")
        setNewPassword("")
        setComfirmNewPassword("")
        setUserName("")
        setNewAdminPassword("")
        setNewAdminConfirmPassword("")
    }
    const createHandler = async()=>{
        const data = {userName,password:newAdminPassword,comfirmPassword:newAdminConfirmPassword,name}
        const response = await createAdmin(data)
        clearInput()
    }
    return <section>
        <Nav />
        <div className={styles.mainContainer}>
            <div><h1>Settings</h1></div>
            <div className={styles.contentContainer}>
                    <h2>Account</h2>
                    <div>
                        <label>Old Password</label>
                        <input type={"text"} value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
                        <label>New Password</label>
                        <input type={"text"} value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                        <label>Comfirm Password</label>
                        <input type={"text"} value={comfirmNewPassword} onChange={(e)=>setComfirmNewPassword(e.target.value)} />
                        <div className={styles.btnContainer}><button onClick={updateHandler}>Reset</button></div>
                    </div>
                
            </div>
            <div className={styles.contentContainer}>
                
                    <h2>Create Admin</h2>
                    <div>
                        <label>Name</label>
                        <input type={"text"} value={name} onChange={(e)=>setAdminName(e.target.value)} />
                        <label>Email</label>
                        <input type={"text"} placeholder="xxxx...@xxx..xxx" value={userName} onChange={(e)=>setUserName(e.target.value)} />
                        <label>Password</label>
                        <input type={"password"} value={newAdminPassword} onChange={(e)=>setNewAdminPassword(e.target.value)} />
                        <label>Comfirm Password</label>
                        <input type={"password"} value={newAdminConfirmPassword} onChange={(e)=>setNewAdminConfirmPassword(e.target.value)} />
                        <div className={styles.btnContainer}>
                            <button onClick={createHandler}>Create</button>
                        </div>
                    </div>
            </div>
        </div>
    </section>
}

export default Settings