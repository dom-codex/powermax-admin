const loginAdmin = async (email, password, setLoading) => {
    setLoading(true)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/admin/auth/login`, {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    const status = response.status
    const body = await response.json()
    setLoading(false)
    if (status != 200 && status != 201) {
        alert(body.message)
        return {
            canLogin: false
        }
    }
    return {
        canLogin: true,
        name: body.name,
        email: body.email,
        adminId: body.adminId
    }
}
export { loginAdmin }