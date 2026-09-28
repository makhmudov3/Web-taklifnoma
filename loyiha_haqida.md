# Veb-taklifnoma: Frontend Loyiha Tuzilmasi va Funksiyalari

Ushbu hujjat loyihaning frontend qismini to'liq tushuntirib beradi. Maqsad: ChatGPT (yoki boshqa AI) ushbu loyiha bilan tanishib, kelajakda kod yozish yoki o'zgartirishlarda to'g'ri kontekstga ega bo'lishi.

## Texnologik Stek
- **Framework:** React (Vite orqali yaratilgan)
- **Til:** JavaScript (JSX)
- **Styling:** Vanilla CSS (`style.css` va `src/style.css` da jamlangan)
- **Ikonkalar:** `lucide-react`
- **Animatsiyalar:** CSS Transitions/Animations va React orqali boshqariladi.
- **Tashqi API:** Formani yuborish uchun **Telegram Bot API** ishlatilgan.

## Asosiy Funksiyalar va Kontekst

1. **Ikki Tilli Qo'llab-quvvatlash (I18N)**
   - Loyiha O'zbek (UZ) va Rus (RU) tillarini qo'llab-quvvatlaydi.
   - Barcha matnlar `src/utils/translations.js` faylida saqlanadi.
   - `App.jsx` ichida `lang` state orqali til boshqariladi va kerakli komponentlarga props orqali uzatiladi.

2. **Musiqa va Ovoz (Background Music)**
   - Taklifnoma ochilishi bilan fon musiqasi (Rishat) avtomatik chalinishi kerak (brauzer ruxsatiga qarab).
   - Musiqa audiosi `src/assets/rishat.mp3` faylidan olinadi.
   - Musiqani o'chirish/yoqish uchun global tugma (`MusicToggle` kabi) mavjud.

3. **Telegram Bot Orqali Xabar Yuborish**
   - Foydalanuvchilar o'z tilaklarini qoldirishlari mumkin (Gift komponenti orqali).
   - Xabarlar bevosita Telegram Bot API orqali (backend'siz) guruhga yoki shaxsiy chatga (`CHAT_ID`) yuboriladi.

4. **Scroll Animatsiyalar**
   - Elementlar ekranga ko'ringanda (scroll bo'lganda) paydo bo'lishi uchun `IntersectionObserver` ishlatilgan (masalan, `reveal` va `visible` klasslari bilan).

## Komponentlar Tuzilmasi (`src/components/`)

- **`App.jsx`**: Bosh komponent. Barcha holatlar (state) shuning ichida boshqariladi (`isUnlocked`, `isPlaying`, `lang`). Asosiy UI shu yerdan render qilinadi.
- **`EntryScreen.jsx`**: Taklifnomaga kirish ekrani ("Chiptani yirtish" animatsiyasi). Foydalanuvchi tugmani bosganda musiqa chalina boshlaydi va asosiy kontent ochiladi.
- **`Hero.jsx`**: Asosiy qism. Kelin va kuyovning ismlari (`Abdulaziz va Sarvinoz`) va kirish animatsiyalari.
- **`Message.jsx`**: Mehmonlarga atalgan samimiy taklifnoma so'zlari joylashgan qism.
- **`Calendar.jsx`**: To'y sanasi belgilangan kalendar.
- **`Timer.jsx`**: To'y kunigacha qolgan vaqtni (Kun, Soat, Daqiqa, Soniya) hisoblab ko'rsatadigan Countdown Timer.
- **`Location.jsx`**: To'y bo'ladigan manzil ("VERSAL TANTANALAR SAROYI") xaritasi. **Google Maps** va **Yandex Maps** havolalari joylashtirilgan.
- **`Gift.jsx`**: Tabrik va tilaklar formasi. Ism va tilakni kiritish uchun inputlar mavjud va ular submit qilinganda fetch orqali Telegram Bot API'ga yuboriladi.
- **`MusicToggle.jsx`**: Musiqani o'chirish va yoqish uchun yordamchi knopka.

## Loyiha Qanday Ishga Tushiriladi?
Loyihani lokal muhitda ishga tushirish uchun quyidagi buyruqlar ishlatiladi:
1. Qaramliklarni o'rnatish: `npm install`
2. Serverni ishga tushirish: `npm run dev`
3. Build qilish: `npm run build`

## ChatGPT uchun Qo'shimcha Eslatmalar
- Styling kodlari asosan alohida `style.css` faylida yozilgan, inline style kam ishlatilgan. Shuning uchun CSS'ni o'zgartirish kerak bo'lsa `style.css` larga murojaat qilinadi.
- Agar yangi bo'lim (komponent) qo'shish kerak bo'lsa, avval `translations.js` fayliga til obyektlarini qo'shing va so'ngra u komponentga props qilib `t={t.yangiKomponent}` orqali uzating.
- `Gift.jsx` da Telegram API tokenni ochiq ko'rinishda ishlatish vaqtinchalik yechim. Kattaroq loyihalarda bot tokenni frontendda qoldirmaslik tavsiya etiladi. (Hozircha static sayt uchun ideal ishlayapti).
