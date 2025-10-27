# 🎨 NFT Generation Scripts

Tools for creating and managing generative NFT collections on Analos.

---

## 📦 Scripts Included

### **1. calculate-rarity-scores.js**

Calculate rarity scores for your entire NFT collection based on trait frequency.

**Features:**
- Analyzes trait distribution across collection
- Assigns rarity scores (higher = rarer)
- Ranks NFTs from rarest to most common
- Assigns tier labels (LEGENDARY, MYTHIC, EPIC, RARE, COMMON)
- Generates SQL update script

**Usage:**
```bash
node calculate-rarity-scores.js
```

**Input:**
- Expects `los-bros-smart-generation-results.json` in parent directory
- JSON format: Array of NFTs with `tokenId` and `traits`

**Output:**
- `los-bros-rarity-scores.json` - Full rarity data
- `UPDATE-RARITY-SCORES.sql` - Database update script
- Console: Rarity distribution and top 10 rarest NFTs

**Example Output:**
```
📈 RARITY DISTRIBUTION
━━━━━━━━━━━━━━━━━━━━━━━━
LEGENDARY     22 (1.0%)
MYTHIC       200 (9.0%)
EPIC         444 (20.0%)
RARE         667 (30.0%)
COMMON       889 (40.0%)

🏆 TOP 10 RAREST LOS BROS
━━━━━━━━━━━━━━━━━━━━━━━━
#1   Los Bros #1086  Score: 214.88  LEGENDARY
#2   Los Bros #1889  Score: 197.29  LEGENDARY
#3   Los Bros #1127  Score: 196.13  LEGENDARY
...
```

---

## 🎯 Rarity Calculation Algorithm

### **How It Works**

1. **Count Trait Frequencies**
   ```javascript
   For each trait:
     frequency = (trait count / total NFTs)
   ```

2. **Calculate Trait Rarity**
   ```javascript
   For each trait:
     rarity = 1 / frequency
   ```

3. **Sum NFT Rarity Score**
   ```javascript
   NFT score = sum of all trait rarities
   ```

4. **Rank & Assign Tiers**
   ```javascript
   Sort by score (highest = rarest)
   Assign tiers based on percentile
   ```

### **Tier Percentiles**

| Tier | Percentile | Description |
|------|------------|-------------|
| LEGENDARY | Top 1% | Ultra-rare combinations |
| MYTHIC | 1-10% | Very rare traits |
| EPIC | 10-30% | Rare combinations |
| RARE | 30-60% | Uncommon traits |
| COMMON | 60-100% | Standard combinations |

---

## 📊 Example NFT Data Format

### **Input Format**
```json
{
  "tokenId": 1086,
  "traits": [
    { "trait_type": "Background", "value": "space galaxy" },
    { "trait_type": "Body", "value": "zombie" },
    { "trait_type": "Clothes", "value": "shirt henley" },
    { "trait_type": "Mouth", "value": "smile cute" },
    { "trait_type": "Eyes", "value": "sleepy droopy" },
    { "trait_type": "Hat", "value": "wig brown" }
  ],
  "imageUrl": "https://gateway.pinata.cloud/ipfs/..."
}
```

### **Output Format**
```json
{
  "tokenId": 1086,
  "traits": [...],
  "rarityScore": 214.88,
  "rank": 1,
  "tier": "LEGENDARY",
  "percentile": 0.045,
  "traitRarities": [
    { "trait_type": "Background", "value": "space galaxy", "rarity": 6.84 },
    { "trait_type": "Body", "value": "zombie", "rarity": 6.42 },
    { "trait_type": "Clothes", "value": "shirt henley", "rarity": 88.88 },
    { "trait_type": "Mouth", "value": "smile cute", "rarity": 10.24 },
    { "trait_type": "Eyes", "value": "sleepy droopy", "rarity": 48.30 },
    { "trait_type": "Hat", "value": "wig brown", "rarity": 54.20 }
  ]
}
```

---

## 🔧 Customization

### **Change Tier Percentiles**

Edit the tier assignment logic:

```javascript
// In calculate-rarity-scores.js
nftsWithRarity.forEach((nft, index) => {
  const rank = index + 1;
  const percentile = (rank / totalNFTs) * 100;
  
  // Customize these percentiles
  if (percentile <= 1) {
    nft.tier = 'LEGENDARY';
  } else if (percentile <= 10) {
    nft.tier = 'MYTHIC';
  } else if (percentile <= 30) {
    nft.tier = 'EPIC';
  } else if (percentile <= 60) {
    nft.tier = 'RARE';
  } else {
    nft.tier = 'COMMON';
  }
});
```

### **Add Custom Traits**

The script automatically detects all trait types from your NFT data. Just ensure your JSON follows the Metaplex standard.

---

## 🚀 Integration with Your Project

### **1. Generate Your Collection**
```bash
# Your custom generator (not included, use your own)
node your-generator.js --output collection.json
```

### **2. Calculate Rarity**
```bash
# Use our calculator
node calculate-rarity-scores.js
```

### **3. Update Database**
```sql
-- Run the generated SQL
-- UPDATE-RARITY-SCORES.sql
```

### **4. Display in UI**
```javascript
// Fetch NFT with rarity
const nft = await fetchNFT(tokenId);
console.log(`Rarity: ${nft.tier} (#${nft.rank}/${totalSupply})`);
```

---

## 📈 Performance

- **Speed**: ~0.5 seconds per 1,000 NFTs
- **Memory**: <100MB for 10,000 NFT collection
- **Accuracy**: 100% deterministic

---

## 🐛 Troubleshooting

### **"Cannot find collection.json"**
Make sure your input file exists in the correct location.

### **"Trait frequency calculation failed"**
Check that all NFTs have the same trait categories.

### **"SQL generation failed"**
Verify your database table has the required columns:
- `los_bros_token_id`
- `los_bros_rarity_score`
- `los_bros_tier`
- `los_bros_rarity_rank`

---

## 💡 Tips

1. **Run on Full Collection** - Rarity is only accurate with complete data
2. **Consistent Trait Names** - Use same capitalization/spelling
3. **Test with Sample** - Try with 100 NFTs first
4. **Backup Database** - Before running SQL updates
5. **Verify Results** - Check a few NFTs manually

---

## 📚 Further Reading

- [Rarity System Documentation](../../docs/RARITY.md)
- [NFT Metadata Standards](https://docs.metaplex.com/programs/token-metadata/)
- [Analos Blockchain Docs](https://docs.analos.io)

---

**Questions?** Open an issue or ask on Discord!

