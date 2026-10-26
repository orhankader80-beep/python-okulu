# 🐍 Python Okulu

Arkadaşlarıma Python öğretmek için yaptığım bir web uygulaması! 🚀

## ✨ Neler var?

- 📚 **29 ders**: Sıfırdan Python'a. Her dersin sonunda sorular var, doğru cevaplarla **XP** kazanıp seviye atlıyorsun (🥚 → 👑).
- 🔁 **Hızlı tekrar**: Bitirdiğin derslerden karışık sorular.
- 🎥 **Canlı ders takvimi**: Geri sayım, takvim ve "Takvimime ekle" düğmesi.
- 🏫 **Okul sistemi** (Firebase ile):
  - 🎩 **Müdür** okul açar, 🧑‍🏫 **öğretmen** okul koduyla katılıp sınıf açar, 👦 **öğrenci** sınıf koduyla katılır.
  - ⭐ Yıldız, ✅ yoklama, 📢 duyuru ve 📝 ödev.
  - 💬 Okul ve sınıf sohbeti (küfür ve telefon numarası engelli).
  - 🔑 Kullanıcı adıyla ya da Google ile giriş.

## 🛠️ Kendin çalıştırmak istersen

1. Bu klasörü bir web sunucusunda aç. Örnek:
   ```
   python -m http.server 8010
   ```
   Sonra tarayıcıda `http://localhost:8010` adresine git.
2. **Firebase** projesi aç ve kendi bilgilerini `firebase-ayar.js` dosyasına yaz.
3. Firebase'de **Authentication** bölümünde **E-posta/Şifre** ve **Google** girişini aç.
4. `firestore.rules` dosyasını Firebase'de **Firestore → Kurallar** kısmına yapıştır ve yayınla. 🔒
5. `ayarlar.js` dosyasına canlı ders linkini, ders takvimini ve öğretmen şifresini yaz.

## 🔒 Güvenlik

- Sadece **ilk ad** kullanılır, soyad yok.
- Sınıfları sadece içindekiler görür, yıldızı sadece öğretmen verebilir.
- Bütün kurallar `firestore.rules` dosyasında.

---

Mustafa tarafından ❤️ ile yapıldı. (Kodlamada Claude yardım etti 🤖)
