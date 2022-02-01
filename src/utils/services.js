import { getData } from "./storage"
const fetchServices = async()=>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/get/services?adminId=${getData().adminId}`)
    const status = response.status
    const body = await response.json()
    if(status>201)return alert(body.message)
    return body.services
}
const createNewService = async(data)=>{
const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/new/service`,{
    method:"POST",
    body:JSON.stringify({
        adminId:getData().adminId,
        ...data
    }),
    headers:{
        "Content-type":"application/json"
    }
})
const status = response.status
const body = await response.json()
if(status>201)return alert(body.message)
return body.service
}
const filterServicesByType = (type,allServices)=>{
const services = allServices.filter((service)=>service.serviceType.toString()==type.toString())
return services
}
const deleteService = async(serviceId)=>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/update/delete/service`,{
        method:"POST",
        body:JSON.stringify({
            serviceId,
            adminId:getData().adminId
        }),
        headers:{
            "Content-type":"application/json"
        }
    })
    const status = response.status
    const body = await response.json()
    if(status>201){
        alert(body.message)
        return false
    } 
    return true
}
const editServicePrice = async(serviceId,price)=>{
const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/update/service/price`,{
    method:"POST",
    body:JSON.stringify({
        serviceId,
        adminId:getData().adminId,
        price:price
    }),
    headers:{
        "Content-type":"application/json"
    }
})
const status = response.status
const body = await response.json()
if(status >201){ alert(body.message);return false}
return true;
}
export {fetchServices,filterServicesByType,createNewService,deleteService,editServicePrice}