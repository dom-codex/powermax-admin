import React,{useContext} from "react"
import Table from "./table"
import styles from "../css/user.tables.module.css"
import { AppContext } from "../App"
import Loading from "./loading"
const filtertx = (query,setTransactions,originalTxList)=>{
    if(query.length<=0){
        setTransactions(originalTxList)
        return
    }
    const filtered =originalTxList.filter((tx)=>tx.email.match(query))
    setTransactions(filtered)
        
}
const UserTransactions = props => {
    const heading = ["NAME", "EMAIL", "AMOUNT", "TYPE", "DATE"]
    const rows = props.transactions//[{ name: "Dominic", email: "dominic@gmail.com", amount: "$500", type: "investment", date: "2020-01-20" }, { name: "Dominic", email: "dominic@gmail.com", amount: "$500", type: "bot", date: "2020-01-20" }, { name: "Dominic", email: "dominic@gmail.com", amount: "$500", type: "investment", date: "2020-01-20" }, { name: "Dominic", email: "dominic@gmail.com", amount: "$500", type: "mentorship", date: "2020-01-20" },]
    const {originalTransactionsList,setTxQuery,txquery,setTransactions,fetchTransaction,loadingTransactions} = useContext(AppContext)
    return <section>
        <div className={styles.container}>
            <div className={styles.searchcontainer}>
                <div className={styles.titleContainer}>
                    <span ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span>
                    <span>Transactions</span>
                </div>
                {props.fromDashboard&&<div className={styles.inputContainer}>
                    <input type={"text"} placeholder="user email" value={txquery} onChange={(e)=>{
                        setTxQuery(e.target.value)
                        filtertx(e.target.value,setTransactions,originalTransactionsList)
                    }} />
                    <button onClick={fetchTransaction}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg></button>
                </div>}
            </div>
            <div style={{position:"relative"}}>
                {loadingTransactions && props.fromDashboard&& <Loading/>}
                <Table heading={heading} rows={rows} table={"transaction"} />
            </div>
        </div>
    </section>
}
export default UserTransactions