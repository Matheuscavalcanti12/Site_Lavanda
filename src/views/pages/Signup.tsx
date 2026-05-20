import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@/controllers/StoreController";
import { apiService } from "@/services/apiService";
import signupIllustration from "@/assets/signup-illustration.jpg";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUserName, setPedidoId } = useStore();
  const navigate = useNavigate();

const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const response =
      await fetch(
        "http://localhost:5000/cadastro",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            senha: password,
          }),
        }
      );

    const data =
      await response.json();

    if (response.ok) {
      localStorage.setItem(
        "token",
        data.token
      );
      setUserName(name);
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
      alert("Cadastro inválido");
    }
  } catch (error) {
    console.error(error);

    alert(
      "Erro ao conectar API"
    );
  }
};

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="font-heading text-3xl font-bold text-foreground">Criar conta</h1>
          <p className="mt-2 text-sm text-muted-foreground">Cadastre-se e comece a comprar</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Nome completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Seu nome"
              />
            </div>
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
              Cadastrar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
      <div className="hidden w-1/2 items-center justify-center bg-accent lg:flex">
        <img src={signupIllustration} alt="Ilustração de cadastro" width={500} height={500} className="max-w-md" />
      </div>
    </div>
  );
}
