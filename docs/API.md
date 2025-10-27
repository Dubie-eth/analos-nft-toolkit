# 📡 API Documentation

Complete API reference for the Analos NFT Launchpad.

---

## 🔗 Base URL

```
Production: https://www.launchonlos.fun/api
Development: http://localhost:3000/api
```

---

## 🎭 Profile NFT Endpoints

### **POST /api/profile-nft/mint**

Mint a new Profile NFT.

**Request Body:**
```json
{
  "walletAddress": "xxx...xxx",
  "username": "myusername",
  "displayName": "My Display Name",
  "bio": "My bio",
  "avatarUrl": "https://...",
  "bannerUrl": "https://...",
  "socialLinks": {
    "twitter": "@username",
    "telegram": "@username",
    "discord": "username#1234"
  },
  "mintPrice": 2.0,
  "paymentSignature": "xxx...xxx",
  "variant": "green"
}
```

**Response:**
```json
{
  "success": true,
  "mintAddress": "xxx...xxx",
  "metadata": { ... },
  "variant": "green",
  "rarityTier": "RARE",
  "mintNumber": 123
}
```

---

### **GET /api/profile-nft/check-existing**

Check if wallet has a Profile NFT.

**Query Parameters:**
- `walletAddress` (required)

**Response:**
```json
{
  "exists": true,
  "nft": {
    "mintAddress": "xxx...xxx",
    "mintNumber": 123,
    "variant": "green"
  }
}
```

---

### **GET /api/profile-nft/mint-counter**

Get next available mint number.

**Response:**
```json
{
  "nextMintNumber": 124
}
```

---

## 🎨 Los Bros Endpoints

### **GET /api/los-bros/check-eligibility**

Check if wallet is eligible to mint Los Bros NFT.

**Query Parameters:**
- `walletAddress` (required)

**Response:**
```json
{
  "eligible": true,
  "hasProfileNFT": true,
  "tokenBalance": 1500000,
  "tier": "GOLD",
  "pricing": {
    "basePriceLos": 10,
    "discountPercent": 50,
    "finalPrice": 5.0,
    "platformFee": 0.25
  },
  "mintedCount": 3,
  "maxMints": 10,
  "remainingMints": 7
}
```

---

### **POST /api/los-bros/mint**

Mint a Los Bros NFT.

**Request Body:**
```json
{
  "walletAddress": "xxx...xxx",
  "paymentSignature": "xxx...xxx",
  "priceLos": 5.0
}
```

**Response:**
```json
{
  "success": true,
  "tokenId": 1086,
  "mintAddress": "xxx...xxx",
  "imageUrl": "https://gateway.pinata.cloud/ipfs/xxx",
  "traits": [
    { "trait_type": "Background", "value": "space galaxy" },
    { "trait_type": "Body", "value": "zombie" },
    ...
  ],
  "rarityScore": 197.38,
  "rarityTier": "LEGENDARY",
  "metadataUri": "https://arweave.net/xxx"
}
```

---

### **GET /api/los-bros/composite-image**

Generate composite image for a Los Bros NFT.

**Query Parameters:**
- `tokenId` (required) - Token ID (1-2222)

**Response:**
HTML document with canvas rendering the composite image.

---

### **GET /api/los-bros/all-nfts**

Fetch all Los Bros NFTs from database.

**Response:**
```json
{
  "success": true,
  "count": 87,
  "nfts": [
    {
      "los_bros_token_id": "1086",
      "los_bros_traits": [...],
      "image_url": "https://gateway.pinata.cloud/ipfs/xxx",
      "wallet_address": "xxx...xxx",
      "created_at": "2025-10-27T..."
    },
    ...
  ]
}
```

---

## 💼 Marketplace Endpoints

### **GET /api/marketplace/listings**

Get active NFT listings.

**Query Parameters:**
- `collectionType` (optional) - Filter by collection
- `minPrice` (optional) - Minimum price
- `maxPrice` (optional) - Maximum price
- `rarity` (optional) - Filter by rarity tier

**Response:**
```json
{
  "listings": [
    {
      "id": "xxx",
      "nft_mint": "xxx...xxx",
      "seller_wallet": "xxx...xxx",
      "price_los": 15.5,
      "collection_type": "losbros",
      "rarity": "LEGENDARY",
      "image_url": "https://...",
      "created_at": "2025-10-27T..."
    },
    ...
  ],
  "total": 42
}
```

---

### **POST /api/marketplace/list**

List an NFT for sale.

**Request Body:**
```json
{
  "nftMint": "xxx...xxx",
  "priceLos": 15.5,
  "collectionType": "losbros"
}
```

**Response:**
```json
{
  "success": true,
  "listingId": "xxx",
  "escrowAccount": "xxx...xxx",
  "transactionSignature": "xxx...xxx"
}
```

---

### **POST /api/marketplace/buy**

Buy a listed NFT.

**Request Body:**
```json
{
  "listingId": "xxx",
  "buyerWallet": "xxx...xxx"
}
```

**Response:**
```json
{
  "success": true,
  "transactionSignature": "xxx...xxx",
  "nftMint": "xxx...xxx",
  "pricePaid": 15.5
}
```

---

## 👤 User Endpoints

### **GET /api/user-nfts**

Get all NFTs owned by a wallet.

**Query Parameters:**
- `walletAddress` (required)

**Response:**
```json
{
  "profileNFTs": [
    {
      "mint": "xxx...xxx",
      "username": "myusername",
      "displayName": "My Name",
      "variant": "green",
      "mintNumber": 123,
      "image": "data:image/svg+xml;base64,..."
    }
  ],
  "losBrosNFTs": [
    {
      "mint": "xxx...xxx",
      "tokenId": 1086,
      "name": "Los Bros #1086",
      "image": "https://gateway.pinata.cloud/ipfs/xxx",
      "rarity": "LEGENDARY",
      "rarityScore": 197.38,
      "tier": "LEGENDARY",
      "traits": [...]
    }
  ],
  "total": 14
}
```

---

### **GET /api/blockchain-profiles/[walletAddress]**

Get user profile data.

**URL Parameters:**
- `walletAddress` - Wallet address

**Response:**
```json
{
  "success": true,
  "profile": {
    "wallet_address": "xxx...xxx",
    "username": "myusername",
    "display_name": "My Name",
    "bio": "My bio",
    "avatar_url": "https://...",
    "banner_url": "https://...",
    "social_links": {
      "twitter": "@username",
      "telegram": "@username",
      "discord": "username#1234"
    },
    "mint_number": 123,
    "created_at": "2025-10-27T..."
  }
}
```

---

## 🔐 Admin Endpoints

All admin endpoints require cryptographic signature verification.

### **POST /api/admin/update-nft-image**

Update NFT image URL.

**Headers:**
```
Authorization: Signature xxx...xxx
X-Wallet: xxx...xxx
X-Timestamp: 1234567890
```

**Request Body:**
```json
{
  "tokenId": 1086,
  "imageUrl": "https://gateway.pinata.cloud/ipfs/xxx",
  "traits": [...]
}
```

**Response:**
```json
{
  "success": true,
  "tokenId": 1086,
  "imageUrl": "https://...",
  "data": { ... }
}
```

---

## 🔧 Utility Endpoints

### **GET /api/oracle/los-price**

Get current LOS token price in USD.

**Response:**
```json
{
  "price": 0.045,
  "source": "coingecko",
  "timestamp": 1234567890
}
```

---

### **POST /api/ipfs/upload-file**

Upload a file to IPFS.

**Request:**
- `multipart/form-data` with `file` field

**Response:**
```json
{
  "success": true,
  "url": "https://gateway.pinata.cloud/ipfs/xxx",
  "cid": "bafkreixxx",
  "message": "Successfully uploaded to IPFS"
}
```

---

### **POST /api/username/validate**

Validate username availability.

**Request Body:**
```json
{
  "username": "myusername"
}
```

**Response:**
```json
{
  "available": true,
  "message": "Username is available"
}
```

---

## ⚠️ Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| 400 | Bad Request | Check request parameters |
| 401 | Unauthorized | Verify wallet signature |
| 403 | Forbidden | Check wallet permissions |
| 404 | Not Found | Verify resource exists |
| 429 | Rate Limited | Wait and retry |
| 500 | Server Error | Contact support |

---

## 📊 Rate Limits

- **Minting**: 10 requests per minute per wallet
- **Marketplace**: 30 requests per minute
- **User Data**: 60 requests per minute
- **Oracle**: 120 requests per minute

---

## 🔐 Authentication

### **Wallet Signature**
```typescript
// Generate challenge
const challenge = await fetch('/api/auth/challenge', {
  method: 'POST',
  body: JSON.stringify({ walletAddress })
});

// Sign message
const signature = await wallet.signMessage(
  new TextEncoder().encode(challenge.message)
);

// Verify signature
const response = await fetch('/api/auth/verify', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${signature}`,
    'X-Wallet': walletAddress
  }
});
```

---

## 🎯 Best Practices

### **Error Handling**
```typescript
try {
  const response = await fetch('/api/...');
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  
  const data = await response.json();
  return data;
  
} catch (error) {
  console.error('API Error:', error);
  // Handle gracefully
}
```

### **Request Retries**
```typescript
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

---

## 📝 Changelog

See [CHANGELOG.md](../CHANGELOG.md) for API version history.

---

**Need help?** Contact us at api@launchonlos.fun

