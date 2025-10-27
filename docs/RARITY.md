# 🎲 Los Bros Rarity System

## Overview

Los Bros NFTs feature a sophisticated rarity system based on trait frequency analysis across the entire 2,222-NFT collection. Each NFT receives a **Rarity Score** and **Tier** based on how rare its trait combination is.

---

## 📊 How Rarity is Calculated

### **1. Trait Frequency Analysis**

Each trait's rarity is determined by how often it appears in the collection:

```
Trait Rarity = 1 / (Trait Count / Total NFTs)
```

**Example:**
- If "Laser Blue" eyes appear in 50 out of 2,222 NFTs (2.25%), the rarity contribution is:
  ```
  1 / 0.0225 = 44.44 points
  ```

### **2. NFT Rarity Score**

An NFT's total rarity score is the **sum of all trait rarities**:

```
NFT Rarity Score = Σ (Trait Rarity) for all 6 traits
```

**Example Calculation:**
```
Los Bros #1086 (Rarest in Collection)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Background: space galaxy    (325/2222 = 14.63%) → 6.84
Body: zombie                (346/2222 = 15.57%) → 6.42
Clothes: shirt henley       (25/2222 = 1.13%)   → 88.88
Mouth: smile cute           (217/2222 = 9.77%)  → 10.24
Eyes: sleepy droopy         (46/2222 = 2.07%)   → 48.30
Hat: wig brown              (41/2222 = 1.85%)   → 54.20

TOTAL RARITY SCORE: 214.88
RANK: #1 (LEGENDARY)
```

---

## 🏆 Rarity Tiers

NFTs are ranked by rarity score and assigned to tiers:

| Tier | Percentile | Count | Rarity Score Range | Description |
|------|------------|-------|-------------------|-------------|
| 🏆 **LEGENDARY** | Top 5% | 112 NFTs | 180+ | Ultra-rare combinations with multiple legendary traits |
| 💎 **MYTHIC** | Top 5-15% | 222 NFTs | 160-180 | Very rare, several epic traits |
| ⚔️ **EPIC** | Top 15-30% | 333 NFTs | 140-160 | Rare trait combinations |
| 🌟 **RARE** | Top 30-60% | 667 NFTs | 120-140 | Uncommon, some rare traits |
| ⭐ **COMMON** | Bottom 40% | 888 NFTs | <120 | Standard trait combinations |

---

## 💎 Rarest Traits by Category

Based on the full 2,222-NFT collection:

### **Background** (6 traits)
| Trait | Count | Frequency | Rarity Score |
|-------|-------|-----------|--------------|
| space galaxy | 325 | 14.63% | 6.84 |
| sunset orange | 355 | 15.98% | 6.26 |
| gradient purple | 362 | 16.29% | 6.14 |
| analos | 385 | 17.32% | 5.77 |
| baige | 392 | 17.64% | 5.67 |
| solid blue | 403 | 18.14% | 5.51 |

### **Body** (6 traits)
| Trait | Count | Frequency | Rarity Score |
|-------|-------|-----------|--------------|
| zombie | 346 | 15.57% | 6.42 |
| robot | 351 | 15.80% | 6.33 |
| gold | 358 | 16.11% | 6.21 |
| analos | 382 | 17.19% | 5.82 |
| brown | 389 | 17.51% | 5.71 |
| baige | 396 | 17.82% | 5.61 |

### **Clothes** (61 traits)
| Trait | Count | Frequency | Rarity Score |
|-------|-------|-----------|--------------|
| **shirt henley** | 25 | 1.13% | **88.88** ⭐ |
| polk a dot | 28 | 1.26% | 79.36 |
| tie dye tee | 29 | 1.31% | 76.62 |
| neon stripe | 31 | 1.39% | 71.68 |
| heart anal | 32 | 1.44% | 69.44 |

*Full trait rarity table available in [TRAIT_RARITY.md](TRAIT_RARITY.md)*

### **Mouth** (9 traits)
| Trait | Count | Frequency | Rarity Score |
|-------|-------|-----------|--------------|
| smile cute | 217 | 9.77% | 10.24 |
| neutral line | 228 | 10.26% | 9.74 |
| frown disappointed | 239 | 10.76% | 9.30 |
| smile teeth | 243 | 10.94% | 9.14 |
| frown angry | 251 | 11.30% | 8.85 |

### **Eyes** (34 traits)
| Trait | Count | Frequency | Rarity Score |
|-------|-------|-----------|--------------|
| **sleepy droopy** | 46 | 2.07% | **48.30** ⭐ |
| laser yellow | 47 | 2.12% | 47.28 |
| sleepy yawn | 49 | 2.21% | 45.35 |
| glowing pink | 52 | 2.34% | 42.73 |
| angry fire | 53 | 2.39% | 41.92 |

### **Hat** (44 traits)
| Trait | Count | Frequency | Rarity Score |
|-------|-------|-----------|--------------|
| **wig brown** | 41 | 1.85% | **54.20** ⭐ |
| crown wooden | 42 | 1.89% | 52.90 |
| helmet fire | 43 | 1.94% | 51.67 |
| sombrero classic | 44 | 1.98% | 50.50 |
| wig purple | 45 | 2.03% | 49.38 |

---

## 🏆 Top 10 Rarest Los Bros NFTs

| Rank | Token ID | Rarity Score | Tier | Notable Traits |
|------|----------|--------------|------|----------------|
| #1 | Los Bros #1086 | 197.38 | 🏆 LEGENDARY | shirt henley + sleepy droopy + wig brown |
| #2 | Los Bros #1889 | 197.29 | 🏆 LEGENDARY | polk a dot + laser yellow + crown wooden |
| #3 | Los Bros #1127 | 196.13 | 🏆 LEGENDARY | tie dye tee + glowing pink + helmet fire |
| #4 | Los Bros #819 | 194.37 | 🏆 LEGENDARY | neon stripe + angry fire + wig purple |
| #5 | Los Bros #1645 | 193.77 | 🏆 LEGENDARY | heart anal + sleepy yawn + sombrero classic |
| #6 | Los Bros #708 | 192.75 | 🏆 LEGENDARY | shirt henley + laser yellow + crown wooden |
| #7 | Los Bros #1562 | 192.55 | 🏆 LEGENDARY | polk a dot + sleepy droopy + helmet fire |
| #8 | Los Bros #2016 | 192.14 | 🏆 LEGENDARY | tie dye tee + glowing pink + wig brown |
| #9 | Los Bros #1524 | 191.67 | 🏆 LEGENDARY | neon stripe + angry fire + crown wooden |
| #10 | Los Bros #1317 | 191.48 | 🏆 LEGENDARY | heart anal + laser yellow + wig purple |

---

## 🎯 Rarity Hunting Tips

### **What Makes an NFT Rare?**

1. **Rare Traits** - Look for traits with <5% frequency
2. **Multiple Rare Traits** - Combining 2-3 rare traits = legendary
3. **Perfect Combinations** - Certain combos are aesthetically unique
4. **Special Categories** - Clothes & Hats have the most variety (highest rarity potential)

### **Collecting Strategy**

- **Focus on Clothes** - 61 options means highest rarity variance
- **Hunt Legendary Eyes** - Only ~2% frequency for rarest
- **Golden Combo** - Rare clothes + rare eyes + rare hat = top tier
- **Zombie/Robot Bodies** - Slightly rarer than other body types

---

## 🔍 Check Your NFT's Rarity

### **Method 1: View on Profile**
Visit `launchonlos.fun/profile` to see all your NFTs with rarity tiers.

### **Method 2: Use Rarity Explorer**
Coming soon: Full collection rarity explorer with filtering and sorting.

### **Method 3: Check JSON**
Your NFT's rarity data is in `los-bros-rarity-scores.json`:
```json
{
  "tokenId": 1086,
  "rarityScore": 197.38,
  "rank": 1,
  "tier": "LEGENDARY",
  "traitRarities": [...]
}
```

---

## 📈 Rarity Over Time

As more NFTs are minted, rarity scores may shift slightly. The system recalculates based on the full minted supply, ensuring fair and accurate rankings.

---

## 🎨 Visual Rarity Indicators

On the platform, rarity is indicated by:
- **Color Coding** - Gold (Legendary), Purple (Mythic), Blue (Epic), Green (Rare), Gray (Common)
- **Badges** - Tier badges on NFT cards
- **Sparkle Effects** - Animated effects for Legendary/Mythic NFTs
- **Border Glow** - Rarity-based border colors

---

## 💡 Technical Details

### **Rarity Calculation Algorithm**
```javascript
function calculateRarityScore(nft, collection) {
  let score = 0;
  
  for (const trait of nft.traits) {
    const traitCount = countTraitInCollection(trait, collection);
    const frequency = traitCount / collection.length;
    const rarityValue = 1 / frequency;
    score += rarityValue;
  }
  
  return score;
}
```

### **Tier Assignment**
```javascript
function assignTier(rank, totalNFTs) {
  const percentile = (rank / totalNFTs) * 100;
  
  if (percentile < 5) return 'LEGENDARY';
  if (percentile < 15) return 'MYTHIC';
  if (percentile < 30) return 'EPIC';
  if (percentile < 60) return 'RARE';
  return 'COMMON';
}
```

---

## 📚 Further Reading

- [Trait Distribution Analysis](TRAIT_DISTRIBUTION.md)
- [Collection Statistics](COLLECTION_STATS.md)
- [Rarity API Documentation](API.md#rarity-endpoints)

---

**Last Updated**: October 27, 2025  
**Collection Size**: 2,222 NFTs  
**Rarity System Version**: 1.0

