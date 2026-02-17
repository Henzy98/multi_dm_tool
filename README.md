# ⚠️ HENZY DM CLEANER ⚠️

Discord DM Temizleme Aracı - Selfbot

## 🚨 ÖNEMLİ UYARI 🚨

**BU ARAÇ DISCORD KULLANIM KOŞULLARINI (ToS) İHLAL EDER!**

- Selfbot kullanımı Discord ToS'a aykırıdır
- Hesabınız kalıcı olarak yasaklanabilir
- Bu aracı kullanarak TÜM SORUMLULUĞU ÜZERİNİZE ALMIŞ OLURSUNUZ
- Sadece eğitim ve deneysel amaçlar içindir
- Gerçek hesaplarda kullanılması ŞİDDETLE TAVSİYE EDİLMEZ

**KULLANIM TAMAMEN KENDİ RİSKİNİZDİR!**

## Kurulum

```bash
npm install
```

## Yapılandırma

`config/config.henzy` dosyasını düzenleyin:

```json
{
  "token": "DISCORD_USER_TOKEN_BURAYA",
  "whitelist": []
}
```

## Kullanım

```bash
npm start
```

## Özellikler

### 1. DM Temizle
- Tüm DM kanallarındaki **kendi mesajlarınızı** siler
- Hem arkadaşlar hem eski konuşmalar dahil
- Whitelist koruması
- Rate limit korumalı

### 2. Tüm Gruplardan Çık
- Tüm grup DM'lerden otomatik çıkış
- Rate limit korumalı

### 3. Tüm Sunuculardan Çık
- Tüm Discord sunucularından otomatik çıkış
- Rate limit korumalı

### 4-6. Whitelist Yönetimi
- Kullanıcı ID ile whitelist ekleme/çıkarma
- Whitelist görüntüleme

## Teknik Detaylar

- Rate limit koruması için optimize edilmiş delay'ler
- Sadece kullanıcının kendi mesajları silinir

## Sorumluluk Reddi

Bu yazılım "OLDUĞU GİBİ" sağlanmaktadır. Geliştiriciler:
- Hesap yasaklanmaları
- Veri kayıpları
- Discord tarafından alınacak herhangi bir aksiyon
- Kullanımdan doğabilecek herhangi bir zarar

için SORUMLU DEĞİLDİR.

**KULLANIM TAMAMEN KULLANICININ SORUMLULUĞUNDADIR.**

---

Made with 💕 by **HENZY**
