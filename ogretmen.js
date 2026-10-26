// =========================================================
// 🧑‍🏫 ÖĞRETMEN PANELİ
// ayarlar.js dosyasındaki bilgileri okur, öğretmen değiştirir,
// "Kaydet"e basınca yeni bir ayarlar.js dosyası indirir.
// =========================================================

(function () {
  const TASLAK_ANAHTARI = "ogretmenTaslak";

  // ---------- Verinin kopyası (taslak) ----------

  function orijinalVeri() {
    return {
      duyurular: JSON.parse(JSON.stringify(DUYURULAR)),
      odevler: JSON.parse(JSON.stringify(ODEVLER)),
      ogrenciler: JSON.parse(JSON.stringify(OGRENCILER)),
    };
  }

  function taslagiOku() {
    try {
      let t = JSON.parse(localStorage.getItem(TASLAK_ANAHTARI));
      if (t && t.duyurular && t.odevler && t.ogrenciler) return t;
    } catch (hata) {}
    return null;
  }

  let veri = taslagiOku() || orijinalVeri();

  function taslagiKaydet() {
    try {
      localStorage.setItem(TASLAK_ANAHTARI, JSON.stringify(veri));
    } catch (hata) {}
    durumuGoster();
  }

  function degistiMi() {
    return JSON.stringify(veri) !== JSON.stringify(orijinalVeri());
  }

  function durumuGoster() {
    let durum = document.getElementById("degisiklikDurumu");
    if (degistiMi()) {
      durum.textContent = "⚠️ Kaydedilmemiş değişiklikler var. Bitince Kaydet'e bas!";
      durum.className = "uyari-yazi";
    } else {
      durum.textContent = "✅ Her şey kayıtlı, değişiklik yok.";
      durum.className = "soluk";
    }
  }

  function bugunMetni() {
    let b = new Date();
    return b.getFullYear() + "-" + String(b.getMonth() + 1).padStart(2, "0") + "-" + String(b.getDate()).padStart(2, "0");
  }

  // ---------- Şifre ----------

  function girisYap() {
    let kutu = document.getElementById("sifreKutusu");
    if (kutu.value === OGRETMEN_SIFRESI) {
      try { sessionStorage.setItem("ogretmenGiris", "evet"); } catch (hata) {}
      paneliAc();
    } else {
      let sonuc = document.getElementById("girisSonuc");
      sonuc.className = "sonuc yanlis";
      sonuc.textContent = "❌ Şifre yanlış!";
    }
  }

  document.getElementById("girisButonu").addEventListener("click", girisYap);
  document.getElementById("sifreKutusu").addEventListener("keydown", function (e) {
    if (e.key === "Enter") girisYap();
  });

  function paneliAc() {
    document.getElementById("girisEkrani").hidden = true;
    document.getElementById("panel").hidden = false;
    dersleriDoldur();
    hepsiniCiz();
  }

  // ---------- Yoklama ----------

  function dersleriDoldur() {
    let secim = document.getElementById("dersSecimi");
    let simdi = new Date();
    let varsayilan = null;

    CANLI_DERSLER.forEach(function (d, i) {
      let secenek = document.createElement("option");
      secenek.value = d.tarih;
      secenek.textContent = tarihYazisi(d.tarih) + " · " + d.konu;
      secim.appendChild(secenek);
      // Başlamış en son dersi otomatik seç
      if (dersTarihi(d) <= simdi || d.tarih === bugunMetni()) varsayilan = d.tarih;
    });

    if (varsayilan) secim.value = varsayilan;
    secim.addEventListener("change", yoklamayiCiz);
  }

  function yoklamayiCiz() {
    let tarih = document.getElementById("dersSecimi").value;
    let alan = document.getElementById("yoklamaListesi");

    if (veri.ogrenciler.length === 0) {
      alan.innerHTML = '<p class="soluk">Önce aşağıdan öğrenci ekle.</p>';
      return;
    }

    alan.innerHTML = "";
    veri.ogrenciler.forEach(function (o) {
      o.geldi = o.geldi || [];
      let satir = document.createElement("label");
      satir.className = "panel-satir yoklama-satir";
      let kutu = document.createElement("input");
      kutu.type = "checkbox";
      kutu.checked = o.geldi.includes(tarih);
      kutu.addEventListener("change", function () {
        if (kutu.checked && !o.geldi.includes(tarih)) o.geldi.push(tarih);
        if (!kutu.checked) o.geldi = o.geldi.filter(function (t) { return t !== tarih; });
        o.geldi.sort();
        taslagiKaydet();
      });
      let ad = document.createElement("span");
      ad.className = "ogrenci-adi";
      ad.textContent = o.ad;
      let bilgi = document.createElement("span");
      bilgi.className = "soluk";
      bilgi.textContent = "derse geldiyse işaretle";
      satir.append(kutu, ad, bilgi);
      alan.appendChild(satir);
    });
  }

  // ---------- Öğrenciler ve yıldızlar ----------

  function ogrencileriCiz() {
    let alan = document.getElementById("ogrenciListesi");
    alan.innerHTML = "";

    if (veri.ogrenciler.length === 0) {
      alan.innerHTML = '<p class="soluk">Henüz öğrenci yok.</p>';
      return;
    }

    veri.ogrenciler.forEach(function (o, i) {
      let satir = document.createElement("div");
      satir.className = "panel-satir";

      let ad = document.createElement("span");
      ad.className = "ogrenci-adi";
      ad.textContent = o.ad;

      let yildiz = document.createElement("span");
      yildiz.className = "yildiz";
      yildiz.textContent = "⭐ " + (o.yildiz || 0);

      let butonlar = document.createElement("span");
      butonlar.className = "kucuk-butonlar";
      [-1, 1, 5, 10].forEach(function (miktar) {
        let b = document.createElement("button");
        b.className = "mini-buton" + (miktar < 0 ? " eksi" : "");
        b.textContent = (miktar > 0 ? "+" : "") + miktar;
        b.addEventListener("click", function () {
          o.yildiz = Math.max(0, (o.yildiz || 0) + miktar);
          taslagiKaydet();
          ogrencileriCiz();
        });
        butonlar.appendChild(b);
      });

      let sil = document.createElement("button");
      sil.className = "mini-buton sil";
      sil.textContent = "🗑️";
      sil.title = o.ad + " adlı öğrenciyi sil";
      sil.addEventListener("click", function () {
        if (confirm(o.ad + " sınıftan silinsin mi?")) {
          veri.ogrenciler.splice(i, 1);
          taslagiKaydet();
          hepsiniCiz();
        }
      });
      butonlar.appendChild(sil);

      satir.append(ad, yildiz, butonlar);
      alan.appendChild(satir);
    });
  }

  document.getElementById("ogrenciEkle").addEventListener("click", function () {
    let kutu = document.getElementById("yeniOgrenci");
    let ad = kutu.value.trim();
    if (!ad) return;
    if (veri.ogrenciler.some(function (o) { return o.ad.toLocaleLowerCase("tr") === ad.toLocaleLowerCase("tr"); })) {
      alert("Bu isimde bir öğrenci zaten var. Soyadının baş harfini ekleyebilirsin: " + ad + " Y.");
      return;
    }
    veri.ogrenciler.push({ ad: ad, yildiz: 0, geldi: [] });
    kutu.value = "";
    taslagiKaydet();
    hepsiniCiz();
  });

  // ---------- Duyurular ----------

  function duyurulariCiz() {
    let alan = document.getElementById("duyuruListesiPanel");
    alan.innerHTML = "";
    veri.duyurular.forEach(function (d, i) {
      let satir = document.createElement("div");
      satir.className = "panel-satir duyuru-satir";
      let metin = document.createElement("span");
      metin.innerHTML = "<b>" + tarihYazisi(d.tarih) + ":</b> ";
      metin.appendChild(document.createTextNode(d.metin));
      let sil = document.createElement("button");
      sil.className = "mini-buton sil";
      sil.textContent = "🗑️";
      sil.addEventListener("click", function () {
        if (confirm("Bu duyuru silinsin mi?")) {
          veri.duyurular.splice(i, 1);
          taslagiKaydet();
          duyurulariCiz();
        }
      });
      satir.append(metin, sil);
      alan.appendChild(satir);
    });
  }

  document.getElementById("duyuruEkle").addEventListener("click", function () {
    let kutu = document.getElementById("yeniDuyuru");
    let metin = kutu.value.trim();
    if (!metin) return;
    veri.duyurular.unshift({ tarih: bugunMetni(), metin: metin }); // En yenisi en üstte
    kutu.value = "";
    taslagiKaydet();
    duyurulariCiz();
  });

  // ---------- Ödevler ----------

  function odevleriCiz() {
    let alan = document.getElementById("odevListesiPanel");
    alan.innerHTML = "";
    veri.odevler.forEach(function (o, i) {
      let satir = document.createElement("div");
      satir.className = "panel-satir duyuru-satir";
      let metin = document.createElement("span");
      metin.innerHTML = "<b></b> · son teslim: ";
      metin.firstChild.textContent = o.baslik;
      metin.appendChild(document.createTextNode(tarihYazisi(o.sonTarih)));
      let sil = document.createElement("button");
      sil.className = "mini-buton sil";
      sil.textContent = "🗑️";
      sil.addEventListener("click", function () {
        if (confirm("Bu ödev silinsin mi?")) {
          veri.odevler.splice(i, 1);
          taslagiKaydet();
          odevleriCiz();
        }
      });
      satir.append(metin, sil);
      alan.appendChild(satir);
    });
  }

  document.getElementById("odevEkle").addEventListener("click", function () {
    let baslik = document.getElementById("odevBaslik").value.trim();
    let aciklama = document.getElementById("odevAciklama").value.trim();
    let tarih = document.getElementById("odevTarih").value;
    if (!baslik || !tarih) {
      alert("Ödevin başlığını ve son teslim tarihini yazmalısın.");
      return;
    }
    veri.odevler.unshift({ baslik: baslik, aciklama: aciklama, sonTarih: tarih });
    document.getElementById("odevBaslik").value = "";
    document.getElementById("odevAciklama").value = "";
    document.getElementById("odevTarih").value = "";
    taslagiKaydet();
    odevleriCiz();
  });

  // ---------- Kaydet: yeni ayarlar.js oluştur ----------

  function js(deger) {
    return JSON.stringify(deger);
  }

  function ayarDosyasiYaz() {
    let satirlar = [];
    satirlar.push("// =========================================================");
    satirlar.push("// 🎥 CANLI DERS AYARLARI");
    satirlar.push("// Bu dosya Öğretmen Paneli ile oluşturuldu: " + new Date().toLocaleString("tr-TR"));
    satirlar.push("// =========================================================");
    satirlar.push("");
    satirlar.push("// Bütün dersler için kullanılacak toplantı linki");
    satirlar.push("const VARSAYILAN_ZOOM_LINKI = " + js(VARSAYILAN_ZOOM_LINKI) + ";");
    satirlar.push("");
    satirlar.push("// Bir canlı ders kaç dakika sürüyor?");
    satirlar.push("const DERS_SURESI_DAKIKA = " + js(DERS_SURESI_DAKIKA) + ";");
    satirlar.push("");
    satirlar.push("// 📅 CANLI DERS TAKVİMİ");
    satirlar.push('//   saat: "" → saat henüz belli değil · link: "-" → bu dersin linki henüz yok');
    satirlar.push("const CANLI_DERSLER = [");
    CANLI_DERSLER.forEach(function (d) {
      satirlar.push("  { tarih: " + js(d.tarih) + ", saat: " + js(d.saat) + ", konu: " + js(d.konu) + ", link: " + js(d.link || "") + " },");
    });
    satirlar.push("];");
    satirlar.push("");
    satirlar.push("// =========================================================");
    satirlar.push("// 🏫 SINIF AYARLARI (Öğretmen: Mustafa)");
    satirlar.push("// =========================================================");
    satirlar.push("");
    satirlar.push("// 🔐 Öğretmen paneli şifresi (basit bir kilit, gerçek güvenlik değil)");
    satirlar.push("const OGRETMEN_SIFRESI = " + js(OGRETMEN_SIFRESI) + ";");
    satirlar.push("");
    satirlar.push("// Google Classroom");
    satirlar.push("const CLASSROOM_LINKI = " + js(CLASSROOM_LINKI) + ";");
    satirlar.push("const SINIF_KODU = " + js(SINIF_KODU) + ";");
    satirlar.push("");
    satirlar.push("// 📢 DUYURULAR (En yenisi en üstte)");
    satirlar.push("const DUYURULAR = [");
    veri.duyurular.forEach(function (d) {
      satirlar.push("  { tarih: " + js(d.tarih) + ", metin: " + js(d.metin) + " },");
    });
    satirlar.push("];");
    satirlar.push("");
    satirlar.push("// 📝 ÖDEVLER");
    satirlar.push("const ODEVLER = [");
    veri.odevler.forEach(function (o) {
      satirlar.push("  {");
      satirlar.push("    baslik: " + js(o.baslik) + ",");
      satirlar.push("    aciklama: " + js(o.aciklama) + ",");
      satirlar.push("    sonTarih: " + js(o.sonTarih) + ",");
      satirlar.push("  },");
    });
    satirlar.push("];");
    satirlar.push("");
    satirlar.push("// 👩‍🎓 ÖĞRENCİLER (sadece ilk ad, soyad yok!)");
    satirlar.push("const OGRENCILER = [");
    veri.ogrenciler.forEach(function (o) {
      satirlar.push("  { ad: " + js(o.ad) + ", yildiz: " + js(o.yildiz || 0) + ", geldi: " + js(o.geldi || []) + " },");
    });
    satirlar.push("];");
    satirlar.push("");
    return satirlar.join("\n");
  }

  document.getElementById("kaydetButonu").addEventListener("click", function () {
    let dosya = new Blob([ayarDosyasiYaz()], { type: "text/javascript;charset=utf-8" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(dosya);
    a.download = "ayarlar.js";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    let durum = document.getElementById("degisiklikDurumu");
    durum.className = "dogru-yazi";
    durum.textContent = "💾 ayarlar.js indirildi! Şimdi aşağıdaki adımları yap. 👇";
  });

  document.getElementById("geriAlButonu").addEventListener("click", function () {
    if (confirm("Kaydetmediğin bütün değişiklikler silinecek. Emin misin?")) {
      try { localStorage.removeItem(TASLAK_ANAHTARI); } catch (hata) {}
      veri = orijinalVeri();
      hepsiniCiz();
    }
  });

  // ---------- Hepsini çiz ----------

  function hepsiniCiz() {
    yoklamayiCiz();
    ogrencileriCiz();
    duyurulariCiz();
    odevleriCiz();
    durumuGoster();
  }

  // Bu sekmede daha önce giriş yapıldıysa şifreyi tekrar sorma
  try {
    if (sessionStorage.getItem("ogretmenGiris") === "evet") paneliAc();
  } catch (hata) {}
})();
