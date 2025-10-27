# 🤝 Contributing to Analos NFT Toolkit

First off, thank you for considering contributing to the Analos NFT Toolkit! It's people like you that make this a great resource for the entire Analos ecosystem.

---

## 🎯 How Can I Contribute?

### **1. Report Bugs** 🐛

Found a bug? Help us fix it!

**Before submitting:**
- Check if the bug has already been reported in [Issues](https://github.com/Dubie-eth/analos-nft-toolkit/issues)
- Try to reproduce the bug with the latest version

**When reporting:**
- Use a clear, descriptive title
- Describe exact steps to reproduce
- Provide error messages/screenshots
- Include your environment (OS, Node version, etc.)

### **2. Suggest Features** 💡

Have an idea for a new tool or improvement?

- Open an issue with the `enhancement` label
- Describe the feature and why it would be useful
- Provide examples if possible

### **3. Submit Code** 💻

Want to add a tool, fix a bug, or improve documentation?

**Great contributions we're looking for:**
- New NFT generation utilities
- Storage integrations (IPFS, Arweave, etc.)
- Blockchain helpers
- Code examples
- Documentation improvements
- Bug fixes

---

## 🔧 Development Setup

### **Prerequisites**
```bash
node >= 18.0.0
npm >= 9.0.0
git
```

### **Setup Steps**
```bash
# 1. Fork the repo on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/analos-nft-toolkit.git
cd analos-nft-toolkit

# 3. Add upstream remote
git remote add upstream https://github.com/Dubie-eth/analos-nft-toolkit.git

# 4. Install dependencies
npm install

# 5. Create a branch for your changes
git checkout -b feature/my-awesome-feature

# 6. Make your changes!

# 7. Test your changes
npm test

# 8. Commit with a descriptive message
git commit -m "feat: add awesome new tool"

# 9. Push to your fork
git push origin feature/my-awesome-feature

# 10. Open a Pull Request!
```

---

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### **Types**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### **Examples**
```bash
feat(generation): add trait weighting support
fix(rarity): correct calculation for empty traits
docs(readme): update installation instructions
chore(deps): update dependencies
```

---

## 🎨 Code Style

### **JavaScript/TypeScript**
- Use ES6+ features
- 2 spaces for indentation
- Semicolons required
- Single quotes for strings
- Descriptive variable names

```javascript
// Good
const nftMetadata = await generateMetadata(traits);

// Bad
var m = await generateMetadata(traits)
```

### **File Organization**
```
scripts/
├── category/
│   ├── tool-name.js        # Main script
│   ├── tool-name.test.js   # Tests
│   └── README.md           # Tool documentation
```

### **Documentation**
- Every tool needs a README
- Include usage examples
- Document parameters
- Add error handling notes

---

## ✅ Pull Request Process

### **Before Submitting**
- [ ] Code follows our style guidelines
- [ ] All tests pass (`npm test`)
- [ ] Added tests for new features
- [ ] Updated documentation
- [ ] No console.logs left in code
- [ ] Commit messages are descriptive

### **PR Description Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
How did you test these changes?

## Screenshots (if applicable)

## Related Issues
Fixes #123
```

### **Review Process**
1. Maintainer reviews code
2. Feedback is provided (if needed)
3. You update the PR
4. Once approved, it's merged!

**Please be patient** - we review PRs as quickly as possible, usually within 3-5 days.

---

## 🧪 Testing Guidelines

### **Writing Tests**
```javascript
// example.test.js
const { generateNFT } = require('./generate-nft');

describe('NFT Generation', () => {
  test('should generate valid metadata', () => {
    const nft = generateNFT({ name: 'Test' });
    expect(nft).toHaveProperty('name');
    expect(nft).toHaveProperty('image');
  });
  
  test('should handle missing traits', () => {
    expect(() => generateNFT({})).toThrow();
  });
});
```

### **Running Tests**
```bash
# Run all tests
npm test

# Run specific test
npm test -- generate-nft.test.js

# Run with coverage
npm test -- --coverage
```

---

## 📚 Documentation Standards

### **Tool README Template**
```markdown
# Tool Name

Brief description

## Usage

\`\`\`bash
node tool-name.js --param value
\`\`\`

## Parameters

- `--param1` - Description
- `--param2` - Description (optional)

## Examples

\`\`\`bash
# Example 1
node tool-name.js --size 10000

# Example 2
node tool-name.js --input data.json --output results/
\`\`\`

## Output

Description of what the tool produces

## Error Handling

Common errors and solutions
```

---

## 🎯 What Makes a Good Contribution?

### **Great Contributions**
✅ Solves a real problem  
✅ Well-documented  
✅ Includes examples  
✅ Has tests  
✅ Follows code style  
✅ Single, focused change

### **Not-So-Great Contributions**
❌ Multiple unrelated changes  
❌ No documentation  
❌ Breaks existing tests  
❌ Incomplete implementation  
❌ Copied code without attribution

---

## 🏆 Contribution Ideas

### **Easy (Good First Issues)**
- Fix typos in documentation
- Add more code examples
- Improve error messages
- Add missing JSDoc comments

### **Medium**
- Create new utility scripts
- Add test coverage
- Improve existing tools
- Write tutorials

### **Hard**
- New smart contracts
- Complex algorithms (rarity, etc.)
- Performance optimizations
- Architecture improvements

---

## 💬 Community

### **Getting Help**
- 📧 **Email**: support@launchonlos.fun
- 🐦 **Twitter**: [@EWildn](https://twitter.com/EWildn)
- 📱 **Telegram**: [t.me/Dubie_420](https://t.me/Dubie_420)
- 💬 **Discord**: [Join Community](https://discord.gg/analos)

### **Code of Conduct**
Please read our [Code of Conduct](CODE_OF_CONDUCT.md). Be respectful and constructive.

---

## 🙏 Recognition

Contributors will be:
- ✅ Listed in our README
- ✅ Mentioned in release notes
- ✅ Credited in commit history
- ✅ Eligible for contributor NFTs (when available!)

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## ❓ Questions?

Don't hesitate to ask!

- Open an issue with the `question` label
- Email: support@launchonlos.fun
- Twitter: [@EWildn](https://twitter.com/EWildn)
- Telegram: [t.me/Dubie_420](https://t.me/Dubie_420)

---

<div align="center">

**Thank you for contributing to the Analos ecosystem! 🚀**

[⬅️ Back to README](README.md)

</div>

