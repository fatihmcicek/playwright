# TC06 - User Profile Test Cases

## TC06.01 - Profile Information Display
**Önkoşullar:**
- Kullanıcı giriş yapmış olmalı
- Inventory sayfasında olmalı

**Test Adımları:**
1. Burger menüyü aç
2. Kullanıcı bilgilerini kontrol et
3. Kullanıcı adının görünürlüğünü kontrol et

**Beklenen Sonuçlar:**
- Kullanıcı adı doğru görüntülenmeli
- Aktif oturum bilgisi görünmeli

**Test Seviyesi:** Smoke Test
**Öncelik:** Orta

## TC06.02 - Session Management
**Test Adımları:**
1. Burger menüden "Logout" seçeneğini seç
2. Login sayfasına yönlendirildiğini kontrol et
3. Geri tuşuna bas
4. Login sayfasında kalıp kalmadığını kontrol et
5. Yeniden giriş yap
6. Oturum durumunu kontrol et

**Beklenen Sonuçlar:**
- Logout sonrası login sayfasına yönlendirmeli
- Geri tuşu login sayfasında kalmalı
- Yeni giriş başarılı olmalı
- Oturum doğru şekilde başlatılmalı

## TC06.03 - State Reset Functionality
**Test Adımları:**
1. Sepete birkaç ürün ekle
2. Burger menüden "Reset App State" seçeneğini seç
3. Sepet durumunu kontrol et
4. Sayfa durumunu kontrol et

**Beklenen Sonuçlar:**
- Reset sonrası sepet boş olmalı
- Ürün durumları resetlenmeli
- Sıralama varsayılan duruma dönmeli
- Uygulama state'i temizlenmeli