import React from "react";
import styles from "../css/jumbo.module.css"
const Jumbo =(props)=>{
return <div className={styles.jumbo}>
    <p className={styles.greeting}>Hi {props.name}</p>
    <p className={styles.greeting2}>Welcome to POWERMAX dashboard</p>
</div>
}
export default Jumbo