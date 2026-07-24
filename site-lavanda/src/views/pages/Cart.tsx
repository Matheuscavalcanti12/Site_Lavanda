import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useStore } from "@/controllers/StoreController";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

function formatCurrency(value: number) {
  return value.toFixed(2).replace(".", ",");
}

export default function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    userName,
  } = useStore();

  const handleUpdateQuantity = async (
    productId: number,
    size: string,
    newQuantity: number
  ) => {
    try {
      await updateQuantity(productId, size, newQuantity);
    } catch (error) {
      toast.error("Erro ao atualizar quantidade");
      console.error(error);
    }
  };

  const handleRemoveFromCart = async (productId: number, size: string) => {
    try {
      await removeFromCart(productId, size);
      toast.success("Produto removido do carrinho");
    } catch (error) {
      toast.error("Erro ao remover do carrinho");
      console.error(error);
    }
  };

  const handleFinalize = () => {
    const itemsList = cart
      .map(
        (item) =>
          `- *${item.product.name}* | Tamanho: ${item.size} | Quantidade: ${item.quantity} | R$ ${formatCurrency(
            item.product.price * item.quantity
          )}`
      )
      .join("\n");

    const message =
      `*StoryRoupas*\n` +
      `Ola ${userName || "cliente"}, seu pedido foi registrado com sucesso!\n\n` +
      `*Resumo do Pedido:*\n${itemsList}\n\n` +
      `*Total: R$ ${formatCurrency(cartTotal)}*\n\n` +
      `Retirada na loja e pagamento no local.\n` +
      `Aguarde a confirmacao de disponibilidade dos tamanhos pelo atendimento.\n\n` +
      `Agradecemos pela preferencia!`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    toast.success("Pedido finalizado! Redirecionando para WhatsApp...");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto flex flex-col items-center py-20">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
          <p className="mt-4 text-lg text-muted-foreground">
            Seu carrinho esta vazio
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-lilac-dark"
          >
            <ArrowLeft className="h-4 w-4" /> Continuar comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Meu Carrinho
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 rounded-lg border border-border bg-card p-4"
              >
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    loading="lazy"
                    width={100}
                    height={100}
                    className="h-24 w-24 rounded-md object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-heading text-lg font-semibold text-foreground hover:text-primary"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      R$ {formatCurrency(item.product.price)}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      Tamanho: {item.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="rounded-md border border-border p-1 transition-colors hover:bg-muted"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="rounded-md border border-border p-1 transition-colors hover:bg-muted"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        handleRemoveFromCart(item.product.id, item.size)
                      }
                      className="text-destructive transition-colors hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Resumo
            </h2>
            <div className="mt-4 space-y-2">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex justify-between gap-3 text-sm text-muted-foreground"
                >
                  <span>
                    {item.product.name} ({item.size}) x{item.quantity}
                  </span>
                  <span>
                    R$ {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span className="text-brown-dark">
                  R$ {formatCurrency(cartTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={handleFinalize}
              className="mt-6 w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-lilac-dark"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
