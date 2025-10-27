#!/usr/bin/env node

/**
 * Calculate Rarity Scores for Los Bros NFTs
 * 
 * Rarity is based on trait frequency across the entire collection
 * Formula: Rarity Score = Sum of (1 / trait_frequency) for all traits
 * 
 * Usage: node scripts/calculate-rarity-scores.js
 */

const fs = require('fs');
const path = require('path');

const RESULTS_FILE = path.join(__dirname, '../los-bros-smart-final-results.json');
const OUTPUT_FILE = path.join(__dirname, '../los-bros-rarity-scores.json');

console.log('🎲 Calculating Los Bros Rarity Scores...\n');

try {
  // Load generation results
  if (!fs.existsSync(RESULTS_FILE)) {
    console.error('❌ Results file not found. Generation may still be in progress.');
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
  const successful = results.filter(r => r.success && r.traits);
  
  console.log(`📊 Analyzing ${successful.length} Los Bros NFTs...\n`);

  // Step 1: Count trait frequencies
  const traitCounts = {};
  
  for (const nft of successful) {
    for (const [traitType, value] of Object.entries(nft.traits)) {
      if (!traitCounts[traitType]) {
        traitCounts[traitType] = {};
      }
      if (!traitCounts[traitType][value]) {
        traitCounts[traitType][value] = 0;
      }
      traitCounts[traitType][value]++;
    }
  }

  // Step 2: Calculate rarity scores for each NFT
  const nftsWithRarity = successful.map(nft => {
    let rarityScore = 0;
    const traitRarities = [];

    for (const [traitType, value] of Object.entries(nft.traits)) {
      const traitCount = traitCounts[traitType][value];
      const traitFrequency = traitCount / successful.length;
      const traitRarity = 1 / traitFrequency;
      
      rarityScore += traitRarity;
      traitRarities.push({
        trait_type: traitType,
        value: value,
        count: traitCount,
        frequency: (traitFrequency * 100).toFixed(2) + '%',
        rarity: traitRarity.toFixed(2)
      });
    }

    return {
      tokenId: nft.tokenId,
      imageUrl: nft.imageUrl,
      traits: nft.traits,
      traitRarities: traitRarities,
      rarityScore: parseFloat(rarityScore.toFixed(2)),
      isExisting: nft.isExisting || false
    };
  });

  // Step 3: Rank by rarity
  nftsWithRarity.sort((a, b) => b.rarityScore - a.rarityScore);
  
  // Add rank and tier
  nftsWithRarity.forEach((nft, index) => {
    nft.rank = index + 1;
    
    // Tier system (top 10% = Legendary, next 20% = Epic, next 30% = Rare, rest = Common)
    const percentile = (index / nftsWithRarity.length) * 100;
    if (percentile < 5) {
      nft.tier = 'LEGENDARY';
    } else if (percentile < 15) {
      nft.tier = 'MYTHIC';
    } else if (percentile < 30) {
      nft.tier = 'EPIC';
    } else if (percentile < 60) {
      nft.tier = 'RARE';
    } else {
      nft.tier = 'COMMON';
    }
  });

  // Step 4: Display statistics
  console.log('📈 RARITY DISTRIBUTION');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━');
  
  const tierCounts = {
    'LEGENDARY': nftsWithRarity.filter(n => n.tier === 'LEGENDARY').length,
    'MYTHIC': nftsWithRarity.filter(n => n.tier === 'MYTHIC').length,
    'EPIC': nftsWithRarity.filter(n => n.tier === 'EPIC').length,
    'RARE': nftsWithRarity.filter(n => n.tier === 'RARE').length,
    'COMMON': nftsWithRarity.filter(n => n.tier === 'COMMON').length
  };
  
  for (const [tier, count] of Object.entries(tierCounts)) {
    const percentage = (count / nftsWithRarity.length * 100).toFixed(1);
    console.log(`${tier.padEnd(12)} ${count.toString().padStart(4)} (${percentage}%)`);
  }
  
  console.log('\n🏆 TOP 10 RAREST LOS BROS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━');
  
  for (let i = 0; i < Math.min(10, nftsWithRarity.length); i++) {
    const nft = nftsWithRarity[i];
    console.log(`#${i + 1}  Los Bros #${nft.tokenId} - Score: ${nft.rarityScore} (${nft.tier})`);
  }
  
  console.log('\n💎 RAREST TRAITS BY CATEGORY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  for (const [traitType, traits] of Object.entries(traitCounts)) {
    const sorted = Object.entries(traits).sort((a, b) => a[1] - b[1]);
    const rarest = sorted[0];
    const percentage = (rarest[1] / successful.length * 100).toFixed(2);
    console.log(`${traitType.padEnd(15)} ${rarest[0]} (${rarest[1]} / ${percentage}%)`);
  }

  // Step 5: Save results
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(nftsWithRarity, null, 2));
  console.log(`\n✅ Rarity scores saved to: ${OUTPUT_FILE}`);
  
  // Step 6: Generate SQL update script
  const sqlFile = path.join(__dirname, '../UPDATE-RARITY-SCORES.sql');
  let sql = `-- Update Los Bros Rarity Scores
-- Generated: ${new Date().toISOString()}

BEGIN;

`;

  for (const nft of nftsWithRarity) {
    sql += `-- Los Bros #${nft.tokenId} - Rank #${nft.rank} - ${nft.tier}
UPDATE profile_nfts 
SET 
  los_bros_rarity = '${nft.tier}',
  los_bros_rarity_score = ${nft.rarityScore},
  los_bros_tier = '${nft.tier}',
  updated_at = NOW()
WHERE los_bros_token_id = '${nft.tokenId}';

`;
  }

  sql += `COMMIT;

-- Verify rarity distribution
SELECT 
  los_bros_tier as tier,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM profile_nfts WHERE los_bros_token_id IS NOT NULL), 1) as percentage
FROM profile_nfts
WHERE los_bros_token_id IS NOT NULL
GROUP BY los_bros_tier
ORDER BY 
  CASE los_bros_tier
    WHEN 'LEGENDARY' THEN 1
    WHEN 'MYTHIC' THEN 2
    WHEN 'EPIC' THEN 3
    WHEN 'RARE' THEN 4
    WHEN 'COMMON' THEN 5
  END;
`;

  fs.writeFileSync(sqlFile, sql);
  console.log(`✅ SQL update script saved to: ${sqlFile}`);
  
} catch (error) {
  console.error('❌ Error calculating rarity:', error);
  process.exit(1);
}

