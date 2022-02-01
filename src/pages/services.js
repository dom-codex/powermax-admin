import React,{useState,useEffect} from "react"
import Nav from "../components/nav"
import logo from "../logo.svg"
import styles from "../css/service.module.css"
import ServiceModal from "../components/servicemodal"
import { filterServicesByType,fetchServices,createNewService,deleteService,editServicePrice } from "../utils/services" 
import UtilityModal from "../components/utilitymodal"
   const originalList = []

const Services = props=>{
    const benefits = ["100%","100%","100%","100%","100%","100%",]
  //  const service = [{},{name:"MAX200-S",price:"$100",descriptions:benefits},{name:"MAX200-S",price:"$100",descriptions:benefits},{name:"MAX200-S",price:"$100",descriptions:benefits},{name:"MAX200-S",price:"$100",descriptions:benefits,serviceType:"bots"},]
    const [type,setType] = useState("bot")
    const [services,setServices] = useState([{}])
    const [showCreateModel,setShowCreateModal]=useState(false)
    const [loading,setLoading] = useState(false)
    const [mode,setMode] = useState("")
    const [showUtilModal,setShowUtilModal] = useState(false)
    const [serviceId,setServiceId] = useState("")
    const setTypeHandler=(e)=>{
        const stype = e.target.innerHTML.toLowerCase()
        setType(stype)
        const data = filterServicesByType(stype,originalList)
        setServices([{},...data])

    }
    const fetchAllServices = async()=>{
        const allServices = await fetchServices()
        originalList.push(...allServices)
        const data = filterServicesByType(type,allServices)
        setServices([{},...data])
    }
    const createService =  async(service)=>{
        setShowCreateModal(false)
        const newService = await createNewService(service)
        originalList.push(newService)
        const data = filterServicesByType(type,originalList)
        setServices([{},...data])
    }
    const deleteHandler = async()=>{
        const deleted = await deleteService(serviceId)
        if(!deleted)return
const newServices = originalList.filter(service=>service._id !=serviceId)
       originalList.splice(0,originalList.length)
       originalList.push(...newServices)
       const data = filterServicesByType(type,originalList)
       setServices([{},...data])
       setServiceId("")
    }
    const updateHandler = async(price)=>{
        const updated = await editServicePrice(serviceId,price);
        if(!updated)return
        originalList.forEach(service=>{
            if(service._id == serviceId){
                service.price = price
            }
        })
        const data = filterServicesByType(type,originalList)
        setServices([{},...data])
        setServiceId("")
    }
    const showModal = (modalMode)=>{
       setMode(modalMode)
       setShowUtilModal(true)
    }
    useEffect(()=>{
        fetchAllServices()
    },[])
return <section>
   {showCreateModel && <ServiceModal createService={createService} title={"New Service"} handler={setShowCreateModal}/>}
   {showUtilModal&&<UtilityModal handler={setShowUtilModal} updatePrice={updateHandler} deleteMode={mode} deleteService={deleteHandler}/>}
    <div><Nav/></div>
    <div className={styles.container}>
        <div><h1>Services</h1></div>
        <div>
            <div className={styles.tabBtns}>
                <button onClick={setTypeHandler} className={type=="bot"?styles.selectedType:""}>BOT</button>
                <button onClick={setTypeHandler} className={type=="investment"?styles.selectedType:""}>INVESTMENT</button>
                <button onClick={setTypeHandler} className={type=="mentorship"?styles.selectedType:""}>MENTORSHIP</button>
            </div>
            <div className={styles.cardContainer}>
                {services.map(({name,price,descriptions,_id},i)=>{
                    if(i==0){
                        return <div key={i}><AddService pos={i} handler={setShowCreateModal}/></div>
                    }
                return <div className={styles.cardCont} key={i}>
                    <ServiceCard showModal={showModal} serviceId={_id} setServiceId={setServiceId} pos={i} planName={name} price={price} benefits={descriptions} />
                </div>})}
            </div>
        </div>
    </div>
</section>
}
const AddService = props=>{
    return <div onClick={()=>props.handler(true)} className={`${styles.cardCont} ${styles.addService}`}>
        <p>New Service</p>
    </div>
}
const ServiceCard = props=>{
    const {setServiceId,showModal} = props
    return <div>
        <div className={styles.cardHeader}>
            <div>
                <div className={styles.cardImg}>
                    <img src={logo} alt="app logo"/>
                </div>
            </div>
            <div>
                <p className={styles.planName}>{props.planName}</p>
            </div>
        </div>
        <div className={styles.body}>
        <div style={{minHeight:"150px"}}>
            <h2>{props.price}</h2>
            {props.benefits.map((benefit,i)=><p key={i} className={styles.benefit}>{benefit}</p>)}
        </div>
        <div className={styles.editBtnCont}>
            <button onClick={()=>{
                setServiceId(props.serviceId)
                showModal("edit")}}>Edit Price</button>
            <button onClick={()=>{
                setServiceId(props.serviceId)
                showModal("delete")
                }} className={styles.deleteBtn}>Delete</button>
        </div>
        </div>
    </div>
}
export default Services