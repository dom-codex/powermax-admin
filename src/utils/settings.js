import { getData } from "./storage";

const createAdmin = async(data)=>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/auth/create`,{
        method:"POST",
        body:JSON.stringify({
            ...data,
            adminId:getData().adminId
        }),
        headers:{
            "Content-type":"application/json"
        }
    })
    const status = response.status
    const body = await response.json()
    if(status>201)return alert(body.message); else alert(body.message)
}
const changePassword=async(data)=>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/auth/change/password`,{
        method:"POST",
        body:JSON.stringify({
            adminId:getData().adminId,
            ...data
        }),
        headers:{
            "Content-type":"application/json"
        }
    })
    const status =  response.status
    const body =await response.json()
    if(status>201)return alert(body.message); else alert(body.message)
}
export {createAdmin,changePassword}