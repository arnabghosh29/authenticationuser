import { useState } from "react"
import axiosInstance from "../api/axios"
import { useNavigate } from "react-router-dom"

const LoginCom = () => {
    let navigate = useNavigate()
    const [logindata, setLogindata] = useState({ email: "", password: "" })

    const handelChange = (e) => {
        const { name, value } = e.target
        setLogindata({ ...logindata, [name]: value })

    }
    const Submithandel = async (event) => {
        event.preventDefault();
        try {
            const res = await axiosInstance.post(
                "account/login/", {
                email: logindata.email,
                password: logindata.password
            }
            )
            if (res.status === 200) {
                alert("Login successful!");
                navigate("/list");
                const token = localStorage.setItem("x-access-token", res.data.access_token)
            }
        } catch (err) {
            if (err.response) {

                console.log("Error data", err.response.data);
                alert(err.response.data.detail || "Registration failed!");
            } else {
                console.error("Error:", err.message);
            }
        }
    }
    return (
        <>
            <form onSubmit={Submithandel}>
                <label>Email</label>
                <input type="email" name="email" onChange={handelChange}></input>
                <br></br>
                <label>Password</label>
                <input type="password" name="password" onChange={handelChange}></input>
                <button type="submit">Login</button>
            </form>
        </>
    )
}
export default LoginCom