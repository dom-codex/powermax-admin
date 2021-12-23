const saveData =  (data)=>{
localStorage.setItem("name",data.name);
localStorage.setItem("email",data.email);
localStorage.setItem("hash",data.adminId);
}

const getData = ()=>{
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    const adminId = localStorage.getItem("hash")
    if(name ==null || email==null || adminId==null)return false
    else return {
        name,
        email,
        adminId
    }
}
const clearData = ()=>{
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("hash");
}
export {saveData,getData,clearData }