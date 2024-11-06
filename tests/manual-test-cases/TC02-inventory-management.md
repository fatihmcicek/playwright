# TC02 - Inventory Management Test Cases

## TC02.01 - Product Sorting
**Test Adımları:**
1. Standard user ile giriş yap
2. Sağ üst köşedeki sort dropdown'ı aç
3. Her bir sıralama seçeneğini test et:
   - Name (A to Z)
   - Name (Z to A)
   - Price (low to high)
   - Price (high to low)

**Beklenen Sonuç:**
- Ürünler seçilen kritere göre doğru şekilde sıralanmalı

## TC02.02 - Add Multiple Items to Cart
**Test Adımları:**
1. Standard user ile giriş yap
2. Farklı ürünlerin "Add to cart" butonlarına tıkla
3. Shopping cart badge'ini kontrol et

**Beklenen Sonuç:**
- Her ürün eklendikçe sepet sayacı artmalı
- "Add to cart" butonu "Remove" olarak değişmeli
- Sepet ikonu üzerindeki sayı doğru olmalı

## TC02.03 - Product Details
**Test Adımları:**
1. Standard user ile giriş yap
2. Herhangi bir ürünün resmine veya ismine tıkla

**Beklenen Sonuç:**
- Ürün detay sayfası açılmalı
- Ürün bilgileri (isim, fiyat, açıklama) görünmeli
- "Add to cart" butonu aktif olmalı