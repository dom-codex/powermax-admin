import React,{useState} from "react"
import styles from "../css/servicemodal.module.css"
const ServiceModal = props => {
    const benefits = ["100%", "100%"]
    const [name,setName] = useState("")
    const [serviceType,setServiceType] = useState("")
    const [price,setPrice]=useState("")
    const [descriptions,setDescriptions] = useState([])
    const [description,setDescription] = useState("")
    const createHandler = ()=>{

        const service =  {
            name,
            serviceType,
            price,
            descriptions
        }
        props.createService(service)
    }
    const hideModal = ()=>{
        props.handler(false)
    }
    return <section className={styles.modalForm}>
        <div className={styles.mainForm}>
            <div className={styles.header}>
                <h1>{props.title}</h1>
            </div>
            <div className={styles.body}>
                <label>Service Name</label>
                <input type={"text"} placeholder="Ab" value = {name} onChange={(e)=>setName(e.target.value)} />
                <label>Service Type</label>
                <select placeholder="select service type"  onChange={(e)=>{
                    setServiceType(e.target.value)
                }}><option></option>
                    <option>Bot</option>
                    <option>Investment</option>
                    <option>Mentorship</option>
                </select>
                <label>Service Price</label>
                <input type={"number"} placeholder="0" value={price} onChange={(e)=>setPrice(e.target.value)} />
                <label>Service Benefits</label>
                <ul>
                    {descriptions.map((benefit, i) => <li key={i} >{benefit}</li>)}
                </ul>
                <div className={styles.benefitInput}>
                    <input type={"text"} placeholder={"Add a Benefit"} value={description} onChange={(e)=>{setDescription(e.target.value)
                    }} />
                    <button onClick={()=>{
                        setDescriptions((prevdata)=>[...prevdata,description])
                        setDescription("")
                    }}>add</button>
                </div>
                <div className={styles.createBtnCont}>
                    <button onClick={createHandler}>Create</button>
                </div>
                <div className={styles.closeBtn}><button onClick={hideModal}>Close</button></div>
            </div>
        </div>
    </section>
}
export default ServiceModal