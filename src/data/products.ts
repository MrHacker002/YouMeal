import { Product } from "../store/productStore";
// Import burger images so Vite resolves asset URLs in ESM
import imgMeatbomb from "../assets/burgers/meatbomb.png";
import imgSupercheese from "../assets/burgers/supercheese.png";
import imgGood from "../assets/burgers/good.png";
import imgHeavypunch from "../assets/burgers/heavypunch.png";
import imgClassic from "../assets/burgers/classic.png";
import imgItalian from "../assets/burgers/italian.png";

export const products: Product[] = [
  {
    id: 1,
    name: "Мясная бомба",
    weight: "200г",
    price: 299,
    image: imgMeatbomb,
    description: "Мясная бомба",
    ingridient: "Мясо, сыр, помидоры, салат, лук",
    kkall: 100,
  },
  {
    id: 2,
    name: "Супер сырный",
    weight: "400г",
    price: 499,
    image: imgSupercheese,
    description: "Супер сырный",
    ingridient: "Мясо, сыр, помидоры, салат, лук",
    kkall: 100,
  },
  {
    id: 3,
    name: "Сытный",
    weight: "150г",
    price: 199,
    image: imgGood,
    description: "Сытный",
    ingridient: "Мясо, сыр, помидоры, салат, лук",
    kkall: 100,
  },
  {
    id: 4,
    name: "Тяжелый удар",
    weight: "100г",
    price: 249,
    image: imgHeavypunch,
    description: "Тяжелый удар",
    ingridient: "Мясо, сыр, помидоры, салат, лук",
    kkall: 100,
  },
  {
    id: 5,
    name: "Вечная классика",
    weight: "500г",
    price: 99,
    image: imgClassic,
    description: "Вечная классика",
    ingridient: "Мясо, сыр, помидоры, салат, лук",
    kkall: 100,
  },
  {
    id: 6,
    name: "Итальянский",
    weight: "150г",
    price: 199,
    image: imgItalian,
    description: "Итальянский",
    ingridient: "Мясо, сыр, помидоры, салат, лук",
    kkall: 100,
  },
];
