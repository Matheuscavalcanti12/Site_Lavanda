import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { toast } from "sonner";

import {
  Product,
  CartItem,
} from "@/models/StoreModels";

import { apiService } from "@/services/apiService";

const ADMIN_EMAIL =
  "admin@storyroupas.com";

// login como administrador:
// admin@storyroupas.com

interface StoreContextType {
  products: Product[];

  addProduct: (
    product: Omit<Product, "id">
  ) => Promise<void>;

  deleteProduct: (
    id: number
  ) => Promise<void>;

  cart: CartItem[];

  addToCart: (
    product: Product
  ) => Promise<void>;

  removeFromCart: (
    productId: number
  ) => Promise<void>;

  updateQuantity: (
    productId: number,
    quantity: number
  ) => Promise<void>;

  cartTotal: number;
  cartCount: number;

  isLoggedIn: boolean;
  setIsLoggedIn: (
    v: boolean
  ) => void;

  userName: string;
  setUserName: (
    v: string
  ) => void;

  isAdmin: boolean;

  pedidoId: number | null;
  setPedidoId: (
    id: number
  ) => void;
}

const StoreContext =
  createContext<
    StoreContextType | undefined
  >(undefined);

export function StoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [userName, setUserName] =
    useState("");

  const [pedidoId, setPedidoId] =
    useState<number | null>(() => {
      const saved =
        localStorage.getItem(
          "pedidoId"
        );

      return saved
        ? parseInt(saved)
        : null;
    });

  const isAdmin =
    isLoggedIn &&
    userName
      .trim()
      .toLowerCase() ===
      ADMIN_EMAIL;

  const loadProducts =
    async () => {
      try {
        const response =
          await fetch(
            "http://localhost:5000/listarProdutos"
          );

        if (!response.ok) {
          throw new Error(
            "Erro ao buscar produtos"
          );
        }

        const data =
          await response.json();

        const formattedProducts =
          data.map(
            (produto: any) => ({
              id:
                produto.id_produto,

              name:
                produto.desc_produto,

              description:
                produto.marca,

              price:
                produto.valor,

              image:
                produto.imagem,

              category:
                produto.marca,
            })
          );

        setProducts(
          formattedProducts
        );
      } catch (error) {
        console.error(
          "Erro ao carregar produtos:",
          error
        );

        toast.error(
          "Erro ao carregar produtos"
        );
      }
    };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct =
    async (
      product: Omit<
        Product,
        "id"
      >
    ): Promise<void> => {
      try {
        await apiService.createProduct(
          {
            desc_produto:
              product.name,

            valor:
              product.price,

            imagem:
              product.image,

            marca:
              product.category,
          }
        );

        await loadProducts();

        toast.success(
          "Produto criado com sucesso!"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Erro ao adicionar produto"
        );
      }
    };

  const deleteProduct =
    async (
      id: number
    ): Promise<void> => {
      if (!isAdmin) {
        toast.error(
          "Apenas administradores podem excluir produtos"
        );

        return;
      }

      try {
        await apiService.deleteProduct(
          id
        );

        await loadProducts();

        toast.success(
          "Produto removido!"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Erro ao excluir produto"
        );
      }
    };

  const addToCart =
    async (
      product: Product
    ) => {
      if (!pedidoId) {
        throw new Error(
          "Nenhum pedido criado. Faça login ou crie um novo pedido."
        );
      }

      try {
        await apiService.addToCart(
          pedidoId,
          product.id,
          1
        );

        setCart((prev) => {
          const existing =
            prev.find(
              (item) =>
                item.product.id ===
                product.id
            );

          if (existing) {
            return prev.map(
              (item) =>
                item.product.id ===
                product.id
                  ? {
                      ...item,
                      quantity:
                        item.quantity +
                        1,
                    }
                  : item
            );
          }

          return [
            ...prev,
            {
              product,
              quantity: 1,
            },
          ];
        });
      } catch (error) {
        console.error(
          "Erro ao adicionar ao carrinho:",
          error
        );

        throw error;
      }
    };

  const removeFromCart =
    async (
      productId: number
    ) => {
      if (!pedidoId) {
        throw new Error(
          "Nenhum pedido criado."
        );
      }

      try {
        await apiService.removeFromCart(
          pedidoId,
          productId
        );

        setCart((prev) =>
          prev.filter(
            (item) =>
              item.product.id !==
              productId
          )
        );
      } catch (error) {
        console.error(
          "Erro ao remover do carrinho:",
          error
        );

        throw error;
      }
    };

  const updateQuantity =
    async (
      productId: number,
      quantity: number
    ) => {
      if (!pedidoId) {
        throw new Error(
          "Nenhum pedido criado."
        );
      }

      if (quantity <= 0) {
        await removeFromCart(
          productId
        );

        return;
      }

      try {
        await apiService.updateQuantidade(
          pedidoId,
          productId,
          quantity
        );

        setCart((prev) =>
          prev.map((item) =>
            item.product.id ===
            productId
              ? {
                  ...item,
                  quantity,
                }
              : item
          )
        );
      } catch (error) {
        console.error(
          "Erro ao atualizar quantidade:",
          error
        );

        throw error;
      }
    };

  const cartTotal =
    cart.reduce(
      (sum, item) =>
        sum +
        item.product.price *
          item.quantity,
      0
    );

  const cartCount =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        isAdmin,
        pedidoId,
        setPedidoId,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context =
    useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used within StoreProvider"
    );
  }

  return context;
}