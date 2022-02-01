import React from "react"
const getColor = (status)=>{
    switch(status.toLowerCase()){
        case "activated":{
          return "#78bb7b"  
        }
        case "deactivated":{
            return "#cc1f26"
        }
        case "investment":{
            return "#2615c0"
        }
        case "bot":{
            return "#f3a43c"
        }
        case "mentorship":{
            return "#20a5da"
        }
        case"approved":return "#78bb7b"
        case"pending":return "#f3a43c"
        case"declined":return "#ff6347"
    }
}
const style={
    borderRadius:"6px",
    padding:"4px",
    color:"#fff",
    fontSize:"0.65rem"
}
const Badge = props=>{
    const color = getColor(props.status)
return <div style={{...style,backgroundColor:color}}>
    {props.status}
</div>
}
export default Badge