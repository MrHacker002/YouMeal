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
  { slug: 'burgers', label: `Бургеры`, icon: iconCheeseburger },
  { slug: 'snacks', label: `Закуски`, icon: iconOnion },
  { slug: 'hotdogs', label: `Хот-доги`, icon: iconHotdog },
  { slug: 'combo', label: `Комбо`, icon: iconFastFood },
  { slug: 'burritos', label: `Шаурма`, icon: iconBurrito },
  { slug: 'pizza', label: `Пицца`, icon: iconPizza },
  { slug: 'wok', label: `Вок`, icon: iconNoodles },
  { slug: 'desserts', label: `Десерты`, icon: iconDoughnut },
  { slug: 'sauces', label: `Соусы`, icon: iconKetchup },
];

export const defaultCategory = categories[0].label;
export const defaultCategorySlug = categories[0].slug;

export const isKnownCategory = (categoryLabel: string) =>
  categories.some((item) => item.label === categoryLabel);

export const getCategoryBySlug = (slug: string | undefined) =>
  categories.find((item) => item.slug === slug);
