import { useState } from "react";
import axios from "axios";

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
        device_name: "react-app",
      });
      // Ela guarda o token no estado, o que faz a interface mudar para a área logada.
      onLoginSuccess(response.data.token, response.data.user);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error", err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="card">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="lucas@gmail.com"
        />
      </div>
      <div className="form-group">
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="123456"
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginForm;
