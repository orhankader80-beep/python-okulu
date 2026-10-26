// =========================================================
// 📚 PYTHON OKULU - BÜTÜN DERSLER
//
// Okul BÖLÜMLERE, her bölüm de DERSLERE ayrılır.
//
// Bir dersin içindeki "bloklar":
//   { tur: "metin",  yazi: "..." }            → Normal anlatım
//   { tur: "kod",    kod: `...`, cikti: `...` } → Örnek kod ve ekranda çıkan
//   { tur: "ipucu",  yazi: "..." }            → 💡 İpucu kutusu
//   { tur: "dikkat", yazi: "..." }            → ⚠️ Dikkat kutusu
//   { tur: "gorev",  yazi: "..." }            → 🏋️ IDLE'da deneme görevi
//
// Soru tipleri:
//   "yazi"    → Cevap kutuya yazılır.  dogru: ["cevap1", "cevap2"]
//   "secmeli" → Seçeneğe tıklanır.     dogru: "doğru seçenek"
//
// Yeni ders eklemek için bir dersi kopyala, "id" kısmını
// başka bir isim yap ve içini değiştir!
// =========================================================

const BOLUMLER = [
  // ===================================================
  {
    id: "baslangic",
    emoji: "🚀",
    baslik: "Python'a Başlangıç",
    aciklama: "Programlama nedir, ilk kodumuzu nasıl yazarız?",
    dersler: [
      {
        id: "python-nedir",
        baslik: "Python Nedir?",
        sure: 4,
        bloklar: [
          { tur: "metin", yazi: "Bilgisayarlar çok hızlıdır ama kendi başlarına <b>hiçbir şey bilmezler</b>. Ne yapacaklarını onlara adım adım söylememiz gerekir. Bilgisayara verilen bu talimatlara <b>program</b>, program yazmaya da <b>kodlama</b> denir." },
          { tur: "metin", yazi: "<b>Python</b>, bilgisayarlarla konuşmak için kullanılan bir dildir. Kelimeleri İngilizceye benzediği için okuması kolaydır. YouTube, Instagram ve hatta NASA bile Python kullanır! 🚀" },
          { tur: "metin", yazi: "Python kodlarını <b>IDLE</b> adlı programda yazacağız. IDLE, Python'u bilgisayarına kurduğunda yanında gelir." },
          { tur: "gorev", yazi: "Klavyede <b>Windows tuşuna</b> bas, <b>IDLE</b> yaz ve aç. Ekranda <code>&gt;&gt;&gt;</code> işaretini görürsen Python seni dinliyor demektir!" },
          { tur: "ipucu", yazi: "<code>&gt;&gt;&gt;</code> işaretli pencereye <b>Shell</b> denir. Hızlıca bir şey denemek için kullanılır. Uzun programlar için <b>File → New File</b> ile yeni bir dosya açarız." },
        ],
        sorular: [
          { tip: "secmeli", metin: "Bilgisayara verilen talimatlara ne denir?", secenekler: ["Oyun", "Program", "Ekran"], dogru: "Program", aciklama: "Bilgisayara ne yapacağını söyleyen talimatların hepsine program denir." },
          { tip: "secmeli", metin: "Python kodlarını hangi programda yazacağız?", secenekler: ["Paint", "IDLE", "Hesap Makinesi"], dogru: "IDLE", aciklama: "IDLE, Python ile birlikte gelen kod yazma programıdır." },
        ],
      },

      {
        id: "print",
        baslik: "print ile Ekrana Yazmak",
        sure: 5,
        bloklar: [
          { tur: "metin", yazi: "İlk komutumuz <code>print</code>. İngilizcede <b>\"yazdır\"</b> demektir ve ekrana bir şey yazar." },
          { tur: "kod", kod: `print("Merhaba!")`, cikti: `Merhaba!` },
          { tur: "metin", yazi: "Yazdırmak istediğin şeyi <b>parantezin</b> içine, <b>tırnak işaretlerinin</b> arasına yazarsın. Tırnakların arasındaki her şeye <b>metin</b> denir." },
          { tur: "kod", kod: `print("Benim adım Ali")\nprint("Kod yazmayı öğreniyorum")\nprint("🐍 Python çok eğlenceli!")`, cikti: `Benim adım Ali\nKod yazmayı öğreniyorum\n🐍 Python çok eğlenceli!` },
          { tur: "ipucu", yazi: "Her <code>print</code> yeni bir satıra yazar. Üç <code>print</code> yazarsan ekranda üç satır çıkar." },
          { tur: "dikkat", yazi: "<code>print</code> her zaman <b>küçük harfle</b> yazılır. <code>Print</code> ya da <code>PRINT</code> yazarsan Python anlamaz ve hata verir!" },
          { tur: "gorev", yazi: "IDLE'da kendi adını, yaşını ve en sevdiğin oyunu üç ayrı <code>print</code> ile yazdır." },
        ],
        sorular: [
          { tip: "yazi", metin: "Ekrana yazı yazdıran komut hangisi?", dogru: ["print"], ipucu: "Python'da komutlar küçük harfle yazılır.", aciklama: "print komutu parantezin içindekini ekrana yazar." },
          { tip: "secmeli", metin: "Hangisi doğru yazılmış?", secenekler: ['print(Merhaba)', 'print("Merhaba")', 'Print("Merhaba")'], dogru: 'print("Merhaba")', aciklama: "Metinler tırnak içine yazılır ve print küçük harfle başlar." },
        ],
      },

      {
        id: "hatalar",
        baslik: "Hatalar Dostumuzdur",
        sure: 5,
        bloklar: [
          { tur: "metin", yazi: "Kod yazarken herkes hata yapar, en usta programcılar bile! Python bir şeyi anlamazsa sana <b style=\"color:#e11d2e\">kırmızı</b> bir mesajla söyler. Buna <b>hata mesajı</b> denir." },
          { tur: "metin", yazi: "Hata mesajları seni kızdırmak için değil, <b>yardım etmek</b> için vardır. Her zaman mesajın <b>en son satırını</b> oku, sorun orada yazar." },
          { tur: "kod", baslik: "Parantezi kapatmayı unutmak", kod: `print("Merhaba"`, cikti: `SyntaxError: '(' was never closed` },
          { tur: "metin", yazi: "<b>SyntaxError</b> \"yazım hatası\" demektir. Burada Python \"Açtığın parantezi hiç kapatmadın!\" diyor." },
          { tur: "kod", baslik: "Komutu yanlış yazmak", kod: `prnt("Merhaba")`, cikti: `NameError: name 'prnt' is not defined` },
          { tur: "metin", yazi: "<b>NameError</b> \"isim hatası\" demektir. Python \"<code>prnt</code> diye bir şey tanımıyorum!\" diyor. Doğrusu <code>print</code> olmalıydı." },
          { tur: "ipucu", yazi: "Hata alınca panik yapma! 1) Son satırı oku, 2) Hangi satırda olduğuna bak, 3) O satırı harf harf kontrol et." },
        ],
        sorular: [
          { tip: "secmeli", metin: "Hata mesajının en önemli kısmı genelde neresidir?", secenekler: ["İlk satırı", "Son satırı", "Ortası"], dogru: "Son satırı", aciklama: "Hatanın ne olduğu her zaman en son satırda yazar." },
          { tip: "secmeli", metin: "prnt(\"Selam\") yazarsak hangi hatayı alırız?", secenekler: ["NameError", "SyntaxError", "Hiç hata almayız"], dogru: "NameError", aciklama: "Python prnt diye bir isim tanımadığı için NameError verir." },
        ],
      },

      {
        id: "yorumlar",
        baslik: "# ile Not Almak",
        sure: 3,
        bloklar: [
          { tur: "metin", yazi: "Bir satırın başına <code>#</code> işareti koyarsan Python o satırı <b>okumaz</b>. Buna <b>yorum satırı</b> denir. Kodumuza not almak için kullanırız." },
          { tur: "kod", kod: `# Bu benim ilk programım\nprint("Merhaba")  # Ekrana merhaba yazar`, cikti: `Merhaba` },
          { tur: "ipucu", yazi: "<code>#</code> işaretini klavyede <b>Alt Gr + 3</b> ile yazabilirsin. IDLE'da birden fazla satırı seçip <b>Alt + 3</b>'e basarsan hepsi yorum olur, <b>Alt + 4</b> ile geri açılır." },
          { tur: "metin", yazi: "Yorumlar iki işe yarar: <b>1)</b> Kodun ne yaptığını hatırlamak için not almak, <b>2)</b> Bir satırı silmeden geçici olarak kapatmak." },
        ],
        sorular: [
          { tip: "yazi", metin: "Python'un okumamasını istediğimiz satırın başına hangi işareti koyarız?", dogru: ["#"], aciklama: "# ile başlayan satırlara yorum denir ve Python onları atlar." },
          { tip: "secmeli", metin: "Bu kod ekrana ne yazar?\n# print(\"A\")\nprint(\"B\")", secenekler: ["A", "B", "A ve B"], dogru: "B", aciklama: "İlk satır yorum olduğu için çalışmaz, sadece B yazılır." },
        ],
      },
    ],
  },

  // ===================================================
  {
    id: "sayilar",
    emoji: "🔢",
    baslik: "Sayılar ve Hesaplar",
    aciklama: "Python'u süper bir hesap makinesine çevir!",
    dersler: [
      {
        id: "dort-islem",
        baslik: "Dört İşlem",
        sure: 4,
        bloklar: [
          { tur: "metin", yazi: "Python hesap yapmayı çok sever! Sayıları <b>tırnaksız</b> yazarsan onları hesaplar." },
          { tur: "kod", kod: `print(5 + 3)\nprint(10 - 4)\nprint(6 * 7)\nprint(20 / 4)`, cikti: `8\n6\n42\n5.0` },
          { tur: "metin", yazi: "Toplama <code>+</code>, çıkarma <code>-</code>, çarpma <code>*</code> (yıldız), bölme <code>/</code> (eğik çizgi) ile yapılır." },
          { tur: "dikkat", yazi: "Çarpma için <b>x</b> ya da <b>×</b> kullanılmaz, <b>yıldız</b> <code>*</code> kullanılır!" },
          { tur: "ipucu", yazi: "Bölme sonucunda <code>5.0</code> gibi <b>noktalı</b> bir sayı çıkar. Python'da küsuratlı sayılar virgülle değil <b>nokta</b> ile yazılır." },
          { tur: "metin", yazi: "Parantez kullanırsan önce parantezin içi hesaplanır, tıpkı matematikteki gibi:" },
          { tur: "kod", kod: `print(2 + 3 * 4)\nprint((2 + 3) * 4)`, cikti: `14\n20` },
        ],
        sorular: [
          { tip: "secmeli", metin: "print(6 * 7) ekrana ne yazar?", secenekler: ["67", "42", "6 * 7"], dogru: "42", aciklama: "* işareti çarpma demektir: 6 × 7 = 42." },
          { tip: "secmeli", metin: "print((1 + 2) * 3) ekrana ne yazar?", secenekler: ["7", "9", "6"], dogru: "9", aciklama: "Önce parantez: 1 + 2 = 3, sonra 3 × 3 = 9." },
          { tip: "yazi", metin: "Python'da çarpma için hangi işaret kullanılır?", dogru: ["*"], aciklama: "Çarpma işareti yıldızdır: *" },
        ],
      },

      {
        id: "tirnak-farki",
        baslik: "Yazı mı, Sayı mı?",
        sure: 4,
        bloklar: [
          { tur: "metin", yazi: "Python'da her şeyin bir <b>türü</b> vardır. Tırnak içindekiler <b>yazı</b> (İngilizcesi <code>str</code>), tırnaksız rakamlar <b>sayı</b>dır (İngilizcesi <code>int</code>)." },
          { tur: "kod", kod: `print(4 + 4)\nprint("4 + 4")`, cikti: `8\n4 + 4` },
          { tur: "metin", yazi: "İlkinde Python'a <b>\"hesapla\"</b> dedik. İkincisinde ise <b>\"olduğu gibi yaz\"</b> dedik. Tırnaklar Python'a \"buna dokunma\" der!" },
          { tur: "metin", yazi: "İki yazıyı <code>+</code> ile toplarsan Python onları <b>yan yana yapıştırır</b>:" },
          { tur: "kod", kod: `print("4" + "4")\nprint("Ha" * 3)`, cikti: `44\nHaHaHa` },
          { tur: "dikkat", yazi: "Yazı ile sayı toplanamaz! <code>\"10\" + 5</code> yazarsan <b>TypeError</b> hatası alırsın." },
        ],
        sorular: [
          { tip: "secmeli", metin: "print(\"3\" + \"3\") ekrana ne yazar?", secenekler: ["6", "33", "3 + 3"], dogru: "33", aciklama: "İkisi de yazı olduğu için yan yana yapıştırılır: 33" },
          { tip: "secmeli", metin: "Hangisi bir sayıdır?", secenekler: ['"25"', "25", '"yirmi beş"'], dogru: "25", aciklama: "Tırnaksız yazılan 25 bir sayıdır. Tırnaklı olanlar yazıdır." },
        ],
      },

      {
        id: "ozel-islemler",
        baslik: "Süper İşlemler: //  %  **",
        sure: 6,
        bloklar: [
          { tur: "metin", yazi: "Python'un dört işlemden başka üç süper gücü daha var! 🦸" },
          { tur: "kod", baslik: "// Tam bölme (küsuratı atar)", kod: `print(17 // 5)`, cikti: `3` },
          { tur: "metin", yazi: "17 şekeri 5 arkadaşa paylaştırırsan her biri <b>3</b> şeker alır." },
          { tur: "kod", baslik: "% Kalan bulma", kod: `print(17 % 5)`, cikti: `2` },
          { tur: "metin", yazi: "Paylaştırdıktan sonra elinde <b>2</b> şeker kalır. <code>%</code> işareti bölmeden <b>kalanı</b> verir." },
          { tur: "kod", baslik: "** Üs alma", kod: `print(2 ** 3)\nprint(10 ** 2)`, cikti: `8\n100` },
          { tur: "metin", yazi: "<code>2 ** 3</code>, 2'yi 3 kere kendisiyle çarpmak demektir: 2 × 2 × 2 = 8." },
          { tur: "ipucu", yazi: "Bir sayının çift olup olmadığını <code>%</code> ile anlayabilirsin: <code>sayi % 2</code> sonucu 0 ise sayı çifttir!" },
        ],
        sorular: [
          { tip: "secmeli", metin: "print(10 % 3) ekrana ne yazar?", secenekler: ["3", "1", "0"], dogru: "1", aciklama: "10'u 3'e bölünce 3 olur ve 1 artar. % kalanı verir: 1" },
          { tip: "secmeli", metin: "print(3 ** 2) ekrana ne yazar?", secenekler: ["6", "9", "32"], dogru: "9", aciklama: "3 ** 2 = 3 × 3 = 9" },
          { tip: "secmeli", metin: "print(9 // 2) ekrana ne yazar?", secenekler: ["4.5", "4", "5"], dogru: "4", aciklama: "// küsuratı atar: 9 / 2 = 4.5 → 4" },
        ],
      },
    ],
  },

  // ===================================================
  {
    id: "degiskenler",
    emoji: "📦",
    baslik: "Değişkenler",
    aciklama: "Bilgileri kutulara koyup saklamayı öğren.",
    dersler: [
      {
        id: "degisken-nedir",
        baslik: "Değişken Nedir?",
        sure: 5,
        bloklar: [
          { tur: "metin", yazi: "Değişkeni, üstüne <b>isim yazılmış bir kutu</b> gibi düşün 📦. Kutunun içine bir şey koyarsın, sonra kutunun ismini söyleyince Python içinde ne olduğunu hatırlar." },
          { tur: "kod", kod: `isim = "Ali"\nyas = 10\nprint(isim)\nprint(yas)`, cikti: `Ali\n10` },
          { tur: "dikkat", yazi: "Buradaki <code>=</code> işareti matematikteki \"eşittir\" değildir! Python'da <code>=</code> <b>\"içine koy\"</b> demektir." },
          { tur: "metin", yazi: "Kutunun ismini yazarken <b>tırnak kullanmayız</b>. <code>print(\"isim\")</code> ekrana \"isim\" yazar, <code>print(isim)</code> ise kutunun içindekini yazar." },
          { tur: "ipucu", yazi: "<b>Kutu isimleri için kurallar:</b> Boşluk kullanma (<code>en_sevdigim_oyun</code> gibi alt çizgi kullan), sayıyla başlama, Türkçe harf (ş, ğ, ı) kullanmamaya çalış." },
          { tur: "gorev", yazi: "<code>isim</code>, <code>yas</code> ve <code>oyun</code> adında üç kutu yap ve hepsini <code>print</code> ile yazdır." },
        ],
        sorular: [
          { tip: "secmeli", metin: "Python'da = işareti ne demektir?", secenekler: ["Eşittir", "İçine koy", "Topla"], dogru: "İçine koy", aciklama: "= işareti sağdaki değeri soldaki kutuya koyar." },
          { tip: "secmeli", metin: "renk = \"mavi\" ise print(renk) ne yazar?", secenekler: ["renk", "mavi", '"mavi"'], dogru: "mavi", aciklama: "Kutunun ismi tırnaksız yazıldığı için içindeki değer yazılır." },
          { tip: "secmeli", metin: "Hangisi doğru bir kutu ismidir?", secenekler: ["en sevdigim", "en_sevdigim", "1oyun"], dogru: "en_sevdigim", aciklama: "Kutu isimlerinde boşluk olmaz ve sayıyla başlamaz." },
        ],
      },

      {
        id: "degiskeni-degistir",
        baslik: "Kutunun İçini Değiştirmek",
        sure: 5,
        bloklar: [
          { tur: "metin", yazi: "Kutunun içine yeni bir şey koyarsan <b>eskisi gider</b>, yenisi gelir. Bu yüzden onlara <b>değişken</b> denir!" },
          { tur: "kod", kod: `puan = 0\nprint(puan)\npuan = 50\nprint(puan)`, cikti: `0\n50` },
          { tur: "metin", yazi: "Kutudaki sayıyı <b>artırmak</b> da çok kullanılır. Oyunlarda puan böyle artar:" },
          { tur: "kod", kod: `puan = 10\npuan = puan + 5\nprint(puan)`, cikti: `15` },
          { tur: "metin", yazi: "<code>puan = puan + 5</code> şunu der: \"Kutudaki sayıya 5 ekle ve sonucu yine aynı kutuya koy.\"" },
          { tur: "ipucu", yazi: "Kısa yolu da var: <code>puan += 5</code> yazmak <code>puan = puan + 5</code> ile aynı şeydir. <code>-=</code> ve <code>*=</code> de vardır!" },
        ],
        sorular: [
          { tip: "secmeli", metin: "can = 3\ncan = can - 1\nprint(can) ne yazar?", secenekler: ["3", "2", "can - 1"], dogru: "2", aciklama: "3'ten 1 çıkarılır ve sonuç tekrar kutuya konur: 2" },
          { tip: "secmeli", metin: "x = 5\nx += 10\nprint(x) ne yazar?", secenekler: ["15", "510", "10"], dogru: "15", aciklama: "x += 10 demek, x = x + 10 demektir: 5 + 10 = 15" },
        ],
      },

      {
        id: "yazi-birlestirme",
        baslik: "Yazıları Birleştirmek",
        sure: 6,
        bloklar: [
          { tur: "metin", yazi: "Kutulardaki bilgileri cümlelerin içine koymanın üç yolu var." },
          { tur: "kod", baslik: "1) Virgül ile", kod: `isim = "Ali"\nprint("Merhaba", isim)`, cikti: `Merhaba Ali` },
          { tur: "metin", yazi: "Virgül en kolay yoldur. Python araya <b>kendisi bir boşluk</b> koyar." },
          { tur: "kod", baslik: "2) + ile", kod: `isim = "Ali"\nprint("Merhaba " + isim + "!")`, cikti: `Merhaba Ali!` },
          { tur: "dikkat", yazi: "<code>+</code> ile birleştirirken boşluğu <b>sen</b> koymalısın. Ayrıca sadece yazılar birleşir; sayı eklemek hata verir." },
          { tur: "kod", baslik: "3) f-string ile (en havalısı! ✨)", kod: `isim = "Ali"\nyas = 10\nprint(f"Ben {isim}, {yas} yaşındayım.")`, cikti: `Ben Ali, 10 yaşındayım.` },
          { tur: "metin", yazi: "Tırnağın başına <code>f</code> koyarsan, <code>{ }</code> süslü parantezlerin içine kutu isimlerini yazabilirsin. Python onları kutunun içindekiyle değiştirir!" },
        ],
        sorular: [
          { tip: "secmeli", metin: "hayvan = \"kedi\" ise print(f\"Benim bir {hayvan}m var\") ne yazar?", secenekler: ["Benim bir {hayvan}m var", "Benim bir kedim var", "Hata verir"], dogru: "Benim bir kedim var", aciklama: "f-string içinde {hayvan} yerine kutunun içindeki kedi yazılır." },
          { tip: "yazi", metin: "f-string yapmak için tırnağın başına hangi harfi koyarız?", dogru: ["f"], ipucu: "Küçük harfle yazılır.", aciklama: "f\"...\" şeklinde yazılır." },
        ],
      },
    ],
  },

  // ===================================================
  {
    id: "input",
    emoji: "💬",
    baslik: "Kullanıcıyla Konuşmak",
    aciklama: "Programın sana soru sorsun, sen cevap ver!",
    dersler: [
      {
        id: "input-komutu",
        baslik: "input ile Soru Sormak",
        sure: 5,
        bloklar: [
          { tur: "metin", yazi: "<code>input</code> İngilizcede \"giriş\" demektir. Kullanıcıya bir soru sorar ve <b>cevabını bekler</b> ⏳." },
          { tur: "kod", kod: `isim = input("Adın ne? ")\nprint("Merhaba", isim)`, cikti: `Adın ne? Ali\nMerhaba Ali` },
          { tur: "metin", yazi: "Program <code>Adın ne?</code> yazar ve durur. Sen bir şey yazıp <b>Enter</b>'a basınca cevabın <code>isim</code> kutusuna konur." },
          { tur: "ipucu", yazi: "Sorunun sonuna bir <b>boşluk</b> bırak: <code>\"Adın ne? \"</code>. Böylece cevap soruya yapışmaz." },
          { tur: "dikkat", yazi: "IDLE'da program soru sorunca <b>Shell penceresine tıklayıp</b> cevabını oraya yazmalısın." },
          { tur: "gorev", yazi: "Kullanıcıya en sevdiği yemeği soran ve \"Mmm, ... çok lezzetli!\" diyen bir program yaz." },
        ],
        sorular: [
          { tip: "yazi", metin: "Kullanıcıya soru soran komut hangisi?", dogru: ["input"], ipucu: "Komutlar küçük harfle yazılır.", aciklama: "input soru sorar ve cevabı bekler." },
          { tip: "secmeli", metin: "Kullanıcının cevabı nereye gider?", secenekler: ["Kaybolur", "= işaretinin solundaki kutuya", "Ekrana"], dogru: "= işaretinin solundaki kutuya", aciklama: "isim = input(...) yazınca cevap isim kutusuna konur." },
        ],
      },

      {
        id: "int-donusumu",
        baslik: "int ile Sayıya Çevirmek",
        sure: 6,
        bloklar: [
          { tur: "metin", yazi: "<code>input</code>'un bir sırrı var 🤫: Sen sayı yazsan bile cevabı <b>her zaman yazı</b> olarak verir!" },
          { tur: "kod", baslik: "Bu kod hata verir", kod: `yas = input("Yaşın kaç? ")\nprint(yas + 5)`, cikti: `Yaşın kaç? 10\nTypeError: can only concatenate str (not "int") to str` },
          { tur: "metin", yazi: "Python \"<b>Yazıya</b> sayı ekleyemem!\" diyor. Çünkü <code>yas</code> kutusunda <code>\"10\"</code> var, <code>10</code> değil." },
          { tur: "metin", yazi: "Çözüm: <code>int</code> komutu! Yazıyı <b>tam sayıya</b> çevirir." },
          { tur: "kod", baslik: "Doğrusu", kod: `yas = int(input("Yaşın kaç? "))\nprint(yas + 5)`, cikti: `Yaşın kaç? 10\n15` },
          { tur: "dikkat", yazi: "Sonda <b>iki</b> kapanış parantezi var: <code>))</code>. Biri <code>input</code> için, biri <code>int</code> için." },
          { tur: "ipucu", yazi: "Tersi de var: <code>str(10)</code> sayıyı yazıya çevirir. Noktalı sayılar için de <code>float</code> kullanılır." },
        ],
        sorular: [
          { tip: "yazi", metin: "Yazıyı tam sayıya çeviren komut hangisi?", dogru: ["int"], ipucu: "Küçük harfle yazılır.", aciklama: "int(\"10\") → 10" },
          { tip: "secmeli", metin: "input() cevabı hangi türde verir?", secenekler: ["Her zaman sayı", "Her zaman yazı", "Ne yazarsan o"], dogru: "Her zaman yazı", aciklama: "input her zaman yazı (str) verir. Sayı için int ile çevirmelisin." },
        ],
      },

      {
        id: "hesap-makinesi",
        baslik: "🛠️ Mini Proje: Hesap Makinesi",
        sure: 8,
        bloklar: [
          { tur: "metin", yazi: "Öğrendiklerimizi birleştirip kendi <b>hesap makinemizi</b> yapalım! 🧮" },
          { tur: "kod", kod: `print("🧮 Hesap Makinesi")\nsayi1 = int(input("Birinci sayı: "))\nsayi2 = int(input("İkinci sayı: "))\n\nprint("Toplam:", sayi1 + sayi2)\nprint("Fark:", sayi1 - sayi2)\nprint("Çarpım:", sayi1 * sayi2)`, cikti: `🧮 Hesap Makinesi\nBirinci sayı: 8\nİkinci sayı: 2\nToplam: 10\nFark: 6\nÇarpım: 16` },
          { tur: "metin", yazi: "Program iki sayı soruyor, <code>int</code> ile sayıya çeviriyor ve sonuçları yazdırıyor." },
          { tur: "gorev", yazi: "Bu programı IDLE'da yaz ve çalıştır. Sonra <b>bölme</b> sonucunu da ekle!" },
          { tur: "ipucu", yazi: "Boş satırlar programı daha okunaklı yapar. Python boş satırları görmezden gelir." },
        ],
        sorular: [
          { tip: "secmeli", metin: "Hesap makinesinde neden int kullandık?", secenekler: ["Süs olsun diye", "Cevapları sayıya çevirmek için", "Ekrana yazmak için"], dogru: "Cevapları sayıya çevirmek için", aciklama: "input yazı verir; hesap yapabilmek için int ile sayıya çeviririz." },
          { tip: "secmeli", metin: "Bölmeyi eklemek için hangi satır doğru?", secenekler: ['print("Bölüm:", sayi1 / sayi2)', 'print("Bölüm:", sayi1 x sayi2)', 'print("Bölüm:" sayi1 / sayi2)'], dogru: 'print("Bölüm:", sayi1 / sayi2)', aciklama: "Bölme / ile yapılır ve yazı ile sonucun arasına virgül konur." },
        ],
      },
    ],
  },

  // ===================================================
  {
    id: "kararlar",
    emoji: "🚦",
    baslik: "Karar Vermek",
    aciklama: "Programın düşünsün: eğer şöyleyse bunu yap!",
    dersler: [
      {
        id: "karsilastirma",
        baslik: "Karşılaştırma ve True / False",
        sure: 5,
        bloklar: [
          { tur: "metin", yazi: "Python iki şeyi karşılaştırıp <b>doğru mu yanlış mı</b> diye cevap verebilir. Doğruya <code>True</code>, yanlışa <code>False</code> der." },
          { tur: "kod", kod: `print(5 > 3)\nprint(2 > 8)\nprint(4 == 4)\nprint(4 != 4)`, cikti: `True\nFalse\nTrue\nFalse` },
          { tur: "metin", yazi: "Karşılaştırma işaretleri:<br><code>==</code> eşit mi? &nbsp; <code>!=</code> eşit değil mi?<br><code>&gt;</code> büyük mü? &nbsp; <code>&lt;</code> küçük mü?<br><code>&gt;=</code> büyük veya eşit mi? &nbsp; <code>&lt;=</code> küçük veya eşit mi?" },
          { tur: "dikkat", yazi: "<code>=</code> \"içine koy\" demektir, <code>==</code> ise \"eşit mi?\" diye sorar. Karıştırmak çok kolay, dikkat et! 👀" },
        ],
        sorular: [
          { tip: "secmeli", metin: "print(10 > 7) ne yazar?", secenekler: ["True", "False", "10"], dogru: "True", aciklama: "10, 7'den büyük olduğu için True (doğru)." },
          { tip: "secmeli", metin: "\"Eşit değil mi?\" diye sormak için hangisi kullanılır?", secenekler: ["==", "!=", "=/"], dogru: "!=", aciklama: "! işareti \"değil\" demektir: != eşit değil mi?" },
        ],
      },

      {
        id: "if-else",
        baslik: "if ve else",
        sure: 6,
        bloklar: [
          { tur: "metin", yazi: "<code>if</code> \"eğer\", <code>else</code> \"değilse\" demektir. Program bir koşula bakar ve ona göre karar verir." },
          { tur: "kod", kod: `sifre = input("Şifre: ")\n\nif sifre == "elma":\n    print("Kapı açıldı! 🚪")\nelse:\n    print("Kapı kilitli! 🔒")`, cikti: `Şifre: elma\nKapı açıldı! 🚪` },
          { tur: "metin", yazi: "<b>Üç altın kural:</b><br>1) <code>if</code> ve <code>else</code> satırlarının sonuna <code>:</code> konur.<br>2) Altındaki satırlar <b>içeriden</b> (4 boşluk) başlar. Buna <b>girinti</b> denir.<br>3) Eşitlik için <code>==</code> kullanılır." },
          { tur: "ipucu", yazi: "IDLE'da <code>:</code> yazıp Enter'a basınca girintiyi kendisi yapar. <code>else</code> yazmadan önce <b>Backspace</b> ile geri çık." },
          { tur: "dikkat", yazi: "<code>else</code>'in yanına koşul yazılmaz! Sadece <code>else:</code> yazılır." },
        ],
        sorular: [
          { tip: "secmeli", metin: "if satırının sonuna ne konur?", secenekler: [";", ":", "."], dogru: ":", aciklama: "if, elif, else, while, for satırlarının sonuna : konur." },
          { tip: "secmeli", metin: "sayi = 3 ise bu kod ne yazar?\nif sayi > 5:\n    print(\"Büyük\")\nelse:\n    print(\"Küçük\")", secenekler: ["Büyük", "Küçük", "İkisi de"], dogru: "Küçük", aciklama: "3, 5'ten büyük değil; bu yüzden else kısmı çalışır." },
        ],
      },

      {
        id: "elif",
        baslik: "elif: Daha Fazla Seçenek",
        sure: 5,
        bloklar: [
          { tur: "metin", yazi: "İkiden fazla seçenek varsa <code>elif</code> kullanırız. <b>\"else if\"</b> kelimelerinin kısaltmasıdır: \"değilse, eğer...\"" },
          { tur: "kod", kod: `notun = int(input("Notun kaç? "))\n\nif notun >= 85:\n    print("Pekiyi! 🌟")\nelif notun >= 70:\n    print("İyi! 👍")\nelif notun >= 50:\n    print("Geçtin! 🙂")\nelse:\n    print("Biraz daha çalış! 💪")`, cikti: `Notun kaç? 75\nİyi! 👍` },
          { tur: "metin", yazi: "Python yukarıdan aşağıya bakar ve <b>ilk doğru olanı</b> çalıştırıp durur. Hiçbiri doğru değilse <code>else</code> çalışır." },
          { tur: "dikkat", yazi: "Birden fazla <code>if</code> yazarsan her biri <b>ayrı ayrı</b> kontrol edilir ve birden fazla cevap çıkabilir. Bir grup seçenek için <code>if → elif → else</code> kullan." },
        ],
        sorular: [
          { tip: "yazi", metin: "\"Değilse, eğer\" anlamına gelen komut hangisi?", dogru: ["elif"], ipucu: "Küçük harfle yazılır.", aciklama: "elif, else if'in kısaltmasıdır." },
          { tip: "secmeli", metin: "Yukarıdaki not programına 90 yazarsak ne çıkar?", secenekler: ["Pekiyi! 🌟", "İyi! 👍", "İkisi de"], dogru: "Pekiyi! 🌟", aciklama: "90 >= 85 doğru olduğu için ilk seçenek çalışır ve Python durur." },
        ],
      },

      {
        id: "and-or-not",
        baslik: "and, or, not",
        sure: 6,
        bloklar: [
          { tur: "metin", yazi: "Bazen birden fazla koşula aynı anda bakmak isteriz:" },
          { tur: "metin", yazi: "<code>and</code> → <b>ve</b>: İkisi de doğruysa doğru.<br><code>or</code> → <b>veya</b>: Biri bile doğruysa doğru.<br><code>not</code> → <b>değil</b>: Doğruyu yanlış, yanlışı doğru yapar." },
          { tur: "kod", kod: `yas = 12\nboy = 145\n\nif yas >= 10 and boy >= 140:\n    print("Lunaparka binebilirsin! 🎢")\nelse:\n    print("Biraz daha büyümelisin.")`, cikti: `Lunaparka binebilirsin! 🎢` },
          { tur: "kod", kod: `gun = "Cumartesi"\n\nif gun == "Cumartesi" or gun == "Pazar":\n    print("Hafta sonu! 🎉")`, cikti: `Hafta sonu! 🎉` },
          { tur: "ipucu", yazi: "<code>and</code> çok sıkıdır, iki koşul da doğru olmalı. <code>or</code> ise rahattır, biri yeter!" },
        ],
        sorular: [
          { tip: "secmeli", metin: "print(5 > 3 and 2 > 4) ne yazar?", secenekler: ["True", "False"], dogru: "False", aciklama: "and için ikisi de doğru olmalı; 2 > 4 yanlış olduğu için sonuç False." },
          { tip: "secmeli", metin: "print(5 > 3 or 2 > 4) ne yazar?", secenekler: ["True", "False"], dogru: "True", aciklama: "or için biri doğru yeter; 5 > 3 doğru olduğu için True." },
        ],
      },

      {
        id: "sifreli-kapi",
        baslik: "🛠️ Mini Proje: Akıllı Kapı",
        sure: 7,
        bloklar: [
          { tur: "metin", yazi: "Hem kullanıcı adı hem şifre soran akıllı bir kapı yapalım! 🚪" },
          { tur: "kod", kod: `kullanici = input("Kullanıcı adı: ")\nsifre = input("Şifre: ")\n\nif kullanici == "ali" and sifre == "1234":\n    print("Hoş geldin Ali! 🎉")\nelif kullanici == "ali":\n    print("Şifre yanlış! 🔒")\nelse:\n    print("Böyle bir kullanıcı yok! 🤔")`, cikti: `Kullanıcı adı: ali\nŞifre: 0000\nŞifre yanlış! 🔒` },
          { tur: "metin", yazi: "Bu kapı üç durumu ayırt ediyor: her şey doğru, sadece şifre yanlış, kullanıcı yok." },
          { tur: "gorev", yazi: "Kapıya ikinci bir kullanıcı ekle! İpucu: <code>elif kullanici == \"ayse\" and sifre == \"5678\":</code>" },
          { tur: "dikkat", yazi: "Gerçek hayatta şifreler <b>asla</b> kodun içine yazılmaz ve kimseyle paylaşılmaz. Bu sadece bir alıştırma! 🛡️" },
        ],
        sorular: [
          { tip: "secmeli", metin: "Kullanıcı adı \"ali\", şifre \"1234\" yazılırsa ne çıkar?", secenekler: ["Hoş geldin Ali! 🎉", "Şifre yanlış! 🔒", "Böyle bir kullanıcı yok! 🤔"], dogru: "Hoş geldin Ali! 🎉", aciklama: "İki koşul da doğru olduğu için ilk seçenek çalışır." },
        ],
      },
    ],
  },

  // ===================================================
  {
    id: "donguler",
    emoji: "🔁",
    baslik: "Döngüler",
    aciklama: "Bir işi tekrar tekrar yaptır, hem de tek satırla!",
    dersler: [
      {
        id: "while",
        baslik: "while Döngüsü",
        sure: 6,
        bloklar: [
          { tur: "metin", yazi: "<code>while</code> \"...olduğu sürece\" demektir. Koşul doğru olduğu sürece içindeki satırları <b>tekrar tekrar</b> çalıştırır. 🔁" },
          { tur: "kod", kod: `sayi = 1\nwhile sayi <= 5:\n    print(sayi)\n    sayi = sayi + 1\nprint("Bitti!")`, cikti: `1\n2\n3\n4\n5\nBitti!` },
          { tur: "metin", yazi: "Her turda Python sorar: \"<code>sayi</code> 5'ten küçük veya eşit mi?\" Evetse içeriyi çalıştırır ve başa döner. Hayırsa döngüden çıkar." },
          { tur: "dikkat", yazi: "<code>sayi = sayi + 1</code> satırını unutursan sayı hiç büyümez ve döngü <b>sonsuza kadar</b> döner! Durdurmak için <b>Ctrl + C</b>'ye bas." },
          { tur: "kod", baslik: "İnatçı kapı", kod: `sifre = ""\nwhile sifre != "elma":\n    sifre = input("Şifre: ")\nprint("Kapı açıldı! 🚪")`, cikti: `Şifre: muz\nŞifre: armut\nŞifre: elma\nKapı açıldı! 🚪` },
          { tur: "gorev", yazi: "10'dan 1'e geri sayan ve sonunda \"Kalkış! 🚀\" yazan bir roket programı yap." },
        ],
        sorular: [
          { tip: "secmeli", metin: "sayi = 1 ile başlayıp while sayi <= 3: diyen döngü kaç kere çalışır?", secenekler: ["2", "3", "4"], dogru: "3", aciklama: "1, 2 ve 3 için çalışır; 4 olunca durur." },
          { tip: "secmeli", metin: "Sonsuz döngüyü durdurmak için hangi tuşlara basılır?", secenekler: ["Ctrl + S", "Ctrl + C", "Alt + F4"], dogru: "Ctrl + C", aciklama: "Ctrl + C çalışan programı durdurur." },
        ],
      },

      {
        id: "for-range",
        baslik: "for ve range",
        sure: 6,
        bloklar: [
          { tur: "metin", yazi: "Bir şeyi <b>belli bir sayıda</b> tekrarlamak için <code>for</code> döngüsü daha kolaydır." },
          { tur: "kod", kod: `for i in range(5):\n    print("Merhaba!")`, cikti: `Merhaba!\nMerhaba!\nMerhaba!\nMerhaba!\nMerhaba!` },
          { tur: "metin", yazi: "<code>range(5)</code> 0'dan başlayıp 5'e kadar (5 dahil değil) sayı üretir: 0, 1, 2, 3, 4. Yani tam <b>5 tur</b>." },
          { tur: "kod", kod: `for i in range(1, 6):\n    print(i, "x 3 =", i * 3)`, cikti: `1 x 3 = 3\n2 x 3 = 6\n3 x 3 = 9\n4 x 3 = 12\n5 x 3 = 15` },
          { tur: "ipucu", yazi: "<code>range(1, 6)</code> 1'den başlar, 6'ya gelmeden durur. İlk sayı dahil, son sayı <b>dahil değil</b>!" },
          { tur: "gorev", yazi: "<code>for</code> ile 7'ler çarpım tablosunu (1'den 10'a kadar) yazdır." },
        ],
        sorular: [
          { tip: "secmeli", metin: "range(4) hangi sayıları üretir?", secenekler: ["1, 2, 3, 4", "0, 1, 2, 3", "0, 1, 2, 3, 4"], dogru: "0, 1, 2, 3", aciklama: "range 0'dan başlar ve son sayıyı dahil etmez." },
          { tip: "secmeli", metin: "for i in range(3): print(\"A\") kaç tane A yazar?", secenekler: ["2", "3", "4"], dogru: "3", aciklama: "range(3) → 0, 1, 2 yani 3 tur." },
        ],
      },

      {
        id: "break",
        baslik: "break ile Döngüden Çıkmak",
        sure: 5,
        bloklar: [
          { tur: "metin", yazi: "<code>break</code> \"kır\" demektir. Döngünün içinde <code>break</code> görülünce döngü <b>hemen biter</b>. 🛑" },
          { tur: "kod", kod: `while True:\n    cevap = input("Çıkmak için 'q' yaz: ")\n    if cevap == "q":\n        break\n    print("Sen", cevap, "yazdın")\nprint("Görüşürüz! 👋")`, cikti: `Çıkmak için 'q' yaz: merhaba\nSen merhaba yazdın\nÇıkmak için 'q' yaz: q\nGörüşürüz! 👋` },
          { tur: "metin", yazi: "<code>while True:</code> sonsuza kadar dönen bir döngüdür. Ama içindeki <code>break</code> sayesinde istediğimiz an çıkabiliriz." },
          { tur: "ipucu", yazi: "Oyunlarda \"Tekrar oynamak ister misin?\" sorusu genelde böyle yapılır!" },
        ],
        sorular: [
          { tip: "yazi", metin: "Döngüyü hemen bitiren komut hangisi?", dogru: ["break"], ipucu: "Küçük harfle yazılır.", aciklama: "break döngüyü kırar ve dışarı çıkar." },
          { tip: "secmeli", metin: "while True: ne demektir?", secenekler: ["Hiç çalışmayan döngü", "Sonsuza kadar dönen döngü", "Bir kere çalışan döngü"], dogru: "Sonsuza kadar dönen döngü", aciklama: "Koşul hep True olduğu için durmaz; break ile çıkılır." },
        ],
      },

      {
        id: "sayi-tahmin",
        baslik: "🛠️ Mini Proje: Sayı Tahmin Oyunu",
        sure: 10,
        bloklar: [
          { tur: "metin", yazi: "Bilgisayar gizli bir sayı tutacak, sen tahmin edeceksin! 🎲 Bunun için <code>random</code> (rastgele) kütüphanesini kullanacağız." },
          { tur: "kod", kod: `import random\n\ngizli = random.randint(1, 20)\ndeneme = 0\n\nprint("1 ile 20 arasında bir sayı tuttum!")\n\nwhile True:\n    tahmin = int(input("Tahminin: "))\n    deneme += 1\n\n    if tahmin < gizli:\n        print("⬆️ Daha büyük!")\n    elif tahmin > gizli:\n        print("⬇️ Daha küçük!")\n    else:\n        print(f"🎉 Bildin! {deneme} denemede buldun!")\n        break`, cikti: `1 ile 20 arasında bir sayı tuttum!\nTahminin: 10\n⬆️ Daha büyük!\nTahminin: 15\n⬇️ Daha küçük!\nTahminin: 13\n🎉 Bildin! 3 denemede buldun!` },
          { tur: "metin", yazi: "<code>import random</code> Python'a \"rastgele sayı araçlarını getir\" der. <code>random.randint(1, 20)</code> ise 1 ile 20 arasında (ikisi de dahil) rastgele bir sayı seçer." },
          { tur: "gorev", yazi: "Oyunu yaz ve arkadaşınla oyna! Sonra sayı aralığını 1-100 yap. Kaç denemede bulabiliyorsun?" },
          { tur: "ipucu", yazi: "Akıllı taktik: Her seferinde aralığın <b>ortasını</b> tahmin et. 1-100 arasındaki bir sayıyı en fazla 7 denemede bulabilirsin!" },
        ],
        sorular: [
          { tip: "secmeli", metin: "random.randint(1, 6) ne yapar?", secenekler: ["Hep 1 verir", "1 ile 6 arasında rastgele sayı verir", "6 tane sayı verir"], dogru: "1 ile 6 arasında rastgele sayı verir", aciklama: "Tıpkı bir zar atmak gibi! 🎲" },
          { tip: "yazi", metin: "Rastgele sayı araçlarını kullanmak için en başa ne yazarız? (import ...)", dogru: ["import random"], ipucu: "Hepsi küçük harfle yazılır.", aciklama: "import random yazınca random araçları kullanılabilir." },
        ],
      },
    ],
  },

  // ===================================================
  {
    id: "listeler",
    emoji: "📋",
    baslik: "Listeler",
    aciklama: "Bir sürü şeyi tek bir kutuda sakla.",
    dersler: [
      {
        id: "liste-nedir",
        baslik: "Liste Nedir?",
        sure: 5,
        bloklar: [
          { tur: "metin", yazi: "Liste, içinde <b>birden fazla şey</b> olan bir kutudur. Köşeli parantez <code>[ ]</code> ile yapılır ve elemanlar virgülle ayrılır." },
          { tur: "kod", kod: `meyveler = ["elma", "muz", "çilek"]\nprint(meyveler)`, cikti: `['elma', 'muz', 'çilek']` },
          { tur: "metin", yazi: "Listedeki her elemanın bir <b>sıra numarası</b> vardır. Buna <b>indeks</b> denir ve <b>0'dan başlar!</b>" },
          { tur: "kod", kod: `meyveler = ["elma", "muz", "çilek"]\nprint(meyveler[0])\nprint(meyveler[2])`, cikti: `elma\nçilek` },
          { tur: "dikkat", yazi: "İlk eleman <code>[0]</code>, ikinci eleman <code>[1]</code>'dir. Bilgisayarlar saymaya 0'dan başlar! 🤓" },
          { tur: "ipucu", yazi: "<code>meyveler[-1]</code> yazarsan listenin <b>son</b> elemanını alırsın." },
        ],
        sorular: [
          { tip: "secmeli", metin: "renkler = [\"kırmızı\", \"mavi\", \"yeşil\"] ise renkler[1] nedir?", secenekler: ["kırmızı", "mavi", "yeşil"], dogru: "mavi", aciklama: "İndeks 0'dan başlar: [0] kırmızı, [1] mavi." },
          { tip: "secmeli", metin: "Liste yapmak için hangi parantez kullanılır?", secenekler: ["( )", "[ ]", "{ }"], dogru: "[ ]", aciklama: "Listeler köşeli parantezle yapılır." },
        ],
      },

      {
        id: "liste-islemleri",
        baslik: "Listeye Ekle, Çıkar, Say",
        sure: 6,
        bloklar: [
          { tur: "kod", baslik: "append: Sona ekle", kod: `oyunlar = ["Minecraft", "Roblox"]\noyunlar.append("Fortnite")\nprint(oyunlar)`, cikti: `['Minecraft', 'Roblox', 'Fortnite']` },
          { tur: "kod", baslik: "remove: Çıkar", kod: `oyunlar.remove("Roblox")\nprint(oyunlar)`, cikti: `['Minecraft', 'Fortnite']` },
          { tur: "kod", baslik: "len: Kaç eleman var?", kod: `print(len(oyunlar))`, cikti: `2` },
          { tur: "kod", baslik: "in: Listede var mı?", kod: `if "Minecraft" in oyunlar:\n    print("Minecraft listede! ⛏️")`, cikti: `Minecraft listede! ⛏️` },
          { tur: "ipucu", yazi: "<code>len</code>, İngilizce \"length\" (uzunluk) kelimesinin kısaltmasıdır. Yazılarla da çalışır: <code>len(\"Python\")</code> → 6" },
        ],
        sorular: [
          { tip: "yazi", metin: "Listenin sonuna eleman ekleyen komut hangisi? (liste.____)", dogru: ["append", "append()"], ipucu: "Küçük harfle yazılır.", aciklama: "liste.append(eleman) sona ekler." },
          { tip: "secmeli", metin: "len([\"a\", \"b\", \"c\", \"d\"]) kaçtır?", secenekler: ["3", "4", "5"], dogru: "4", aciklama: "Listede 4 eleman var." },
        ],
      },

      {
        id: "liste-for",
        baslik: "Listeyi for ile Gezmek",
        sure: 5,
        bloklar: [
          { tur: "metin", yazi: "<code>for</code> döngüsü listedeki elemanları <b>tek tek</b> gezebilir. Bu çok güçlü bir özellik! 💪" },
          { tur: "kod", kod: `arkadaslar = ["Ali", "Ayşe", "Can"]\n\nfor arkadas in arkadaslar:\n    print("Merhaba", arkadas, "👋")`, cikti: `Merhaba Ali 👋\nMerhaba Ayşe 👋\nMerhaba Can 👋` },
          { tur: "metin", yazi: "Her turda <code>arkadas</code> kutusuna listedeki sıradaki isim konur." },
          { tur: "kod", baslik: "Puanları toplamak", kod: `puanlar = [10, 25, 15]\ntoplam = 0\nfor puan in puanlar:\n    toplam += puan\nprint("Toplam puan:", toplam)`, cikti: `Toplam puan: 50` },
          { tur: "gorev", yazi: "En sevdiğin 5 yemeğin listesini yap ve <code>for</code> ile her birini \"Ben ... severim\" şeklinde yazdır." },
        ],
        sorular: [
          { tip: "secmeli", metin: "for x in [1, 2, 3]: print(x * 2) ne yazar?", secenekler: ["1 2 3", "2 4 6", "6"], dogru: "2 4 6", aciklama: "Her eleman 2 ile çarpılır: 2, 4, 6 (alt alta)." },
        ],
      },
    ],
  },

  // ===================================================
  {
    id: "fonksiyonlar",
    emoji: "🧩",
    baslik: "Fonksiyonlar",
    aciklama: "Kendi komutlarını icat et!",
    dersler: [
      {
        id: "def",
        baslik: "def ile Kendi Komutunu Yap",
        sure: 6,
        bloklar: [
          { tur: "metin", yazi: "<code>print</code> ve <code>input</code> gibi komutlara <b>fonksiyon</b> denir. Ve sen de kendi fonksiyonlarını yapabilirsin! 🧙" },
          { tur: "kod", kod: `def selam_ver():\n    print("Merhaba!")\n    print("Python Okuluna hoş geldin! 🎓")\n\nselam_ver()\nselam_ver()`, cikti: `Merhaba!\nPython Okuluna hoş geldin! 🎓\nMerhaba!\nPython Okuluna hoş geldin! 🎓` },
          { tur: "metin", yazi: "<code>def</code> \"tanımla\" demektir. Fonksiyonun içindeki satırlar <b>girintili</b> yazılır. Fonksiyonu çalıştırmak için ismini ve <code>()</code> yazarız. Buna fonksiyonu <b>çağırmak</b> denir." },
          { tur: "ipucu", yazi: "Fonksiyonlar tekrar eden kodları tek bir yere toplar. Bir kere yaz, istediğin kadar kullan!" },
          { tur: "dikkat", yazi: "Fonksiyonu <b>tanımlamak</b> onu çalıştırmaz! Çalışması için mutlaka <b>çağırmalısın</b>: <code>selam_ver()</code>" },
        ],
        sorular: [
          { tip: "yazi", metin: "Fonksiyon tanımlamak için hangi kelime kullanılır?", dogru: ["def"], ipucu: "Küçük harfle yazılır.", aciklama: "def, define (tanımla) kelimesinin kısaltmasıdır." },
          { tip: "secmeli", metin: "def zipla(): fonksiyonunu nasıl çağırırız?", secenekler: ["zipla", "zipla()", "def zipla()"], dogru: "zipla()", aciklama: "Fonksiyon ismi ve parantez yazılarak çağrılır." },
        ],
      },

      {
        id: "parametreler",
        baslik: "Fonksiyona Bilgi Göndermek",
        sure: 6,
        bloklar: [
          { tur: "metin", yazi: "Fonksiyonlara parantezin içinden <b>bilgi gönderebilirsin</b>. Bu bilgilere <b>parametre</b> denir." },
          { tur: "kod", kod: `def selam_ver(isim):\n    print(f"Merhaba {isim}! 👋")\n\nselam_ver("Ali")\nselam_ver("Ayşe")`, cikti: `Merhaba Ali! 👋\nMerhaba Ayşe! 👋` },
          { tur: "metin", yazi: "<code>selam_ver(\"Ali\")</code> çağırınca <code>\"Ali\"</code> yazısı <code>isim</code> kutusuna konur." },
          { tur: "kod", baslik: "Birden fazla parametre", kod: `def topla(a, b):\n    print(a, "+", b, "=", a + b)\n\ntopla(3, 4)\ntopla(10, 20)`, cikti: `3 + 4 = 7\n10 + 20 = 30` },
        ],
        sorular: [
          { tip: "secmeli", metin: "def kare(x): print(x * x) ise kare(5) ne yazar?", secenekler: ["10", "25", "55"], dogru: "25", aciklama: "x kutusuna 5 konur: 5 × 5 = 25" },
        ],
      },

      {
        id: "return",
        baslik: "return ile Cevap Döndürmek",
        sure: 6,
        bloklar: [
          { tur: "metin", yazi: "Bazen fonksiyonun ekrana yazmasını değil, bize bir <b>cevap vermesini</b> isteriz. Bunun için <code>return</code> (\"geri ver\") kullanılır." },
          { tur: "kod", kod: `def iki_kati(sayi):\n    return sayi * 2\n\nsonuc = iki_kati(7)\nprint(sonuc)\nprint(iki_kati(100))`, cikti: `14\n200` },
          { tur: "metin", yazi: "<code>return</code> cevabı fonksiyonu çağıran yere geri gönderir. O cevabı bir kutuya koyabilir ya da doğrudan kullanabilirsin." },
          { tur: "ipucu", yazi: "<code>print</code> ekrana yazar ve iş biter. <code>return</code> ise cevabı sana teslim eder, sen de onunla başka işler yapabilirsin! 📦" },
        ],
        sorular: [
          { tip: "secmeli", metin: "def ekle(a, b): return a + b ise print(ekle(2, 3)) ne yazar?", secenekler: ["23", "5", "a + b"], dogru: "5", aciklama: "Fonksiyon 2 + 3 = 5 cevabını geri verir." },
          { tip: "yazi", metin: "Fonksiyondan cevap geri gönderen komut hangisi?", dogru: ["return"], ipucu: "Küçük harfle yazılır.", aciklama: "return cevabı çağıran yere geri gönderir." },
        ],
      },
    ],
  },

  // ===================================================
  {
    id: "final",
    emoji: "🏆",
    baslik: "Final Projesi",
    aciklama: "Her şeyi birleştir, kendi bilgi yarışmanı yap!",
    dersler: [
      {
        id: "bilgi-yarismasi",
        baslik: "🛠️ Bilgi Yarışması Yap",
        sure: 15,
        bloklar: [
          { tur: "metin", yazi: "Tebrikler, finale geldin! 🎉 Şimdi öğrendiğin <b>her şeyi</b> kullanarak bir bilgi yarışması yapacağız: listeler, döngüler, if, fonksiyonlar ve f-string!" },
          { tur: "kod", kod: `sorular = [\n    ["Türkiye'nin başkenti?", "ankara"],\n    ["5 x 6 kaçtır?", "30"],\n    ["Python bir yılan mı, dil mi?", "dil"],\n]\n\ndef soru_sor(soru, cevap):\n    yanit = input(soru + " ")\n    if yanit.lower() == cevap:\n        print("✅ Doğru!")\n        return 1\n    else:\n        print(f"❌ Yanlış! Doğru cevap: {cevap}")\n        return 0\n\npuan = 0\nfor soru, cevap in sorular:\n    puan += soru_sor(soru, cevap)\n\nprint(f"🏆 Puanın: {puan} / {len(sorular)}")`, cikti: `Türkiye'nin başkenti? Ankara\n✅ Doğru!\n5 x 6 kaçtır? 30\n✅ Doğru!\nPython bir yılan mı, dil mi? yılan\n❌ Yanlış! Doğru cevap: dil\n🏆 Puanın: 2 / 3` },
          { tur: "metin", yazi: "<code>yanit.lower()</code> cevabı küçük harfe çevirir. Böylece \"Ankara\" da \"ankara\" da doğru sayılır." },
          { tur: "metin", yazi: "<code>for soru, cevap in sorular:</code> listedeki her küçük listeyi açar ve içindekileri iki kutuya koyar." },
          { tur: "gorev", yazi: "Kendi sorularını ekle! En az 5 soru yap ve yarışmayı arkadaşlarınla oyna. Kim en yüksek puanı alacak? 🥇" },
          { tur: "ipucu", yazi: "Sonda puana göre farklı mesajlar ver: hepsini bilirse \"Dahi! 🧠\", yarısını bilirse \"İyi iş! 👍\"..." },
        ],
        sorular: [
          { tip: "secmeli", metin: "\"PYTHON\".lower() ne verir?", secenekler: ["PYTHON", "python", "Python"], dogru: "python", aciklama: "lower() bütün harfleri küçültür." },
          { tip: "secmeli", metin: "Bu projede soru_sor fonksiyonu doğru cevapta ne döndürür?", secenekler: ["0", "1", "True"], dogru: "1", aciklama: "Doğru cevapta return 1 çalışır, puan 1 artar." },
        ],
      },
    ],
  },
];
