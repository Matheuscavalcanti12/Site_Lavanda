import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/controllers/StoreController";

export function Navbar() {
  const { cartCount } = useStore();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="font-heading text-2xl font-bold text-primary">
          StoryRoupas
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Produtos
          </Link>
          <Link to="/signup" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Cadastrar
          </Link>
          <Link to="/cart" className="relative text-foreground transition-colors hover:text-primary">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
