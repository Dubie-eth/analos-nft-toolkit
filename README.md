# 🚀 Analos NFT Toolkit

> Open-source tools, utilities, and examples for building NFT projects on the Analos blockchain

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Analos](https://img.shields.io/badge/Blockchain-Analos-orange)](https://analos.io)
[![Live Demo](https://img.shields.io/badge/Live-launchonlos.fun-purple)](https://www.launchonlos.fun)

---

## 🌟 What is This?

The **Analos NFT Toolkit** is a comprehensive collection of open-source tools, scripts, and examples for building NFT projects on the Analos blockchain. Whether you're launching a profile NFT collection, a generative art project, or a full NFT marketplace, this toolkit provides battle-tested utilities to accelerate your development.

**Built from real production experience** powering [Launch on LOS](https://www.launchonlos.fun) - a complete NFT launchpad with:
- ✅ 2,222 generative NFT collection (Los Bros)
- ✅ Profile NFT system with dynamic rarity
- ✅ Full NFT marketplace with escrow
- ✅ Token-gated minting with tiered pricing
- ✅ Complete rarity calculation system

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/Dubie-eth/analos-nft-toolkit.git
cd analos-nft-toolkit

# Install dependencies
npm install

# Try the NFT generator
cd scripts/nft-generation
node generate-collection.js

# Calculate rarity scores
node calculate-rarity.js
```

---

## 🛠️ What's Included

### **📦 NFT Generation Tools**
- **Collection Generator** - Create up to 10,000 unique NFTs from trait layers
- **Rarity Calculator** - Score and rank NFTs by trait frequency
- **Metadata Builder** - Generate Metaplex-compatible JSON metadata
- **Batch Processor** - Process large collections efficiently

### **☁️ Storage & Upload**
- **IPFS Uploader** - Pinata integration for decentralized storage
- **Arweave Uploader** - Permanent storage for metadata
- **Batch Upload** - Upload thousands of files efficiently
- **URL Generator** - Generate IPFS gateway URLs

### **🗄️ Database Utilities**
- **Supabase Schema** - Complete database schema for NFT projects
- **Migration Scripts** - Safe database updates
- **RLS Policies** - Row-level security templates
- **Seed Data** - Sample data for testing

### **⛓️ Blockchain Helpers**
- **Signature Verification** - Verify wallet signatures server-side
- **Token-2022 Helpers** - Work with enhanced SPL tokens
- **Transaction Utilities** - Build and send transactions
- **PDA Calculators** - Program derived address helpers

### **🎨 Smart Contracts**
- **NFT Escrow** - Secure NFT trading with escrow (Anchor/Rust)
- **Price Oracle** - Dynamic pricing for collections
- **Token Gating** - Control access by token holdings

### **💻 Code Examples**
- Profile NFT minting flow
- Collection launch walkthrough  
- Marketplace integration
- Wallet connection setup
- Dynamic pricing implementation

---

## 📚 Documentation

- [Getting Started Guide](docs/GETTING_STARTED.md) - Your first NFT project
- [API Reference](docs/API_REFERENCE.md) - Complete API documentation
- [Architecture Overview](docs/ARCHITECTURE.md) - How it all works
- [Rarity System](docs/RARITY_SYSTEM.md) - Understanding NFT rarity
- [Fee Structure](docs/FEE_STRUCTURE.md) - Sustainable platform economics
- [Deployment Guide](docs/DEPLOYMENT.md) - Deploy to production
- [FAQ](docs/FAQ.md) - Common questions

---

## 🎯 Use Cases

### **Launch a Profile NFT Collection**
Create unique profile cards for your community with social links, custom designs, and rarity tiers.

```javascript
// Example: Mint a profile NFT
import { mintProfileNFT } from 'analos-nft-toolkit';

const nft = await mintProfileNFT({
  username: 'myusername',
  avatar: 'https://...',
  socialLinks: {
    twitter: '@mytwitter',
    discord: 'myuser#1234'
  },
  matrixVariant: 'gold' // Rarity tier
});
```

### **Generate a 10K PFP Collection**
Build a generative NFT collection with trait-based rarity.

```bash
# 1. Organize traits in folders
mkdir -p traits/{background,body,clothes,eyes,mouth,hat}

# 2. Generate collection
node scripts/nft-generation/generate-collection.js \
  --size 10000 \
  --traits ./traits

# 3. Calculate rarity
node scripts/nft-generation/calculate-rarity.js \
  --input ./output/collection.json

# 4. Upload to IPFS
node scripts/ipfs-tools/batch-upload.js \
  --directory ./output/images
```

### **Build an NFT Marketplace**
Integrate secure NFT trading with escrow.

```javascript
// Example: List NFT for sale
import { createListing } from 'analos-nft-toolkit';

await createListing({
  nftMint: 'xxx...xxx',
  price: 100, // LOS tokens
  seller: wallet.publicKey
});
```

---

## 🏗️ Architecture

The toolkit follows a modular architecture:

```
┌─────────────────────────────────────────┐
│         Your NFT Application            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Analos NFT Toolkit (This Repo)    │
│  ┌────────────┐  ┌─────────────────┐   │
│  │   Tools    │  │    Examples     │   │
│  └────────────┘  └─────────────────┘   │
│  ┌────────────┐  ┌─────────────────┐   │
│  │  Contracts │  │   Utilities     │   │
│  └────────────┘  └─────────────────┘   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Analos Blockchain               │
│  (Solana Fork with Custom Features)    │
└─────────────────────────────────────────┘
```

---

## 🚀 Featured Projects

Built with this toolkit:

- **[Launch on LOS](https://www.launchonlos.fun)** - Complete NFT launchpad
  - Profile NFTs with social integration
  - Los Bros 2,222 collection with 6 trait categories
  - Full marketplace with escrow
  - Token-gated minting

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-tool`
3. **Commit your changes**: `git commit -m 'Add amazing tool'`
4. **Push to branch**: `git push origin feature/amazing-tool`
5. **Open a Pull Request**

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📊 Tools Reference

### **NFT Generation**

| Tool | Description | Usage |
|------|-------------|-------|
| `generate-collection.js` | Create NFT collection from traits | `node generate-collection.js --size 10000` |
| `calculate-rarity.js` | Score NFTs by trait frequency | `node calculate-rarity.js --input collection.json` |
| `fix-minted-nfts.js` | Update existing NFT metadata | `node fix-minted-nfts.js --start 1 --end 100` |

### **IPFS/Storage**

| Tool | Description | Usage |
|------|-------------|-------|
| `upload-to-pinata.js` | Upload to IPFS via Pinata | `node upload-to-pinata.js --file image.png` |
| `upload-to-arweave.js` | Permanent Arweave storage | `node upload-to-arweave.js --json metadata.json` |
| `batch-upload.js` | Upload multiple files | `node batch-upload.js --directory ./images` |

### **Database**

| Tool | Description | Usage |
|------|-------------|-------|
| `001_initial_schema.sql` | Create NFT database tables | Run in Supabase SQL editor |
| `002_rls_policies.sql` | Add row-level security | Run in Supabase SQL editor |
| `backfill-rarity.sql` | Update rarity scores | Run in Supabase SQL editor |

---

## 🔐 Security

- ✅ **No Private Keys** - All examples use environment variables
- ✅ **Signature Verification** - Server-side wallet verification
- ✅ **RLS Policies** - Database-level security
- ✅ **Rate Limiting** - Prevent abuse
- ✅ **Input Validation** - Sanitize all inputs

### **Report Security Vulnerabilities**

**Responsible Disclosure:**
- 📧 **Email**: support@launchonlos.fun
- 🐦 **Twitter**: [@EWildn](https://twitter.com/EWildn)
- 📱 **Telegram**: [t.me/Dubie_420](https://t.me/Dubie_420)

**Response Time:** Within 24 hours  
**Full Policy**: [SECURITY.md](SECURITY.md)

---

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

You're free to:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Private use

**Attribution appreciated but not required!**

---

## 🌐 Links

- **Website**: [launchonlos.fun](https://www.launchonlos.fun)
- **Explorer**: [explorer.analos.io](https://explorer.analos.io)
- **DEX**: [dex.analos.io](https://dex.analos.io)
- **Discord**: [Join Community](https://discord.gg/analos)
- **Twitter**: [@LaunchOnLOS](https://twitter.com/LaunchOnLOS)

---

## 💬 Community & Support

- 💬 **Discord**: Get help from the community
- 🐦 **Twitter**: Follow for updates
- 📧 **Email**: hello@launchonlos.fun
- 🐛 **Issues**: Report bugs or request features

---

## 🙏 Acknowledgments

Built with:
- **Solana/Analos** - Blockchain infrastructure
- **Metaplex** - NFT standards
- **Next.js** - Web framework
- **Supabase** - Database & auth
- **IPFS/Arweave** - Decentralized storage

Special thanks to the Analos community for feedback and contributions!

---

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/Dubie-eth/analos-nft-toolkit)
![GitHub forks](https://img.shields.io/github/forks/Dubie-eth/analos-nft-toolkit)
![GitHub issues](https://img.shields.io/github/issues/Dubie-eth/analos-nft-toolkit)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Dubie-eth/analos-nft-toolkit)

---

<div align="center">

**Built with ❤️ for the Analos ecosystem**

[⭐ Star this repo](https://github.com/Dubie-eth/analos-nft-toolkit) | [🐛 Report Bug](https://github.com/Dubie-eth/analos-nft-toolkit/issues) | [💡 Request Feature](https://github.com/Dubie-eth/analos-nft-toolkit/issues)

</div>

