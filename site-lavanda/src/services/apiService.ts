const configuredApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL =
  configuredApiUrl?.replace(/\/$/, "") ||
  `http://${window.location.hostname}:5000`;

async function parseResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function request<T>(
  url: string,
  options?: RequestInit,
  errorMessage = "Erro ao conectar API"
): Promise<T> {
  const response = await fetch(url, options);
  const data = await parseResponse(response);

  if (!response.ok) {
    const detailMessage =
      typeof data === "object" && data && "detail" in data
        ? String((data as { detail: string }).detail)
        : null;

    const apiMessage =
      typeof data === "object" && data && "message" in data
        ? String((data as ApiErrorResponse).message)
        : detailMessage || errorMessage;

    throw new Error(apiMessage);
  }

  return data as T;
}

export interface ApiErrorResponse {
  message: string;
}

export const apiService = {
  async addToCart(
    pedidoId: number,
    produtoId: number,
    quantidade: number
  ) {
    return request(
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
      },
      "Erro ao adicionar ao carrinho"
    );
  },

  async getCarrinho(pedidoId: number) {
    return request(
      `${API_BASE_URL}/pedido/${pedidoId}/itens`,
      undefined,
      "Erro ao buscar carrinho"
    );
  },

  async deleteProduct(produtoId: number) {
    return request(
      `${API_BASE_URL}/produto/${produtoId}`,
      {
        method: "DELETE",
      },
      "Erro ao excluir produto"
    );
  },

  async updateQuantidade(
    pedidoId: number,
    produtoId: number,
    quantidade: number
  ) {
    return request(
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
      },
      "Erro ao atualizar quantidade"
    );
  },

  async removeFromCart(
    pedidoId: number,
    produtoId: number
  ) {
    return request(
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
      },
      "Erro ao remover do carrinho"
    );
  },

  async criarPedido(usuarioId: number) {
    return request<{ pedidoId: number }>(
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
      },
      "Erro ao criar pedido"
    );
  },

  async createProduct(product: {
    desc_produto: string;
    preco: number;
    imagem: string;
    marca: string;
  }) {
    return request(
      `${API_BASE_URL}/produto`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(product),
      },
      "Erro ao adicionar produto"
    );
  },
};
