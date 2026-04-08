import React, { createContext, useContext, useState, ReactNode } from "react";

import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";
import product5 from "@/assets/product5.jpg";
import product6 from "@/assets/product6.jpg";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  userName: string;
  setUserName: (v: string) => void;
}

const products: Product[] = [
  { id: 1, name: "Vestido Floral Lilás", description: "Vestido leve e elegante com estampa floral em tons de lilás. Perfeito para dias quentes e ocasiões especiais. Tecido fluido e confortável.", price: 189.90, image: product1, category: "Vestidos" },
  { id: 2, name: "Suéter Tricô Marrom", description: "Suéter de tricô artesanal em tom marrom acobreado. Ideal para os dias mais frios, com textura macia e caimento perfeito.", price: 149.90, image: product2, category: "Blusas" },
  { id: 3, name: "Calça Linho Bege", description: "Calça de linho natural em tom bege claro. Confortável e versátil, perfeita para compor looks casuais e elegantes.", price: 129.90, image: product3, category: "Calças" },
  { id: 4, name: "Blusa Seda Lavanda", description: "Blusa de seda com corte clássico em tom lavanda suave. Elegante e sofisticada, ideal para o trabalho ou eventos.", price: 169.90, image: product4, category: "Blusas" },
  { id: 5, name: "Jaqueta Couro Caramelo", description: "Jaqueta de couro sintético em tom caramelo. Design moderno com detalhes em metal, perfeita para looks despojados.", price: 259.90, image: product5, category: "Jaquetas" },
  { id: 6, name: "Cachecol Cashmere Lilás", description: "Cachecol de cashmere macio em lilás suave. Acessório elegante que complementa qualquer look de inverno.", price: 89.90, image: product6, category: "Acessórios" },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider value={{ products, cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, isLoggedIn, setIsLoggedIn, userName, setUserName }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
