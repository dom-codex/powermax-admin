import React,{useState} from "react";
import styles from "../css/utility.module.css"
const UtilityModal = (props)=>{
    const [price,setPrice] = useState("")
    const hideModal = ()=>{
        props.handler(false)
    }
    const deleteHandler = ()=>{
        props.deleteService()
        hideModal()
    }
    const updateHandler = ()=>{
        props.updatePrice(price)
        setPrice("")
        hideModal()
    }
    return <div className={styles.main}>
        <div className={styles.container}>
            <div className={styles.titleContainer}><h2>{props.deleteMode=="delete"?"Are you sure":"Edit Price"}
            </h2>
            <button onClick={hideModal}>X</button>
            </div>
            {props.deleteMode=="delete"?<div className={styles.btnCont}>
                <p>You want to delete this service?</p>
                <div className={styles.cBtn}>
                    <button onClick={hideModal}>No</button>
                    <button onClick={deleteHandler}>Yes</button>
                </div>
            </div>:<div className={styles.btnCont}>
                <input type={"number"} placeholder={"price"} value={price} onChange={(e)=>setPrice(e.target.value)}/>
                <button onClick={updateHandler}>update</button>
            </div>}
        </div>
    </div>
}
export default UtilityModal;