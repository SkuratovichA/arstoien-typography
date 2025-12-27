# Typography Component

A **Notion-like editable typography component** for React with Markdown support, minimal re-renders, and a smooth editing experience. Built with TypeScript and optimized for performance.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![React](https://img.shields.io/badge/React-18%2B-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Build](https://img.shields.io/badge/Build-Passing-green)

## ✨ Features

- 📝 **Notion-like Editing**: Intuitive block-based editing similar to Notion
- 🎯 **Markdown Support**: Import/export content as Markdown
- ⚡ **Optimized Performance**: Minimal re-renders for smooth editing
- 🎨 **Customizable Styles**: Configure colors, fonts, and sizes
- 📦 **Multiple Block Types**: Paragraphs, headings, lists, code blocks, quotes, and more
- ⌨️ **Keyboard Navigation**: Full keyboard support for efficient editing
- 🔒 **Read-only Mode**: Display content without editing capabilities
- 💪 **TypeScript Support**: Full type definitions included
- 🎯 **Zero Dependencies**: Lightweight with only essential peer dependencies

## 📦 Installation

```bash
# Using pnpm (recommended)
pnpm add typography

# Using npm
npm install typography

# Using yarn
yarn add typography
```

### Peer Dependencies

Make sure you have React installed:

```bash
pnpm add react react-dom
```

## 🚀 Quick Start

```tsx
import { Typography } from 'typography';
import 'typography/dist/index.css'; // Import styles

function App() {
  const blocks = [
    {
      id: '1',
      type: 'heading',
      level: 1,
      content: 'Welcome to Typography'
    },
    {
      id: '2',
      type: 'paragraph',
      content: 'Start editing by clicking on any block.'
    }
  ];

  return (
    <Typography
      blocks={blocks}
      config={{ editable: true }}
    />
  );
}
```

## 📖 API Documentation

### Typography Component

The main component for rendering and editing typography blocks.

#### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `blocks` | `TypographyBlock[]` | Array of content blocks | `[]` |
| `config` | `TypographyConfig` | Configuration object | `{}` |
| `className` | `string` | CSS class for container | `undefined` |
| `readOnly` | `boolean` | Disable editing | `false` |

### TypographyBlock Interface

```typescript
interface TypographyBlock {
  id: string;
  content: string;
  type: 'paragraph' | 'heading' | 'list' | 'code' | 'quote' | 'divider';
  styles?: TypographyStyle;
  markdown?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6; // for headings
  listType?: 'ordered' | 'unordered' | 'checklist';
  checked?: boolean;
  children?: TypographyBlock[];
}
```

### TypographyConfig Interface

```typescript
interface TypographyConfig {
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    text?: string;
    background?: string;
    highlight?: string;
  };
  fonts?: {
    body?: string;
    heading?: string;
    code?: string;
  };
  sizes?: {
    base?: string;
    small?: string;
    large?: string;
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  };
  editable?: boolean;
  placeholder?: string;
  onChange?: (blocks: TypographyBlock[]) => void;
  onSelectionChange?: (selection: Selection | null) => void;
  maxLength?: number;
  autoFocus?: boolean;
}
```

## 🎯 Usage Examples

### Basic Usage

```tsx
import { Typography } from 'typography';

function BasicExample() {
  const blocks = [
    { id: '1', type: 'heading', level: 1, content: 'My Document' },
    { id: '2', type: 'paragraph', content: 'This is a paragraph.' }
  ];

  return <Typography blocks={blocks} config={{ editable: true }} />;
}
```

### With State Management

```tsx
import { useState } from 'react';
import { Typography, TypographyBlock } from 'typography';

function EditableDocument() {
  const [blocks, setBlocks] = useState<TypographyBlock[]>([
    { id: '1', type: 'paragraph', content: 'Click to edit' }
  ]);

  return (
    <Typography
      blocks={blocks}
      config={{
        editable: true,
        onChange: (newBlocks) => setBlocks(newBlocks),
        placeholder: 'Start typing...'
      }}
    />
  );
}
```

### Markdown Import/Export

```tsx
import { Typography, markdownToBlocks, blocksToMarkdown } from 'typography';

function MarkdownEditor() {
  const markdown = `# Hello World

This is **bold** and this is *italic*.

- Item 1
- Item 2`;

  const blocks = markdownToBlocks(markdown);

  const handleExport = (blocks: TypographyBlock[]) => {
    const md = blocksToMarkdown(blocks);
    console.log('Exported markdown:', md);
  };

  return (
    <Typography
      blocks={blocks}
      config={{
        editable: true,
        onChange: handleExport
      }}
    />
  );
}
```

### Custom Styling

```tsx
import { Typography } from 'typography';

function CustomStyled() {
  return (
    <Typography
      blocks={blocks}
      config={{
        colors: {
          primary: '#8b5cf6',
          secondary: '#ec4899',
          accent: '#06b6d4',
          text: '#1f2937',
          background: '#f3f4f6',
          highlight: '#fef3c7'
        },
        fonts: {
          body: 'Georgia, serif',
          heading: 'Playfair Display, serif',
          code: 'Fira Code, monospace'
        }
      }}
    />
  );
}
```

### Read-only Display

```tsx
import { Typography } from 'typography';

function ReadOnlyView() {
  return (
    <Typography
      blocks={blocks}
      readOnly={true}
    />
  );
}
```

### Using the Hook

```tsx
import { useTypography } from 'typography';

function CustomEditor() {
  const {
    blocks,
    addBlock,
    updateBlock,
    removeBlock,
    moveBlock,
    selectedBlockId,
    setSelectedBlockId
  } = useTypography(initialBlocks);

  const handleAddHeading = () => {
    addBlock({
      type: 'heading',
      level: 2,
      content: 'New Heading'
    });
  };

  return (
    <div>
      <button onClick={handleAddHeading}>Add Heading</button>
      <Typography blocks={blocks} />
    </div>
  );
}
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Create new block |
| `Shift + Enter` | New line within block |
| `Backspace` | Delete empty block |
| `↑` / `↓` | Navigate between blocks |
| `Tab` / `Shift + Tab` | Move block up/down |
| `Cmd/Ctrl + Shift + D` | Duplicate block |

## 🎨 Block Types

### Paragraph
Basic text block for regular content.

```typescript
{ type: 'paragraph', content: 'Your text here' }
```

### Heading
Six levels of headings (h1-h6).

```typescript
{ type: 'heading', level: 1, content: 'Title' }
```

### List
Ordered, unordered, and checklist support.

```typescript
{
  type: 'list',
  listType: 'unordered',
  children: [
    { content: 'Item 1' },
    { content: 'Item 2' }
  ]
}
```

### Code Block
Syntax highlighted code blocks.

```typescript
{ type: 'code', content: 'const hello = "world";' }
```

### Quote
Blockquotes for citations.

```typescript
{ type: 'quote', content: 'To be or not to be' }
```

### Divider
Horizontal rule for separating content.

```typescript
{ type: 'divider', content: '' }
```

## 🛠️ Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/typography.git
cd typography

# Install dependencies
pnpm install

# Run development build
pnpm dev

# Run demo application
pnpm demo
```

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm build` | Build the library |
| `pnpm dev` | Watch mode development |
| `pnpm demo` | Run demo application |
| `pnpm type-check` | TypeScript type checking |
| `pnpm check` | Run all checks |
| `pnpm fix` | Auto-fix linting issues |

### Project Structure

```
typography/
├── src/              # Source code
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── utils/        # Utility functions
│   └── types/        # TypeScript definitions
├── demo/             # Demo application
├── dist/             # Build output
└── package.json
```

## 🧪 Testing

Run the demo application to test functionality:

```bash
pnpm demo
```

The demo includes:
- Basic editing example
- Markdown import/export
- Custom styling configuration
- Read-only mode
- Interactive editor with controls
- Performance testing with multiple blocks

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write TypeScript with strict mode enabled
- Use Biome for linting and formatting
- Follow the existing code style
- Add proper type definitions
- Test your changes in the demo application

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Notion's excellent editor UX
- Built with React and TypeScript
- Styled with CSS modules
- Markdown processing with remark and rehype

## 🐛 Known Issues

- None currently reported

## 🚧 Roadmap

- [ ] Drag and drop support for reordering blocks
- [ ] Collaborative editing support
- [ ] More block types (tables, embeds)
- [ ] Plugin system for extensibility
- [ ] Undo/redo functionality
- [ ] Export to various formats (PDF, HTML)
- [ ] Mobile touch optimization
- [ ] Accessibility improvements

## 📞 Support

For issues and questions:
- [GitHub Issues](https://github.com/yourusername/typography/issues)
- [Discussions](https://github.com/yourusername/typography/discussions)

## 📊 Stats

- **Bundle Size**: ~9KB minified + gzipped
- **Dependencies**: 7 runtime dependencies
- **TypeScript**: Full support with strict mode
- **React**: 18.0.0+ supported
- **Performance**: Optimized for minimal re-renders

---

Made with ❤️ by [Your Name]