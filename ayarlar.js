// =========================================================
// 🎥 CANLI DERS AYARLARI
// Sadece tırnakların arasını değiştir!
// =========================================================

// Bütün dersler için kullanılacak Google Meet linki.
// (Değişken adında "ZOOM" yazıyor ama her türlü toplantı linki çalışır.)
const VARSAYILAN_ZOOM_LINKI = ""; // Buraya kendi Meet/Zoom linkini yaz

// Bir canlı ders kaç dakika sürüyor?
const DERS_SURESI_DAKIKA = 40;

// 📅 CANLI DERS TAKVİMİ
// Her ders için bir satır:
//   tarih: "YIL-AY-GÜN"   saat: "SS:DD"   konu: "..."
//   link: Bu derse özel bir toplantı linki varsa buraya yaz.
//         Boş bırakırsan yukarıdaki VARSAYILAN_ZOOM_LINKI kullanılır.
//
// Saatler:  Pazartesi 18:00 · Salı-Cuma 18:15 · Cumartesi 19:00 · Pazar 15:00
// (İlk ders, 24 Ekim Cumartesi, özel olarak 18:15'te.)
const CANLI_DERSLER = [
  // ---- 1. Hafta ----
  { tarih: "2026-10-24", saat: "18:15", konu: "Ders 1-5: Python Nedir? + print + Hatalar + # + Dört İşlem", link: "" },
  { tarih: "2026-10-25", saat: "19:50", konu: "Ders 6: Yazı mı, Sayı mı?", link: "" },
  { tarih: "2026-10-26", saat: "18:00", konu: "Ders 7: Süper İşlemler (// % **)", link: "" },
  // ⏸️ 29 Ekim: Canlı dersler bir süre ertelendi.
  // Kalan dersler aşağıda saklı. Yeni tarih belli olunca tarihleri değiştirip
  // satırların başındaki "// " işaretini sil.
  // (27 Ekim'deki Ders 8 yapılamadı, oradan devam edilecek.)
//   { tarih: "2026-10-27", saat: "18:15", konu: "Ders 8: Değişken Nedir?", link: "" },
//   { tarih: "2026-10-28", saat: "18:15", konu: "Ders 9: Kutunun İçini Değiştirmek", link: "" },
//   { tarih: "2026-10-29", saat: "18:15", konu: "Ders 10: Yazıları Birleştirmek", link: "" },
//   { tarih: "2026-10-30", saat: "18:15", konu: "Ders 11: input ile Soru Sormak", link: "" },

//   // ---- 2. Hafta ----
//   { tarih: "2026-10-31", saat: "19:00", konu: "Ders 12: int ile Sayıya Çevirmek", link: "" },
//   { tarih: "2026-11-01", saat: "15:00", konu: "Ders 13: Mini Proje - Hesap Makinesi", link: "" },
//   { tarih: "2026-11-02", saat: "18:00", konu: "Ders 14: Karşılaştırma ve True / False", link: "" },
//   { tarih: "2026-11-03", saat: "18:15", konu: "Ders 15: if ve else", link: "" },
//   { tarih: "2026-11-04", saat: "18:15", konu: "Ders 16: elif", link: "" },
//   { tarih: "2026-11-05", saat: "18:15", konu: "Ders 17: and, or, not", link: "" },
//   { tarih: "2026-11-06", saat: "18:15", konu: "Ders 18: Mini Proje - Akıllı Kapı", link: "" },

//   // ---- 3. Hafta ----
//   { tarih: "2026-11-07", saat: "19:00", konu: "Ders 19: while Döngüsü", link: "" },
//   { tarih: "2026-11-08", saat: "15:00", konu: "Ders 20: for ve range", link: "" },
//   { tarih: "2026-11-09", saat: "18:00", konu: "Ders 21: break ile Döngüden Çıkmak", link: "" },
//   { tarih: "2026-11-10", saat: "18:15", konu: "Ders 22: Mini Proje - Sayı Tahmin Oyunu", link: "" },
//   { tarih: "2026-11-11", saat: "18:15", konu: "Ders 23: Liste Nedir?", link: "" },
//   { tarih: "2026-11-12", saat: "18:15", konu: "Ders 24: Listeye Ekle, Çıkar, Say", link: "" },
//   { tarih: "2026-11-13", saat: "18:15", konu: "Ders 25: Listeyi for ile Gezmek", link: "" },

//   // ---- 4. Hafta ----
//   { tarih: "2026-11-14", saat: "19:00", konu: "Ders 26: def ile Kendi Komutunu Yap", link: "" },
//   { tarih: "2026-11-15", saat: "15:00", konu: "Ders 27: Fonksiyona Bilgi Göndermek", link: "" },
//   { tarih: "2026-11-16", saat: "18:00", konu: "Ders 28: return ile Cevap Döndürmek", link: "" },
//   { tarih: "2026-11-17", saat: "18:15", konu: "Ders 29: 🏆 Final - Bilgi Yarışması", link: "" },

//   // ---- Bonus ----
//   { tarih: "2026-11-18", saat: "18:15", konu: "🔁 Tekrar ve Soru-Cevap", link: "" },
//   { tarih: "2026-11-19", saat: "18:15", konu: "🛠️ Proje Günü: Kendi Programını Yap", link: "" },
//   { tarih: "2026-11-20", saat: "18:15", konu: "🎤 Proje Sunumları", link: "" },
//   { tarih: "2026-11-21", saat: "19:00", konu: "🎉 Büyük Kutlama", link: "" },
];

// =========================================================
// 🏫 SINIF AYARLARI (Öğretmen: Mustafa)
// Bu kısmı sadece öğretmen değiştirir!
// Değiştirdikten sonra siteyi Netlify'a tekrar yüklemeyi unutma.
// =========================================================

// 🔐 Öğretmen paneli şifresi (ogretmen.html). Bunu değiştir!
// Not: Bu basit bir kilit, gerçek bir güvenlik değil. Dosyayı açan şifreyi görebilir.
const OGRETMEN_SIFRESI = "BURAYA-SIFRE-YAZ";

// Google Classroom'daki sınıfının davet linki ve sınıf kodu.
// Classroom'da sınıfı açınca "Davet bağlantısı"nı kopyalayıp buraya yapıştır.
const CLASSROOM_LINKI = "";
const SINIF_KODU = "";

// 📢 DUYURULAR (En yenisi en üstte olsun)
const DUYURULAR = [
  { tarih: "2026-10-29", metin: "⏸️ Canlı dersler bir süreliğine ertelendi. Yeni tarihler belli olunca buradan duyuracağız! O zamana kadar Dersler sayfasından kendi kendine çalışabilirsin. 🐍" },
  { tarih: "2026-10-25", metin: "📢 Bir sonraki canlı ders için Canlı Ders sayfasına bak!" },
  { tarih: "2026-10-24", metin: "Python Okulu'na hoş geldiniz! 🎉 İlk derste tam 5 ders bitirdik. Harikasınız!" },
];

// 📝 ÖDEVLER
//   sonTarih: Ödevin son teslim günü ("YIL-AY-GÜN")
//   Öğrenciler ödevlerini Google Classroom'a yükler.
const ODEVLER = [
  {
    baslik: "Python'u kur ve ilk 5 dersi tekrar et",
    aciklama: "Annen ya da babanla python.org'dan Python'u kur. Sonra sitedeki Ders 1-5'in sorularını çöz. IDLE'da yazdığın kodun ekran görüntüsünü Classroom'a yükle.",
    sonTarih: "2026-10-26",
  },
];

// 👩‍🎓 ÖĞRENCİLER
//   ad:      Sadece ilk ad ya da takma ad yaz (soyad yazma!)
//   yildiz:  Öğretmenin verdiği yıldız puanı ⭐ (sıralama buna göre)
//   geldi:   Öğrencinin katıldığı canlı derslerin tarihleri
//
// Örnek:
//   { ad: "Ali", yildiz: 15, geldi: ["2026-10-24", "2026-10-25"] },
const OGRENCILER = [
  { ad: "Ali", yildiz: 10, geldi: ["2026-10-24"] },
  { ad: "Ayşe", yildiz: 5, geldi: [] },
];
