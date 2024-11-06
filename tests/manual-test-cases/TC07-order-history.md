# TC07 - Order History Test Cases

## TC07.01 - Complete Purchase Flow
**Önkoşullar:**
- Kullanıcı giriş yapmış olmalı
- Sepette en az bir ürün olmalı

**Test Adımları:**
1. Checkout sayfasına git
2. Kişisel bilgileri doldur ve devam et
3. Sipariş özetini kontrol et
4. Siparişi tamamla
5. Tamamlama mesajını kontrol et

**Beklenen Sonuçlar:**
- Sipariş başarıyla tamamlanmalı
- Onay mesajı görüntülenmeli
- Sipariş numarası (varsa) görüntülenmeli
- "Back Home" butonu görünür olmalı

**Test Seviyesi:** Smoke Test
**Öncelik:** Yüksek

## TC07.02 - Order Summary Validation
**Test Adımları:**
1. Birden fazla ürünle checkout işlemini başlat
2. Sipariş özet sayfasında:
   - Ürün listesini kontrol et
   - Fiyatları kontrol et
   - Vergi hesaplamasını kontrol et
   - Toplam tutarı kontrol et

**Beklenen Sonuçlar:**
- Tüm ürünler doğru listelenmiş olmalı
- Fiyatlar doğru gösterilmeli
- Vergi tutarı doğru hesaplanmalı
- Toplam tutar doğru hesaplanmalı