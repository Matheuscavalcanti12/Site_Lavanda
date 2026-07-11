import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useStore } from "@/controllers/StoreController";
import { ShoppingBag, ArrowLeft, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const SIZES = ["PP", "P", "M", "G", "GG"];

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const { products, addToCart } = useStore();

  const product = products.find((p) => p.id === Number(id));

  const productInfo = useMemo(() => {
    if (!product) {
      return null;
    }

    const brand = product.category || "StoryRoupas";

    return {
      brand,
      code: `STORY-${String(product.id).padStart(4, "0")}`,
      description:
        `${product.name} e uma peca do catalogo ${brand}, selecionada para compor looks femininos com praticidade e bom acabamento. ` +
        "A imagem mostra o produto cadastrado na loja e o pedido e confirmado pelo WhatsApp para retirada e pagamento no local.",
      fit:
        "Modelagem regular. Escolha o tamanho que voce costuma usar; em caso de duvida, informe suas medidas no WhatsApp apos finalizar o pedido.",
      measures:
        "Tamanhos disponiveis para escolha: PP, P, M, G e GG. As medidas podem variar conforme a peca e a confirmacao final e feita no atendimento.",
    };
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      if (product.price <= 0) {
        toast.error("Produto sem preco valido!");
        return;
      }

      if (!selectedSize) {
        toast.error("Selecione um tamanho");
        return;
      }

      await addToCart(product, selectedSize);
      toast.success("Produto adicionado ao carrinho!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar ao carrinho");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <p className="text-lg font-medium text-foreground">
            Produto nao encontrado
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_460px]">
          <div className="overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="lg:pt-2">
            <p className="text-sm font-bold uppercase tracking-normal text-foreground">
              {productInfo?.brand}
            </p>
            <h1 className="mt-1 font-heading text-3xl font-semibold leading-tight text-foreground">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {productInfo?.code}
            </p>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl font-bold text-brown-dark">
                {formatCurrency(product.price)}
              </span>
              <span className="text-sm text-muted-foreground">
                no atendimento via WhatsApp
              </span>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold uppercase text-foreground">
                  Tamanho
                </p>
                <p className="text-xs text-muted-foreground">
                  Selecione o tamanho
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 min-w-12 rounded-md border px-4 text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-bold uppercase text-primary-foreground transition-colors hover:bg-lilac-dark sm:w-48"
            >
              <ShoppingBag className="h-4 w-4" />
              Comprar
            </button>

            <p className="mt-5 text-sm text-foreground">
              Vendido por <span className="font-bold">StoryRoupas</span>
            </p>

            <div className="mt-5 divide-y divide-border border-y border-border">
              <details className="group py-4" open>
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-foreground">
                  Como Vestir
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {productInfo?.fit}
                </p>
              </details>

              <details className="group py-4" open>
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-foreground">
                  Descricao
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {productInfo?.description}
                </p>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-foreground">
                  Medidas
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {productInfo?.measures}
                </p>
              </details>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
