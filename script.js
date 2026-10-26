// =========================================================
// ⚡ PYTHON OKULU - SAYFANIN BEYNİ
// Bu dosya üç sayfada da çalışır. Her bölüm, sadece
// kendi sayfasındaki parçalar varsa çalışır.
// =========================================================

// ---------------------------------------------------------
// 1. TELEFONDAKİ MENÜ DÜĞMESİ (☰)
// ---------------------------------------------------------

let menuButonu = document.querySelector(".menu-butonu");
let menuLinkleri = document.querySelector(".menu-linkleri");

if (menuButonu && menuLinkleri) {
  menuButonu.addEventListener("click", function () {
    let acik = menuLinkleri.classList.toggle("acik");
    menuButonu.setAttribute("aria-expanded", acik);
  });
}

// ---------------------------------------------------------
// 2. YARDIMCILAR
// ---------------------------------------------------------

// Yazının içindeki < > & işaretlerini güvenli hale getirir
function guvenli(yazi) {
  return String(yazi)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Bütün dersleri tek bir listede toplar
function tumDersler() {
  if (typeof BOLUMLER === "undefined") {
    return [];
  }
  let liste = [];
  BOLUMLER.forEach(function (bolum, bolumSirasi) {
    bolum.dersler.forEach(function (ders) {
      liste.push({ ders: ders, bolum: bolum, bolumNo: bolumSirasi + 1, sira: liste.length + 1 });
    });
  });
  return liste;
}

// ---------------------------------------------------------
// 3. İLERLEME, XP VE SEVİYE
// Bitirilen dersler tarayıcının hafızasına kaydedilir.
// ---------------------------------------------------------

const ILERLEME_ANAHTARI = "pythonOkuluTamamlanan";
const SORU_BASINA_XP = 10;

const SEVIYELER = [
  { xp: 0, ad: "Yumurta", emoji: "🥚" },
  { xp: 50, ad: "Yavru Yılan", emoji: "🐣" },
  { xp: 150, ad: "Kod Çırağı", emoji: "💻" },
  { xp: 280, ad: "Kod Büyücüsü", emoji: "🧙" },
  { xp: 420, ad: "Python Ninjası", emoji: "🥷" },
  { xp: 560, ad: "Python Kralı", emoji: "👑" },
];

function tamamlananlar() {
  try {
    let kayit = JSON.parse(localStorage.getItem(ILERLEME_ANAHTARI));
    return Array.isArray(kayit) ? kayit : [];
  } catch (hata) {
    return [];
  }
}

function tamamlananlariKaydet(liste) {
  try {
    localStorage.setItem(ILERLEME_ANAHTARI, JSON.stringify(liste));
  } catch (hata) {
    // Hafıza kapalıysa sorun değil, sadece kaydedilmez.
  }
}

function dersBittiMi(dersId) {
  return tamamlananlar().includes(dersId);
}

function toplamXP() {
  let biten = tamamlananlar();
  let xp = 0;
  tumDersler().forEach(function (k) {
    if (biten.includes(k.ders.id)) {
      xp += k.ders.sorular.length * SORU_BASINA_XP;
    }
  });
  return xp;
}

function seviyeBul(xp) {
  let seviye = SEVIYELER[0];
  let sonraki = null;
  SEVIYELER.forEach(function (s, i) {
    if (xp >= s.xp) {
      seviye = s;
      sonraki = SEVIYELER[i + 1] || null;
    }
  });
  return { seviye: seviye, sonraki: sonraki };
}

function siradakiDers() {
  let biten = tamamlananlar();
  return tumDersler().find(function (k) {
    return !biten.includes(k.ders.id);
  });
}

// Sayfadaki bütün ilerleme göstergelerini günceller
function istatistikleriGoster() {
  let dersler = tumDersler();
  if (dersler.length === 0) {
    return;
  }
  let bitenSayisi = dersler.filter(function (k) {
    return dersBittiMi(k.ders.id);
  }).length;
  let yuzde = Math.round((bitenSayisi / dersler.length) * 100);
  let xp = toplamXP();
  let bilgi = seviyeBul(xp);

  document.querySelectorAll(".ilerleme-dolu[data-genel]").forEach(function (cubuk) {
    cubuk.style.width = yuzde + "%";
  });
  document.querySelectorAll("[data-ders-sayaci]").forEach(function (el) {
    el.textContent = bitenSayisi + " / " + dersler.length + " ders";
  });
  document.querySelectorAll("[data-xp]").forEach(function (el) {
    el.textContent = xp + " XP";
  });
  document.querySelectorAll("[data-seviye]").forEach(function (el) {
    el.textContent = bilgi.seviye.emoji + " " + bilgi.seviye.ad;
  });
  document.querySelectorAll("[data-sonraki-seviye]").forEach(function (el) {
    el.textContent = bilgi.sonraki
      ? "Sonraki seviye: " + bilgi.sonraki.emoji + " " + bilgi.sonraki.ad + " (" + (bilgi.sonraki.xp - xp) + " XP kaldı)"
      : "En yüksek seviyedesin! 🎉";
  });
  document.querySelectorAll("[data-bolum-sayisi]").forEach(function (el) {
    el.textContent = BOLUMLER.length;
  });
  document.querySelectorAll("[data-toplam-ders]").forEach(function (el) {
    el.textContent = dersler.length;
  });

  // Ana sayfadaki "Başla" düğmesi
  let baslaButonu = document.getElementById("baslaButonu");
  if (baslaButonu) {
    let sonraki = siradakiDers();
    if (bitenSayisi === dersler.length) {
      baslaButonu.textContent = "🏆 Dersleri Tekrar Et";
      baslaButonu.href = "dersler.html";
    } else if (bitenSayisi > 0) {
      baslaButonu.textContent = "▶️ Kaldığın Yerden Devam Et";
      baslaButonu.href = "dersler.html#ders/" + sonraki.ders.id;
    }
  }
}

// ---------------------------------------------------------
// 4. KODLARI RENKLENDİRME (IDLE gibi renkli görünsün)
// ---------------------------------------------------------

const ANAHTAR_KELIMELER = new Set([
  "if", "elif", "else", "while", "for", "in", "def", "return", "import",
  "and", "or", "not", "True", "False", "None", "break", "continue",
]);
const HAZIR_KOMUTLAR = new Set([
  "print", "input", "int", "str", "float", "len", "range", "random", "randint", "append", "remove", "lower",
]);

function renklendir(kod) {
  let desen = /(#.*)|([fF]?"(?:[^"\\]|\\.)*"|[fF]?'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_çğıöşüÇĞİÖŞÜ][\wçğıöşüÇĞİÖŞÜ]*)/g;
  let sonuc = "";
  let son = 0;
  let parca;

  while ((parca = desen.exec(kod)) !== null) {
    sonuc += guvenli(kod.slice(son, parca.index));
    let kelime = parca[0];
    let sinif = "";

    if (parca[1]) sinif = "k-yorum";
    else if (parca[2]) sinif = "k-yazi";
    else if (parca[3]) sinif = "k-sayi";
    else if (ANAHTAR_KELIMELER.has(kelime)) sinif = "k-anahtar";
    else if (HAZIR_KOMUTLAR.has(kelime)) sinif = "k-hazir";

    sonuc += sinif ? '<span class="' + sinif + '">' + guvenli(kelime) + "</span>" : guvenli(kelime);
    son = desen.lastIndex;
  }

  return sonuc + guvenli(kod.slice(son));
}

// ---------------------------------------------------------
// 5. DERSLER SAYFASI
// ---------------------------------------------------------

let katalog = document.getElementById("katalog");
let dersGorunumu = document.getElementById("dersGorunumu");

// Adres çubuğundaki # kısmına bakıp katalogu ya da dersi gösterir
function sayfayiGoster() {
  let adres = location.hash;

  if (adres === "#tekrar") {
    katalog.hidden = true;
    dersGorunumu.hidden = false;
    tekrarGoster();
    window.scrollTo(0, 0);
    return;
  }

  if (adres.startsWith("#ders/")) {
    let dersId = decodeURIComponent(adres.slice(6));
    let bulunan = tumDersler().find(function (k) {
      return k.ders.id === dersId;
    });
    if (bulunan) {
      katalog.hidden = true;
      dersGorunumu.hidden = false;
      dersiGoster(bulunan);
      window.scrollTo(0, 0);
      return;
    }
  }

  dersGorunumu.hidden = true;
  katalog.hidden = false;
  katalogGoster();
}

// ---------- 5a. Bütün derslerin listesi (katalog) ----------

function katalogGoster() {
  let bolumListesi = document.getElementById("bolumListesi");
  let dersler = tumDersler();
  let biten = tamamlananlar();
  let siradaki = siradakiDers();

  // Sıradaki ders düğmesi
  let devamButonu = document.getElementById("devamButonu");
  if (siradaki) {
    devamButonu.href = "#ders/" + siradaki.ders.id;
    devamButonu.textContent = (biten.length === 0 ? "🚀 Başla: " : "▶️ Devam et: ") + siradaki.ders.baslik;
    devamButonu.hidden = false;
  } else {
    devamButonu.hidden = true;
  }

  // Hızlı tekrar düğmesi (en az bir ders bittiyse görünür)
  let tekrarButonu = document.getElementById("tekrarButonu");
  if (tekrarButonu) {
    tekrarButonu.hidden = biten.length === 0;
  }

  let html = "";

  BOLUMLER.forEach(function (bolum, bolumSirasi) {
    let bolumDersleri = dersler.filter(function (k) {
      return k.bolum === bolum;
    });
    let bolumBiten = bolumDersleri.filter(function (k) {
      return biten.includes(k.ders.id);
    }).length;
    let bolumYuzde = Math.round((bolumBiten / bolumDersleri.length) * 100);
    let bolumTamam = bolumBiten === bolumDersleri.length;

    html +=
      '<section class="kart bolum' + (bolumTamam ? " tamam" : "") + '" data-bolum>' +
      '  <div class="bolum-ust">' +
      '    <div class="bolum-emoji">' + bolum.emoji + "</div>" +
      '    <div class="bolum-bilgi">' +
      '      <div class="bolum-no">Bölüm ' + (bolumSirasi + 1) + (bolumTamam ? " · 🏅 Tamamlandı" : "") + "</div>" +
      "      <h2>" + bolum.baslik + "</h2>" +
      "      <p>" + bolum.aciklama + "</p>" +
      "    </div>" +
      '    <div class="bolum-sayac">' + bolumBiten + "/" + bolumDersleri.length + "</div>" +
      "  </div>" +
      '  <div class="ilerleme-cubuk ince"><div class="ilerleme-dolu" style="width:' + bolumYuzde + '%"></div></div>' +
      '  <div class="ders-satirlari">';

    bolumDersleri.forEach(function (k) {
      let bittiMi = biten.includes(k.ders.id);
      let siradakiMi = siradaki && siradaki.ders.id === k.ders.id;
      html +=
        '<a href="#ders/' + k.ders.id + '" class="ders-satiri' + (bittiMi ? " tamam" : "") + (siradakiMi ? " siradaki" : "") + '" data-arama="' + guvenli(k.ders.baslik.toLocaleLowerCase("tr")) + '">' +
        '  <span class="satir-no">' + (bittiMi ? "✓" : k.sira) + "</span>" +
        '  <span class="satir-baslik">' + k.ders.baslik + (siradakiMi ? ' <span class="siradaki-etiket">Sıradaki</span>' : "") + "</span>" +
        '  <span class="satir-bilgi">⏱ ' + k.ders.sure + " dk · ❓ " + k.ders.sorular.length + "</span>" +
        "</a>";
    });

    html += "  </div></section>";
  });

  bolumListesi.innerHTML = html;

  document.getElementById("tebrik").classList.toggle("goster", biten.length >= dersler.length);
  aramayiUygula();
  istatistikleriGoster();
}

// Arama kutusu
let aramaKutusu = document.getElementById("aramaKutusu");
if (aramaKutusu) {
  aramaKutusu.addEventListener("input", aramayiUygula);
}

function aramayiUygula() {
  if (!aramaKutusu) return;
  let aranan = aramaKutusu.value.trim().toLocaleLowerCase("tr");
  let hicBulunamadi = true;

  document.querySelectorAll("[data-bolum]").forEach(function (bolum) {
    let gorunen = 0;
    bolum.querySelectorAll(".ders-satiri").forEach(function (satir) {
      let uyuyor = aranan === "" || satir.dataset.arama.includes(aranan);
      satir.hidden = !uyuyor;
      if (uyuyor) gorunen++;
    });
    bolum.hidden = gorunen === 0;
    if (gorunen > 0) hicBulunamadi = false;
  });

  document.getElementById("aramaSonucYok").hidden = !hicBulunamadi;
}

// İlerlemeyi sıfırlama
let sifirlaButonu = document.getElementById("sifirlaButonu");
if (sifirlaButonu) {
  sifirlaButonu.addEventListener("click", function () {
    if (confirm("Bütün ilerlemen ve XP'n silinecek. Emin misin?")) {
      tamamlananlariKaydet([]);
      katalogGoster();
    }
  });
}

// ---------- 5b. Tek bir dersin sayfası ----------

// "Tekrar çöz" denen dersler: soruları boş gelir
let yenidenCozulecekler = new Set();

function dersiGoster(k) {
  let ders = k.ders;
  let dersler = tumDersler();
  let onceki = dersler[k.sira - 2];
  let sonraki = dersler[k.sira];
  let dahaOnceBitti = dersBittiMi(ders.id);
  // Bitmiş derste sorular çözülmüş olarak gösterilir
  let cozulmus = dahaOnceBitti && !yenidenCozulecekler.has(ders.id);
  let kazanilacakXP = ders.sorular.length * SORU_BASINA_XP;

  // Anlatım blokları
  let bloklarHTML = ders.bloklar.map(blokHTML).join("");

  dersGorunumu.innerHTML =
    '<nav class="ekmek">' +
    '  <a href="dersler.html">← Tüm Dersler</a>' +
    "  <span>" + k.bolum.emoji + " Bölüm " + k.bolumNo + " · " + k.bolum.baslik + "</span>" +
    "</nav>" +

    '<header class="kart ders-kapak">' +
    '  <div class="ders-kapak-ust">' +
    '    <span class="ders-sira">Ders ' + k.sira + " / " + dersler.length + "</span>" +
    (dahaOnceBitti ? '<span class="rozet-yesil">✅ Tamamlandı</span>' : "") +
    "  </div>" +
    "  <h1>" + ders.baslik + "</h1>" +
    '  <div class="ders-etiketleri">' +
    "    <span>⏱ " + ders.sure + " dakika</span>" +
    "    <span>❓ " + ders.sorular.length + " soru</span>" +
    "    <span>⭐ " + kazanilacakXP + " XP</span>" +
    "  </div>" +
    "</header>" +

    '<article class="kart ders-icerik">' + bloklarHTML + "</article>" +

    '<section class="kart sinav" id="sinav">' +
    "  <h2>🧠 Kendini Dene</h2>" +
    (cozulmus
      ? '<div class="cozuldu-bandi"><span>✅ Bu dersi bitirdin! Doğru cevaplar aşağıda.</span>' +
        '<button class="buton buton-beyaz kucuk-buton" id="tekrarCozButonu">🔁 Tekrar çöz</button></div>'
      : '  <p class="soluk">Bütün soruları doğru cevapla, dersi bitir ve <b>' + kazanilacakXP + " XP</b> kazan!</p>") +
    '  <div id="soruListesi"></div>' +
    "</section>" +

    '<section class="kart ders-bitti" id="dersBitti" hidden></section>' +

    '<nav class="ders-gecis">' +
    (onceki ? '<a class="buton buton-beyaz" href="#ders/' + onceki.ders.id + '">← Önceki ders</a>' : "<span></span>") +
    (sonraki ? '<a class="buton buton-kirmizi" href="#ders/' + sonraki.ders.id + '">Sonraki ders →</a>' : '<a class="buton buton-kirmizi" href="dersler.html">🏆 Bütün Dersler</a>') +
    "</nav>";

  // Sorular
  let soruListesi = document.getElementById("soruListesi");
  let dogruCevaplananlar = new Set();

  ders.sorular.forEach(function (soru, i) {
    let kutu = document.createElement("div");
    kutu.className = "soru";
    kutu.innerHTML =
      '<p class="soru-metni"><span class="soru-no">' + (i + 1) + "</span><span></span></p>" +
      '<div class="cevap-alani"></div>' +
      '<p class="sonuc" aria-live="polite"></p>';
    kutu.querySelector(".soru-metni span:last-child").textContent = soru.metin;

    let cevapAlani = kutu.querySelector(".cevap-alani");
    let sonuc = kutu.querySelector(".sonuc");

    function dogruBilindi() {
      kutu.classList.add("dogru-cevap");
      dogruCevaplananlar.add(i);
      if (dogruCevaplananlar.size === ders.sorular.length) {
        dersiBitir(k);
      }
    }

    if (soru.tip === "yazi") {
      yaziSorusuYap(soru, cevapAlani, sonuc, dogruBilindi);
    } else {
      secmeliSoruYap(soru, cevapAlani, sonuc, dogruBilindi);
    }

    if (cozulmus) {
      cozulmusGoster(soru, kutu, cevapAlani, sonuc);
    }

    soruListesi.appendChild(kutu);
  });

  // "Tekrar çöz": soruları boşalt
  let tekrarCozButonu = document.getElementById("tekrarCozButonu");
  if (tekrarCozButonu) {
    tekrarCozButonu.addEventListener("click", function () {
      yenidenCozulecekler.add(ders.id);
      dersiGoster(k);
      document.getElementById("sinav").scrollIntoView({ behavior: "smooth" });
    });
  }
}

// Bir soruyu doğru cevabıyla birlikte, çözülmüş olarak gösterir
function cozulmusGoster(soru, kutu, cevapAlani, sonuc) {
  kutu.classList.add("dogru-cevap");
  if (soru.tip === "yazi") {
    let girdi = cevapAlani.querySelector("input");
    girdi.value = soru.dogru[0];
    girdi.disabled = true;
    cevapAlani.querySelector("button").disabled = true;
  } else {
    let liste = cevapAlani.querySelector(".secenekler");
    liste.classList.add("kilitli");
    liste.querySelectorAll(".secenek").forEach(function (s) {
      if (s.lastChild.textContent === soru.dogru) s.classList.add("dogru");
    });
  }
  sonucYaz(sonuc, "dogru", "✅ Doğru cevap", soru.aciklama);
}

// ---------- 5c. Hızlı tekrar: bitmiş derslerden karışık sorular ----------

function tekrarGoster() {
  let biten = tamamlananlar();
  let havuz = [];
  tumDersler().forEach(function (k) {
    if (biten.includes(k.ders.id)) {
      k.ders.sorular.forEach(function (soru) {
        havuz.push({ soru: soru, k: k });
      });
    }
  });

  // Soruları karıştır ve 5 tanesini seç
  for (let i = havuz.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let gecici = havuz[i];
    havuz[i] = havuz[j];
    havuz[j] = gecici;
  }
  let secilen = havuz.slice(0, 5);

  dersGorunumu.innerHTML =
    '<nav class="ekmek"><a href="dersler.html">← Tüm Dersler</a></nav>' +
    '<header class="kart ders-kapak">' +
    '  <div class="ders-kapak-ust"><span class="ders-sira">Hafif tekrar · XP yok, sadece pratik</span></div>' +
    "  <h1>🔁 Hızlı Tekrar</h1>" +
    '  <div class="ders-etiketleri"><span>❓ ' + secilen.length + " soru</span><span>📚 Bitirdiğin derslerden</span></div>" +
    "</header>" +
    '<section class="kart sinav"><div id="tekrarListesi"></div></section>' +
    '<section class="kart ders-bitti" id="tekrarBitti" hidden></section>';

  let liste = document.getElementById("tekrarListesi");

  if (secilen.length === 0) {
    liste.innerHTML = '<p class="soluk">Önce bir ders bitir, sonra burada tekrar yapabilirsin! 📚</p>';
    return;
  }

  let dogrular = new Set();
  let ilkDenemedeBilinen = 0;

  secilen.forEach(function (oge, i) {
    let soru = oge.soru;
    let kutu = document.createElement("div");
    kutu.className = "soru";
    kutu.innerHTML =
      '<a class="tekrar-ders-etiketi" href="#ders/' + oge.k.ders.id + '">📖 Ders ' + oge.k.sira + ": " + guvenli(oge.k.ders.baslik) + "</a>" +
      '<p class="soru-metni"><span class="soru-no">' + (i + 1) + "</span><span></span></p>" +
      '<div class="cevap-alani"></div>' +
      '<p class="sonuc" aria-live="polite"></p>';
    kutu.querySelector(".soru-metni span:last-child").textContent = soru.metin;

    let cevapAlani = kutu.querySelector(".cevap-alani");
    let sonuc = kutu.querySelector(".sonuc");
    let yanlisYapti = false;

    function yanlisOldu() {
      yanlisYapti = true;
    }

    function dogruBilindi() {
      kutu.classList.add("dogru-cevap");
      dogrular.add(i);
      if (!yanlisYapti) ilkDenemedeBilinen++;
      if (dogrular.size === secilen.length) tekrarBitti();
    }

    if (soru.tip === "yazi") {
      yaziSorusuYap(soru, cevapAlani, sonuc, dogruBilindi, yanlisOldu);
    } else {
      secmeliSoruYap(soru, cevapAlani, sonuc, dogruBilindi, yanlisOldu);
    }
    liste.appendChild(kutu);
  });

  function tekrarBitti() {
    let kutu = document.getElementById("tekrarBitti");
    let tamami = ilkDenemedeBilinen === secilen.length;
    kutu.innerHTML =
      '<div class="buyuk-emoji">' + (tamami ? "🏆" : "🎉") + "</div>" +
      "<h2>Tekrar bitti!</h2>" +
      "<p>" + secilen.length + " sorudan <b>" + ilkDenemedeBilinen + "</b> tanesini ilk denemede bildin." +
      (tamami ? " Mükemmel! 🌟" : " Yanlış yaptıklarının dersine bir göz atabilirsin. 😉") + "</p>" +
      '<div class="ders-gecis" style="justify-content:center">' +
      '  <button class="buton buton-kirmizi" id="yeniTekrar">🔁 Yeni tekrar</button>' +
      '  <a class="buton buton-beyaz" href="dersler.html">📚 Derslere dön</a>' +
      "</div>";
    kutu.hidden = false;
    kutu.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("yeniTekrar").addEventListener("click", function () {
      tekrarGoster();
      window.scrollTo(0, 0);
    });
  }
}

// Bir anlatım bloğunu HTML'e çevirir
function blokHTML(blok) {
  if (blok.tur === "kod") {
    let hataMi = blok.cikti && /Error/.test(blok.cikti);
    return (
      '<div class="kod-kutusu">' +
      '  <div class="kod-baslik"><span class="noktalar"><i></i><i></i><i></i></span>' + (blok.baslik ? guvenli(blok.baslik) : "🐍 Örnek kod") + "</div>" +
      "  <pre><code>" + renklendir(blok.kod) + "</code></pre>" +
      (blok.cikti
        ? '<div class="cikti' + (hataMi ? " hata" : "") + '">' +
          '  <div class="kod-baslik">' + (hataMi ? "💥 Hata mesajı" : "🖥️ Ekranda çıkan") + "</div>" +
          "  <pre>" + guvenli(blok.cikti) + "</pre>" +
          "</div>"
        : "") +
      "</div>"
    );
  }

  let kutular = {
    ipucu: { emoji: "💡", baslik: "İpucu" },
    dikkat: { emoji: "⚠️", baslik: "Dikkat" },
    gorev: { emoji: "🏋️", baslik: "IDLE'da Dene" },
  };

  if (kutular[blok.tur]) {
    let kutu = kutular[blok.tur];
    return (
      '<div class="bilgi-kutusu ' + blok.tur + '">' +
      '  <div class="bilgi-baslik">' + kutu.emoji + " " + kutu.baslik + "</div>" +
      "  <p>" + blok.yazi + "</p>" +
      "</div>"
    );
  }

  return '<p class="anlatim">' + blok.yazi + "</p>";
}

// Cevabın kutuya yazıldığı soru
function yaziSorusuYap(soru, cevapAlani, sonuc, dogruBilindi, yanlisOldu) {
  cevapAlani.innerHTML =
    '<div class="cevap-satiri">' +
    '  <input class="cevap-kutusu" placeholder="Cevabını yaz..." aria-label="Cevap" autocomplete="off" autocapitalize="off" spellcheck="false">' +
    '  <button class="buton buton-kirmizi">Kontrol Et</button>' +
    "</div>";

  let kutu = cevapAlani.querySelector("input");
  let buton = cevapAlani.querySelector("button");

  function kontrolEt() {
    let cevap = kutu.value.trim();
    let dogrular = soru.dogru;

    if (cevap === "") {
      sonucYaz(sonuc, "ipucu", "✏️ Önce bir cevap yaz!");
    } else if (dogrular.includes(cevap)) {
      sonucYaz(sonuc, "dogru", "✅ Doğru! Aferin! 🎉", soru.aciklama);
      kutu.disabled = true;
      buton.disabled = true;
      dogruBilindi();
    } else if (dogrular.includes(cevap.toLowerCase())) {
      sonucYaz(sonuc, "ipucu", "🤏 Neredeyse! " + (soru.ipucu || "Harflere dikkat et."));
    } else {
      sonucYaz(sonuc, "yanlis", "❌ Yanlış! Derse tekrar bak ve yeniden dene.");
      if (yanlisOldu) yanlisOldu();
    }
  }

  buton.addEventListener("click", kontrolEt);
  kutu.addEventListener("keydown", function (olay) {
    if (olay.key === "Enter") {
      kontrolEt();
    }
  });
}

// Seçenekli soru
function secmeliSoruYap(soru, cevapAlani, sonuc, dogruBilindi, yanlisOldu) {
  let liste = document.createElement("div");
  liste.className = "secenekler";
  let bitti = false;

  soru.secenekler.forEach(function (secenekYazisi, i) {
    let secenek = document.createElement("button");
    secenek.className = "secenek";
    secenek.innerHTML = '<span class="harf">' + "ABCD"[i] + "</span><span></span>";
    secenek.lastChild.textContent = secenekYazisi;

    secenek.addEventListener("click", function () {
      if (bitti) return;

      if (secenekYazisi === soru.dogru) {
        bitti = true;
        secenek.classList.add("dogru");
        liste.classList.add("kilitli");
        sonucYaz(sonuc, "dogru", "✅ Doğru! Aferin! 🎉", soru.aciklama);
        dogruBilindi();
      } else {
        secenek.classList.remove("yanlis");
        void secenek.offsetWidth; // sallanma animasyonu her seferinde oynasın
        secenek.classList.add("yanlis");
        sonucYaz(sonuc, "yanlis", "❌ Yanlış! Tekrar dene.");
        if (yanlisOldu) yanlisOldu();
      }
    });

    liste.appendChild(secenek);
  });

  cevapAlani.appendChild(liste);
}

function sonucYaz(sonuc, tur, yazi, aciklama) {
  sonuc.className = "sonuc " + tur;
  sonuc.textContent = yazi;
  if (aciklama) {
    let ek = document.createElement("span");
    ek.className = "aciklama";
    ek.textContent = "💬 " + aciklama;
    sonuc.appendChild(ek);
  }
}

// Bütün sorular doğru cevaplanınca
function dersiBitir(k) {
  let eskiSeviye = seviyeBul(toplamXP()).seviye;
  let ilkKez = !dersBittiMi(k.ders.id);

  if (ilkKez) {
    let biten = tamamlananlar();
    biten.push(k.ders.id);
    tamamlananlariKaydet(biten);
  }

  let yeniSeviye = seviyeBul(toplamXP()).seviye;
  let sonraki = tumDersler()[k.sira];
  let kutu = document.getElementById("dersBitti");

  kutu.innerHTML =
    '<div class="buyuk-emoji">' + (yeniSeviye !== eskiSeviye ? yeniSeviye.emoji : "🎉") + "</div>" +
    "<h2>Ders tamamlandı!</h2>" +
    (ilkKez
      ? '<p class="xp-kazanc">+' + k.ders.sorular.length * SORU_BASINA_XP + " XP ⭐</p>"
      : "<p>Bu dersi daha önce de bitirmiştin. Tekrar etmek harika bir fikir! 👏</p>") +
    (yeniSeviye !== eskiSeviye
      ? '<p class="seviye-atladi">🆙 Seviye atladın! Artık bir <b>' + yeniSeviye.ad + "</b>sın!</p>"
      : "") +
    (sonraki
      ? '<a class="buton buton-kirmizi" href="#ders/' + sonraki.ders.id + '">Sonraki ders: ' + sonraki.ders.baslik + " →</a>"
      : '<a class="buton buton-kirmizi" href="dersler.html">🏆 Bütün dersleri bitirdin!</a>');

  kutu.hidden = false;
  kutu.classList.remove("belir");
  void kutu.offsetWidth;
  kutu.classList.add("belir");
  kutu.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ---------------------------------------------------------
// 6. CANLI DERS SAYFASI VE TAKVİM
// ---------------------------------------------------------

const AY_ADLARI = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const GUN_ADLARI = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

let takvimIzgarasi = document.getElementById("takvimIzgarasi");

// "2026-10-31" ve "17:00" → tarih nesnesi
// Saati henüz belli olmayan dersler için saat: "" yazılır
function saatBelirsiz(ders) {
  return !ders.saat || ders.saat.trim() === "";
}

function saatYazisi(ders) {
  return saatBelirsiz(ders) ? "Saat yakında belli olacak" : ders.saat;
}

function dersTarihi(ders) {
  let t = ders.tarih.split("-").map(Number);
  // Saati belli değilse günün sonu sayılır, böylece ders "geçti" görünmez
  let s = (saatBelirsiz(ders) ? "23:59" : ders.saat).split(":").map(Number);
  return new Date(t[0], t[1] - 1, t[2], s[0], s[1]);
}

function ayniGunMu(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function guzelTarih(tarih) {
  return tarih.getDate() + " " + AY_ADLARI[tarih.getMonth()] + " " + GUN_ADLARI[tarih.getDay()];
}

function dersLinki(ders) {
  // link: "-" yazılırsa bu dersin linki henüz yok demektir (varsayılan link kullanılmaz)
  if (ders.link === "-") return "";
  return (ders.link || VARSAYILAN_ZOOM_LINKI || "").trim();
}

function canliDersSayfasiniKur() {
  let simdi = new Date();
  let dersler = CANLI_DERSLER.slice().sort(function (a, b) {
    return dersTarihi(a) - dersTarihi(b);
  });

  let gosterilenAy = new Date(simdi.getFullYear(), simdi.getMonth(), 1);
  let secilenGun = null;

  // ---- Sıradaki ders kartı ----
  function siradakiCanliDers() {
    let suAn = new Date();
    return dersler.find(function (d) {
      let bitis = new Date(dersTarihi(d).getTime() + DERS_SURESI_DAKIKA * 60000);
      return bitis > suAn;
    });
  }

  function siradakiKartiGuncelle() {
    let ders = siradakiCanliDers();
    let isaret = document.getElementById("canliIsaret");
    let konu = document.getElementById("siradakiKonu");
    let zaman = document.getElementById("siradakiZaman");
    let geriSayim = document.getElementById("geriSayim");
    let zoomButonu = document.getElementById("zoomButonu");
    let takvimeEkle = document.getElementById("takvimeEkle");
    let linkUyari = document.getElementById("linkUyari");

    if (!ders) {
      isaret.className = "canli-isaret pasif";
      isaret.innerHTML = "📅 PLANLANMIŞ DERS YOK";
      konu.textContent = "Yakında yeni dersler gelecek!";
      zaman.textContent = "Takvimi takip etmeyi unutma 😊";
      geriSayim.textContent = "";
      zoomButonu.hidden = true;
      takvimeEkle.hidden = true;
      linkUyari.textContent = "";
      return;
    }

    let baslangic = dersTarihi(ders);
    let fark = baslangic - new Date();
    let belirsiz = saatBelirsiz(ders);
    let canliMi = fark <= 0 && !belirsiz;

    isaret.className = "canli-isaret" + (canliMi ? "" : " pasif");
    isaret.innerHTML = canliMi ? '<span class="nokta"></span> ŞU AN CANLI' : "📅 SIRADAKİ CANLI DERS";
    konu.textContent = ders.konu;
    zaman.textContent = guzelTarih(baslangic) + " · " + saatYazisi(ders);

    if (belirsiz) {
      geriSayim.textContent = "⏳ Dersin saati yakında duyurulacak. Takipte kal!";
    } else if (canliMi) {
      geriSayim.textContent = "🔴 Ders başladı, hemen katıl!";
    } else {
      let gun = Math.floor(fark / 86400000);
      let saat = Math.floor((fark % 86400000) / 3600000);
      let dakika = Math.floor((fark % 3600000) / 60000);
      geriSayim.innerHTML =
        '<span class="sayac"><b>' + gun + "</b>gün</span>" +
        '<span class="sayac"><b>' + saat + "</b>saat</span>" +
        '<span class="sayac"><b>' + dakika + "</b>dakika</span>";
    }

    zoomButonu.hidden = false;
    // Telefon uygulamasının içinde dosya indirilemediği için bu düğmeyi gizle
    takvimeEkle.hidden = belirsiz || navigator.userAgent.includes("PythonOkuluApp");
    takvimeEkle.onclick = function () {
      takvimDosyasiIndir(ders);
    };

    let link = dersLinki(ders);
    if (link) {
      zoomButonu.href = link;
      zoomButonu.classList.remove("kapali");
      zoomButonu.removeAttribute("aria-disabled");
      linkUyari.textContent = "Düğmeye basınca Google Meet yeni bir sekmede açılır. Bütün dersler aynı linkte!";
    } else {
      zoomButonu.removeAttribute("href");
      zoomButonu.classList.add("kapali");
      zoomButonu.setAttribute("aria-disabled", "true");
      linkUyari.textContent = "⏳ Ders linki derse yakın eklenecek.";
    }
  }

  // ---- Aylık takvim ----
  function takvimiCiz() {
    let yil = gosterilenAy.getFullYear();
    let ay = gosterilenAy.getMonth();
    document.getElementById("takvimAyi").textContent = AY_ADLARI[ay] + " " + yil;

    let ilkGun = new Date(yil, ay, 1);
    let bosluk = (ilkGun.getDay() + 6) % 7; // Pazartesi ile başlasın
    let gunSayisi = new Date(yil, ay + 1, 0).getDate();
    let bugun = new Date();
    let html = "";

    for (let i = 0; i < bosluk; i++) {
      html += '<span class="gun bos"></span>';
    }

    for (let g = 1; g <= gunSayisi; g++) {
      let tarih = new Date(yil, ay, g);
      let oGununDersleri = dersler.filter(function (d) {
        return ayniGunMu(dersTarihi(d), tarih);
      });
      let siniflar = ["gun"];
      if (ayniGunMu(tarih, bugun)) siniflar.push("bugun");
      if (oGununDersleri.length > 0) {
        siniflar.push("dersli");
        let gecti = tarih < new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate());
        if (gecti) siniflar.push("gecmis");
      }
      if (secilenGun && ayniGunMu(tarih, secilenGun)) siniflar.push("secili");

      html +=
        '<button class="' + siniflar.join(" ") + '" data-gun="' + g + '" aria-label="' + guzelTarih(tarih) + (oGununDersleri.length ? ", canlı ders var" : "") + '">' +
        "<span>" + g + "</span>" +
        (oGununDersleri.length ? '<i class="ders-noktasi"></i>' : "") +
        "</button>";
    }

    takvimIzgarasi.innerHTML = html;

    takvimIzgarasi.querySelectorAll("button.gun").forEach(function (buton) {
      buton.addEventListener("click", function () {
        secilenGun = new Date(yil, ay, Number(buton.dataset.gun));
        takvimiCiz();
        gunDetayiniGoster();
      });
    });
  }

  function gunDetayiniGoster() {
    let alan = document.getElementById("gunDetayi");
    if (!secilenGun) {
      alan.innerHTML = '<p class="soluk">📌 Ders olan günler kırmızı noktayla gösterilir. Bir güne tıkla!</p>';
      return;
    }
    let oGun = dersler.filter(function (d) {
      return ayniGunMu(dersTarihi(d), secilenGun);
    });
    let html = "<h3>" + guzelTarih(secilenGun) + "</h3>";
    if (oGun.length === 0) {
      html += '<p class="soluk">Bu gün canlı ders yok. 😴</p>';
    } else {
      oGun.forEach(function (d) {
        html += dersSatiriHTML(d);
      });
    }
    alan.innerHTML = html;
  }

  function dersSatiriHTML(d) {
    let t = dersTarihi(d);
    return (
      '<div class="canli-satir">' +
      '  <div class="canli-tarih"><b>' + t.getDate() + "</b><span>" + AY_ADLARI[t.getMonth()].slice(0, 3) + "</span></div>" +
      '  <div class="canli-bilgi"><b>' + guvenli(d.konu) + "</b><span>" + GUN_ADLARI[t.getDay()] + " · ⏰ " + guvenli(saatYazisi(d)) + "</span></div>" +
      "</div>"
    );
  }

  // ---- Yaklaşan dersler listesi ----
  function yaklasanlariGoster() {
    let simdi = new Date();
    let gelecek = dersler.filter(function (d) {
      return dersTarihi(d).getTime() + DERS_SURESI_DAKIKA * 60000 > simdi.getTime();
    });
    let alan = document.getElementById("yaklasanDersler");
    alan.innerHTML = gelecek.length
      ? gelecek.map(dersSatiriHTML).join("")
      : '<p class="soluk">Şimdilik planlanmış ders yok.</p>';
  }

  document.getElementById("oncekiAy").addEventListener("click", function () {
    gosterilenAy = new Date(gosterilenAy.getFullYear(), gosterilenAy.getMonth() - 1, 1);
    takvimiCiz();
  });
  document.getElementById("sonrakiAy").addEventListener("click", function () {
    gosterilenAy = new Date(gosterilenAy.getFullYear(), gosterilenAy.getMonth() + 1, 1);
    takvimiCiz();
  });

  siradakiKartiGuncelle();
  takvimiCiz();
  gunDetayiniGoster();
  yaklasanlariGoster();

  // Geri sayım her 30 saniyede bir güncellensin
  setInterval(siradakiKartiGuncelle, 30000);
}

// Dersi telefonun / bilgisayarın takvimine eklemek için dosya indirir
function takvimDosyasiIndir(ders) {
  function format(t) {
    let iki = function (s) { return String(s).padStart(2, "0"); };
    return t.getFullYear() + iki(t.getMonth() + 1) + iki(t.getDate()) + "T" + iki(t.getHours()) + iki(t.getMinutes()) + "00";
  }
  let baslangic = dersTarihi(ders);
  let bitis = new Date(baslangic.getTime() + DERS_SURESI_DAKIKA * 60000);
  let link = dersLinki(ders);

  let icerik = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Python Okulu//TR",
    "BEGIN:VEVENT",
    "UID:" + ders.tarih + "-" + ders.saat.replace(":", "") + "@python-okulu",
    "DTSTAMP:" + format(new Date()),
    "DTSTART:" + format(baslangic),
    "DTEND:" + format(bitis),
    "SUMMARY:🐍 Python Okulu: " + ders.konu,
    "DESCRIPTION:Canlı Python dersi" + (link ? " - " + link : ""),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  let dosya = new Blob([icerik], { type: "text/calendar" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(dosya);
  a.download = "python-okulu-" + ders.tarih + ".ics";
  a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
}

// ---------------------------------------------------------
// 7. SINIF SAYFASI (Duyurular, ödevler, sıralama, yoklama)
// Bilgiler ayarlar.js dosyasından gelir, öğretmen orayı değiştirir.
// ---------------------------------------------------------

function tarihYazisi(metin) {
  let t = metin.split("-").map(Number);
  let tarih = new Date(t[0], t[1] - 1, t[2]);
  return tarih.getDate() + " " + AY_ADLARI[tarih.getMonth()];
}

function sinifSayfasiniKur() {
  // ---- Classroom kartı ----
  let buton = document.getElementById("classroomButonu");
  let uyari = document.getElementById("classroomUyari");
  let kod = SINIF_KODU.trim();
  document.getElementById("sinifKodu").textContent = kod || "—";
  document.getElementById("sinifKoduKutusu").hidden = kod === "";

  if (CLASSROOM_LINKI.trim() !== "") {
    buton.href = CLASSROOM_LINKI;
    uyari.textContent = "Düğmeye basınca Google Classroom yeni bir sekmede açılır.";
  } else {
    buton.removeAttribute("href");
    buton.classList.add("kapali");
    buton.setAttribute("aria-disabled", "true");
    uyari.textContent = "⏳ Sınıf linki yakında eklenecek.";
  }

  // ---- Duyurular ----
  let duyuruAlani = document.getElementById("duyuruListesi");
  duyuruAlani.innerHTML = DUYURULAR.length
    ? DUYURULAR.map(function (d) {
        return (
          '<div class="duyuru">' +
          '  <span class="duyuru-tarih">📅 ' + tarihYazisi(d.tarih) + "</span>" +
          "  <p>" + guvenli(d.metin) + "</p>" +
          "</div>"
        );
      }).join("")
    : '<p class="soluk">Henüz duyuru yok.</p>';

  // ---- Ödevler ----
  let odevAlani = document.getElementById("odevListesi");
  let bugun = new Date();
  bugun = new Date(bugun.getFullYear(), bugun.getMonth(), bugun.getDate());

  odevAlani.innerHTML = ODEVLER.length
    ? ODEVLER.map(function (o) {
        let t = o.sonTarih.split("-").map(Number);
        let son = new Date(t[0], t[1] - 1, t[2]);
        let kalanGun = Math.round((son - bugun) / 86400000);
        let durum =
          kalanGun < 0 ? '<span class="odev-durum gecti">⌛ Süresi doldu</span>'
          : kalanGun === 0 ? '<span class="odev-durum bugun">🔥 Son gün bugün!</span>'
          : '<span class="odev-durum">⏳ ' + kalanGun + " gün kaldı</span>";
        let teslim = CLASSROOM_LINKI.trim()
          ? '<a class="buton buton-kirmizi kucuk-buton" target="_blank" rel="noopener" href="' + guvenli(CLASSROOM_LINKI) + '">📤 Classroom\'da Teslim Et</a>'
          : "";
        return (
          '<div class="odev">' +
          '  <div class="odev-ust"><h3>' + guvenli(o.baslik) + "</h3>" + durum + "</div>" +
          "  <p>" + guvenli(o.aciklama) + "</p>" +
          '  <div class="odev-alt"><span class="soluk">Son teslim: <b>' + tarihYazisi(o.sonTarih) + "</b></span>" + teslim + "</div>" +
          "</div>"
        );
      }).join("")
    : '<p class="soluk">Şu an ödev yok. Yaşasın! 🎉</p>';

  // ---- Sıralama ----
  let siralamaAlani = document.getElementById("siralama");
  let sirali = OGRENCILER.slice().sort(function (a, b) {
    return (b.yildiz || 0) - (a.yildiz || 0);
  });
  let madalyalar = ["🥇", "🥈", "🥉"];

  siralamaAlani.innerHTML = sirali.length
    ? '<ol class="siralama-listesi">' +
      sirali.map(function (o, i) {
        return (
          '<li class="' + (i < 3 ? "ilk-uc" : "") + '">' +
          '  <span class="sira">' + (madalyalar[i] || i + 1) + "</span>" +
          '  <span class="ogrenci-adi">' + guvenli(o.ad) + "</span>" +
          '  <span class="yildiz">⭐ ' + (o.yildiz || 0) + "</span>" +
          "</li>"
        );
      }).join("") +
      "</ol>"
    : '<p class="soluk">Öğrenciler yakında eklenecek. İlk yıldızı kim kazanacak? ⭐</p>';

  // ---- Yoklama ----
  let yoklamaAlani = document.getElementById("yoklama");
  let simdi = new Date();
  let gecmisDersler = CANLI_DERSLER.filter(function (d) {
    return dersTarihi(d) <= simdi;
  });

  if (OGRENCILER.length === 0) {
    yoklamaAlani.innerHTML = '<p class="soluk">Öğrenciler eklenince yoklama burada görünecek.</p>';
  } else if (gecmisDersler.length === 0) {
    yoklamaAlani.innerHTML = '<p class="soluk">Henüz hiç canlı ders yapılmadı.</p>';
  } else {
    let sonDersler = gecmisDersler.slice(-7);
    let html =
      '<div class="yoklama-tablo"><table>' +
      "<tr><th>Öğrenci</th>" +
      sonDersler.map(function (d) {
        return "<th>" + tarihYazisi(d.tarih) + "</th>";
      }).join("") +
      "<th>Toplam</th></tr>";

    OGRENCILER.forEach(function (o) {
      let geldi = o.geldi || [];
      let toplam = gecmisDersler.filter(function (d) {
        return geldi.includes(d.tarih);
      }).length;
      html +=
        "<tr><td><b>" + guvenli(o.ad) + "</b></td>" +
        sonDersler.map(function (d) {
          return geldi.includes(d.tarih)
            ? '<td class="geldi" title="Geldi">✅</td>'
            : '<td class="gelmedi" title="Gelmedi">—</td>';
        }).join("") +
        "<td><b>" + toplam + " / " + gecmisDersler.length + "</b></td></tr>";
    });

    yoklamaAlani.innerHTML = html + "</table></div>";
  }
}

// Ana sayfada en son duyuruyu göster
function sonDuyuruyuGoster() {
  let bant = document.getElementById("sonDuyuru");
  if (!bant || typeof DUYURULAR === "undefined" || DUYURULAR.length === 0) return;
  bant.innerHTML =
    '<span class="duyuru-ikon">📢</span>' +
    '<span><b>Duyuru:</b> ' + guvenli(DUYURULAR[0].metin) + "</span>" +
    '<span class="duyuru-ok">→</span>';
  bant.hidden = false;
}

// ---------------------------------------------------------
// SAYFA AÇILINCA
// ---------------------------------------------------------

// Sınıf sayfası
if (document.getElementById("duyuruListesi") && typeof OGRENCILER !== "undefined") {
  sinifSayfasiniKur();
}

// Ana sayfadaki duyuru bandı
sonDuyuruyuGoster();

// Dersler sayfası
if (katalog && dersGorunumu && typeof BOLUMLER !== "undefined") {
  window.addEventListener("hashchange", sayfayiGoster);
  sayfayiGoster();
}

// Canlı ders sayfası
if (takvimIzgarasi && typeof CANLI_DERSLER !== "undefined") {
  canliDersSayfasiniKur();
}

istatistikleriGoster();
