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
  // Home hero
  heroTagline:    { ru: "Гибрид без компромиссов", ua: "Гібрид без компромісів", pl: "Hybryda bez kompromisów" },
  heroTitle1:     { ru: "Проверенные детали", ua: "Перевірені деталі", pl: "Sprawdzone części" },
  heroTitle2:     { ru: "для вашего гибрида", ua: "для вашого гібрида", pl: "dla Twojej hybrydy" },
  heroBody:       { ru: "Мы подбираем и проверяем ключевые узлы гибридного автомобиля так, чтобы каждая деталь работала корректно и предсказуемо. Без рисков, без догадок, с полной ответственностью за результат", ua: "Ми підбираємо та перевіряємо ключові вузли гібридного автомобіля так, щоб кожна деталь працювала коректно та передбачувано. Без ризиків, без здогадок, з повною відповідальністю за результат", pl: "Dobieramy i sprawdzamy kluczowe komponenty samochodu hybrydowego tak, by każda część działała poprawnie i przewidywalnie. Bez ryzyka, bez zgadywania, z pełną odpowiedzialnością za wynik" },
  abs:            { ru: "ABS",          ua: "ABS",          pl: "ABS"          },
  engine:         { ru: "Двигатель",    ua: "Двигун",       pl: "Silnik"       },
  batteries:      { ru: "Батареи",      ua: "Батареї",      pl: "Akumulatory"  },
  goToCategories: { ru: "Перейти в категории", ua: "Перейти до категорій", pl: "Przejdź do kategorii" },
  viewAll:        { ru: "Посмотреть все", ua: "Дивитися все", pl: "Zobacz wszystkie" },
  showAll:        { ru: "Смотреть все", ua: "Дивитися все",  pl: "Zobacz wszystko" },
  goToCatalog:    { ru: "Перейти в каталог", ua: "Перейти до каталогу", pl: "Przejdź do katalogu" },
  // Catalog
  found:          { ru: "Найдено",      ua: "Знайдено",     pl: "Znaleziono"   },
  allItems:       { ru: "Все товары",   ua: "Всі товари",   pl: "Wszystkie produkty" },
  notFoundQ:      { ru: "Ничего не найдено по запросу", ua: "Нічого не знайдено за запитом", pl: "Nic nie znaleziono dla zapytania" },
  noProductsYet:  { ru: "Товаров пока нет", ua: "Товарів поки немає", pl: "Brak produktów" },
  cantFindPart:   { ru: "Не нашли деталь?", ua: "Не знайшли деталь?", pl: "Nie znalazłeś części?" },
  cantFindBody:   { ru: "Оставьте контакты — менеджер подберёт нужную деталь и свяжется с вами.", ua: "Залиште контакти — менеджер підбере потрібну деталь і зв'яжеться з вами.", pl: "Zostaw kontakt — menedżer dobierze potrzebną część i skontaktuje się z Tobą." },
  contactUs:      { ru: "Связаться",    ua: "Зв'язатися",   pl: "Skontaktuj się" },
  sortBy:         { ru: "Сортировка по:", ua: "Сортування за:", pl: "Sortuj według:" },
  byPopularity:   { ru: "По Популярности", ua: "За популярністю", pl: "Według popularności" },
  filters:        { ru: "Фильтры",      ua: "Фільтри",      pl: "Filtry"       },
  // Product card
  view:           { ru: "Переглянути",  ua: "Переглянути",  pl: "Zobacz"       },
  order:          { ru: "Заказать",     ua: "Замовити",     pl: "Zamów"        },
  aboutProduct:   { ru: "Про товар",    ua: "Про товар",    pl: "O produkcie"  },
  productDescPlaceholder: { ru: "Подробное описание товара будет добавлено.", ua: "Детальний опис товару буде додано.", pl: "Szczegółowy opis zostanie dodany." },
  readyToOrder:   { ru: "Готовы оформить заказ?", ua: "Готові оформити замовлення?", pl: "Gotowy do zamówienia?" },
  confirmCompat:  { ru: "Подтвердим совместимость и условия", ua: "Підтвердимо сумісність та умови", pl: "Potwierdzimy zgodność i warunki" },
  confirmCompatBody: { ru: "Оставьте контакты — менеджер свяжется с вами, подтвердит наличие детали, проверит её совместимость с вашим автомобилем и согласует все условия перед оформлением", ua: "Залиште контакти — менеджер зв'яжеться з вами, підтвердить наявність деталі, перевірить її сумісність з вашим автомобілем та узгодить всі умови перед оформленням", pl: "Zostaw kontakt — menedżer skontaktuje się z Tobą, potwierdzi dostępność części, sprawdzi jej zgodność z Twoim samochodem i uzgodni wszystkie warunki przed zamówieniem" },
  goToForm:       { ru: "Перейти к форме", ua: "Перейти до форми", pl: "Przejdź do formularza" },
  // Spec labels (always shown to user even though stored in single column)
  specPartNumber: { ru: "Номер деталі:", ua: "Номер деталі:", pl: "Numer części:" },
  specArticle:    { ru: "Артикул:",     ua: "Артикул:",     pl: "Artykuł:"     },
  specColor:      { ru: "Колір:",       ua: "Колір:",       pl: "Kolor:"       },
  specMaterial:   { ru: "Матеріал:",    ua: "Матеріал:",    pl: "Materiał:"    },
  specCategories: { ru: "Категорії:",   ua: "Категорії:",   pl: "Kategorie:"   },
  // Footer / partner
  partnerHeading: { ru: "Партнёрство для СТО", ua: "Партнерство для СТО", pl: "Współpraca dla warsztatów" },
  partnerSub:     { ru: "Специальные условия поставки", ua: "Спеціальні умови постачання", pl: "Specjalne warunki dostawy" },
  partnerBody:    { ru: "Оставьте заявку для оптового сотрудничества. Мы свяжемся с вами, уточним формат работы и предложим индивидуальные условия поставки гибридных узлов и компонентов", ua: "Залиште заявку для оптової співпраці. Ми зв'яжемося з вами, уточнимо формат роботи та запропонуємо індивідуальні умови постачання гібридних вузлів та компонентів", pl: "Zostaw zgłoszenie dla współpracy hurtowej. Skontaktujemy się, doprecyzujemy formę pracy i zaproponujemy indywidualne warunki dostawy podzespołów hybrydowych" },
  contactPerson:  { ru: "Контактное лицо", ua: "Контактна особа", pl: "Osoba kontaktowa" },
  yourEmail:      { ru: "Ваш email",    ua: "Ваш email",    pl: "Twój email"   },
  phoneNumber:    { ru: "Номер телефона", ua: "Номер телефону", pl: "Numer telefonu" },
  countryCity:    { ru: "Страна / город", ua: "Країна / місто", pl: "Kraj / miasto" },
  partsComment:   { ru: "Какие детали интересуют, комментарий", ua: "Які деталі цікавлять, коментар", pl: "Jakie części interesują, komentarz" },
  send:           { ru: "Отправить",    ua: "Відправити",   pl: "Wyślij"       },
  feature1Title:  { ru: "Проверенные детали", ua: "Перевірені деталі", pl: "Sprawdzone części" },
  feature1Body:   { ru: "Каждая деталь проходит ручную проверку и тестирование перед продажей, поэтому вы получаете стабильный рабочий компонент", ua: "Кожна деталь проходить ручну перевірку та тестування перед продажем, тому ви отримуєте стабільний робочий компонент", pl: "Każda część przechodzi ręczną kontrolę i testy przed sprzedażą, dzięki czemu otrzymujesz stabilny działający komponent" },
  feature2Title:  { ru: "Готовность к установке", ua: "Готовність до встановлення", pl: "Gotowe do montażu" },
  feature2Body:   { ru: "Все детали подготовлены к установке и могут быть сразу использованы при ремонте автомобиля", ua: "Всі деталі підготовлені до встановлення та можуть бути одразу використані при ремонті автомобіля", pl: "Wszystkie części są gotowe do montażu i mogą być natychmiast użyte podczas naprawy samochodu" },
  feature3Title:  { ru: "Быстрая консультация и подбор", ua: "Швидка консультація та підбір", pl: "Szybka konsultacja i dobór" },
  feature3Body:   { ru: "Менеджер поможет подобрать нужную деталь и ответит на все вопросы перед покупкой", ua: "Менеджер допоможе підібрати потрібну деталь та відповість на всі питання перед покупкою", pl: "Menedżer pomoże dobrać potrzebną część i odpowie na wszystkie pytania przed zakupem" },
  footerCTOTitle: { ru: "Специальные условия для СТО", ua: "Спеціальні умови для СТО", pl: "Specjalne warunki dla warsztatów" },
  footerCTOBody:  { ru: "Если вы работаете с гибридными автомобилями или регулярно заказываете детали, оставьте заявку и получите индивидуальные условия для оптовых поставок и постоянного сотрудничества", ua: "Якщо ви працюєте з гібридними автомобілями або регулярно замовляєте деталі, залиште заявку і отримайте індивідуальні умови для оптових поставок та постійної співпраці", pl: "Jeśli pracujesz z samochodami hybrydowymi lub regularnie zamawiasz części, zostaw zgłoszenie i otrzymaj indywidualne warunki dla dostaw hurtowych i stałej współpracy" },
  writeToUs:      { ru: "Написать нам", ua: "Написати нам", pl: "Napisz do nas" },
  ourContacts:    { ru: "Наши контакты", ua: "Наші контакти", pl: "Nasze kontakty" },
  pages:          { ru: "Страницы",     ua: "Сторінки",     pl: "Strony"       },
  socialNetworks: { ru: "Социальные сети", ua: "Соціальні мережі", pl: "Sieci społecznościowe" },
  homeAria:       { ru: "Главная",      ua: "Головна",      pl: "Strona główna" },
  productPage:    { ru: "Страница товара", ua: "Сторінка товару", pl: "Strona produktu" },
  showMore:       { ru: "Показать все",  ua: "Показати всі", pl: "Pokaż wszystkie" },
  showLess:       { ru: "Свернуть",      ua: "Згорнути",     pl: "Zwiń" },
  // Contact popup form
  popupTitle:     { ru: "Свяжитесь с нами", ua: "Зв'яжіться з нами", pl: "Skontaktuj się z nami" },
  popupSub:       { ru: "Оставьте контакты — менеджер свяжется с вами и поможет подобрать деталь.", ua: "Залиште контакти — менеджер зв'яжеться з вами та допоможе підібрати деталь.", pl: "Zostaw kontakt — menedżer skontaktuje się i pomoże dobrać część." },
  additionalComment: { ru: "Дополнительный комментарий", ua: "Додатковий коментар", pl: "Dodatkowy komentarz" },
  thanks:         { ru: "Спасибо! Мы скоро свяжемся.", ua: "Дякуємо! Ми скоро зв'яжемося.", pl: "Dziękujemy! Wkrótce się skontaktujemy." },
  required:       { ru: "Обязательное поле", ua: "Обов'язкове поле", pl: "Pole wymagane" },
  close:          { ru: "Закрыть",       ua: "Закрити",      pl: "Zamknij" },
  // Footer / company
  copyright:      { ru: "©Запчасти 2026", ua: "©Запчастини 2026", pl: "©Części 2026" },
  privacyPolicy:  { ru: "Политика конфиденциальности", ua: "Політика конфіденційності", pl: "Polityka prywatności" },
  brandTagline:   { ru: "Hybrid Doktor",  ua: "Hybrid Doktor", pl: "Hybrid Doktor" },
  brandAbout:     {
    ru: "Мы специализируемся на гибридных автомобилях Toyota и Lexus. Поставляем проверенные запчасти и помогаем сервисам решать сложные задачи — от диагностики до полного восстановления систем. Каждая деталь проходит проверку и отбор, чтобы вы могли быть уверены в результате и не тратить время на эксперименты",
    ua: "Ми спеціалізуємося на гібридних автомобілях Toyota та Lexus. Постачаємо перевірені запчастини й допомагаємо сервісам вирішувати складні задачі — від діагностики до повного відновлення систем. Кожна деталь проходить перевірку й відбір, щоб ви могли бути впевнені в результаті та не витрачати час на експерименти",
    pl: "Specjalizujemy się w samochodach hybrydowych Toyota i Lexus. Dostarczamy sprawdzone części i pomagamy serwisom rozwiązywać złożone problemy — od diagnostyki po pełne odbudowanie systemów. Każda część przechodzi kontrolę i selekcję, byś mógł być pewny wyniku i nie tracić czasu na eksperymenty",
  },
  brandAboutShort:{
    ru: "Мы специализируемся на гибридных автомобилях Toyota и Lexus. Поставляем проверенные запчасти и помогаем сервисам решать сложные задачи — от диагностики до полного восстановления систем.",
    ua: "Ми спеціалізуємося на гібридних автомобілях Toyota та Lexus. Постачаємо перевірені запчастини й допомагаємо сервісам вирішувати складні задачі — від діагностики до повного відновлення систем.",
    pl: "Specjalizujemy się w samochodach hybrydowych Toyota i Lexus. Dostarczamy sprawdzone części i pomagamy serwisom rozwiązywać złożone problemy — od diagnostyki po pełne odbudowanie systemów.",
  },
  // Catalog filter placeholders
  filterMake:     { ru: "Марка авто",     ua: "Марка авто",   pl: "Marka samochodu" },
  filterModel:    { ru: "Модель",         ua: "Модель",       pl: "Model" },
  filterYear:     { ru: "Год",            ua: "Рік",          pl: "Rok" },
  apply:          { ru: "Применить",      ua: "Застосувати",  pl: "Zastosuj" },
  // Search no-results / show-all
  searchNoResults:{ ru: "Ничего не найдено", ua: "Нічого не знайдено", pl: "Nic nie znaleziono" },
  searchShowAll:  { ru: "Показать все результаты", ua: "Показати всі результати", pl: "Pokaż wszystkie wyniki" },
  // Product page extras
  freeShipping:        { ru: "Бесплатная доставка", ua: "Безкоштовна доставка", pl: "Darmowa wysyłka" },
  freeShippingBody:    { ru: "Любимые товары по выгодным ценам", ua: "Улюблені товари за вигідними цінами", pl: "Ulubione produkty w atrakcyjnych cenach" },
  flexiblePayment:     { ru: "Гибкая оплата", ua: "Гнучка оплата", pl: "Elastyczna płatność" },
  flexiblePaymentBody: { ru: "Оплата несколькими картами", ua: "Оплата кількома картками", pl: "Płatność wieloma kartami" },
  fastDelivery:        { ru: "Быстрая доставка", ua: "Швидка доставка", pl: "Szybka dostawa" },
  fastDeliveryBody:    { ru: "Радость от быстрой отправки", ua: "Радість від швидкої доставки", pl: "Radość z szybkiej wysyłki" },
  premiumSupport:      { ru: "Премиум поддержка", ua: "Преміум підтримка", pl: "Wsparcie premium" },
  premiumSupportBody:  { ru: "Превосходная поддержка клиентов", ua: "Чудова підтримка клієнтів", pl: "Doskonałe wsparcie klienta" },
  // Meta / preloader
  siteDescription: {
    ru: "Marketplace запчастей для гибридных Toyota",
    ua: "Маркетплейс запчастин для гібридних Toyota",
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
