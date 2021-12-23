import React from "react";
import { Table,Space } from "antd";
import styles from "../css/usertable.module.css"
const UserTable = (props)=>{
    const data = [
        {
            name:"juliet",
            email:"test@gmail.com",
            deposit:"$600",
            profit:"$300"
        }
    ] 
   
    const style = {
        backgroundColor:"rgba(0,0,0,.65)",
        padding:8
    }
    const columns = [
        {
            title:<p style={style}>Name</p>,
            dataIndex:"name",
            key:"name",
            render:(text)=><Space size={"middle"}>
              
                <p className={styles.tableItem}>{text}</p>
            </Space>
        },
        {
            title:<p style={style}>Email</p>,
            dataIndex:"email",
            key:"email",
            render:(text)=><Space size={"middle"}>
                <p className={styles.tableItem}>{text}</p>
            </Space> 
        },
        {
         
            title:<p style={style}>Deposit</p>,
            dataIndex:"deposit",
            key:"deposit",
            render:(text)=><Space size={"middle"}><p className={styles.tableItem}>{text}</p></Space>
        },
        {
            title:<p style={style}>Profit</p>,
            dataIndex:"profit",
            key:"profit",
            render:(text)=><Space size={"middle"}>
                <p className={styles.tableItem}>{text}</p>
            </Space>
        },{
            title:<p style={style}>Action</p>,
            key:"action",
            dataIndex:"userId",
            render:(text)=><Space size={"middle"}>
            <button onClick={()=>props.goToUserDetails(text)} className={`${styles.tableItem} ${styles.btn}`}>View</button>
        </Space>
        }
    ]
   
return <section>
    <div>
        <p className={styles.clients}>CLIENTS</p>
        <div className={styles.tableMain}>
        <Table dataSource={props.data}  columns={columns} pagination={false}/></div>
    </div>
</section>
}
export default UserTable