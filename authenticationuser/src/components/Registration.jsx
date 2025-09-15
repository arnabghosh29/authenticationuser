import React, { useState } from "react";

import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    let navigate = useNavigate()

    const [input, setInput] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
        role: "",
    });

    const handleForm = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                username: input.username,
                first_name: input.firstname,
                last_name: input.lastname,
                email: input.email,
                password: input.password,
                password_confirm: input.confirmpassword,
                role: input.role,
            };

            const res = await axiosInstance.post("account/register/", body);

            if (res.status === 200 || res.status === 201) {
                alert("Registration successful");
                navigate("/login");
            }
        } catch (err) {
            if (err.response) {
                console.log("Error status:", err.response.status);
                console.log("Error data:", err.response.data);
                alert(err.response.data.detail || "Registration failed");
            } else {
                console.error("Error:", err.message);
            }
        }
    };


    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" onChange={handleForm} required />
                <br />

                <label>First name</label>
                <input type="text" name="firstname" onChange={handleForm} required />
                <br />

                <label>Last name</label>
                <input type="text" name="lastname" onChange={handleForm} required />
                <br />

                <label>Email</label>
                <input type="email" name="email" onChange={handleForm} required />
                <br />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={handleForm}
                    required
                />
                <br />

                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmpassword"
                    onChange={handleForm}
                    required
                />
                <br />

                <label>Role</label>
                <input type="text" name="role" onChange={handleForm} required />
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;



