import { useState } from "react";
import { login as apiLogin } from "../services/apiService";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await apiLogin(email, password);
      // Ela guarda o token no estado, o que faz a interface mudar para a área logada.
      onLoginSuccess(response.data.access_token, response.data.user);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error", err);
    }
  };

  return (
    <Card className="w-full max-w-sm -mx-auto">
      <form onSubmit={handleLogin}>
    <CardHeader>
      <CardTitle className="text-2xl">Login</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1 5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="lucas@gmail.com"
            required
          />
        </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="123456"
          required
        />
      </div>
    </div>
    </CardContent>
    <CardFooter>
      <Button type="submit" className="w-full">Login</Button>
    </CardFooter>
    </form>
    </Card>
  );
}

export default LoginForm;
