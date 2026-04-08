import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/contexts/StoreContext";

export default function Index() {
  const { products } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground">Nossa Coleção</h1>
          <p className="mt-2 text-muted-foreground">Peças selecionadas com carinho para você</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
