export const LOCALES = ["ru", "en", "pl"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ru";

export function isLocale(v: string | undefined | null): v is Locale {
  return !!v && (LOCALES as readonly string[]).includes(v);
}

type Dict = Record<string, Record<Locale, string>>;

const DICT: Dict = {
  catalog:        { ru: "Каталог",      en: "Catalog",      pl: "Katalog"      },
  categories:     { ru: "Категории",    en: "Categories",   pl: "Kategorie"    },
  contacts:       { ru: "Контакты",     en: "Contacts",     pl: "Kontakty"     },
  home:           { ru: "Главная",      en: "Home",         pl: "Strona główna" },
  search:         { ru: "Код деталі, назва або автомобіль", en: "Part code, name or car", pl: "Kod części, nazwa lub samochód" },
  admin:          { ru: "Админка",      en: "Admin",        pl: "Panel admina" },
  login:          { ru: "Логин",        en: "Login",        pl: "Login"        },
  password:       { ru: "Пароль",       en: "Password",     pl: "Hasło"        },
  signIn:         { ru: "Войти",        en: "Sign in",      pl: "Zaloguj"      },
  signOut:        { ru: "Выйти",        en: "Sign out",     pl: "Wyloguj"      },
  products:       { ru: "Товары",       en: "Products",     pl: "Produkty"     },
  addProduct:     { ru: "Добавить товар", en: "Add product", pl: "Dodaj produkt" },
  editProduct:    { ru: "Редактировать товар", en: "Edit product", pl: "Edytuj produkt" },
  addCategory:    { ru: "Добавить категорию", en: "Add category", pl: "Dodaj kategorię" },
  name:           { ru: "Название",     en: "Name",         pl: "Nazwa"        },
  shortDesc:      { ru: "Короткое описание", en: "Short description", pl: "Krótki opis" },
  longDesc:       { ru: "Детальное описание", en: "Detailed description", pl: "Szczegółowy opis" },
  article:        { ru: "Артикул",      en: "Article",      pl: "Artykuł"      },
  partNumber:     { ru: "Номер детали", en: "Part number",  pl: "Numer części" },
  color:          { ru: "Цвет",         en: "Color",        pl: "Kolor"        },
  material:       { ru: "Материал",     en: "Material",     pl: "Materiał"     },
  save:           { ru: "Сохранить",    en: "Save",         pl: "Zapisz"       },
  cancel:         { ru: "Отмена",       en: "Cancel",       pl: "Anuluj"       },
  delete:         { ru: "Удалить",      en: "Delete",       pl: "Usuń"         },
  edit:           { ru: "Редактировать", en: "Edit",        pl: "Edytuj"       },
  searchPlaceholder: { ru: "Поиск по названию или номеру детали", en: "Search by name or part number", pl: "Szukaj po nazwie lub numerze części" },
  noResults:      { ru: "Ничего не найдено", en: "No results", pl: "Nic nie znaleziono" },
  photos:         { ru: "Фото",         en: "Photos",       pl: "Zdjęcia"      },
  category:       { ru: "Категория",    en: "Category",     pl: "Kategoria"    },
  // Home hero
  heroTagline:    { ru: "Гибрид без компромиссов", en: "Hybrid without compromise", pl: "Hybryda bez kompromisów" },
  heroTitle1:     { ru: "Проверенные детали", en: "Verified parts", pl: "Sprawdzone części" },
  heroTitle2:     { ru: "для вашего гибрида", en: "for your hybrid", pl: "dla Twojej hybrydy" },
  heroBody:       { ru: "Мы подбираем и проверяем ключевые узлы гибридного автомобиля так, чтобы каждая деталь работала корректно и предсказуемо. Без рисков, без догадок, с полной ответственностью за результат", en: "We select and test the key components of a hybrid vehicle so that every part works correctly and predictably. No risks, no guesswork, with full responsibility for the result", pl: "Dobieramy i sprawdzamy kluczowe komponenty samochodu hybrydowego tak, by każda część działała poprawnie i przewidywalnie. Bez ryzyka, bez zgadywania, z pełną odpowiedzialnością za wynik" },
  abs:            { ru: "ABS",          en: "ABS",          pl: "ABS"          },
  engine:         { ru: "Двигатель",    en: "Engine",       pl: "Silnik"       },
  batteries:      { ru: "Батареи",      en: "Batteries",    pl: "Akumulatory"  },
  goToCategories: { ru: "Перейти в категории", en: "Go to categories", pl: "Przejdź do kategorii" },
  viewAll:        { ru: "Посмотреть все", en: "View all",   pl: "Zobacz wszystkie" },
  showAll:        { ru: "Смотреть все", en: "Show all",     pl: "Zobacz wszystko" },
  goToCatalog:    { ru: "Перейти в каталог", en: "Go to catalog", pl: "Przejdź do katalogu" },
  // Catalog
  found:          { ru: "Найдено",      en: "Found",        pl: "Znaleziono"   },
  allItems:       { ru: "Все товары",   en: "All products", pl: "Wszystkie produkty" },
  notFoundQ:      { ru: "Ничего не найдено по запросу", en: "Nothing found for your query", pl: "Nic nie znaleziono dla zapytania" },
  noProductsYet:  { ru: "Товаров пока нет", en: "No products yet", pl: "Brak produktów" },
  cantFindPart:   { ru: "Не нашли деталь?", en: "Can't find a part?", pl: "Nie znalazłeś części?" },
  cantFindBody:   { ru: "Оставьте контакты — менеджер подберёт нужную деталь и свяжется с вами.", en: "Leave your contact — a manager will pick the right part and get in touch.", pl: "Zostaw kontakt — menedżer dobierze potrzebną część i skontaktuje się z Tobą." },
  contactUs:      { ru: "Связаться",    en: "Contact us",   pl: "Skontaktuj się" },
  sortBy:         { ru: "Сортировка по:", en: "Sort by:",   pl: "Sortuj według:" },
  byPopularity:   { ru: "По Популярности", en: "By popularity", pl: "Według popularności" },
  sortNewest:     { ru: "Сначала новые", en: "Newest first", pl: "Najpierw nowe" },
  sortOldest:     { ru: "Сначала старые", en: "Oldest first", pl: "Najpierw stare" },
  sortNameAsc:    { ru: "Название: А–Я", en: "Name: A–Z",   pl: "Nazwa: A–Z" },
  sortNameDesc:   { ru: "Название: Я–А", en: "Name: Z–A",   pl: "Nazwa: Z–A" },
  filters:        { ru: "Фильтры",      en: "Filters",      pl: "Filtry"       },
  // Product card
  view:           { ru: "Переглянути",  en: "View",         pl: "Zobacz"       },
  order:          { ru: "Заказать",     en: "Order",        pl: "Zamów"        },
  aboutProduct:   { ru: "Про товар",    en: "About product", pl: "O produkcie" },
  productDescPlaceholder: { ru: "Подробное описание товара будет добавлено.", en: "A detailed product description will be added.", pl: "Szczegółowy opis zostanie dodany." },
  readyToOrder:   { ru: "Готовы оформить заказ?", en: "Ready to place an order?", pl: "Gotowy do zamówienia?" },
  confirmCompat:  { ru: "Подтвердим совместимость и условия", en: "We'll confirm compatibility and terms", pl: "Potwierdzimy zgodność i warunki" },
  confirmCompatBody: { ru: "Оставьте контакты — менеджер свяжется с вами, подтвердит наличие детали, проверит её совместимость с вашим автомобилем и согласует все условия перед оформлением", en: "Leave your contact — a manager will reach out, confirm part availability, verify compatibility with your vehicle, and agree on all terms before ordering", pl: "Zostaw kontakt — menedżer skontaktuje się z Tobą, potwierdzi dostępność części, sprawdzi jej zgodność z Twoim samochodem i uzgodni wszystkie warunki przed zamówieniem" },
  goToForm:       { ru: "Перейти к форме", en: "Go to form", pl: "Przejdź do formularza" },
  // Spec labels (always shown to user even though stored in single column)
  specPartNumber: { ru: "Номер деталі:", en: "Part number:", pl: "Numer części:" },
  specArticle:    { ru: "Артикул:",     en: "Article:",     pl: "Artykuł:"     },
  specColor:      { ru: "Колір:",       en: "Color:",       pl: "Kolor:"       },
  specMaterial:   { ru: "Матеріал:",    en: "Material:",    pl: "Materiał:"    },
  specCategories: { ru: "Категорії:",   en: "Categories:",  pl: "Kategorie:"   },
  // Footer / partner
  partnerHeading: { ru: "Партнёрство для СТО", en: "Partnership for service stations", pl: "Współpraca dla warsztatów" },
  partnerSub:     { ru: "Специальные условия поставки", en: "Special supply terms", pl: "Specjalne warunki dostawy" },
  partnerBody:    { ru: "Оставьте заявку для оптового сотрудничества. Мы свяжемся с вами, уточним формат работы и предложим индивидуальные условия поставки гибридных узлов и компонентов", en: "Submit a request for wholesale cooperation. We'll get in touch, clarify the format of work and offer individual supply terms for hybrid units and components", pl: "Zostaw zgłoszenie dla współpracy hurtowej. Skontaktujemy się, doprecyzujemy formę pracy i zaproponujemy indywidualne warunki dostawy podzespołów hybrydowych" },
  contactPerson:  { ru: "Контактное лицо", en: "Contact person", pl: "Osoba kontaktowa" },
  yourEmail:      { ru: "Ваш email",    en: "Your email",   pl: "Twój email"   },
  phoneNumber:    { ru: "Номер телефона", en: "Phone number", pl: "Numer telefonu" },
  countryCity:    { ru: "Страна / город", en: "Country / city", pl: "Kraj / miasto" },
  partsComment:   { ru: "Какие детали интересуют, комментарий", en: "Which parts you need, a comment", pl: "Jakie części interesują, komentarz" },
  send:           { ru: "Отправить",    en: "Send",         pl: "Wyślij"       },
  feature1Title:  { ru: "Проверенные детали", en: "Verified parts", pl: "Sprawdzone części" },
  feature1Body:   { ru: "Каждая деталь проходит ручную проверку и тестирование перед продажей, поэтому вы получаете стабильный рабочий компонент", en: "Every part is hand-checked and tested before sale, so you receive a stable working component", pl: "Każda część przechodzi ręczną kontrolę i testy przed sprzedażą, dzięki czemu otrzymujesz stabilny działający komponent" },
  feature2Title:  { ru: "Готовность к установке", en: "Ready for installation", pl: "Gotowe do montażu" },
  feature2Body:   { ru: "Все детали подготовлены к установке и могут быть сразу использованы при ремонте автомобиля", en: "All parts are prepared for installation and can be used immediately for car repair", pl: "Wszystkie części są gotowe do montażu i mogą być natychmiast użyte podczas naprawy samochodu" },
  feature3Title:  { ru: "Быстрая консультация и подбор", en: "Fast consultation and selection", pl: "Szybka konsultacja i dobór" },
  feature3Body:   { ru: "Менеджер поможет подобрать нужную деталь и ответит на все вопросы перед покупкой", en: "A manager will help pick the right part and answer all your questions before purchase", pl: "Menedżer pomoże dobrać potrzebną część i odpowie na wszystkie pytania przed zakupem" },
  footerCTOTitle: { ru: "Специальные условия для СТО", en: "Special terms for service stations", pl: "Specjalne warunki dla warsztatów" },
  footerCTOBody:  { ru: "Если вы работаете с гибридными автомобилями или регулярно заказываете детали, оставьте заявку и получите индивидуальные условия для оптовых поставок и постоянного сотрудничества", en: "If you work with hybrid vehicles or regularly order parts, leave a request and receive individual terms for wholesale supplies and ongoing cooperation", pl: "Jeśli pracujesz z samochodami hybrydowymi lub regularnie zamawiasz części, zostaw zgłoszenie i otrzymaj indywidualne warunki dla dostaw hurtowych i stałej współpracy" },
  writeToUs:      { ru: "Написать нам", en: "Write to us",  pl: "Napisz do nas" },
  ourContacts:    { ru: "Наши контакты", en: "Our contacts", pl: "Nasze kontakty" },
  pages:          { ru: "Страницы",     en: "Pages",        pl: "Strony"       },
  socialNetworks: { ru: "Социальные сети", en: "Social networks", pl: "Sieci społecznościowe" },
  homeAria:       { ru: "Главная",      en: "Home",         pl: "Strona główna" },
  productPage:    { ru: "Страница товара", en: "Product page", pl: "Strona produktu" },
  showMore:       { ru: "Показать все",  en: "Show all",    pl: "Pokaż wszystkie" },
  showLess:       { ru: "Свернуть",      en: "Collapse",    pl: "Zwiń" },
  // Contact popup form
  popupTitle:     { ru: "Свяжитесь с нами", en: "Contact us", pl: "Skontaktuj się z nami" },
  popupSub:       { ru: "Оставьте контакты — менеджер свяжется с вами и поможет подобрать деталь.", en: "Leave your contact — a manager will get in touch and help pick the right part.", pl: "Zostaw kontakt — menedżer skontaktuje się i pomoże dobrać część." },
  additionalComment: { ru: "Дополнительный комментарий", en: "Additional comment", pl: "Dodatkowy komentarz" },
  thanks:         { ru: "Спасибо! Мы скоро свяжемся.", en: "Thank you! We'll be in touch soon.", pl: "Dziękujemy! Wkrótce się skontaktujemy." },
  required:       { ru: "Обязательное поле", en: "Required field", pl: "Pole wymagane" },
  close:          { ru: "Закрыть",       en: "Close",       pl: "Zamknij" },
  // Footer / company
  copyright:      { ru: "©Запчасти 2026", en: "©Parts 2026", pl: "©Części 2026" },
  privacyPolicy:  { ru: "Политика конфиденциальности", en: "Privacy policy", pl: "Polityka prywatności" },
  brandTagline:   { ru: "Hybrid Doktor",  en: "Hybrid Doktor", pl: "Hybrid Doktor" },
  brandAbout:     {
    ru: "Мы специализируемся на гибридных автомобилях Toyota и Lexus. Поставляем проверенные запчасти и помогаем сервисам решать сложные задачи — от диагностики до полного восстановления систем. Каждая деталь проходит проверку и отбор, чтобы вы могли быть уверены в результате и не тратить время на эксперименты",
    en: "We specialize in Toyota and Lexus hybrid vehicles. We supply tested parts and help service shops solve complex problems — from diagnostics to full system restoration. Every part is checked and selected so that you can be confident in the result and avoid wasting time on experiments",
    pl: "Specjalizujemy się w samochodach hybrydowych Toyota i Lexus. Dostarczamy sprawdzone części i pomagamy serwisom rozwiązywać złożone problemy — od diagnostyki po pełne odbudowanie systemów. Każda część przechodzi kontrolę i selekcję, byś mógł być pewny wyniku i nie tracić czasu na eksperymenty",
  },
  brandAboutShort:{
    ru: "Мы специализируемся на гибридных автомобилях Toyota и Lexus. Поставляем проверенные запчасти и помогаем сервисам решать сложные задачи — от диагностики до полного восстановления систем.",
    en: "We specialize in Toyota and Lexus hybrid vehicles. We supply tested parts and help service shops solve complex problems — from diagnostics to full system restoration.",
    pl: "Specjalizujemy się w samochodach hybrydowych Toyota i Lexus. Dostarczamy sprawdzone części i pomagamy serwisom rozwiązywać złożone problemy — od diagnostyki po pełne odbudowanie systemów.",
  },
  // Catalog filter placeholders
  filterMake:     { ru: "Марка авто",     en: "Car make",     pl: "Marka samochodu" },
  filterModel:    { ru: "Модель",         en: "Model",        pl: "Model" },
  filterYear:     { ru: "Год",            en: "Year",         pl: "Rok" },
  apply:          { ru: "Применить",      en: "Apply",        pl: "Zastosuj" },
  // Search no-results / show-all
  searchNoResults:{ ru: "Ничего не найдено", en: "No results", pl: "Nic nie znaleziono" },
  searchShowAll:  { ru: "Показать все результаты", en: "Show all results", pl: "Pokaż wszystkie wyniki" },
  // Product page extras
  freeShipping:        { ru: "Бесплатная доставка", en: "Free shipping", pl: "Darmowa wysyłka" },
  freeShippingBody:    { ru: "Любимые товары по выгодным ценам", en: "Favorite products at attractive prices", pl: "Ulubione produkty w atrakcyjnych cenach" },
  flexiblePayment:     { ru: "Гибкая оплата", en: "Flexible payment", pl: "Elastyczna płatność" },
  flexiblePaymentBody: { ru: "Оплата несколькими картами", en: "Pay with multiple cards", pl: "Płatność wieloma kartami" },
  fastDelivery:        { ru: "Быстрая доставка", en: "Fast delivery", pl: "Szybka dostawa" },
  fastDeliveryBody:    { ru: "Радость от быстрой отправки", en: "The joy of fast shipping", pl: "Radość z szybkiej wysyłki" },
  premiumSupport:      { ru: "Премиум поддержка", en: "Premium support", pl: "Wsparcie premium" },
  premiumSupportBody:  { ru: "Превосходная поддержка клиентов", en: "Excellent customer support", pl: "Doskonałe wsparcie klienta" },
  // Meta / preloader
  siteDescription: {
    ru: "Marketplace запчастей для гибридных Toyota",
    en: "Marketplace of parts for Toyota hybrids",
    pl: "Marketplace części do hybrydowych Toyot",
  },
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
  if (locale === "en") return p.nameUa || p.nameRu;
  if (locale === "pl") return p.namePl || p.nameRu;
  return p.nameRu;
}
export function pickProductShort(p: ProductLike, locale: Locale): string | null {
  if (locale === "en") return p.shortDescUa || p.shortDescRu;
  if (locale === "pl") return p.shortDescPl || p.shortDescRu;
  return p.shortDescRu;
}
export function pickProductLong(p: ProductLike, locale: Locale): string | null {
  if (locale === "en") return p.longDescUa || p.longDescRu;
  if (locale === "pl") return p.longDescPl || p.longDescRu;
  return p.longDescRu;
}
export function pickCategoryName(c: CategoryLike, locale: Locale): string {
  if (locale === "en") return c.nameUa || c.nameRu;
  if (locale === "pl") return c.namePl || c.nameRu;
  return c.nameRu;
}

// Build a locale-prefixed href. Default locale (ru) has no prefix.
// External, hash-only and api links pass through unchanged.
export function localeHref(href: string, locale: Locale): string {
  if (!href) return href;
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  if (href.startsWith("#")) return href;
  if (href.startsWith("/api/")) return href;
  if (href.startsWith("/admin")) return href;
  if (locale === DEFAULT_LOCALE) return href;
  if (href === "/") return `/${locale}`;
  // hash-only suffix on root: keep as /<locale>#hash
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

// Strip a locale prefix from a pathname (used by LocaleSwitcher to compute target URL)
export function stripLocalePrefix(pathname: string): string {
  const seg = pathname.split("/")[1];
  if ((LOCALES as readonly string[]).includes(seg)) {
    return pathname.slice(("/" + seg).length) || "/";
  }
  return pathname || "/";
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
