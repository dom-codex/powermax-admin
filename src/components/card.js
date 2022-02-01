import React from "react"
const style={
    height:"var(--card-height)",
    overflowY:"scroll",
    boxShadow:"0px 0px 6px #ccc",
    backgroundColor:"#fff",
    borderRadius:"6px",
    overflow:"hidden"
}
const Card = props=>{
return <div style={style} className={props.cardStyle}>
    {props.children}
</div>
}
export default Card