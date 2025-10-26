import { create } from 'zustand';
// Import static assets explicitly so Vite resolves URLs in ESM
import iconCheeseburger from '../assets/cates/icon-cheeseburger.png';
import iconOnion from '../assets/cates/icon-onion.png';
import iconHotdog from '../assets/cates/icon-hotdog.png';
import iconFastFood from '../assets/cates/icon-fast-food.png';
import iconBurrito from '../assets/cates/icon-burrito.png';
import iconPizza from '../assets/cates/icon-pizza.png';
import iconNoodles from '../assets/cates/icon-noodles.png';
import iconDoughnut from '../assets/cates/icon-doughnut.png';
import iconKetchup from '../assets/cates/icon-ketchup.png';

export const categories = [
  { label: 'Бургеры', icon: iconCheeseburger },
  { label: 'Закуски', icon: iconOnion },
  { label: 'Хот-доги', icon: iconHotdog },
  { label: 'Комбо', icon: iconFastFood },
  { label: 'Шаурма', icon: iconBurrito },
  { label: 'Пицца', icon: iconPizza },
  { label: 'Вок', icon: iconNoodles },
  { label: 'Десерты', icon: iconDoughnut },
  { label: 'Соусы', icon: iconKetchup },
];

interface CategoryStore {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  activeCategory: categories[0].label,
  setActiveCategory: (category) => set({ activeCategory: category }),
})); 
