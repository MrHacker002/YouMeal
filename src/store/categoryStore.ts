import { create } from 'zustand';

export const categories = [
  { label: 'Бургеры', icon: require('../assets/cates/icon-cheeseburger.png') },
  { label: 'Закуски', icon: require('../assets/cates/icon-onion.png') },
  { label: 'Хот-доги', icon: require('../assets/cates/icon-hotdog.png') },
  { label: 'Комбо', icon: require('../assets/cates/icon-fast-food.png') },
  { label: 'Шаурма', icon: require('../assets/cates/icon-burrito.png') },
  { label: 'Пицца', icon: require('../assets/cates/icon-pizza.png') },
  { label: 'Вок', icon: require('../assets/cates/icon-noodles.png') },
  { label: 'Десерты', icon: require('../assets/cates/icon-doughnut.png') },
  { label: 'Соусы', icon: require('../assets/cates/icon-ketchup.png') },
];

interface CategoryStore {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  activeCategory: categories[0].label,
  setActiveCategory: (category) => set({ activeCategory: category }),
})); 