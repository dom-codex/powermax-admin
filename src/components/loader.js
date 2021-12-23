import React from "react"
const Loader = (props)=>{
return <div style={{
    position:"fixed",
    top:0,
    left:0,
    height:"100%",
    width:"100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#282c34",
    zIndex:100
}}>
    <p>Loading...</p>
</div>
}
export default Loader