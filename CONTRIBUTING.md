# Contributing to Typography Component

Thank you for your interest in contributing to the Typography Component! We welcome contributions from the community.

## 📋 Prerequisites

Before contributing, please ensure you have:

- Node.js >= 18.0.0
- pnpm >= 9.0.0
- Git installed
- A GitHub account

## 🚀 Getting Started

1. **Fork the Repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/typography.git
   cd typography
   ```

3. **Install Dependencies**
   ```bash
   pnpm install
   ```

4. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Start Development**
   ```bash
   pnpm dev  # Watch mode for library
   pnpm demo # Run demo application
   ```

## 📝 Development Workflow

### Code Style

We use Biome for linting and formatting. Before committing:

```bash
# Check for issues
pnpm check

# Auto-fix issues
pnpm fix
```

### TypeScript

- Enable strict mode in your IDE
- Add proper type definitions for all exports
- Avoid using `any` type
- Use proper generics where applicable

### Testing

Test your changes in the demo application:

```bash
pnpm demo
```

Make sure to test:
- All block types work correctly
- Keyboard navigation
- Markdown import/export
- Different configuration options
- Read-only mode

### Commit Messages

Use clear and descriptive commit messages:

```
feat: add new block type for tables
fix: resolve cursor jumping in Safari
docs: update API documentation
style: format code with Biome
refactor: optimize re-render performance
test: add tests for markdown parser
chore: update dependencies
```

## 🐛 Reporting Issues

### Before Submitting an Issue

1. Search existing issues to avoid duplicates
2. Try to reproduce in the latest version
3. Check if it's already fixed in the main branch

### Issue Template

```markdown
## Description
Brief description of the issue

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 20.13.1]
- Package version: [e.g., 0.0.1]

## Additional Context
Any other relevant information
```

## 🎯 Pull Request Process

1. **Update Documentation**
   - Update README.md if needed
   - Add JSDoc comments for new functions
   - Update TypeScript definitions

2. **Ensure Quality**
   ```bash
   # Run all checks
   pnpm check

   # Build the library
   pnpm build
   ```

3. **Create Pull Request**
   - Use a clear PR title
   - Reference any related issues
   - Describe what changes were made
   - Include screenshots if UI changes

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in demo application
- [ ] Tested keyboard navigation
- [ ] Tested with different configs
- [ ] Tested in multiple browsers

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Updated documentation
- [ ] No TypeScript errors
- [ ] All checks pass
```

## 🏗️ Project Structure

```
typography/
├── src/
│   ├── components/      # React components
│   │   ├── Typography.tsx
│   │   ├── Typography.css
│   │   └── TypographyBlock.tsx
│   ├── hooks/           # Custom hooks
│   │   └── useTypography.ts
│   ├── utils/           # Utilities
│   │   └── markdown.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   └── index.ts        # Main export
├── demo/               # Demo application
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── i18n.ts
│   └── vite.config.mjs
├── tsconfig.json       # TypeScript config
├── biome.json         # Biome config
├── tsup.config.ts     # Build config
└── package.json
```

## 💡 Areas for Contribution

We're especially interested in:

- **New Features**
  - Additional block types
  - Drag and drop support
  - Undo/redo functionality
  - Mobile optimization

- **Performance**
  - Reduce re-renders
  - Optimize large documents
  - Improve initial load time

- **Accessibility**
  - Screen reader support
  - Keyboard navigation improvements
  - ARIA attributes

- **Documentation**
  - More examples
  - Video tutorials
  - API documentation

- **Testing**
  - Unit tests
  - Integration tests
  - E2E tests

## 🤝 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other unprofessional conduct

## 📞 Getting Help

- **Discord**: Join our community server
- **GitHub Discussions**: Ask questions
- **Issues**: Report bugs
- **Email**: maintainer@example.com

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Typography Component! 🎉