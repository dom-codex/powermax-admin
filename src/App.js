import React, { createContext, useState,useEffect } from "react"
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import DashBoard from './pages/dashboard';
import Services from './pages/services';
import Settings from './pages/settings';
import SideNav from './components/sidenav';
import User from './pages/user';
import Login from './pages/login';
import { getTransaction, getUsers, getWithdrawals } from "./utils/dashboard";
const originalUsersList = []
const originalTransactionsList = []
const originalWithdrawalsList = []
const setOriginalUsersList = (data) => {
  originalUsersList.push(...data)
}
const setOriginalTxList = (data) => {
  originalTransactionsList.push(...data)
}
const setOriginalWdList = (data) => {
  originalWithdrawalsList.push(...data)
}
export const AppContext = createContext(null)
const App = () => {
  const [transactions, setTransactions] = useState([])
  const [withdrawals, setWithdrawals] = useState([])
  const [users, setUsers] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([])
  const [showSideNav, setShowSideNav] = useState(false)
  const [userquery, setUserQuery] = useState("")
  const [txquery, setTxQuery] = useState("")
  const [wdquery, setWdQuery] = useState("")
  const [loadingUsers,setLoadingUsers] = useState(true)
  const [loadingTransactions,setLoadingTransactions] = useState(true)
  const [loadingWithdrawals,setLoadingWithdrawals] = useState(true)
  const fetchUsers = async () => {
    const response = await getUsers(null, () => { })
    originalUsersList.splice(0, originalUsersList.length)
    setUsers(response)
  }
  const fetchTransactions = async () => {
    const response = await getTransaction(null, () => { })
    originalTransactionsList.splice(0, originalTransactionsList.length)
    setTransactions(response)
  }
  const fetchWithdrawals = async () => {
    const response = await getWithdrawals(null, () => { })
    originalWithdrawalsList.splice(0, originalWithdrawalsList.length)
    setWithdrawals(response)
  }
  const Values = {
    transactions,
    withdrawals,
    users,
    filteredUsers,
    filteredTransactions,
    filteredWithdrawals,
    showSideNav,
    userquery,
    txquery,
    wdquery,
    originalUsersList,
    originalTransactionsList,
    originalWithdrawalsList,
    loadingTransactions,
    loadingUsers,
    loadingWithdrawals,
    setLoadingWithdrawals,
    setLoadingUsers,
    setLoadingTransactions,
    fetchUsers,
    fetchTransactions,
    fetchWithdrawals,
    setTransactions,
    setWithdrawals,
    setUsers,
    setFilteredUsers,
    setFilteredTransactions,
    setFilteredWithdrawals,
    setShowSideNav,
    setTxQuery,
    setWdQuery,
    setUserQuery,
    setOriginalUsersList,
    setOriginalWdList,
    setOriginalTxList
  }
  useEffect(()=>{
    windowSizeChange(setShowSideNav)
    if(document.documentElement.clientWidth>=960)setShowSideNav(true)
  },[])
  return (<AppContext.Provider value={Values}>

    <div className="App">
      {showSideNav && <SideNav handler={setShowSideNav} />}
      <div className="secondCont">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="services" element={<Services />} />
            <Route path="settings" element={<Settings />} />
            <Route path="user/:userId" element={<User />} />
            <Route path="*" element={
              <section>
                <div>
                  <p style={{ textAlign: "center" }}>PAGE NOT FOUND</p>
                </div>
              </section>
            } />
          </Routes>
        </BrowserRouter>
      </div>

    </div>    </AppContext.Provider>



  );
}

export default App;
const windowSizeChange = (showSideNav)=>{
  window.addEventListener("resize",(e)=>{
    const size = document.documentElement.clientWidth;
    if(size>=960){
      showSideNav(true)
    }
    else{
      showSideNav(false)
    }
  })
}