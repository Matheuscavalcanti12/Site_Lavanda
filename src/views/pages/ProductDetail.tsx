import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useStore } from "@/controllers/StoreController";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();

  const { products, addToCart } =
    useStore();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart(product);

      toast.success(
        "Produto adicionado ao carrinho!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Erro ao adicionar ao carrinho"
      );
    }
  };

  if (!product) {
    return (
      <div>
        Produto não encontrado
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">
          <img
            src={product.image}
            alt={product.name}
          />

          <div>
            <h1>{product.name}</h1>

            <p>
              {product.description}
            </p>

            <button
              onClick={handleAddToCart}
            >
              <ShoppingBag />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}