import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Jobs({ token, user }) {
    const [jobs, setJobs] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", skills_required: "" });
    const navigate = useNavigate();

    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        getJobs();
        getRecommended();
    }, []);

    const getJobs = async () => {
        const res = await axios.get("http://localhost:5003/jobs");
        setJobs(res.data);
    };

    const getRecommended = async () => {
        const res = await axios.get("http://localhost:5003/jobs/recommended", { headers });
        setRecommended(res.data);
    };

    const submitJob = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5003/jobs", form, { headers });
        setForm({ title: "", description: "", skills_required: "" });
        getJobs();
        getRecommended();
    };

    const applyJob = async (id) => {
        await axios.post(
            "http://localhost:5003/applications",
            { job_id: id },
            { headers }
        );
    };

    return (
        <div className="jobs">
            <h2>Job Board</h2>
            <button onClick={() => navigate("/login")}>Logout</button>

            <form onSubmit={submitJob} className="job-form">
                <input placeholder="Job title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <textarea placeholder="Required skills" onChange={(e) => setForm({ ...form, skills_required: e.target.value })} />
                <button>Post Job</button>
            </form>

            <h3>Recommended For You</h3>
            <div className="job-list">
                {recommended.map(j => (
                    <div className="job-card recommended" key={j.id}>
                        <h4>{j.title}</h4>
                        <p>{j.description}</p>
                        <button onClick={() => applyJob(j.id)}>Apply</button>
                    </div>
                ))}
            </div>

            <h3>All Jobs</h3>
            <div className="job-list">
                {jobs.map(j => (
                    <div className="job-card" key={j.id}>
                        <h4>{j.title}</h4>
                        <p>{j.description}</p>
                        <button onClick={() => applyJob(j.id)}>Apply</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Jobs;
