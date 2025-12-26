import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [data, setData] = useState({ email:"", password:"" });
  const { login } = useAuth();
  console.log("aksdhoaisd----ecom project")
  console.log("ecmm")
  const submit = async e => {
    e.preventDefault();
    const res = await api.post("/auth/login", data);
    login(res.data.token);
  };

  return (
    <div className="container card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input name="email" placeholder="Email" onChange={e=>setData({...data,email:e.target.value})} />
        <input name="password" type="password" placeholder="Password" onChange={e=>setData({...data,password:e.target.value})} />
        <button>Login</button>
      </form>
    </div>
  );
}
