import { getData } from "./storage"
const fetchUser = async(userId)=>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/get/user?userId=${userId}&adminId=${getData().adminId}`)
    switch(response.status){
        case 404:{
            alert("account does not exist")
            return
        }
        case 500:{
            alert("server error,try again")
            return
        }
        default:{
            console.log("success")
        }
    }
    const body = await response.json()
    return body
}
const updateProfit = async(profit,userId)=>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/update/user/profit`,{
        method:"POST",
        body:JSON.stringify({
            amount:profit,
            adminId:getData().adminId,
            userId:userId
        }),
        headers:{
            "Content-type":"application/json"
        }
    })
    const status = response.status
    const body = await response.json()
    if(status==200)alert(body.message)
    else return alert(body.message)
    return body.profit
}
const updateAccountStatus = async(userId,status)=>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/update/user/status`,{
        method:"POST",
        body:JSON.stringify({
            userId:userId,
            adminId:getData().adminId,
            status:status=="activated"?"deactivated":"activated"
        }),
        headers:{
            "Content-type":"application/json"
        }
    })
    const code = response.status;
    const body = await response.json()
    if(code == 200)alert(body.message)
    else return alert(body.message)
    return body.status
}
const deleteAccount = async(userId)=>{
    const response = await fetch()
}
const getTotalDeposit = (transactions)=>{
    let total = 0
    if(!transactions)return 0
    transactions.forEach(tx => {
        total+=tx.amount
    });
    return total
}
export {fetchUser,getTotalDeposit,updateProfit,updateAccountStatus}