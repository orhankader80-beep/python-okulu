// 🔒 GİRİŞ KAPISI
// Bu dosya her sayfanın başında çalışır. Giriş yapmamış (ya da profilini
// tamamlamamış) kişiyi okul.html'deki giriş ekranına gönderir.
// Giriş yapınca okul.html kişiyi geldiği sayfaya geri yollar.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-ayar.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function giriseGonder() {
  let sayfa = location.pathname.split("/").pop() || "index.html";
  location.replace("okul.html?geri=" + encodeURIComponent(sayfa + location.hash));
}

let profilKontrolEdildi = false;

onAuthStateChanged(auth, async (kullanici) => {
  // Giriş yok (ya da başka bir sekmede çıkış yapıldı) → giriş ekranına
  if (!kullanici) return giriseGonder();

  // Profil (ad + rol) var mı? Yoksa okul.html tamamlatır.
  if (!profilKontrolEdildi) {
    profilKontrolEdildi = true;
    try {
      let profil = await getDoc(doc(db, "kullanicilar", kullanici.uid));
      if (!profil.exists() || !profil.data().rol) return giriseGonder();
    } catch (hata) {
      // İnternet kısa süre gittiyse giriş yine de geçerli, sayfayı açarız.
      console.warn(hata);
    }
  }

  document.documentElement.classList.remove("giris-bekleniyor");
});
