import React from "react";
const Loading = props=>{
    const styles = {
        main:{
            position:"absolute",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            backgroundColor:"#fff"
        },
        container:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }
    }
return <section style={styles.main}>
    <div style={styles.container}>
        <p>Loading...</p>
    </div>
</section>
}
export default Loading;