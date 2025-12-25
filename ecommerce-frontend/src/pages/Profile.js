import api from "../api/axios";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfile = async () => {
    await api.put("/users/profile", { name, email });
    alert("Profile updated");
  };

  return (
    <div className="container card">
      <h2>Profile</h2>
      <p>Role: {user?.role}</p>

      <input placeholder="New name" onChange={e=>setName(e.target.value)} />
      <input placeholder="New email" onChange={e=>setEmail(e.target.value)} />

      <button onClick={updateProfile}>Update</button>
    </div>
  );
}
