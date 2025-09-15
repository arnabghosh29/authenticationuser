import React from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("x-access-token")
            const refreshToken = localStorage.getItem("refresh-token")

            if (!token || !refreshToken) return navigate("/login")

            await axiosInstance.post(
                "account/logout/",
                { refresh: refreshToken },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );



            localStorage.removeItem("refresh-token");

            alert("Logout successfully");
            navigate("/login");
        } catch (err) {
            console.log(err);

        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
