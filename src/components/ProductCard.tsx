import { Link } from "react-router-dom";
import { Product } from "@/contexts/StoreContext";
import { useStore } from "@/contexts/StoreContext";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();

  return (
    <div className="group animate-fade-in overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={512}
            height={512}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <span className="text-xs font-medium text-muted-foreground">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 font-heading text-lg font-semibold text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-brown-dark">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-lilac-dark"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
