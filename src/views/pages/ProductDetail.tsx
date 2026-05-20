import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useStore } from "@/controllers/StoreController";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto flex flex-col items-center py-20">
          <p className="text-lg text-muted-foreground">Produto não encontrado</p>
          <Link to="/" className="mt-4 text-primary hover:underline">Voltar aos produtos</Link>
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
              onClick={() => addToCart(product)}
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
