export const LOCALES = ["ru", "ua", "pl"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ru";

export function isLocale(v: string | undefined | null): v is Locale {
  return !!v && (LOCALES as readonly string[]).includes(v);
}

type Dict = Record<string, Record<Locale, string>>;

const DICT: Dict = {
  catalog:        { ru: "Каталог",      ua: "Каталог",      pl: "Katalog"      },
  categories:     { ru: "Категории",    ua: "Категорії",    pl: "Kategorie"    },
  contacts:       { ru: "Контакты",     ua: "Контакти",     pl: "Kontakty"     },
  home:           { ru: "Главная",      ua: "Головна",      pl: "Strona główna" },
  search:         { ru: "Код деталі, назва або автомобіль", ua: "Код деталі, назва або автомобіль", pl: "Kod części, nazwa lub samochód" },
  admin:          { ru: "Админка",      ua: "Адмінка",      pl: "Panel admina" },
  login:          { ru: "Логин",        ua: "Логін",        pl: "Login"        },
  password:       { ru: "Пароль",       ua: "Пароль",       pl: "Hasło"        },
  signIn:         { ru: "Войти",        ua: "Увійти",       pl: "Zaloguj"      },
  signOut:        { ru: "Выйти",        ua: "Вийти",        pl: "Wyloguj"      },
  products:       { ru: "Товары",       ua: "Товари",       pl: "Produkty"     },
  addProduct:     { ru: "Добавить товар", ua: "Додати товар", pl: "Dodaj produkt" },
  editProduct:    { ru: "Редактировать товар", ua: "Редагувати товар", pl: "Edytuj produkt" },
  addCategory:    { ru: "Добавить категорию", ua: "Додати категорію", pl: "Dodaj kategorię" },
  name:           { ru: "Название",     ua: "Назва",        pl: "Nazwa"        },
  shortDesc:      { ru: "Короткое описание", ua: "Короткий опис", pl: "Krótki opis" },
  longDesc:       { ru: "Детальное описание", ua: "Детальний опис", pl: "Szczegółowy opis" },
  article:        { ru: "Артикул",      ua: "Артикул",      pl: "Artykuł"      },
  partNumber:     { ru: "Номер детали", ua: "Номер деталі", pl: "Numer części" },
  color:          { ru: "Цвет",         ua: "Колір",        pl: "Kolor"        },
  material:       { ru: "Материал",     ua: "Матеріал",     pl: "Materiał"     },
  save:           { ru: "Сохранить",    ua: "Зберегти",     pl: "Zapisz"       },
  cancel:         { ru: "Отмена",       ua: "Скасувати",    pl: "Anuluj"       },
  delete:         { ru: "Удалить",      ua: "Видалити",     pl: "Usuń"         },
  edit:           { ru: "Редактировать", ua: "Редагувати",  pl: "Edytuj"       },
  searchPlaceholder: { ru: "Поиск по названию или номеру детали", ua: "Пошук за назвою або номером деталі", pl: "Szukaj po nazwie lub numerze części" },
  noResults:      { ru: "Ничего не найдено", ua: "Нічого не знайдено", pl: "Nic nie znaleziono" },
  photos:         { ru: "Фото",         ua: "Фото",         pl: "Zdjęcia"      },
  category:       { ru: "Категория",    ua: "Категорія",    pl: "Kategoria"    },
};

export function t(key: keyof typeof DICT, locale: Locale = DEFAULT_LOCALE): string {
  return DICT[key]?.[locale] ?? DICT[key]?.[DEFAULT_LOCALE] ?? String(key);
}

export type ProductLike = {
  nameRu: string; nameUa: string | null; namePl: string | null;
  shortDescRu: string | null; shortDescUa: string | null; shortDescPl: string | null;
  longDescRu: string | null;  longDescUa: string | null;  longDescPl: string | null;
};
export type CategoryLike = {
  nameRu: string; nameUa: string | null; namePl: string | null;
};

export function pickProductName(p: ProductLike, locale: Locale): string {
  if (locale === "ua") return p.nameUa || p.nameRu;
  if (locale === "pl") return p.namePl || p.nameRu;
  return p.nameRu;
}
export function pickProductShort(p: ProductLike, locale: Locale): string | null {
  if (locale === "ua") return p.shortDescUa || p.shortDescRu;
  if (locale === "pl") return p.shortDescPl || p.shortDescRu;
  return p.shortDescRu;
}
export function pickProductLong(p: ProductLike, locale: Locale): string | null {
  if (locale === "ua") return p.longDescUa || p.longDescRu;
  if (locale === "pl") return p.longDescPl || p.longDescRu;
  return p.longDescRu;
}
export function pickCategoryName(c: CategoryLike, locale: Locale): string {
  if (locale === "ua") return c.nameUa || c.nameRu;
  if (locale === "pl") return c.namePl || c.nameRu;
  return c.nameRu;
}

export function slugify(input: string): string {
  const map: Record<string, string> = {
    а:"a",б:"b",в:"v",г:"g",ґ:"g",д:"d",е:"e",ё:"e",є:"ie",ж:"zh",з:"z",и:"y",
    і:"i",ї:"i",й:"i",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",
    у:"u",ў:"u",ф:"f",х:"h",ц:"c",ч:"ch",ш:"sh",щ:"shch",ъ:"",ы:"y",ь:"",э:"e",
    ю:"iu",я:"ia",ą:"a",ć:"c",ę:"e",ł:"l",ń:"n",ó:"o",ś:"s",ź:"z",ż:"z",
  };
  return input
    .toLowerCase()
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
