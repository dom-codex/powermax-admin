
import {getData} from "./storage"
const fetchDetails = (url)=>{
    return fetch(url)
}
const getUsers = async(navigate,setLoader)=>{
setLoader(true)
const data = getData()
if(!data && navigate!=null){
    return navigate("/login")
}else if(!data && navigate ==null)return []
const response = await fetchDetails(`${process.env.REACT_APP_BACKEND}/admin/get/users?adminId=${data.adminId}`)
const body = await response.json()

setLoader(false)
return body.users
}

const getTransaction = async(navigate,setLoader)=>{
    
    setLoader(true)
    const data = getData()
    if(!data && navigate!==null){
        return navigate("/login")
    }else if (!data && navigate==null)return []
    const response = await fetchDetails(`${process.env.REACT_APP_BACKEND}/admin/get/transactions?adminId=${data.adminId}`)
    const body = await response.json()
    setLoader(false)
    return body.transactions
}
const getWithdrawals = async(navigate,setLoader)=>{
    setLoader(true)
const data = getData()
if(!data&&navigate!=null){
    return navigate("/login")
}else if (!data && navigate==null)return []
const response = await fetchDetails(`${process.env.REACT_APP_BACKEND}/admin/get/withdrawals?adminId=${data.adminId}`)
const body = await response.json()
setLoader(false)
return body.withdrawals
}
export {getTransaction,getWithdrawals,getUsers}