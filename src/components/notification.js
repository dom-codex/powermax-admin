import React from "react"
import styles from "../css/notification.module.css"
const Notification = props =>{
    const notifications = [{subject:"Login Activity",date:"12-31 JAN",time:"10:05",text:"A login activity use noticed from an admin with emaill address test@test.com at 10:05 "},
    {subject:"Login Activity",date:"12-31 JAN",time:"10:05",text:"A login activity use noticed from an admin with emaill address test@test.com at 10:05 "},
    {subject:"Login Activity",date:"12-31 JAN",time:"10:05",text:"A login activity use noticed from an admin with emaill address test@test.com at 10:05 "}]
return <section>
    <div className={styles.container}>
        <h1>ACTIVITY</h1>
        <div className={styles.rows}>
            {notifications.map(({subject,date,time,text},i)=>
            <div key={i}><NotificationRow subject={subject} date={date} time={time} text={text}/></div>)}
        </div>
    </div>
</section>
}
const NotificationRow = props=>{
    return <div className={styles.card}>
        <div className={styles.cardname}>
            {/* MAIN FLEX CONTAINER*/}
            <div className={styles.timeContainer}>
               {/*DATE CONTAINER */} 
               <div className={styles.time}>
                     <p>{props.date}</p>
               <p>{props.time}</p>   
               </div>
          
            </div>
            <div className={styles.textContainer}>
                <h2>{props.subject}</h2>
                <p >{props.text}</p>
            </div>
        </div>
    </div>
}
export default Notification