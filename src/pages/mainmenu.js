import React, { useState, useEffect } from "react"
import Nav from "../components/navbar"
import Jumbo from "../components/jumbo"
import Activity from "../components/activitiy"
import UserTable from "../components/userTable";
import Loader from "../components/loader";
import { getData } from "../utils/storage"
import { useNavigate } from "react-router-dom"
const initScreen = async(navigate) => {
    //get data 
    const data = getData()   
     //check if data is false or not
     console.log(data)
    if (!data) {
        alert("you are not logged in")
        return navigate("/login")
    }
    //fetch details from backend
    const response = await fetchData(data.adminId)
    const status = response.status
    if(status>202)return alert("an error occurred,kindly refresh the page")
    const body  = await response.json()
    //init screen
    return {
        ...data,
        users:body.users
    }
}
const fetchData = (id)=>{
return fetch(`${process.env.REACT_APP_BACKEND}/admin/get/users?adminId=${id}&page=1`)
}
const MainMenu = (props) => {
    const [loading, setLoader] = useState(true)
    const [name,setName] = useState("")
    const [users,setUsers] = useState([])
    const navigate = useNavigate()
    const navigateToDetails = (userId)=>{
        navigate(`/user/${userId}`)
    }
    useEffect(async() => {
        const {name,users} = await initScreen(navigate)
        setName(name)
        setLoader(false)
        setUsers(users)

    }, [])

    return <section>
        {loading && <Loader />}
        <Nav />
        <Jumbo name={name} />
        <UserTable data={users} goToUserDetails={navigateToDetails} />
        <Activity showLoader={setLoader} />
    </section>
}
export default MainMenu