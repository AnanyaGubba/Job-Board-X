import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setToken, setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5003/login", { username, password });
            setToken(res.data.token);
            setUser({ username: res.data.username, skills: res.data.skills });
            navigate("/jobs");
        } catch (err) {
            setError("Login failed");
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
            {error && <p className="error">{error}</p>}
            <a href="/register">No account? Register</a>
        </div>
    );
}
export default Login;
