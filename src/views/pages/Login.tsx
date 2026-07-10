import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@/controllers/StoreController";
import { apiService, API_BASE_URL } from "@/services/apiService";
import loginIllustration from "@/assets/login-illustration.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { setIsLoggedIn, setUserName, setPedidoId } = useStore();
  const navigate = useNavigate();
//login adm: admin@storyroupas.com
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUserName(email);
        setRole(data.role);
        setIsLoggedIn(true);

        // Criar um novo pedido para este usuário
        if (data.usuarioId) {
          const newPedido = await apiService.criarPedido(data.usuarioId);
          const pedidoId = typeof newPedido === "number" ? newPedido : newPedido?.pedidoId ?? newPedido?.id;
          if (pedidoId) {
            setPedidoId(pedidoId);
            localStorage.setItem("pedidoId", pedidoId.toString());
          }
        }

        navigate("/");
      } else {
        alert("Login inválido");
      }
    } catch (error) {
      console.error(error);
      alert("Erro, usuario ou senha incorretos");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 items-center justify-center bg-lilac-light lg:flex">
        <img src={loginIllustration} alt="Ilustração de login" width={500} height={500} className="max-w-md" />
      </div>
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="font-heading text-3xl font-bold text-foreground">Bem-vindo de volta</h1>
          <p className="mt-2 text-sm text-muted-foreground">Entre na sua conta para continuar comprando</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Senha</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-lilac-dark">
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
