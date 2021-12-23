import React,{useState} from "react"
import styles from "../css/activity.module.css"
import {ContactsOutlined} from "@ant-design/icons"
import { getData } from "../utils/storage"
const ActivityItem = (props)=>{
    return <div className={styles.activityItem}>
    <div className={styles.activityItemImg}>
        <ContactsOutlined className={styles.icon}/>
    </div>
    <div>
        <p className={styles.nameEmail}>{props.name} | {props.email}</p>
        <p>{props.message}</p>
    </div>
</div>
}
const Activity = (props)=>{
    const [oldpassword,setoldpassword] = useState("")
    const [newpassword,setnewpassword] = useState("")
    const changePassword = async()=>{
        props.showLoader(true)
        const data = getData()
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/auth/change/password`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                oldPassword:oldpassword,
                newPassword:newpassword,
                adminId:data.adminId
            })
        })
        const status = response.status
        console.log(response)
        if(status>202) {
            props.showLoader(false)
            return alert("an error occurred,try again")}
        const body = await response.json()
        setnewpassword("")
        setoldpassword("")
        props.showLoader(false)
    }
return <section>
    <div >
    <p className={styles.activityText}>Settings</p>
    <div className={styles.formCont}>
        <input onInput={(e)=>setoldpassword(e.target.value)}  value={oldpassword} type={"password"} placeholder="old password"/> <br/>
        <input onInput={(e)=>setnewpassword(e.target.value)} value={newpassword} type={"password"} placeholder="new password"/>
        <div className={styles.changeBtnCont}>
            <button onClick={changePassword}>change</button>
        </div>
    </div>
    </div>
</section>
}
export default Activity