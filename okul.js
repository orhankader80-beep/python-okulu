// =========================================================
// 🏫 PYTHON OKULU - OKUL SİSTEMİ
// Giriş/kayıt, okul açma, sınıf açma, kodla katılma,
// yıldız, yoklama, duyuru ve ödev. Veriler Firebase'de.
// =========================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc,
  collection, query, where, orderBy, limit, onSnapshot, writeBatch,
  serverTimestamp, arrayUnion, arrayRemove, increment,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-ayar.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Kullanıcı adları gizli bir e-postaya çevrilir (çocukların e-postası olmasın diye).
const EPOSTA_SONU = "@pythonokulu.app";
const KOD_HARFLERI = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // karışan O/0, I/1 yok
const ROLLER = { ogrenci: "👦 Öğrenci", ogretmen: "🧑‍🏫 Öğretmen", mudur: "🎩 Okul Müdürü" };
const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
  "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

let ben = null;          // Firebase kullanıcısı
let profil = null;       // kullanicilar/{uid} belgesi
let dinleyiciler = [];   // canlı dinlemeler (sayfa değişince kapatılır)

// ---------------------------------------------------------
// Küçük yardımcılar
// ---------------------------------------------------------

const g = (id) => document.getElementById(id);

function guvenli(yazi) {
  return String(yazi ?? "").replace(/[&<>"']/g, (h) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[h]);
}

function yaz(id, mesaj, tur) {
  let alan = g(id);
  alan.textContent = mesaj;
  alan.className = "sonuc" + (tur ? " " + tur : "");
}

function bugunMetni() {
  let s = new Date();
  return s.getFullYear() + "-" + String(s.getMonth() + 1).padStart(2, "0") + "-" + String(s.getDate()).padStart(2, "0");
}

function tarihYazisi(metin) {
  let t = String(metin).split("-").map(Number);
  return t[2] + " " + AYLAR[t[1] - 1];
}

function zamanYazisi(zaman) {
  if (!zaman) return "şimdi";
  let t = zaman.toDate();
  return t.getDate() + " " + AYLAR[t.getMonth()] + " · " +
    String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0");
}

function yeniKod() {
  let kod = "";
  let rastgele = crypto.getRandomValues(new Uint32Array(6));
  for (let i = 0; i < 6; i++) kod += KOD_HARFLERI[rastgele[i] % KOD_HARFLERI.length];
  return kod;
}

function hataMesaji(hata) {
  let kod = (hata && hata.code) || "";
  let mesajlar = {
    "auth/invalid-credential": "Kullanıcı adı ya da şifre yanlış. 🤔",
    "auth/wrong-password": "Şifre yanlış. 🤔",
    "auth/user-not-found": "Böyle bir kullanıcı yok. Önce kayıt ol!",
    "auth/email-already-in-use": "Bu kullanıcı adı alınmış, başka bir tane dene.",
    "auth/weak-password": "Şifre en az 6 harf olmalı.",
    "auth/too-many-requests": "Çok fazla deneme yaptın. Biraz bekle, sonra tekrar dene.",
    "auth/network-request-failed": "İnternet bağlantısı yok gibi. 📶",
    "auth/operation-not-allowed": "Firebase'de E-posta/Şifre girişi açık değil.",
    "permission-denied": "Buna iznin yok. 🔒",
    "unavailable": "İnternet bağlantısı yok gibi. 📶",
  };
  console.warn(hata);
  return mesajlar[kod] || "Bir şeyler ters gitti: " + (hata.message || kod);
}

function dinleyicileriKapat() {
  dinleyiciler.forEach((kapat) => kapat());
  dinleyiciler = [];
}

function ekranGoster(id) {
  ["yukleniyor", "girisEkrani", "rolEkrani", "anaPanel", "okulGorunumu", "sinifGorunumu"].forEach((e) => {
    g(e).hidden = e !== id;
  });
  window.scrollTo(0, 0);
}

// Telefondaki menü düğmesi
let menuButonu = document.querySelector(".menu-butonu");
let menuLinkleri = document.querySelector(".menu-linkleri");
menuButonu.addEventListener("click", () => {
  let acik = menuLinkleri.classList.toggle("acik");
  menuButonu.setAttribute("aria-expanded", acik);
});

// ---------------------------------------------------------
// 1. GİRİŞ VE KAYIT
// ---------------------------------------------------------

document.querySelectorAll(".sekme").forEach((sekme) => {
  sekme.addEventListener("click", () => {
    document.querySelectorAll(".sekme").forEach((s) => s.classList.toggle("aktif", s === sekme));
    g("girisFormu").hidden = sekme.dataset.sekme !== "giris";
    g("kayitFormu").hidden = sekme.dataset.sekme !== "kayit";
    yaz("girisSonuc", "");
  });
});

function kullaniciAdiTemizle(yazi) {
  return yazi.trim().toLowerCase();
}

g("girisFormu").addEventListener("submit", async (olay) => {
  olay.preventDefault();
  let kullanici = kullaniciAdiTemizle(g("girisKullanici").value);
  yaz("girisSonuc", "⏳ Giriş yapılıyor...");
  try {
    await signInWithEmailAndPassword(auth, kullanici + EPOSTA_SONU, g("girisSifre").value);
  } catch (hata) {
    yaz("girisSonuc", hataMesaji(hata), "yanlis");
  }
});

g("kayitFormu").addEventListener("submit", async (olay) => {
  olay.preventDefault();
  let ad = g("kayitAd").value.trim();
  let kullanici = kullaniciAdiTemizle(g("kayitKullanici").value);
  let sifre = g("kayitSifre").value;
  let rol = (document.querySelector('input[name="rol"]:checked') || {}).value;

  if (!ROLLER[rol]) return yaz("girisSonuc", "Öğrenci mi, öğretmen mi, müdür mü? Birini seç!", "yanlis");
  if (ad.length < 2) return yaz("girisSonuc", "İlk adını yaz (en az 2 harf).", "yanlis");
  if (ad.includes(" ")) return yaz("girisSonuc", "Sadece ilk adını yaz, soyad yazma! 😉", "yanlis");
  if (!/^[a-z0-9_]{3,15}$/.test(kullanici)) {
    return yaz("girisSonuc", "Kullanıcı adında sadece küçük harf (Türkçe harf olmadan), rakam ve _ olsun. 3-15 harf.", "yanlis");
  }
  if (sifre.length < 6) return yaz("girisSonuc", "Şifre en az 6 harf olmalı.", "yanlis");
  if (sifre !== g("kayitSifre2").value) return yaz("girisSonuc", "İki şifre aynı değil. 🤔", "yanlis");

  yaz("girisSonuc", "⏳ Hesabın açılıyor...");
  kayitSuruyor = true;
  try {
    let sonuc = await createUserWithEmailAndPassword(auth, kullanici + EPOSTA_SONU, sifre);
    let yeniProfil = { ad: ad, kullaniciAdi: kullanici, rol: rol, siniflar: [], okullar: [] };
    await setDoc(doc(db, "kullanicilar", sonuc.user.uid), yeniProfil);
    ben = sonuc.user;
    profil = yeniProfil;
    sayfayiGoster();
  } catch (hata) {
    yaz("girisSonuc", hataMesaji(hata), "yanlis");
  } finally {
    kayitSuruyor = false;
  }
});

g("cikisButonu").addEventListener("click", () => signOut(auth));
g("rolCikis").addEventListener("click", () => signOut(auth));

// 🔵 Google ile giriş
g("googleButonu").addEventListener("click", async () => {
  yaz("girisSonuc", "⏳ Google penceresi açılıyor...");
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    yaz("girisSonuc", "");
  } catch (hata) {
    let kod = hata.code || "";
    if (kod === "auth/popup-closed-by-user" || kod === "auth/cancelled-popup-request") {
      yaz("girisSonuc", "Google penceresini kapattın. 🙂", "ipucu");
    } else if (kod === "auth/popup-blocked") {
      yaz("girisSonuc", "Tarayıcı Google penceresini engelledi. Açılır pencerelere izin ver ve tekrar dene.", "yanlis");
    } else if (kod === "auth/operation-not-allowed") {
      yaz("girisSonuc", "Firebase'de Google girişi açık değil.", "yanlis");
    } else if (kod === "auth/unauthorized-domain") {
      yaz("girisSonuc", "Bu site adresi Firebase'de izinli değil (Authentication → Ayarlar → Yetkili alanlar).", "yanlis");
    } else {
      yaz("girisSonuc", hataMesaji(hata), "yanlis");
    }
  }
});

// Kayıt olurken profil henüz yazılmamışken bu dinleyici çalışmasın diye.
let kayitSuruyor = false;
// Google ile ilk kez girenin profili yok: adını ve rolünü sorarız.
let eksikProfil = false;

function profilTamamlaGoster(kullanici) {
  eksikProfil = true;
  g("rolBaslik").textContent = "👋 Hoş geldin! Son bir adım";
  g("rolAciklama").textContent = "Adını ve rolünü seç. Rol bir kere seçilir, sonra değişmez!";
  g("profilAdAlani").hidden = false;
  // Google'daki adın sadece ilk kelimesi (soyad gelmesin)
  g("profilAd").value = ((kullanici.displayName || "").trim().split(/\s+/)[0] || "").slice(0, 20);
  ekranGoster("rolEkrani");
}

onAuthStateChanged(auth, async (kullanici) => {
  ben = kullanici;
  dinleyicileriKapat();
  if (!kullanici) {
    profil = null;
    ekranGoster("girisEkrani");
    return;
  }
  if (kayitSuruyor) return; // kayıt formu bitirecek
  profil = null;
  eksikProfil = false;
  try {
    let belge = await getDoc(doc(db, "kullanicilar", kullanici.uid));
    if (!belge.exists()) return profilTamamlaGoster(kullanici);
    profil = belge.data();
    sayfayiGoster();
  } catch (hata) {
    ekranGoster("girisEkrani");
    yaz("girisSonuc", hataMesaji(hata), "yanlis");
  }
});

// ---------------------------------------------------------
// 2. SAYFA YÖNLENDİRME (#okul/ID, #sinif/ID)
// ---------------------------------------------------------

// Başka bir sayfadan giriş için gönderildiysek (okul.html?geri=dersler.html) oraya döneriz.
function geriAdresi() {
  let geri = new URLSearchParams(location.search).get("geri") || "";
  return /^[a-z-]+\.html(#[\w\/-]*)?$/.test(geri) ? geri : "";
}

function sayfayiGoster() {
  if (!ben || !profil) return;
  dinleyicileriKapat();
  // Rol seçmeden önce açılmış eski hesaplar bir kere rol seçer.
  if (!ROLLER[profil.rol]) {
    g("profilAdAlani").hidden = true;
    return ekranGoster("rolEkrani");
  }
  if (geriAdresi()) return location.replace(geriAdresi());
  let adres = location.hash.slice(1).split("/");
  if (adres[0] === "okul" && adres[1]) okulGoster(adres[1]);
  else if (adres[0] === "sinif" && adres[1]) sinifGoster(adres[1]);
  else anaPaneliGoster();
}

window.addEventListener("hashchange", sayfayiGoster);

g("rolFormu").addEventListener("submit", async (olay) => {
  olay.preventDefault();
  let rol = (document.querySelector('input[name="rol2"]:checked') || {}).value;
  if (!ROLLER[rol]) return;

  if (eksikProfil) {
    let ad = g("profilAd").value.trim();
    if (ad.length < 2) return yaz("rolSonuc", "İlk adını yaz (en az 2 harf).", "yanlis");
    if (ad.includes(" ")) return yaz("rolSonuc", "Sadece ilk adını yaz, soyad yazma! 😉", "yanlis");
    let eposta = ben.email || "";
    let kullaniciAdi = eposta.endsWith(EPOSTA_SONU) ? eposta.slice(0, -EPOSTA_SONU.length) : "google";
    let yeniProfil = { ad: ad, kullaniciAdi: kullaniciAdi, rol: rol, siniflar: [], okullar: [] };
    yaz("rolSonuc", "⏳ Kaydediliyor...");
    try {
      await setDoc(doc(db, "kullanicilar", ben.uid), yeniProfil);
      profil = yeniProfil;
      eksikProfil = false;
      yaz("rolSonuc", "");
      sayfayiGoster();
    } catch (hata) {
      yaz("rolSonuc", hataMesaji(hata), "yanlis");
    }
    return;
  }

  yaz("rolSonuc", "⏳ Kaydediliyor...");
  try {
    await updateDoc(doc(db, "kullanicilar", ben.uid), { rol: rol, okullar: profil.okullar || [] });
    profil.rol = rol;
    profil.okullar = profil.okullar || [];
    yaz("rolSonuc", "");
    sayfayiGoster();
  } catch (hata) {
    yaz("rolSonuc", hataMesaji(hata), "yanlis");
  }
});

// ---------------------------------------------------------
// 3. ANA PANEL: sınıflarım + okullarım
// ---------------------------------------------------------

function okulSatiri(id, ad, ek) {
  return '<a class="panel-satir tiklanir" href="#okul/' + id + '"><span class="satir-ikon">🏫</span>' +
    '<span class="ogrenci-adi">' + guvenli(ad) + "</span>" + (ek || "") + '<span class="soluk">→</span></a>';
}

async function anaPaneliGoster() {
  ekranGoster("anaPanel");
  let rol = profil.rol;
  g("kullaniciAdi").textContent = profil.ad;
  g("kullaniciKimlik").textContent = profil.kullaniciAdi;
  g("rolRozeti").textContent = ROLLER[rol];
  g("sinifKartim").hidden = rol !== "ogrenci";
  g("okulKartim").hidden = rol === "ogrenci";
  g("okulFormu").hidden = rol !== "mudur";
  g("okulaKatilFormu").hidden = rol !== "ogretmen";

  if (rol === "mudur") {
    g("okulIpucu").textContent = "🎩 Okul aç, sonra okulun öğretmen kodunu öğretmenlerine ver.";
    dinleyiciler.push(onSnapshot(
      query(collection(db, "okullar"), where("kurucu", "==", ben.uid)),
      (sonuc) => {
        g("okulListem").innerHTML = sonuc.empty
          ? '<p class="soluk">Henüz okulun yok. Aşağıdan ilk okulunu aç! 🏫</p>'
          : sonuc.docs.map((d) => okulSatiri(d.id, d.data().ad, '<span class="kod-rozet">🔑 ' + guvenli(d.data().ogretmenKodu) + "</span>")).join("");
      },
      (hata) => yaz("okulSonuc", hataMesaji(hata), "yanlis"),
    ));
    return;
  }

  if (rol === "ogretmen") {
    g("okulIpucu").textContent = "🧑‍🏫 Okulunun müdüründen öğretmen kodunu iste ve buraya yaz.";
    let idler = profil.okullar || [];
    if (idler.length === 0) {
      g("okulListem").innerHTML = '<p class="soluk">Henüz bir okula katılmadın.</p>';
      return;
    }
    let satirlar = [];
    for (let id of idler) {
      try {
        let o = await getDoc(doc(db, "okullar", id));
        if (o.exists()) satirlar.push(okulSatiri(id, o.data().ad, '<span class="soluk kucuk">🎩 ' + guvenli(o.data().kurucuAd) + "</span>"));
      } catch (hata) { /* okul silinmiş olabilir */ }
    }
    g("okulListem").innerHTML = satirlar.join("") || '<p class="soluk">Henüz bir okula katılmadın.</p>';
    return;
  }

  // Öğrenci: Sınıflarım
  let liste = g("sinifListem");
  let idler = (profil.siniflar || []).slice();
  if (idler.length === 0) {
    liste.innerHTML = '<p class="soluk">Henüz bir sınıfa katılmadın. Öğretmeninden kodu iste! 🔑</p>';
    return;
  }
  liste.innerHTML = '<p class="soluk">⏳ Yükleniyor...</p>';
  let satirlar = [];
  for (let id of idler) {
    try {
      let s = await getDoc(doc(db, "siniflar", id));
      if (s.exists()) {
        let v = s.data();
        satirlar.push('<a class="panel-satir tiklanir" href="#sinif/' + id + '"><span class="satir-ikon">📚</span>' +
          '<span class="ogrenci-adi">' + guvenli(v.ad) + '<br><span class="soluk kucuk">🏫 ' + guvenli(v.okulAd) +
          " · 🧑‍🏫 " + guvenli(v.ogretmenAd) + '</span></span><span class="soluk">→</span></a>');
      }
    } catch (hata) {
      // Öğretmen çıkardıysa sınıfı göremeyiz, listeden sessizce atlarız.
    }
  }
  liste.innerHTML = satirlar.length ? satirlar.join("")
    : '<p class="soluk">Henüz bir sınıfa katılmadın. Öğretmeninden kodu iste! 🔑</p>';
}

g("okulFormu").addEventListener("submit", async (olay) => {
  olay.preventDefault();
  let ad = g("okulAdi").value.trim();
  if (!ad) return;
  yaz("okulSonuc", "⏳ Okul açılıyor...");
  // Öğretmen kodu başka okulda varsa kural izin vermez; 3 kere farklı kod deneriz.
  for (let deneme = 0; deneme < 3; deneme++) {
    let kod = yeniKod();
    let okulRef = doc(collection(db, "okullar"));
    let paket = writeBatch(db);
    paket.set(okulRef, { ad: ad, kurucu: ben.uid, kurucuAd: profil.ad, ogretmenKodu: kod, olusturma: serverTimestamp() });
    paket.set(doc(db, "okulkodlari", kod), { okulId: okulRef.id });
    try {
      await paket.commit();
      g("okulAdi").value = "";
      yaz("okulSonuc", "🎉 Okulun açıldı!", "dogru");
      location.hash = "okul/" + okulRef.id;
      return;
    } catch (hata) {
      if (hata.code !== "permission-denied" || deneme === 2) return yaz("okulSonuc", hataMesaji(hata), "yanlis");
    }
  }
});

// Öğretmen: okul koduyla okula katılır
g("okulaKatilFormu").addEventListener("submit", async (olay) => {
  olay.preventDefault();
  let kod = g("okulKoduGiris").value.trim().toUpperCase();
  if (kod.length !== 6) return yaz("okulSonuc", "Okul kodu 6 harf olmalı.", "yanlis");
  yaz("okulSonuc", "⏳ Okul aranıyor...");
  try {
    let kodBelgesi = await getDoc(doc(db, "okulkodlari", kod));
    if (!kodBelgesi.exists()) return yaz("okulSonuc", "Bu kodla bir okul bulamadım. Kodu kontrol et! 🔍", "yanlis");
    let okulId = kodBelgesi.data().okulId;
    let benimKaydim = doc(db, "okullar", okulId, "ogretmenler", ben.uid);
    if (!(await getDoc(benimKaydim)).exists()) {
      await setDoc(benimKaydim, { ad: profil.ad, katilma: serverTimestamp() });
    }
    await updateDoc(doc(db, "kullanicilar", ben.uid), { okullar: arrayUnion(okulId) });
    profil.okullar = profil.okullar || [];
    if (!profil.okullar.includes(okulId)) profil.okullar.push(okulId);
    g("okulKoduGiris").value = "";
    yaz("okulSonuc", "🎉 Okula katıldın! Artık sınıf açabilirsin.", "dogru");
    location.hash = "okul/" + okulId;
  } catch (hata) {
    yaz("okulSonuc", hataMesaji(hata), "yanlis");
  }
});

// Kod kutularına sadece büyük harf ve rakam yazılsın
["katilKodu", "okulKoduGiris"].forEach((id) => {
  g(id).addEventListener("input", (olay) => {
    olay.target.value = olay.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  });
});

g("katilFormu").addEventListener("submit", async (olay) => {
  olay.preventDefault();
  let kod = g("katilKodu").value.trim().toUpperCase();
  if (kod.length !== 6) return yaz("katilSonuc", "Sınıf kodu 6 harf olmalı.", "yanlis");
  yaz("katilSonuc", "⏳ Sınıf aranıyor...");
  try {
    let kodBelgesi = await getDoc(doc(db, "kodlar", kod));
    if (!kodBelgesi.exists()) return yaz("katilSonuc", "Bu kodla bir sınıf bulamadım. Kodu kontrol et! 🔍", "yanlis");
    let sinifId = kodBelgesi.data().sinifId;

    // Kendi sınıfın mı, ya da zaten üye misin? (Üye değilsen sınıfı okuyamazsın, sorun değil.)
    try {
      let sinif = await getDoc(doc(db, "siniflar", sinifId));
      if (sinif.exists()) {
        g("katilKodu").value = "";
        yaz("katilSonuc", sinif.data().ogretmenId === ben.uid
          ? "Bu senin kendi sınıfın, sen öğretmenisin! 🧑‍🏫" : "Bu sınıfa zaten katılmışsın. 😉", "ipucu");
        location.hash = "sinif/" + sinifId;
        return;
      }
    } catch (hata) {
      // Okuyamadık: demek ki henüz üye değilsin, katılmaya devam.
    }

    await setDoc(doc(db, "siniflar", sinifId, "uyeler", ben.uid), {
      ad: profil.ad, yildiz: 0, katilma: serverTimestamp(),
    });
    await updateDoc(doc(db, "kullanicilar", ben.uid), { siniflar: arrayUnion(sinifId) });
    if (!profil.siniflar.includes(sinifId)) profil.siniflar.push(sinifId);
    g("katilKodu").value = "";
    yaz("katilSonuc", "🎉 Sınıfa katıldın!", "dogru");
    location.hash = "sinif/" + sinifId;
  } catch (hata) {
    // Zaten üyeysen tekrar katılmak "izin yok" verir (yıldızın sıfırlanmasın diye).
    if (hata.code === "permission-denied") {
      yaz("katilSonuc", "Bu sınıfa zaten katılmışsın ya da kendi sınıfın. 😉", "ipucu");
    } else {
      yaz("katilSonuc", hataMesaji(hata), "yanlis");
    }
  }
});

// ---------------------------------------------------------
// 4. OKUL: sınıfları listele ve yeni sınıf aç
// ---------------------------------------------------------

let aktifOkul = null;

async function okulGoster(okulId) {
  ekranGoster("okulGorunumu");
  g("okulBaslik").textContent = "...";
  g("okulSiniflari").innerHTML = '<p class="soluk">⏳ Yükleniyor...</p>';
  yaz("sinifSonuc", "");
  aktifOkul = null;
  g("okulKodKarti").hidden = true;
  g("ogretmenlerKarti").hidden = true;
  g("okulSohbetKarti").hidden = true;
  g("okulSiniflarKarti").hidden = false;
  g("okulAltBaslik").textContent = "";
  let mudurMu = false;
  let ogrenciMi = false;
  try {
    let okul = await getDoc(doc(db, "okullar", okulId));
    if (!okul.exists()) {
      g("okulSiniflari").innerHTML = '<p class="soluk">Bu okul artık yok. 🤷</p>';
      return;
    }
    mudurMu = okul.data().kurucu === ben.uid;
    let ogretmenMi = !mudurMu && (await getDoc(doc(db, "okullar", okulId, "ogretmenler", ben.uid))).exists();
    ogrenciMi = !mudurMu && !ogretmenMi && (await getDoc(doc(db, "okullar", okulId, "uyeler", ben.uid))).exists();
    if (!mudurMu && !ogretmenMi && !ogrenciMi) {
      g("okulSiniflari").innerHTML = '<p class="soluk">Bu okulun üyesi değilsin. 🔒</p>';
      return;
    }
    aktifOkul = { id: okulId, ...okul.data() };
  } catch (hata) {
    g("okulSiniflari").innerHTML = '<p class="soluk">' + guvenli(hataMesaji(hata)) + "</p>";
    return;
  }

  g("okulBaslik").textContent = aktifOkul.ad;
  g("okulSohbetKarti").hidden = false;
  sohbetBaslat("okul", ["okullar", okulId], mudurMu);

  if (ogrenciMi) {
    // Öğrenci okulda sadece okul sohbetini görür
    g("okulAltBaslik").textContent = "👦 Bu okulun öğrencisisin. Müdür: " + aktifOkul.kurucuAd;
    g("okulSiniflarKarti").hidden = true;
    return;
  }

  g("okulAltBaslik").textContent = mudurMu
    ? "🎩 Bu okulun müdürüsün. Bütün sınıfları görürsün, istersen sen de sınıf açabilirsin."
    : "🧑‍🏫 Bu okulda öğretmensin. Müdür: " + aktifOkul.kurucuAd;
  g("okulSinifBaslik").textContent = mudurMu ? "📚 Okulun bütün sınıfları" : "📚 Sınıflarım";

  if (mudurMu) {
    g("okulKodKarti").hidden = false;
    g("ogretmenlerKarti").hidden = false;
    g("okulKodu").textContent = aktifOkul.ogretmenKodu || "—";
    dinleyiciler.push(onSnapshot(collection(db, "okullar", okulId, "ogretmenler"), (sonuc) => {
      g("ogretmenListesi").innerHTML = sonuc.empty
        ? '<p class="soluk">Henüz öğretmen yok. Öğretmen kodunu öğretmenlerine söyle! 🔑</p>'
        : sonuc.docs.map((d) =>
            '<div class="panel-satir"><span class="satir-ikon">🧑‍🏫</span><span class="ogrenci-adi">' + guvenli(d.data().ad) + "</span>" +
            '<button class="mini-buton sil" data-ogretmen-cikar="' + d.id + '" data-ad="' + guvenli(d.data().ad) + '">🗑️ Çıkar</button></div>').join("");
    }));
  }

  let filtre = mudurMu ? where("mudurId", "==", ben.uid) : where("ogretmenId", "==", ben.uid);
  dinleyiciler.push(onSnapshot(
    query(collection(db, "siniflar"), where("okulId", "==", okulId), filtre),
    (sonuc) => {
      g("okulSiniflari").innerHTML = sonuc.empty
        ? '<p class="soluk">Henüz sınıf yok. Aşağıdan ilk sınıfını aç! 👇</p>'
        : sonuc.docs.map((d) => {
            let v = d.data();
            let kimin = mudurMu ? '<span class="soluk kucuk">🧑‍🏫 ' + guvenli(v.ogretmenAd) + "</span>" : "";
            return '<a class="panel-satir tiklanir" href="#sinif/' + d.id + '"><span class="satir-ikon">📚</span>' +
              '<span class="ogrenci-adi">' + guvenli(v.ad) + "</span>" + kimin +
              '<span class="kod-rozet">🔑 ' + guvenli(v.kod) + '</span><span class="soluk">→</span></a>';
          }).join("");
    },
    (hata) => yaz("sinifSonuc", hataMesaji(hata), "yanlis"),
  ));
}

g("okulGorunumu").addEventListener("click", async (olay) => {
  let hedef = olay.target.closest("button");
  if (!hedef || !aktifOkul) return;
  if (hedef.id === "okulKoduKopyala") {
    try {
      await navigator.clipboard.writeText(aktifOkul.ogretmenKodu);
      hedef.textContent = "✅ Kopyalandı";
      setTimeout(() => (hedef.textContent = "📋 Kopyala"), 1500);
    } catch (hata) {
      alert("Öğretmen kodu: " + aktifOkul.ogretmenKodu);
    }
  } else if (hedef.dataset.ogretmenCikar && confirm(hedef.dataset.ad + " okuldan çıkarılsın mı?")) {
    try {
      await deleteDoc(doc(db, "okullar", aktifOkul.id, "ogretmenler", hedef.dataset.ogretmenCikar));
    } catch (hata) {
      alert(hataMesaji(hata));
    }
  }
});

g("sinifFormu").addEventListener("submit", async (olay) => {
  olay.preventDefault();
  let ad = g("sinifAdi").value.trim();
  if (!ad || !aktifOkul) return;
  yaz("sinifSonuc", "⏳ Sınıf açılıyor...");
  // Kod başka bir sınıfta varsa kural izin vermez; 3 kere farklı kod deneriz.
  for (let deneme = 0; deneme < 3; deneme++) {
    let kod = yeniKod();
    let sinifRef = doc(collection(db, "siniflar"));
    let paket = writeBatch(db);
    paket.set(sinifRef, {
      ad: ad, okulId: aktifOkul.id, okulAd: aktifOkul.ad,
      ogretmenId: ben.uid, ogretmenAd: profil.ad, mudurId: aktifOkul.kurucu, kod: kod, olusturma: serverTimestamp(),
    });
    paket.set(doc(db, "kodlar", kod), { sinifId: sinifRef.id });
    try {
      await paket.commit();
      g("sinifAdi").value = "";
      yaz("sinifSonuc", "🎉 Sınıf açıldı! Kodu: " + kod, "dogru");
      return;
    } catch (hata) {
      if (hata.code !== "permission-denied" || deneme === 2) {
        return yaz("sinifSonuc", hataMesaji(hata), "yanlis");
      }
    }
  }
});

// ---------------------------------------------------------
// 5. SINIF: öğretmen yönetir, öğrenci görür
// ---------------------------------------------------------

let aktifSinif = null;
let uyeler = [];
let yoklamalar = [];

async function sinifGoster(sinifId) {
  ekranGoster("sinifGorunumu");
  aktifSinif = null;
  uyeler = [];
  yoklamalar = [];
  g("sinifBaslik").textContent = "...";
  g("uyeListesi").innerHTML = '<p class="soluk">⏳ Yükleniyor...</p>';
  g("duyuruListesi").innerHTML = "";
  g("odevListesi").innerHTML = "";

  let sinif;
  try {
    sinif = await getDoc(doc(db, "siniflar", sinifId));
  } catch (hata) {
    g("uyeListesi").innerHTML = '<p class="soluk">Bu sınıfı göremiyorsun. 🔒 Sınıftan çıkarılmış olabilirsin.</p>';
    return;
  }
  if (!sinif.exists()) {
    g("uyeListesi").innerHTML = '<p class="soluk">Bu sınıf artık yok. 🤷</p>';
    return;
  }

  aktifSinif = { id: sinifId, ...sinif.data() };
  // mod: "ogretmen" (yönetir) · "mudur" (izler) · "ogrenci"
  let mod = aktifSinif.ogretmenId === ben.uid ? "ogretmen"
    : aktifSinif.mudurId === ben.uid ? "mudur" : "ogrenci";
  let ogretmen = mod === "ogretmen";
  aktifSinif.ogretmen = ogretmen;
  aktifSinif.mod = mod;

  g("sinifBaslik").textContent = aktifSinif.ad;
  g("sinifOkul").textContent = aktifSinif.okulAd;
  g("sinifOgretmen").textContent = aktifSinif.ogretmenAd;
  g("sinifKodu").textContent = aktifSinif.kod;
  g("kodKarti").hidden = !ogretmen;
  g("mudurNotu").hidden = mod !== "mudur";
  g("benimKart").hidden = mod !== "ogrenci";
  g("yoklamaKarti").hidden = !ogretmen;
  g("duyuruFormu").hidden = !ogretmen;
  g("odevFormu").hidden = !ogretmen;
  g("siniftanCik").hidden = mod !== "ogrenci";
  g("uyeBaslik").textContent = ogretmen ? "⭐ Öğrenciler ve yıldızlar" : "🏆 Sıralama";
  document.querySelectorAll("#sinifGorunumu .ekmek").forEach((a) => {
    a.href = mod === "ogrenci" ? "#" : "#okul/" + aktifSinif.okulId;
    a.textContent = mod === "ogrenci" ? "← Ana panel" : "← " + aktifSinif.okulAd;
  });

  // 💬 Sınıf sohbeti (öğretmen ve müdür her mesajı silebilir)
  sohbetBaslat("sinif", ["siniflar", sinifId], mod !== "ogrenci");
  g("okulSohbetLinki").href = "#okul/" + aktifSinif.okulId;
  g("okulSohbetLinki").hidden = false;

  // Öğrenci okul sohbetine yazabilsin diye okula da üye olur (bir kere)
  if (mod === "ogrenci") {
    let okulKaydim = doc(db, "okullar", aktifSinif.okulId, "uyeler", ben.uid);
    getDoc(okulKaydim)
      .then((k) => (k.exists() ? null : setDoc(okulKaydim, { ad: profil.ad, sinifId: sinifId })))
      .catch((hata) => console.warn("Okul üyeliği yapılamadı", hata));
  }
  if (!g("yoklamaTarihi").value) g("yoklamaTarihi").value = bugunMetni();

  let yol = ["siniflar", sinifId];

  dinleyiciler.push(onSnapshot(collection(db, ...yol, "uyeler"), (sonuc) => {
    uyeler = sonuc.docs.map((d) => ({ uid: d.id, ...d.data() }))
      .sort((a, b) => (b.yildiz || 0) - (a.yildiz || 0) || a.ad.localeCompare(b.ad, "tr"));
    uyeleriCiz();
    yoklamaCiz();
  }, (hata) => {
    g("uyeListesi").innerHTML = '<p class="soluk">' + guvenli(hataMesaji(hata)) + "</p>";
  }));

  dinleyiciler.push(onSnapshot(collection(db, ...yol, "yoklama"), (sonuc) => {
    yoklamalar = sonuc.docs.map((d) => ({ tarih: d.id, geldi: d.data().geldi || [] }));
    yoklamaCiz();
    benimKartimiCiz();
  }));

  dinleyiciler.push(onSnapshot(
    query(collection(db, ...yol, "duyurular"), orderBy("tarih", "desc")),
    (sonuc) => {
      g("duyuruListesi").innerHTML = sonuc.empty ? '<p class="soluk">Henüz duyuru yok.</p>'
        : sonuc.docs.map((d) => {
            let v = d.data({ serverTimestamps: "estimate" });
            return '<div class="duyuru"><span class="duyuru-tarih">📅 ' + zamanYazisi(v.tarih) + "</span>" +
              (ogretmen ? '<button class="mini-buton sil sag" data-sil-duyuru="' + d.id + '" aria-label="Duyuruyu sil">🗑️</button>' : "") +
              "<p>" + guvenli(v.metin) + "</p></div>";
          }).join("");
    },
  ));

  dinleyiciler.push(onSnapshot(
    query(collection(db, ...yol, "odevler"), orderBy("sonTarih")),
    (sonuc) => {
      let bugun = bugunMetni();
      g("odevListesi").innerHTML = sonuc.empty ? '<p class="soluk">Henüz ödev yok. 🎉</p>'
        : sonuc.docs.map((d) => {
            let v = d.data();
            let durum = v.sonTarih < bugun ? '<span class="odev-durum gecti">⌛ Süresi doldu</span>'
              : v.sonTarih === bugun ? '<span class="odev-durum bugun">🔥 Son gün bugün!</span>'
              : '<span class="odev-durum">⏳ ' + tarihYazisi(v.sonTarih) + "</span>";
            return '<div class="odev"><div class="odev-ust"><h3>' + guvenli(v.baslik) + "</h3>" + durum + "</div>" +
              (v.aciklama ? "<p>" + guvenli(v.aciklama) + "</p>" : "") +
              (ogretmen ? '<div class="odev-alt"><span></span><button class="mini-buton sil" data-sil-odev="' + d.id + '">🗑️ Sil</button></div>' : "") +
              "</div>";
          }).join("");
    },
  ));
}

function uyeleriCiz() {
  let alan = g("uyeListesi");
  if (uyeler.length === 0) {
    alan.innerHTML = aktifSinif.ogretmen
      ? '<p class="soluk">Henüz öğrenci yok. Sınıf kodunu arkadaşlarına söyle! 🔑</p>'
      : '<p class="soluk">Henüz kimse yok.</p>';
    return;
  }
  let madalyalar = ["🥇", "🥈", "🥉"];
  alan.innerHTML = uyeler.map((u, i) => {
    let sira = i < 3 && u.yildiz > 0 ? madalyalar[i] : i + 1;
    let benMiyim = u.uid === ben.uid ? " ben-satiri" : "";
    let butonlar = aktifSinif.ogretmen
      ? '<span class="kucuk-butonlar">' +
          '<button class="mini-buton eksi" data-yildiz="-1" data-uid="' + u.uid + '">−1</button>' +
          '<button class="mini-buton" data-yildiz="1" data-uid="' + u.uid + '">+1</button>' +
          '<button class="mini-buton" data-yildiz="5" data-uid="' + u.uid + '">+5</button>' +
          '<button class="mini-buton" data-yildiz="10" data-uid="' + u.uid + '">+10</button>' +
          '<button class="mini-buton sil" data-cikar="' + u.uid + '" aria-label="' + guvenli(u.ad) + ' sınıftan çıkar">🗑️</button>' +
        "</span>"
      : "";
    return '<div class="panel-satir' + benMiyim + '"><span class="sira">' + sira + "</span>" +
      '<span class="ogrenci-adi">' + guvenli(u.ad) + (benMiyim ? " (sen)" : "") + "</span>" +
      '<span class="yildiz">' + (u.yildiz || 0) + " ⭐</span>" + butonlar + "</div>";
  }).join("");
  benimKartimiCiz();
}

function benimKartimiCiz() {
  if (!aktifSinif || aktifSinif.mod !== "ogrenci") return;
  let sira = uyeler.findIndex((u) => u.uid === ben.uid);
  let benimki = uyeler[sira];
  g("benimYildiz").textContent = (benimki ? benimki.yildiz : 0) + " ⭐";
  g("benimSira").textContent = sira >= 0 ? (sira + 1) + ". / " + uyeler.length : "-";
  g("benimYoklama").textContent = yoklamalar.filter((y) => y.geldi.includes(ben.uid)).length;
}

function yoklamaCiz() {
  if (!aktifSinif || !aktifSinif.ogretmen) return;
  let tarih = g("yoklamaTarihi").value;
  let gun = yoklamalar.find((y) => y.tarih === tarih);
  let gelenler = gun ? gun.geldi : [];
  g("yoklamaListesi").innerHTML = uyeler.length === 0
    ? '<p class="soluk">Önce öğrencilerin sınıfa katılsın.</p>'
    : uyeler.map((u) =>
        '<label class="panel-satir yoklama-satir"><input type="checkbox" data-yoklama="' + u.uid + '"' +
        (gelenler.includes(u.uid) ? " checked" : "") + '><span class="ogrenci-adi">' + guvenli(u.ad) + "</span>" +
        (gelenler.includes(u.uid) ? '<span class="dogru-yazi">✅ Geldi</span>' : '<span class="soluk">Gelmedi</span>') +
        "</label>").join("") +
      '<p class="soluk kucuk">✅ ' + gelenler.length + " / " + uyeler.length + " öğrenci geldi · Değişiklikler hemen kaydedilir.</p>";
}

g("yoklamaTarihi").addEventListener("change", yoklamaCiz);

// Tıklamalar (yıldız, çıkarma, silme)
g("sinifGorunumu").addEventListener("click", async (olay) => {
  let hedef = olay.target.closest("button");
  if (!hedef || !aktifSinif) return;
  let yol = ["siniflar", aktifSinif.id];
  try {
    if (hedef.dataset.yildiz) {
      let miktar = Number(hedef.dataset.yildiz);
      let uye = uyeler.find((u) => u.uid === hedef.dataset.uid);
      if (!uye || (uye.yildiz || 0) + miktar < 0) return;
      await updateDoc(doc(db, ...yol, "uyeler", uye.uid), { yildiz: increment(miktar) });
    } else if (hedef.dataset.cikar) {
      let uye = uyeler.find((u) => u.uid === hedef.dataset.cikar);
      if (uye && confirm(uye.ad + " sınıftan çıkarılsın mı?")) {
        await deleteDoc(doc(db, ...yol, "uyeler", uye.uid));
      }
    } else if (hedef.dataset.silDuyuru) {
      if (confirm("Bu duyuru silinsin mi?")) await deleteDoc(doc(db, ...yol, "duyurular", hedef.dataset.silDuyuru));
    } else if (hedef.dataset.silOdev) {
      if (confirm("Bu ödev silinsin mi?")) await deleteDoc(doc(db, ...yol, "odevler", hedef.dataset.silOdev));
    }
  } catch (hata) {
    alert(hataMesaji(hata));
  }
});

// Yoklama kutucukları
g("yoklamaListesi").addEventListener("change", async (olay) => {
  let kutu = olay.target;
  if (!kutu.dataset.yoklama || !aktifSinif) return;
  let tarih = g("yoklamaTarihi").value;
  if (!tarih) return;
  try {
    await setDoc(doc(db, "siniflar", aktifSinif.id, "yoklama", tarih),
      { geldi: kutu.checked ? arrayUnion(kutu.dataset.yoklama) : arrayRemove(kutu.dataset.yoklama) },
      { merge: true });
  } catch (hata) {
    kutu.checked = !kutu.checked;
    alert(hataMesaji(hata));
  }
});

g("duyuruFormu").addEventListener("submit", async (olay) => {
  olay.preventDefault();
  let metin = g("yeniDuyuru").value.trim();
  if (!metin || !aktifSinif) return;
  try {
    await addDoc(collection(db, "siniflar", aktifSinif.id, "duyurular"), { metin: metin, tarih: serverTimestamp() });
    g("yeniDuyuru").value = "";
  } catch (hata) {
    alert(hataMesaji(hata));
  }
});

g("odevFormu").addEventListener("submit", async (olay) => {
  olay.preventDefault();
  let baslik = g("odevBaslik").value.trim();
  let sonTarih = g("odevTarih").value;
  if (!baslik || !sonTarih || !aktifSinif) return;
  try {
    await addDoc(collection(db, "siniflar", aktifSinif.id, "odevler"), {
      baslik: baslik, aciklama: g("odevAciklama").value.trim(), sonTarih: sonTarih,
    });
    g("odevBaslik").value = "";
    g("odevAciklama").value = "";
    g("odevTarih").value = "";
  } catch (hata) {
    alert(hataMesaji(hata));
  }
});

// ---------------------------------------------------------
// 6. SOHBET (okul ve sınıf) + 🚫 KÜFÜR FİLTRESİ
// ---------------------------------------------------------

// Bir kelimenin İÇİNDE geçerse engellenen kökler (Türkçe harfler sadeleştirilmiş hâliyle)
const KUFUR_KOKLERI = ["orospu", "orosbu", "siktir", "sikerim", "sikeyim", "sikik", "yarrak", "amina",
  "amcik", "pezevenk", "gavat", "kahpe", "yavsak", "serefsiz", "gerizekal", "dangalak", "ibne",
  "salak", "aptal", "ahmak", "fuck", "bitch", "shit"];
// Sadece TEK BAŞINA kelime olarak yazılınca engellenenler (başka kelimelerin içinde masum olabilirler)
const KUFUR_KELIMELERI = ["amk", "amq", "aq", "göt", "got", "oç", "oc", "piç", "pic", "sik", "sg", "mk"];

function sadelestir(yazi) {
  return yazi.toLocaleLowerCase("tr")
    .replace(/[şŞ]/g, "s").replace(/[çÇ]/g, "c").replace(/[ğĞ]/g, "g")
    .replace(/[öÖ]/g, "o").replace(/[üÜ]/g, "u").replace(/[ıİ]/g, "i")
    .replace(/0/g, "o").replace(/1/g, "i").replace(/3/g, "e").replace(/4/g, "a")
    .replace(/5/g, "s").replace(/@/g, "a").replace(/\$/g, "s");
}

function mesajSorunu(metin) {
  let kelimeler = metin.toLocaleLowerCase("tr").split(/[^a-zçğıöşü0-9@$]+/);
  let sade = kelimeler.map(sadelestir);
  let bitisik = sade.join(""); // "o r o s p u" gibi boşluklu hileler için
  if (KUFUR_KOKLERI.some((kok) => bitisik.includes(kok))) return "🚫 Bu mesajda kötü bir söz var. Kibar ol! 😊";
  if (kelimeler.some((k) => KUFUR_KELIMELERI.includes(k)) || sade.some((k) => KUFUR_KELIMELERI.includes(k))) {
    return "🚫 Bu mesajda kötü bir söz var. Kibar ol! 😊";
  }
  if (/\d{7,}/.test(metin.replace(/[\s.\-()]/g, ""))) return "📵 Telefon numarası gibi uzun rakamlar yazma, güvenliğin için!";
  return "";
}

const ROL_EMOJI = { ogrenci: "👦", ogretmen: "🧑‍🏫", mudur: "🎩" };
let sohbetler = {}; // { okul: { yol, silebilirim }, sinif: {...} }

function sohbetBaslat(tur, yol, yetkiliyim) {
  sohbetler[tur] = { yol: yol, yetkiliyim: yetkiliyim };
  let alan = g(tur + "Sohbet");
  alan.innerHTML = '<p class="soluk">⏳ Mesajlar yükleniyor...</p>';
  yaz(tur + "SohbetSonuc", "");
  dinleyiciler.push(onSnapshot(
    query(collection(db, ...yol, "mesajlar"), orderBy("tarih", "desc"), limit(50)),
    (sonuc) => {
      if (sonuc.empty) {
        alan.innerHTML = '<p class="soluk orta">Henüz mesaj yok. İlk mesajı sen yaz! 👋</p>';
        return;
      }
      alan.innerHTML = sonuc.docs.slice().reverse().map((d) => {
        let m = d.data({ serverTimestamps: "estimate" });
        let benim = m.yazanId === ben.uid;
        let sil = benim || yetkiliyim
          ? '<button class="mini-buton sil" data-mesaj-sil="' + d.id + '" data-sohbet="' + tur + '" aria-label="Mesajı sil">🗑️</button>' : "";
        return '<div class="mesaj' + (benim ? " benim" : "") + '">' +
          '<div class="mesaj-ust"><b>' + (ROL_EMOJI[m.yazanRol] || "") + " " + guvenli(m.yazanAd) + "</b>" +
          '<span class="soluk kucuk">' + zamanYazisi(m.tarih) + "</span>" + sil + "</div>" +
          "<p>" + guvenli(m.metin) + "</p></div>";
      }).join("");
      alan.scrollTop = alan.scrollHeight;
    },
    (hata) => { alan.innerHTML = '<p class="soluk">' + guvenli(hataMesaji(hata)) + "</p>"; },
  ));
}

document.querySelectorAll(".sohbet-formu").forEach((form) => {
  form.addEventListener("submit", async (olay) => {
    olay.preventDefault();
    let tur = form.dataset.sohbet;
    let kutu = form.querySelector("input");
    let metin = kutu.value.trim();
    let sohbet = sohbetler[tur];
    if (!metin || !sohbet) return;
    let sorun = mesajSorunu(metin);
    if (sorun) return yaz(tur + "SohbetSonuc", sorun, "yanlis");
    yaz(tur + "SohbetSonuc", "");
    kutu.value = "";
    try {
      await addDoc(collection(db, ...sohbet.yol, "mesajlar"), {
        metin: metin, yazanId: ben.uid, yazanAd: profil.ad, yazanRol: profil.rol, tarih: serverTimestamp(),
      });
    } catch (hata) {
      kutu.value = metin;
      yaz(tur + "SohbetSonuc", hata.code === "permission-denied"
        ? "🚫 Bu mesaj gönderilemedi. Kötü bir söz ya da numara olabilir." : hataMesaji(hata), "yanlis");
    }
  });
});

document.querySelectorAll(".sohbet").forEach((alan) => {
  alan.addEventListener("click", async (olay) => {
    let buton = olay.target.closest("[data-mesaj-sil]");
    if (!buton || !confirm("Bu mesaj silinsin mi?")) return;
    let sohbet = sohbetler[buton.dataset.sohbet];
    try {
      await deleteDoc(doc(db, ...sohbet.yol, "mesajlar", buton.dataset.mesajSil));
    } catch (hata) {
      alert(hataMesaji(hata));
    }
  });
});

g("koduKopyala").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(aktifSinif.kod);
    g("koduKopyala").textContent = "✅ Kopyalandı";
    setTimeout(() => (g("koduKopyala").textContent = "📋 Kopyala"), 1500);
  } catch (hata) {
    alert("Kod: " + aktifSinif.kod);
  }
});

g("siniftanCik").addEventListener("click", async () => {
  if (!aktifSinif || !confirm("Bu sınıftan çıkmak istiyor musun? Yıldızların silinir!")) return;
  try {
    await deleteDoc(doc(db, "siniflar", aktifSinif.id, "uyeler", ben.uid));
    await updateDoc(doc(db, "kullanicilar", ben.uid), { siniflar: arrayRemove(aktifSinif.id) });
    profil.siniflar = profil.siniflar.filter((id) => id !== aktifSinif.id);
    location.hash = "";
  } catch (hata) {
    alert(hataMesaji(hata));
  }
});
