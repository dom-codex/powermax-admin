import React,{useContext,useState,useEffect} from "react"
import Card from "../components/card"
import Nav from "../components/nav"
import UserTable from "../components/userTable"
import UserTransactions from "../components/usertransactions"
import UserWithdrawal from "../components/userwithdrawal"
import Notification from "../components/notification"
import styles from "../css/dashboard.module.css"
import { getTransaction, getUsers, getWithdrawals } from "../utils/dashboard"
import { useNavigate } from "react-router-dom"
import { getData } from "../utils/storage"
import { AppContext } from "../App"

const DashBoard = props => {
    const navigate = useNavigate()
    const {setTransactions,setWithdrawals,setUsers,transactions,withdrawals,users,setOriginalUsersList,setOriginalTxList,setOriginalWdList,setLoadingUsers,setLoadingTransactions,setLoadingWithdrawals} = useContext(AppContext)
    useEffect(async()=>{
    const transactions = await getTransaction(navigate,setLoadingTransactions)
    const users = await getUsers(navigate,setLoadingUsers)
    const withdrawals = await getWithdrawals(navigate,setLoadingWithdrawals)
    
    setTransactions(transactions)
    setOriginalTxList(transactions)
    setUsers(users)
    setOriginalUsersList(users)
    setWithdrawals(withdrawals)
    setOriginalWdList(withdrawals)
    },[])
    return <section>
        <div>
            <Nav />
        </div>
        <div className={styles.dashboard}>

            <div className={styles.heading}>
                <h1> Dashboard</h1>
                <p>Hello! {getData().name}</p>
                </div>
            <div className={styles.firstContainer}>
                <div className={styles.card}>
                    <Card cardStyle={styles.cardStyle}>
                        <UserTable users={users} />
                    </Card>
                </div>

                <div className={styles.card}>
                    <Card cardStyle={styles.cardStyle}>
                        <UserTransactions fromDashboard={true} transactions={transactions} />
                    </Card>
                </div>
            </div>
            <div>
                <div className={`${styles.card} ${styles.w}`}>
                    <Card>
                        <UserWithdrawal withdrawals={withdrawals} />
                    </Card>
                </div>
                <div className={styles.card}>
                   {false&& <Notification />}
                </div>
            </div>
        </div>
    </section>
}
export default DashBoard