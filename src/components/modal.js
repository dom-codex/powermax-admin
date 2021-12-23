import React from "react";
import {Modal} from "antd"
import styles from "../css/modal.module.css"
const title = <div className={styles.modalTitle}>
<p>Edit Profit</p>
</div>
const FooterBtn = (props)=>{
    return <div className={styles.btnCont}>
        <button onClick={()=>props.clickHandler(false,true)}>close</button>
        <button className={styles.saveBtn} onClick={props.updateHandler}>save</button>
    </div>
}
const CustomModal  = (props)=>{
return <Modal className={styles.modal} visible={props.show} closable={false} title={title} footer = {<FooterBtn clickHandler={props.setVisibility} updateHandler={props.updateHandler}/>}>
<div>
    <input type={"number"} onInput={(e)=>props.inputHandler(e.target.value)}  value={props.profit}/>
</div>
</Modal>
}
export default CustomModal