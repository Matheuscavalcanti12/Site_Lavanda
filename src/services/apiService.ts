const API_BASE_URL = "http://localhost:5000";

export interface ApiErrorResponse {
  message: string;
}

export const apiService = {
  async addToCart(
    pedidoId: number,
    produtoId: number,
    quantidade: number
  ) {
    const response = await fetch(
      `${API_BASE_URL}/pedido/item`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_pedido: pedidoId,
          id_produto: produtoId,
          quantidade: quantidade,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao adicionar ao carrinho"
      );
    }

    return response.json();
  },

  async getCarrinho(pedidoId: number) {
    const response = await fetch(
      `${API_BASE_URL}/pedido/${pedidoId}/itens`
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao buscar carrinho"
      );
    }

    return response.json();
  },

  async deleteProduct(produtoId: number) {
    const response = await fetch(
      `${API_BASE_URL}/produto/${produtoId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao excluir produto"
      );
    }

    return response.json();
  },

  async updateQuantidade(
    pedidoId: number,
    produtoId: number,
    quantidade: number
  ) {
    const response = await fetch(
      `${API_BASE_URL}/pedido/item`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id_pedido: pedidoId,
          id_produto: produtoId,
          quantidade: quantidade,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao atualizar quantidade"
      );
    }

    return response.json();
  },

  async removeFromCart(
    pedidoId: number,
    produtoId: number
  ) {
    const response = await fetch(
      `${API_BASE_URL}/pedido/item`,
      {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id_pedido: pedidoId,
          id_produto: produtoId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao remover do carrinho"
      );
    }

    return response.json();
  },

  async criarPedido(usuarioId: number) {
    const response = await fetch(
      `${API_BASE_URL}/pedido`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id_usuario: usuarioId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao criar pedido"
      );
    }

    return response.json();
  },

  async createProduct(product: {
    desc_produto: string;
    preco: number;
    imagem: string;
    marca: string;
  }) {
    const response = await fetch(
      `${API_BASE_URL}/produto`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(product),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao adicionar produto"
      );
    }

    return response.json();
  },
};