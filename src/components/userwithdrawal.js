import React,{useContext} from "react"
import Table from "./table"
import styles from "../css/user.tables.module.css"
import { AppContext } from "../App"
import Loading from "./loading"

const filterWithdrawals = (query,setWithdrawals,originalWdList)=>{
    if(query.length<=0){
        setWithdrawals(originalWdList)
        return
    }
    const filtered =originalWdList.filter((wd)=>wd.email.match(query))
    setWithdrawals(filtered)
        
}
const UserWithdrawal = (props)=>{
    const heading = ["NAME","EMAIL","AMOUNT","STATUS"]
    const rows = props.withdrawals //[{name:"Dominic",email:"dominic@gmail.com",amount:"$2300",status:"approved"},{name:"Dominic",email:"dominic@gmail.com",amount:"$2300",status:"pending"},{name:"Dominic",email:"dominic@gmail.com",amount:"$2300",status:"declined"}]
    const {wdquery,setWdQuery,setWithdrawals,originalWithdrawalsList,fetchWithdrawals,loadingWithdrawals} = useContext(AppContext)
return <section>
      <div className={styles.container}>
            <div className={styles.searchcontainer}>
                <div className={styles.titleContainer}>
                    <span className="material-icons"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></span> &nbsp;
                    <span>Withdrawals</span>
                </div>
                <div className={styles.inputContainer}>
                    <input type={"text"} placeholder="user email" value={wdquery} onChange={(e)=>{
                        setWdQuery(e.target.value)
                        filterWithdrawals(e.target.value,setWithdrawals,originalWithdrawalsList)
                    }} />
                    <button onClick={fetchWithdrawals}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg></button>
                </div>
            </div>
            <div style={{position:"relative"}}>
               {loadingWithdrawals&&<Loading/>}
                <Table heading={heading} rows={rows} table={"withdrawal"} />
            </div>
        </div>
</section>
}
export default UserWithdrawal