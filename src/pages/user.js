import React,{useState,useEffect} from "react";
import Nav from "../components/nav";
import profilePic from "../logo.svg"
import styles from "../css/user.module.css"
import UserTransactions from "../components/usertransactions";
import { useParams } from "react-router-dom";
import { fetchUser,getTotalDeposit,updateProfit,updateAccountStatus } from "../utils/user";
const User = props => {
    const {userId} = useParams()
    const [user,setUser] = useState({name:"loading",email:"loading",phone:"loading",transactions:[]})
    const [editing,setEditing] = useState(false)
    const [profit,setProfit] = useState("")
    const [status,setStatus] = useState("")
    const getUser = async(cb)=>{
        const body = await fetchUser(userId)
        cb(body)
    }
    useEffect(()=>{
         getUser((body)=>{
           if(body!==null || body!==undefined){
            setUser(body)
            setStatus(body.status)
            setProfit(body.profit.toString())
        }  
        })
       
    },[])
    const updateProfitHandler = async()=>{
        const newProfit = await updateProfit(profit,userId)
        setProfit(newProfit.toString())
        setEditing(false)
    }
    const statusUpdateHandler = async()=>{
        const status = await updateAccountStatus(userId,status)
    }
    return <section>
        <Nav />
        <div className={styles.mainContainer}>
            <div>
                <h2 className={styles.title}>UserDetails</h2>
            </div>
            {false&&<div className={styles.actionBar}>
                <button>suspend</button>
                <button>delete</button>
            </div>}
            <div className={styles.userMainContainer}>
                <div className={styles.userInfoCard}>
                    <div><h2>Personal Info</h2></div>
                    <div className={styles.userInfoContainer}>
                        <div className={styles.cardImg}>
                            <img src={profilePic} alt="profileDoodle" />
                        </div>
                        <div className={styles.userInfo}>
                            <ul>
                                <li>
                                    <p className={styles.userName}>{user.name}</p>
                                </li>
                                <li>
                                    <p>{user.email}</p>
                                </li>
                                <li>
                                    <p>{user.phone}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.earnings}>
                        <div className={styles.deposits}>
                            <p className={styles.balanceTitle}>Total Deposit</p>
                            <p className={styles.balance}>${getTotalDeposit(user.transactions)}</p>
                        </div>
                        <div>
                            {!editing&&<div>
                            <p className={styles.balanceTitle}>Profit</p>
                            <p className={styles.balance}>${profit.length?profit:0} <button className={styles.editBtn} onClick={()=>setEditing(true)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button></p>
                            </div>}
                
                            {editing&&<div className={styles.profitSetter}>
                            <input type={"number"} placeholder="Set Profit" value={profit} onChange={(e)=>setProfit(e.target.value)} />
                            <button onClick={updateProfitHandler}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></button></div>}
                        </div>
                    </div>
                </div>
                <div className={styles.userTransaction}>
                <h3>Transaction History</h3>
                <hr/>
                <div>
                    <div>
                        <UserTransactions fromDashboard={false} transactions={user.transactions}/>
                    </div>
                </div>
            </div>
            </div>
            
        </div>
    </section>
}
export default User