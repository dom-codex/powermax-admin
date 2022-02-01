import React from "react"
const IconBtn = props=>{
return <div>
    <button onClick={props.clickHandler}>
        <span className="material-icons">{props.icon}</span>
    </button>
</div>
}
export default IconBtn