import React from "react";
import Badge from "./badge";
import styles from "../css/table.module.css"
import { useNavigate } from "react-router-dom";
const Table = props=>{
const heading = props.heading  
const rows =props.rows
const tableType = props.table
const navigate = useNavigate()
return <section>
    <div className={styles.tableContainer}>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th style={{minWidth:"50px"}} className="sn">S/N</th>
                    {heading.map((text,i)=><th key={i}>{text}</th>)}
                 
                </tr>
            </thead>
               {tableType==="user"&&<UserRow navigate={navigate} rows={rows}/>}
               {tableType==="transaction"&&<TransactionRow rows={rows}/>}
               {tableType==="withdrawal"&&<WithdrawalRow rows={rows}/>}
        </table>
    </div>
</section>
}
const UserRow = props=>{
    const {rows,navigate} = props
    console.log(rows)
    return <tbody>
        {rows.map((row,i)=><tr key={i}>
            <td style={{minWidth:"50px"}}>{i+1}</td>
            <td className={styles.trname} onClick={()=>navigate(`/user/${row._id}`)}>{row.name}</td>
            <td>{row.email}</td>
            <td><Badge status={row.status}/></td>
        </tr>)}
    </tbody>
}
const TransactionRow = props=>{
    const {rows} = props
    return <tbody>
        {
            rows.map(({name,email,amount,transactionType:type,createdAt:date},i)=><tr key={i}>
                <td style={{minWidth:"50px"}}>{i+1}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{amount}</td>
                <td><Badge status={type}/></td>
                <td>{date.split("T")[0]}</td>
            </tr>)
        }
    </tbody>
}
const WithdrawalRow = props=>{
    const {rows} = props
    return <tbody>
        {
            rows.map(({name,email,amount,status},i)=><tr key={i}>
                <td style={{minWidth:"50px"}}>{i+1}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{amount}</td>
                <td><Badge status={status}/></td>
        
            </tr>)
        }
    </tbody>
}
export default Table