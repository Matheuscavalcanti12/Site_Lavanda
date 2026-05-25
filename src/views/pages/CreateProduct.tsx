import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { useStore } from "@/controllers/StoreController";

export default function CreateProduct() {
  const { isAdmin, addProduct } = useStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string>("");

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">Acesso restrito</h1>
          <p className="mt-2 text-muted-foreground">
            Esta área é exclusiva para administradores.
          </p>
        </main>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

 const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  const parsedPrice = parseFloat(price);

  if (
    !name ||
    !brand ||
    !price ||
    !image
  ) {
    toast.error(
      "Preencha todos os campos"
    );
    return;
  }

  await addProduct({
    name,
    description: brand,
    price: parsedPrice,
    image,
    category: brand,
  });

  navigate("/catalog");
};
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-8 shadow-sm">
          <h1 className="font-heading text-3xl font-bold text-foreground">Criar Produto</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Adicione um novo produto ao catálogo da StoryRoupas.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Nome do produto
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Ex.: Vestido Floral Lilás"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Marca</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Ex.: StoryRoupas"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="0,00"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Imagem do produto
              </label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-accent-foreground hover:file:bg-secondary"
              />
              {image && (
                <img
                  src={image}
                  alt="Pré-visualização do produto"
                  className="mt-3 h-40 w-40 rounded-lg object-cover"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-lilac-dark"
            >
              Salvar produto
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
