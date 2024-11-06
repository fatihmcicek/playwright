# TC01 - Authentication Test Cases

## TC01.01 - Standard User Login
**Önkoşullar:**
- Web tarayıcı açık olmalı
- İnternet bağlantısı olmalı

**Test Adımları:**
1. https://www.saucedemo.com/ adresine git
2. Username alanına "standard_user" gir
3. Password alanına "secret_sauce" gir
4. Login butonuna tıkla

**Beklenen Sonuç:**
- Kullanıcı başarıyla giriş yapmalı
- Inventory sayfasına yönlendirilmeli
- URL /inventory.html olmalı

**Test Seviyesi:** Smoke Test
**Öncelik:** Yüksek

## TC01.02 - Locked Out User Login
**Test Adımları:**
1. https://www.saucedemo.com/ adresine git
2. Username alanına "locked_out_user" gir
3. Password alanına "secret_sauce" gir
4. Login butonuna tıkla

**Beklenen Sonuç:**
- Kullanıcı giriş yapamamalı
- "Epic sadface: Sorry, this user has been locked out." hata mesajı görünmeli

## TC01.03 - Invalid Credentials
**Test Adımları:**
1. https://www.saucedemo.com/ adresine git
2. Username alanına "invalid_user" gir
3. Password alanına "invalid_password" gir
4. Login butonuna tıkla

**Beklenen Sonuç:**
- Giriş başarısız olmalı
- "Username and password do not match any user in this service" hata mesajı görünmeli