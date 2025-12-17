import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [skills, setSkills] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5003/register",
                { username, password, skills },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Registration success:", res.data);
            navigate("/login");
        } catch (err) {
            console.error("Registration error:", err);
            setError("Registration failed (check backend console)");
        }
    };

    return (
        <div className="auth-form">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <textarea placeholder="Your Skills (e.g., React, Python)" onChange={(e) => setSkills(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Register;
