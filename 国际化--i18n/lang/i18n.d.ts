type Languages = 'zh' | 'en' | 'jp';
interface Glyi18n<T = string> {
  en: T;
  zh: T;
  jp: T;
}
type DateTime = {
  time: string;
  date: string;
  day: string;
};
