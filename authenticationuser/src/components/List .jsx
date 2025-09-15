import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Logout from "./logout";

const List = () => {
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStreams = async () => {
        try {
            const token = localStorage.getItem("x-access-token");
            const res = await axiosInstance.get("api_stream/list/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("API Response:", res.data);
            setStreams(res.data.streams);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.response) {
                setError(err.response.data.detail || "Failed to fetch streams");
            } else {
                setError("Network error");
            }
        }
    };

    useEffect(() => {
        fetchStreams();
    }, []);

    if (loading) return <p>Loading streams...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {streams.map((item, index) => (
                    <li key={index} style={{ marginBottom: "20px" }}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <img
                            src={item.image}
                            alt={item.name}
                            width="500"
                            style={{ borderRadius: "8px" }}
                        />
                    </li>
                ))}
            </ul>
            <Logout />
        </div>
    );
};

export default List;


