import React, { useEffect, useState } from "react";
import { DollarCircleOutlined, RiseOutlined } from "@ant-design/icons"
import styles from "../css/userdetails.module.css"
import Nav from "../components/navbar"
import CustomModal from "../components/modal";
import Loader from "../components/loader";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../utils/storage"
const UserInfo = (props) => {
    return <div className={styles.detailsItem} style={props.reverse && { flexDirection: "row-reverse", justifyContent: "flex-end" }}>
        <div style={props.reverse && { marginLeft: "14px" }}>
            <p className={styles.info}>{props.info}</p>
            <p>${props.amount}</p>
            {props.showEdit && <div><button onClick={() => props.toggleModal(true)} className={styles.editBtn}>Edit</button></div>
            }
        </div>
        <div>
            <props.icon className={styles.icon} />
        </div>
    </div>
}
const fetchUserData = (adminId, userId) => {
    return fetch(`${process.env.REACT_APP_BACKEND}/admin/get/user?adminId=${adminId}&userId=${userId}`)
}
const initScreen = async (userId, navigate) => {
    //get data
    const data = getData()
    if (!data) {
        alert("please login ")
        return navigate("/login")
    }
    //fetch data
    const response = await fetchUserData(data.adminId, userId)
    const status = response.status
    if (status > 202) return alert("an error occurred,kindly reload page")
    const body = await response.json()
    return {
        ...data,
        ...body
    }
}
const UserDetails = (props) => {
    const params = useParams()
    const [modalOpen, setModalVisibility] = useState(false)
    const [loading, setLoader] = useState(true)
    const [data, setData] = useState({})
    const [profit, setProfit] = useState(0)
    const navigate = useNavigate()
    const inputHandler = (input) => {
       
        if (input >= 100000) {
            alert("you have exceeded the limit")
            setProfit(100000)
            return
        }
        setProfit(input)
    }
    const upgradeProfit = async () => {
        setLoader(true)
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/update/user/profit`, {
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({
                userId: params.userId,
                adminId: data.adminId,
                amount: profit
            })
        })
        
        const status = response.status
        if (status > 202) return alert("an error occured")
        const body = await response.json()
        setData((prevData) => {
            return {
                ...prevData,
                profit: parseInt(prevData.profit) + parseInt(profit)
            }
        })
        setProfit(1)
        setModalVisibility(false)
        setLoader(false)
    }
    useEffect(async () => {
        const data = await initScreen(params.userId, navigate)
        setData(data)
        setLoader(false)
    }, [])
    return <section>
        <div>
            {loading && <Loader />}
            <Nav />
            <div className={styles.detailsMain}>
                <div className={styles.imgCont}>
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.userName}>{data.name}</p>
                    <p className={styles.userEmail}>{data.email}</p>
                </div>
                <div className={styles.details}>
                    <UserInfo icon={DollarCircleOutlined} info={"Current Deposit"} amount={data.deposit} />
                    <UserInfo icon={RiseOutlined} info={"Current Profit"} amount={data.profit} showEdit={true} reverse={true} toggleModal={setModalVisibility} />
                </div>
                <div className={styles.modalCont} style={modalOpen ? { display: "block" } : { display: "none" }} >
                    {/*MODAL*/}
                    {modalOpen && <CustomModal
                    updateHandler={upgradeProfit}
                     setVisibility={
                        (visible, reset = false) => {
                            if (reset) {
                                setProfit(data.profit)
                                setModalVisibility(visible)
                            } else {
                                setModalVisibility(visible)

                            }

                        }
                    } inputHandler={inputHandler} show={true} profit={profit} />}
                </div>
            </div>
        </div>
    </section>
}
export default UserDetails