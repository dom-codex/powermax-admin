import React,{useContext} from "react"
import Table from "./table"
import styles from  "../css/user.tables.module.css"
import { AppContext } from "../App"
import Loading from "./loading"
const filterUser = (query,setUsers,originalUsersList)=>{
    if(query.length<=0){
        setUsers(originalUsersList)
        return
    }
    const filtered =originalUsersList.filter((user)=>user.email.match(query))
    setUsers(filtered)
        
}
const UserTable = props => {
   const heading =  ["NAME","EMAIL","STATUS"]
   const rows = props.users//[{name:"dominicdlfkdlfkdfldkdlfkfldkdflkdflkdldfkldfldkfldkdflkfdlfkdldkflfkldfkldfkdflkdflfkdlfkldfkdflkfdlkfdldfk",email:"d@gmail.com",status:"activated"},{name:"dominicdlfkdlfkdfldkdlfkfldkdflkdflkdldfkldfk",email:"d@gmail.com",status:"activated"},{name:"dominicdlfkdlfkdfldkdlfkfldkdflkdflkdldfkldfk",email:"d@gmail.com",status:"activated"}]
    const {userquery,setUserQuery,setUsers,originalUsersList,fetchUsers,loadingUsers} = useContext(AppContext)
    return <section>
        <div className={styles.container}>
            <div className={styles.searchcontainer}>
                <div className={styles.titleContainer}>
                    <span><svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span> &nbsp;
                    <span>Users</span>
                </div>
                <div className={styles.inputContainer}>
                    <input type={"text"} placeholder={"user email"} value={userquery} onChange={(e)=>{
                        setUserQuery(e.target.value)
                        filterUser(e.target.value,setUsers,originalUsersList)
                        }} />
                    <button onClick={fetchUsers}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg></button>
                </div>
            </div>
            <div style={{position:"relative"}}>
              {loadingUsers&&  <Loading/>}
                <Table heading={heading} rows={rows} table={"user"}/>
            </div>
        </div>
    </section>
}
export default UserTable