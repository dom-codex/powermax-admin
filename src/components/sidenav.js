import React from "react";
import styles from "../css/sidenav.module.css"
const SideNav = props=>{
return <section className={styles.mainContainer} onClick={()=>props.handler(false)}>
    <div className={styles.subContainer}>
        <div className={styles.header}>
            <h3>POWERMAX</h3>
        </div>
        <div className={styles.body}>
            <div>
                <a href="/dashboard">Dashboard</a>
            </div>
            <div>
                <a href="/services">Services</a>
            </div>
            <div>
                <a href="/settings">Settings</a>
            </div>
        </div>
    </div>
</section>
}
export default SideNav