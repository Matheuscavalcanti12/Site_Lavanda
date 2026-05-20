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

export const products: Product[] = [
  {
    id: 1,
    name: "Vestido Floral Lilás",
    description:
      "Vestido leve e elegante com estampa floral em tons de lilás. Perfeito para dias quentes e ocasiões especiais. Tecido fluido e confortável.",
    price: 189.9,
    image: product1,
    category: "Vestidos",
  },
  {
    id: 2,
    name: "Suéter Tricô Marrom",
    description:
      "Suéter de tricô artesanal em tom marrom acobreado. Ideal para os dias mais frios, com textura macia e caimento perfeito.",
    price: 149.9,
    image: product2,
    category: "Blusas",
  },
  {
    id: 3,
    name: "Calça Linho Bege",
    description:
      "Calça de linho natural em tom bege claro. Confortável e versátil, perfeita para compor looks casuais e elegantes.",
    price: 129.9,
    image: product3,
    category: "Calças",
  },
  {
    id: 4,
    name: "Blusa Seda Lavanda",
    description:
      "Blusa de seda com corte clássico em tom lavanda suave. Elegante e sofisticada, ideal para o trabalho ou eventos.",
    price: 169.9,
    image: product4,
    category: "Blusas",
  },
  {
    id: 5,
    name: "Jaqueta Couro Caramelo",
    description:
      "Jaqueta de couro sintético em tom caramelo. Design moderno com detalhes em metal, perfeita para looks despojados.",
    price: 259.9,
    image: product5,
    category: "Jaquetas",
  },
  {
    id: 6,
    name: "Cachecol Cashmere Lilás",
    description:
      "Cachecol de cashmere macio em lilás suave. Acessório elegante que complementa qualquer look de inverno.",
    price: 89.9,
    image: product6,
    category: "Acessórios",
  },
];
