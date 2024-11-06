# TC04 - Checkout Process Test Cases

## TC04.01 - Complete Checkout Process
**Test Adımları:**
1. En az bir ürün ekle ve sepete git
2. "Checkout" butonuna tıkla
3. Kişisel bilgileri doldur:
   - First Name: John
   - Last Name: Doe
   - Postal Code: 12345
4. "Continue" butonuna tıkla
5. Sipariş özetini kontrol et
6. "Finish" butonuna tıkla

**Beklenen Sonuç:**
- Başarılı sipariş mesajı görünmeli
- "Thank you for your order!" mesajı gösterilmeli
- "Back Home" butonu aktif olmalı

## TC04.02 - Form Validation
**Test Adımları:**
1. Checkout sayfasına git
2. Hiçbir alan doldurmadan "Continue" butonuna tıkla
3. Her alanı tek tek doldur ve diğerlerini boş bırakarak test et

**Beklenen Sonuç:**
- Boş alan bırakıldığında hata mesajı gösterilmeli
- First Name için: "Error: First Name is required"
- Last Name için: "Error: Last Name is required"
- Postal Code için: "Error: Postal Code is required"

## TC04.03 - Order Summary Verification
**Test Adımları:**
1. Birden fazla ürün ekle
2. Checkout sürecinde Overview sayfasına gel
3. Ürün listesini, ara toplamı, vergiyi ve toplam tutarı kontrol et

**Beklenen Sonuç:**
- Tüm ürünler doğru fiyatlarıyla listelenmiş olmalı
- Item total doğru hesaplanmalı
- Tax tutarı %8 olmalı
- Total tutar doğru hesaplanmalı