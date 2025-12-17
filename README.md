# KPI Aloqa - Frontend (React + Vite)

Bu React frontend ilovasi. **Avval backend'ni ishga tushiring**, keyin frontend'ni.

## 📋 Talablar

- **Node.js 18** yoki yuqori versiya
- **npm** (Node.js bilan birga keladi) yoki **yarn**

## 🔍 Node.js versiyasini tekshirish

Terminal yoki Command Prompt'ni oching va quyidagilarni kiriting:

```bash
node --version
npm --version
```

Agar Node.js o'rnatilmagan bo'lsa, [nodejs.org](https://nodejs.org/) dan yuklab oling.

## 🚀 Qadam-baqadam o'rnatish va ishga tushirish

### Qadam 1: Frontend papkasiga o'tish

```bash
cd frontend
```

### Qadam 2: Paketlarni o'rnatish

```bash
npm install
```

yoki agar yarn ishlatmoqchi bo'lsangiz:

```bash
yarn install
```

⚠️ **Bu bir necha daqiqa davom etishi mumkin.** Kuting...

✅ **Muvaffaqiyatli bo'lsa**, `node_modules/` papkasi yaratiladi.

### Qadam 3: Environment variables sozlash

Frontend papkasida `.env` yoki `.env.local` fayl yaratish kerak.

**Windows (Notepad yoki boshqa text editor):**
1. Frontend papkasida yangi fayl yarating
2. Nomini `.env` qiling (nuqta bilan boshlanadi!)
3. Ichiga quyidagilarni yozing:

```env
VITE_API_BASE=http://127.0.0.1:8000/api
```

**Linux/Mac:**
```bash
echo "VITE_API_BASE=http://127.0.0.1:8000/api" > .env
```

**Eslatma:** 
- Agar backend boshqa port'da ishlayotgan bo'lsa (masalan, 8001), port'ni o'zgartiring: `http://127.0.0.1:8001/api`
- Agar backend boshqa kompyuterdan ishlayotgan bo'lsa, IP manzilni o'zgartiring

### Qadam 4: Backend'ni ishga tushirish

⚠️ **MUHIM:** Frontend'ni ishga tushirishdan **oldin** backend'ni ishga tushirish kerak!

Backend'ni boshqa terminal oynasida ishga tushiring:
```bash
cd backend
source .venv/Scripts/activate  # Windows Git Bash
cd config
python manage.py runserver
```

Backend `http://127.0.0.1:8000` da ishga tushganini tekshiring.

### Qadam 5: Frontend server ishga tushirish

Frontend papkasida (yangi terminal oynasida):

```bash
npm run dev
```

yoki

```bash
yarn dev
```

✅ **Muvaffaqiyatli bo'lsa**, quyidagi xabar ko'rinadi:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

🎉 **Frontend ishga tushdi!** Browser'da `http://localhost:5173` ni oching.

---

## 📝 Qo'shimcha ma'lumotlar

### Server to'xtatish

Server to'xtatish uchun terminal'da `Ctrl+C` bosing.

### Boshqa port'da ishga tushirish

Agar 5173 port band bo'lsa:

```bash
npm run dev -- --port 3000
```

### Production build (deploy uchun)

```bash
npm run build
```

Build fayllar `dist/` papkasida yaratiladi.

---

## ❌ Muammolarni hal qilish

### "node: command not found" yoki "npm is not recognized"

**Yechim:** Node.js o'rnatilmagan.
1. Node.js'ni [nodejs.org](https://nodejs.org/) dan yuklab o'rnating
2. Kompyuterni qayta ishga tushiring

### "npm ERR! code ENOENT" yoki "Cannot find module"

**Yechim:** Paketlar to'liq o'rnatilmagan.
```bash
# node_modules papkasini o'chirish
rm -rf node_modules  # Linux/Mac
# yoki
rmdir /s node_modules  # Windows CMD

# Qayta o'rnatish
npm install
```

### "Port 5173 is already in use"

**Yechim:** Boshqa port'da ishga tushiring:
```bash
npm run dev -- --port 3000
```

### Backend ulanmayapti / CORS xatolik

**Yechim:**
1. Backend server ishlayotganligini tekshiring (`http://127.0.0.1:8000`)
2. `.env` faylda `VITE_API_BASE` to'g'ri sozlanganligini tekshiring
3. Browser Console'ni oching (F12) va xatoliklarni ko'ring
4. Backend'da CORS sozlamalarini tekshiring

### "Failed to fetch" xatolik

**Yechim:**
1. Backend ishga tushganligini tekshiring
2. `.env` faylda `VITE_API_BASE` to'g'ri yozilganligini tekshiring
3. Browser Console'da (F12) Network tab'ni ochib, so'rovlarni tekshiring

### Module not found xatolik

**Yechim:**
```bash
# node_modules va package-lock.json ni o'chirish
rm -rf node_modules package-lock.json  # Linux/Mac
# yoki Windows'da qo'lda o'chiring

# Qayta o'rnatish
npm install
```

---

## 🔐 Login

Frontend'ni ochgandan so'ng, login qilish:

1. Browser'da `http://localhost:5173` ni oching
2. Avtomatik `/login` sahifasiga o'tadi
3. Login qiling quyidagi test userlardan biri bilan:

### Test Userlar

| Username | Password | Rol |
|----------|----------|-----|
| `sunnatbek` | `sunnatbek123` | Xodim |
| `akmal` | `akmal123` | Xodim |
| `validator` | `validator123` | Validator |

**Eslatma:** Agar test userlar yaratilmagan bo'lsa, backend'da quyidagi buyruqni bajaring:
```bash
cd backend/config
python manage.py create_test_users
```

### Logout

Profil'dan chiqish uchun:
1. Yuqori o'ng burchakdagi profil rasmi yonida "Chiqish" tugmasini bosing
2. Yoki `/logout` URL'ga o'ting

**Eslatma:** Agar login qila olmasangiz, backend'da superuser yarating:
```bash
cd backend/config
python manage.py createsuperuser
```

---

## 📁 Struktura

```
frontend/
├── src/
│   ├── components/     # React komponentlar
│   │   ├── auth/      # Authentication komponentlar
│   │   ├── common/    # Umumiy komponentlar
│   │   └── layout/    # Layout komponentlar
│   ├── pages/         # Sahifalar (Dashboard, Login, va h.k.)
│   ├── services/      # API xizmatlar (api.js)
│   └── data/          # Mock data
├── public/            # Static fayllar
├── .env               # Environment variables (siz yaratasiz)
├── package.json       # Dependencies
└── vite.config.js     # Vite konfiguratsiyasi
```

---

## ✅ Tekshirish

Frontend to'g'ri ishlayotganini tekshirish:

1. Browser'da `http://localhost:5173` ni oching
2. Login sahifasi ko'rinishi kerak
3. Backend ishga tushgan bo'lsa, login qilish mumkin bo'lishi kerak

---

## 🔄 To'liq ishga tushirish tartibi

1. **Backend'ni ishga tushiring** (birinchi terminal):
   ```bash
   cd backend
   source .venv/Scripts/activate
   cd config
   python manage.py runserver
   ```

2. **Frontend'ni ishga tushiring** (ikkinchi terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Browser'da oching:**
   - Frontend: `http://localhost:5173`
   - Backend Admin: `http://127.0.0.1:8000/admin`

---

## 📞 Yordam

Agar muammo bo'lsa:
1. Yuqoridagi "Muammolarni hal qilish" bo'limini ko'rib chiqing
2. Browser Console'ni oching (F12) va xatoliklarni ko'ring
3. Backend server ishga tushganligini tekshiring
4. `.env` fayl to'g'ri sozlanganligini tekshiring
