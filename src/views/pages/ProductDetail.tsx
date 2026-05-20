import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useStore } from "@/controllers/StoreController";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
export default function ProductDetail() {
  const { id } = useParams();

  const { products, addToCart } = useStore();

  const product = products.find(
    (p) => p.id === Number(id)
  );

const handleAddToCart = async () => {
  if (!product) return;

  try {
    const pedidoId = localStorage.getItem("pedidoId");

    console.log("PedidoId:", pedidoId);
    console.log("Produto:", product.id);

    const response = await fetch(
      "http://localhost:5000/pedido/item",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id_pedido: Number(pedidoId),
          Id_produto: product.id,
          Quantidade: 1,
        }),
      }
    );

    const data = await response.text();

    console.log("Status:", response.status);
    console.log("Resposta API:", data);

    if (response.ok) {
      addToCart(product);
      toast.success(
        "Produto adicionado ao carrinho!"
      );
    } else {
      toast.error(
        `Erro API: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Erro completo:", error);
    toast.error("Erro ao conectar API");
  }
};

if (!product) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto flex flex-col items-center py-20">
        <p className="text-lg text-muted-foreground">
          Produto não encontrado
        </p>

        <Link
          to="/"
          className="mt-4 text-primary hover:underline"
        >
          Voltar aos produtos
        </Link>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Voltar aos produtos
        </Link>
        <div className="mt-4 grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-muted">
            <img src={product.image} alt={product.name} width={512} height={512} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm font-medium text-muted-foreground">{product.category}</span>
            <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">{product.name}</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>
            <p className="mt-6 text-3xl font-bold text-brown-dark">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
            <button
              onClick={handleAddToCart}
              className="mt-8 flex w-fit items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-lilac-dark"
            >
              <ShoppingBag className="h-5 w-5" />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
