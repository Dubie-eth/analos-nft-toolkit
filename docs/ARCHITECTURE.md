# 🏗️ Analos NFT Launchpad - Architecture

Technical architecture and design documentation for developers.

---

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     ANALOS NFT LAUNCHPAD                     │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼────┐        ┌─────▼─────┐      ┌─────▼─────┐
   │ Frontend │        │  Backend  │      │ Blockchain│
   │ Next.js  │◄──────►│    API    │◄────►│  Analos   │
   └─────────┘        └───────────┘      └───────────┘
        │                   │                   │
   ┌────▼────┐        ┌─────▼─────┐      ┌─────▼─────┐
   │  Wallet │        │ Supabase  │      │   IPFS    │
   │ Adapter │        │ PostgreSQL│      │  Storage  │
   └─────────┘        └───────────┘      └───────────┘
```

---

## 🎯 Frontend Architecture

### **Technology Stack**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Hooks + Context
- **Wallet**: Solana Wallet Adapter

### **Key Components**

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (serverless functions)
│   │   ├── profile-nft/   # Profile NFT endpoints
│   │   ├── los-bros/      # Los Bros endpoints
│   │   ├── marketplace/   # Marketplace endpoints
│   │   └── oracle/        # Price oracle
│   ├── profile/           # Profile page
│   ├── collections/       # Collection pages
│   │   └── los-bros/      # Los Bros minting page
│   └── marketplace/       # Marketplace UI
│
├── components/            # React components
│   ├── SimpleProfileEditor.tsx      # Profile creation
│   ├── UnifiedNFTCard.tsx          # NFT display
│   ├── LosBrosRevealModal.tsx      # Reveal animation
│   ├── BuyNFTModal.tsx             # Marketplace buying
│   └── AdvancedNFTWizard.tsx       # Collection creator
│
├── lib/                   # Core libraries
│   ├── analos-profile-nft-service.ts  # Profile NFT minting
│   ├── los-bros-minting.ts            # Los Bros minting
│   ├── nft-transfer-service.ts        # NFT transfers
│   ├── escrow/                        # Escrow system
│   └── supabase/                      # Database client
│
└── config/               # Configuration
    ├── analos-programs.ts     # Program addresses
    ├── los-bros-pricing.ts    # Pricing logic
    └── mint-settings.ts       # Mint controls
```

---

## 🗄️ Database Architecture

### **Supabase Schema**

#### **blockchain_profiles**
```sql
CREATE TABLE blockchain_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  social_links JSONB,
  mint_number INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **profile_nfts**
```sql
CREATE TABLE profile_nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL,
  mint_address TEXT UNIQUE NOT NULL,
  
  -- Los Bros specific fields
  los_bros_token_id TEXT,
  los_bros_traits JSONB,
  los_bros_rarity TEXT,
  los_bros_rarity_score NUMERIC,
  los_bros_tier TEXT,
  image_url TEXT,
  
  -- Metadata
  nft_metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **profile_nft_rarity**
```sql
CREATE TABLE profile_nft_rarity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL,
  username TEXT NOT NULL,
  mint_address TEXT UNIQUE NOT NULL,
  matrix_variant TEXT,
  mint_number INTEGER,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

#### **marketplace_listings**
```sql
CREATE TABLE marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_wallet TEXT NOT NULL,
  nft_mint TEXT UNIQUE NOT NULL,
  price_los NUMERIC NOT NULL,
  collection_type TEXT,
  escrow_account TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sold_at TIMESTAMPTZ
);
```

### **Sequences**
```sql
-- Atomic mint number generation
CREATE SEQUENCE profile_nft_mint_seq START WITH 1;
```

### **Row-Level Security (RLS)**

All tables have RLS policies:
```sql
-- Users can only read their own profiles
CREATE POLICY "Users can view own profile"
  ON blockchain_profiles FOR SELECT
  USING (wallet_address = current_user_wallet());

-- Anyone can view NFT listings
CREATE POLICY "Public listings read"
  ON marketplace_listings FOR SELECT
  TO public USING (status = 'active');
```

---

## ⛓️ Blockchain Architecture

### **Smart Contracts (Rust/Anchor)**

#### **NFT Escrow Program**
```
programs/nft-escrow/
├── src/
│   ├── lib.rs              # Program entry
│   ├── instructions/       # Transaction handlers
│   │   ├── list.rs         # List NFT for sale
│   │   ├── buy.rs          # Buy listed NFT
│   │   ├── cancel.rs       # Cancel listing
│   │   └── update_price.rs # Update listing price
│   └── state/
│       └── escrow.rs       # Escrow account structure
```

**Key Instructions:**
```rust
// List NFT for sale
pub fn list_nft(
    ctx: Context<ListNFT>,
    price_los: u64
) -> Result<()>

// Buy NFT from escrow
pub fn buy_nft(
    ctx: Context<BuyNFT>
) -> Result<()>
```

---

## 🔄 NFT Minting Flow

### **Profile NFT Minting**

```
1. User fills profile form
   └─> Frontend validation
       ├─> Username uniqueness check (API)
       ├─> Image uploads (IPFS API)
       └─> Cost calculation (pricing service)

2. User confirms mint
   └─> Payment transaction (LOS)
       ├─> Transfer to platform wallet
       └─> Wait for confirmation

3. Backend mints NFT
   └─> Generate metadata (Matrix variant, rarity)
       ├─> Upload to Arweave (permanent)
       ├─> Create Token-2022 mint
       ├─> Mint NFT to user's wallet
       └─> Store in database

4. Post-mint actions
   └─> Store rarity data
       ├─> Update blockchain_profiles
       ├─> Update profile_nft_rarity
       └─> Return mint address & metadata
```

### **Los Bros Minting**

```
1. Eligibility check
   └─> Check requirements
       ├─> Has Profile NFT?
       ├─> $LOL balance check
       ├─> Tier calculation
       └─> Mint limit check

2. User confirms mint
   └─> Payment transaction
       ├─> Calculate price based on tier
       ├─> Transfer LOS to platform
       └─> Wait for confirmation

3. Backend generates NFT
   └─> Random trait generation
       ├─> Select 6 traits (Background, Body, etc.)
       ├─> Generate composite image
       ├─> Upload to IPFS
       └─> Calculate rarity score

4. Mint NFT
   └─> Create Token-2022 mint
       ├─> Upload metadata to Arweave
       ├─> Mint to user's wallet
       └─> Store in database

5. Reveal animation
   └─> Show traits one by one
       ├─> Display rarity tier
       ├─> Show final composite
       └─> Offer social share
```

---

## 🖼️ Image Generation Pipeline

### **Profile NFTs**
```
SVG Generation → Data URL → Metadata JSON → Arweave
```

### **Los Bros NFTs**

**Server-Side (Node.js Canvas)**
```javascript
const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');

// Load trait images in order
for (const trait of traits) {
  const img = await loadImage(traitPath);
  
  // Draw centered, no stretching
  const x = (512 - img.width) / 2;
  const y = (512 - img.height) / 2;
  ctx.drawImage(img, x, y);
}

// Convert to PNG
const buffer = canvas.toBuffer('image/png');
```

**Client-Side (Browser Canvas)**
```javascript
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;

// Layer trait images
traits.forEach(trait => {
  const img = new Image();
  img.onload = () => {
    const x = (512 - img.width) / 2;
    const y = (512 - img.height) / 2;
    ctx.drawImage(img, x, y);
  };
  img.src = traitImageUrl;
});
```

---

## 📡 API Architecture

### **API Routes Structure**

```
/api/
├── profile-nft/
│   ├── mint              # POST: Mint Profile NFT
│   ├── check-existing    # GET: Check if user has NFT
│   ├── store-rarity      # POST: Store rarity data
│   └── mint-counter      # GET: Get next mint number
│
├── los-bros/
│   ├── check-eligibility # GET: Check if user can mint
│   ├── mint             # POST: Mint Los Bros NFT
│   ├── composite-image  # GET: Generate composite image
│   ├── record-mint      # POST: Record mint in database
│   └── all-nfts         # GET: Fetch all Los Bros NFTs
│
├── marketplace/
│   ├── list             # POST: List NFT for sale
│   ├── buy              # POST: Buy NFT
│   ├── cancel           # POST: Cancel listing
│   └── listings         # GET: Get active listings
│
├── user-nfts            # GET: Get user's NFT collection
│
└── blockchain-profiles/
    └── [wallet]         # GET: Get profile by wallet
```

### **API Response Format**

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error description",
  "details": "Additional context"
}
```

---

## 🔐 Security Architecture

### **Authentication**
- **Wallet Signatures** - Cryptographic verification
- **Challenge-Response** - Time-limited challenges
- **Admin Routes** - Signature-based admin verification

### **Database Security**
- **Row-Level Security (RLS)** - User data isolation
- **Prepared Statements** - SQL injection prevention
- **Environment Variables** - Sensitive data protection

### **Smart Contract Security**
- **Integer Overflow Protection** - checked_mul, checked_add
- **PDA Verification** - Proper account validation
- **Authority Checks** - Only authorized wallets

---

## 🚀 Deployment Architecture

### **Vercel Deployment**
```
GitHub Push
    └─> Webhook trigger
        └─> Vercel build
            ├─> Install dependencies
            ├─> Build Next.js app
            ├─> Deploy to edge network
            └─> Update production URL
```

### **Environment Variables**
```env
# Blockchain
NEXT_PUBLIC_RPC_URL=https://rpc.analos.io
NEXT_PUBLIC_NETWORK=analos-mainnet

# Database
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Storage
PINATA_API_KEY=xxx
PINATA_SECRET_KEY=xxx
BUNDLR_PRIVATE_KEY=xxx

# Platform
NEXT_PUBLIC_PLATFORM_WALLET=xxx
NEXT_PUBLIC_ADMIN_WALLETS=["xxx","yyy"]
```

---

## 🎨 NFT Generation System

### **Trait System**
```typescript
interface Trait {
  id: string;
  name: string;
  image: string;      // Data URL or file path
  rarity: number;     // 1-100 (100 = most rare)
  rarityWeight: number; // Selection probability
}

interface Layer {
  id: string;
  name: string;
  order: number;      // Stacking order (1 = bottom)
  visible: boolean;
  traits: Trait[];
}
```

### **Generation Process**
1. **Load Layers** - Read trait images from filesystem
2. **Random Selection** - Weighted random for each layer
3. **Uniqueness Check** - Ensure no duplicate combinations
4. **Composite Generation** - Layer images using Canvas API
5. **Upload to IPFS** - Permanent storage
6. **Rarity Calculation** - Score based on trait frequency

---

## 🔄 Transaction Flow

### **Token-2022 NFT Mint**
```typescript
// 1. Create mint account
const mintAccount = await createMint(
  connection,
  payer,
  mintAuthority,
  freezeAuthority,
  decimals: 0  // NFT = 0 decimals
);

// 2. Create associated token account
const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAccount,
  owner
);

// 3. Mint single NFT
await mintTo(
  connection,
  payer,
  mintAccount,
  tokenAccount.address,
  mintAuthority,
  1  // Mint 1 NFT
);
```

### **Escrow Trading**
```typescript
// 1. List NFT
const escrowPDA = PublicKey.findProgramAddressSync(
  [nftMint.toBuffer(), seller.toBuffer()],
  ESCROW_PROGRAM_ID
);

await program.methods.listNFT(priceLos)
  .accounts({ escrow: escrowPDA, ... })
  .rpc();

// 2. Buy NFT
await program.methods.buyNFT()
  .accounts({ escrow: escrowPDA, ... })
  .rpc();
```

---

## 📦 Data Flow

### **NFT Metadata Structure**
```json
{
  "name": "Los Bros #1086",
  "symbol": "LOSBROS",
  "description": "Los Bros #1086 - LEGENDARY rarity PFP",
  "image": "https://gateway.pinata.cloud/ipfs/bafkreixxx",
  "external_url": "https://www.launchonlos.fun/collections/los-bros",
  "attributes": [
    { "trait_type": "Background", "value": "space galaxy" },
    { "trait_type": "Body", "value": "zombie" },
    { "trait_type": "Clothes", "value": "shirt henley" },
    { "trait_type": "Mouth", "value": "smile cute" },
    { "trait_type": "Eyes", "value": "sleepy droopy" },
    { "trait_type": "Hat", "value": "wig brown" }
  ],
  "properties": {
    "files": [{ "uri": "ipfs://...", "type": "image/png" }],
    "category": "image",
    "creators": [{ "address": "xxx", "share": 100 }]
  },
  "collection": {
    "name": "Los Bros",
    "family": "Analos NFTs"
  }
}
```

---

## 🔌 External Integrations

### **IPFS (Pinata)**
```typescript
// Upload file
const form = new FormData();
form.append('file', imageBuffer);

const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
  headers: {
    'pinata_api_key': API_KEY,
    'pinata_secret_api_key': SECRET_KEY
  },
  body: form
});

const { IpfsHash } = await response.json();
const url = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
```

### **Arweave (Bundlr)**
```typescript
// Upload JSON metadata
const bundlr = new Bundlr(
  ARWEAVE_NODE,
  CURRENCY,
  PRIVATE_KEY
);

const response = await bundlr.upload(
  JSON.stringify(metadata),
  { tags: [{ name: 'Content-Type', value: 'application/json' }] }
);

const url = `https://arweave.net/${response.id}`;
```

---

## 🎯 Performance Optimizations

### **Frontend**
- ✅ **Image Lazy Loading** - Load images on scroll
- ✅ **Component Code Splitting** - Reduce initial bundle
- ✅ **API Response Caching** - Cache NFT data
- ✅ **Optimistic UI Updates** - Instant feedback

### **Backend**
- ✅ **Database Indexing** - Fast queries on wallet_address, token_id
- ✅ **Connection Pooling** - Reuse database connections
- ✅ **Lazy Loading** - Load Supabase client on demand
- ✅ **Batch Processing** - Process multiple operations together

### **Blockchain**
- ✅ **Transaction Batching** - Combine multiple instructions
- ✅ **skipPreflight: true** - Faster transaction processing
- ✅ **HTTP Polling** - Efficient confirmation checking
- ✅ **finalized Commitment** - Latest blockhash

---

## 🔍 Monitoring & Logging

### **Frontend Logging**
```typescript
console.log('🚀 Starting mint process...');
console.log('✅ Transaction confirmed:', signature);
console.error('❌ Mint failed:', error);
```

### **Backend Logging**
```typescript
console.log(`📤 Uploading to IPFS...`);
console.log(`✅ Uploaded: ${ipfsUrl}`);
console.error(`❌ Upload failed:`, error);
```

### **Database Logging**
- Automatic timestamps on all records
- Transaction history tracking
- Error logging in application

---

## 🔧 Development Tools

### **Scripts**
```bash
# Generate Los Bros collection
node scripts/generate-all-los-bros-smart.js

# Calculate rarity scores
node scripts/calculate-rarity-scores.js

# Fix minted NFT images
node scripts/fix-minted-nfts.js

# Check generation progress
node scripts/check-progress.js
```

### **Utilities**
- **view-generated-nfts.html** - Preview generated NFTs
- **public/backfill-images.html** - Client-side image backfill
- **SQL migrations** - Database schema updates

---

## 📈 Scalability

### **Current Capacity**
- **NFT Storage**: IPFS (unlimited)
- **Database**: Supabase (100GB free tier)
- **API**: Vercel serverless (unlimited scaling)
- **Blockchain**: Analos (high TPS)

### **Scaling Considerations**
- Database sharding for millions of NFTs
- CDN for trait image distribution
- Redis caching for frequently accessed data
- Multiple IPFS gateways for redundancy

---

## 🧪 Testing

### **Unit Tests**
```bash
npm run test
```

### **Integration Tests**
```bash
npm run test:integration
```

### **E2E Tests**
```bash
npm run test:e2e
```

---

## 🚦 CI/CD Pipeline

```
GitHub Push
    └─> Pre-commit Hooks
        ├─> Security checks
        ├─> Linting (ESLint)
        ├─> Type checking (TypeScript)
        └─> Tests
            └─> Vercel Deploy
                ├─> Build Next.js
                ├─> Run migrations
                ├─> Deploy to production
                └─> Invalidate CDN cache
```

---

## 📚 Additional Resources

- [API Documentation](API.md)
- [Database Schema](DATABASE.md)
- [Smart Contract Guide](CONTRACTS.md)
- [Deployment Guide](DEPLOYMENT.md)

---

**Built with ❤️ for the Analos community**

