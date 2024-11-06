# TC05 - Product Sorting and Filtering Test Cases

## TC05.01 - Filter Products by Price Range
**Önkoşullar:**
- Kullanıcı başarıyla giriş yapmış olmalı
- Inventory sayfasında olmalı

**Test Adımları:**
1. Sıralama dropdown'ından "Price (low to high)" seçeneğini seç
2. İlk ürünün fiyatını kontrol et
3. Son ürünün fiyatını kontrol et
4. Tüm ürünlerin fiyatlarının artan sırada olduğunu doğrula
5. $10-$50 aralığındaki ürünleri kontrol et

**Beklenen Sonuçlar:**
- Ürünler fiyata göre artan sırada sıralanmalı
- Her ürünün fiyatı görünür olmalı
- Fiyat formatı doğru olmalı ($XX.XX)
- Filtrelenen ürünler belirtilen fiyat aralığında olmalı

**Test Seviyesi:** Smoke Test
**Öncelik:** Yüksek

## TC05.02 - Product Name Sort Tests
**Test Adımları:**
1. Sıralama dropdown'ından sırayla aşağıdaki seçenekleri seç:
   - Name (A to Z)
   - Name (Z to A)
2. Her seçim sonrası ürün listesini kontrol et

**Beklenen Sonuçlar:**
- A to Z seçildiğinde ürünler alfabetik sırada olmalı
- Z to A seçildiğinde ürünler ters alfabetik sırada olmalı
- Sıralama anında gerçekleşmeli
- Seçili sıralama seçeneği dropdown'da görünmeli

## TC05.03 - Price Sort Tests
**Test Adımları:**
1. Sıralama dropdown'ından sırayla aşağıdaki seçenekleri seç:
   - Price (low to high)
   - Price (high to low)
2. Her seçim sonrası ürün fiyatlarını kontrol et

**Beklenen Sonuçlar:**
- Low to high seçildiğinde ürünler artan fiyat sırasında olmalı
- High to low seçildiğinde ürünler azalan fiyat sırasında olmalı
- Sıralama anında gerçekleşmeli
- Seçili sıralama seçeneği dropdown'da görünmeli

## TC05.04 - Sort Persistence Tests
**Test Adımları:**
1. Bir sıralama seçeneği seç
2. Bir ürünü sepete ekle
3. Sepete git ve geri dön
4. Sıralama durumunu kontrol et

**Beklenen Sonuçlar:**
- Sayfalar arası geçişte sıralama korunmalı
- Ürün ekleme/çıkarma işlemleri sıralamayı etkilememeli
- Seçili sıralama seçeneği dropdown'da görünmeye devam etmeli