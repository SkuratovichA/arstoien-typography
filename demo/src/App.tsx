import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, useTypography, markdownToBlocks, blocksToMarkdown } from 'typography'
import type { TypographyBlock, TypographyConfig } from 'typography'
import './App.css'

export const App: React.FC = () => {
  const { t } = useTranslation()
  const [activeExample, setActiveExample] = useState<string>('basic')

  const examples = [
    { id: 'basic', name: t('example.basic') },
    { id: 'markdown', name: t('example.markdown') },
    { id: 'customStyles', name: t('example.customStyles') },
    { id: 'readonly', name: t('example.readonly') },
    { id: 'interactive', name: t('example.interactive') },
    { id: 'performance', name: t('example.performance') },
  ]

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t('demo.title')}</h1>
        <p>{t('demo.subtitle')}</p>
      </header>

      <nav className="app-nav">
        {examples.map((example) => (
          <button
            key={example.id}
            className={`nav-button ${activeExample === example.id ? 'active' : ''}`}
            onClick={() => setActiveExample(example.id)}
          >
            {example.name}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {activeExample === 'basic' && <BasicExample />}
        {activeExample === 'markdown' && <MarkdownExample />}
        {activeExample === 'customStyles' && <CustomStylesExample />}
        {activeExample === 'readonly' && <ReadOnlyExample />}
        {activeExample === 'interactive' && <InteractiveExample />}
        {activeExample === 'performance' && <PerformanceExample />}
      </main>

      <footer className="app-footer">
        <div className="instructions">
          <h3>{t('instructions.keyboard')}</h3>
          <ul>
            <li>{t('instructions.enter')}</li>
            <li>{t('instructions.shiftEnter')}</li>
            <li>{t('instructions.backspace')}</li>
            <li>{t('instructions.arrows')}</li>
            <li>{t('instructions.tab')}</li>
            <li>{t('instructions.duplicate')}</li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

const BasicExample: React.FC = () => {
  const { t } = useTranslation()
  const initialBlocks: TypographyBlock[] = [
    {
      id: '1',
      type: 'heading',
      level: 1,
      content: 'Welcome to Typography',
    },
    {
      id: '2',
      type: 'paragraph',
      content: 'This is a basic example demonstrating the core functionality of the Typography component. Click on any block to edit it.',
    },
    {
      id: '3',
      type: 'heading',
      level: 2,
      content: 'Features',
    },
    {
      id: '4',
      type: 'list',
      content: '',
      listType: 'unordered',
      children: [
        { id: '4-1', type: 'list', listType: 'unordered', content: 'Editable blocks' },
        { id: '4-2', type: 'list', listType: 'unordered', content: 'Markdown support' },
        { id: '4-3', type: 'list', listType: 'unordered', content: 'Minimal re-renders' },
      ],
    },
  ]

  return (
    <div className="example">
      <Typography blocks={initialBlocks} config={{ editable: true, placeholder: t('placeholder.default') }} />
    </div>
  )
}

const MarkdownExample: React.FC = () => {
  const { t } = useTranslation()
  const [markdown, setMarkdown] = useState(`# Markdown Example

This example shows **markdown** import and export functionality.

## Lists
- Item one
- Item two
- Item three

## Code
\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

> This is a blockquote

---

### Checklist
- [ ] Task one
- [x] Task two completed
- [ ] Task three`)

  const [blocks, setBlocks] = useState<TypographyBlock[]>(markdownToBlocks(markdown))

  const handleExport = () => {
    const exported = blocksToMarkdown(blocks)
    setMarkdown(exported)
    alert('Markdown exported to textarea below')
  }

  const handleImport = () => {
    setBlocks(markdownToBlocks(markdown))
  }

  const config: TypographyConfig = {
    editable: true,
    onChange: (newBlocks) => setBlocks(newBlocks),
  }

  return (
    <div className="example markdown-example">
      <div className="controls">
        <button onClick={handleExport}>{t('controls.exportMarkdown')}</button>
        <button onClick={handleImport}>{t('controls.importMarkdown')}</button>
      </div>
      <div className="split-view">
        <div className="editor-side">
          <Typography blocks={blocks} config={config} />
        </div>
        <div className="markdown-side">
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Markdown content..."
          />
        </div>
      </div>
    </div>
  )
}

const CustomStylesExample: React.FC = () => {
  const config: TypographyConfig = {
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      accent: '#06b6d4',
      text: '#1f2937',
      background: '#f3f4f6',
      highlight: '#fef3c7',
    },
    fonts: {
      body: 'Georgia, serif',
      heading: 'Playfair Display, serif',
      code: 'Fira Code, monospace',
    },
    editable: true,
  }

  const blocks: TypographyBlock[] = [
    {
      id: '1',
      type: 'heading',
      level: 1,
      content: 'Custom Styled Typography',
    },
    {
      id: '2',
      type: 'paragraph',
      content: 'This example demonstrates custom colors and fonts configuration.',
      styles: {
        bold: true,
        color: '#8b5cf6',
      },
    },
    {
      id: '3',
      type: 'code',
      content: `const config = {
  colors: {
    primary: '#8b5cf6',
    secondary: '#ec4899'
  }
}`,
    },
  ]

  return (
    <div className="example custom-styles-example">
      <Typography blocks={blocks} config={config} />
    </div>
  )
}

const ReadOnlyExample: React.FC = () => {
  const blocks: TypographyBlock[] = [
    {
      id: '1',
      type: 'heading',
      level: 1,
      content: 'Read-only Mode',
    },
    {
      id: '2',
      type: 'paragraph',
      content: 'This typography component is in read-only mode. You cannot edit any of the content, but it still renders beautifully with all the styling intact.',
    },
    {
      id: '3',
      type: 'list',
      content: '',
      listType: 'checklist',
      children: [
        { id: '3-1', type: 'list', listType: 'checklist', content: 'Completed task', checked: true },
        { id: '3-2', type: 'list', listType: 'checklist', content: 'Pending task', checked: false },
      ],
    },
  ]

  return (
    <div className="example">
      <Typography blocks={blocks} readOnly />
    </div>
  )
}

const InteractiveExample: React.FC = () => {
  const { t } = useTranslation()
  const {
    blocks,
    addBlock,
    removeBlock,
    updateBlock,
    setBlocks,
    getRenderCount,
  } = useTypography([])

  const handleAddParagraph = () => {
    addBlock({
      type: 'paragraph',
      content: 'New paragraph block',
    })
  }

  const handleAddHeading = () => {
    addBlock({
      type: 'heading',
      level: 2,
      content: 'New heading',
    })
  }

  const handleAddList = () => {
    addBlock({
      type: 'list',
      content: '',
      listType: 'unordered',
      children: [
        { id: `list-item-${Date.now()}`, type: 'list', listType: 'unordered', content: 'List item' },
      ],
    })
  }

  const handleAddCode = () => {
    addBlock({
      type: 'code',
      content: '// Your code here',
    })
  }

  const handleClear = () => {
    setBlocks([])
  }

  const config: TypographyConfig = {
    editable: true,
    placeholder: t('placeholder.default'),
    onChange: (newBlocks) => {
      console.log('Blocks changed:', newBlocks)
    },
  }

  return (
    <div className="example interactive-example">
      <div className="controls">
        <button onClick={handleAddParagraph}>{t('controls.addParagraph')}</button>
        <button onClick={handleAddHeading}>{t('controls.addHeading')}</button>
        <button onClick={handleAddList}>{t('controls.addList')}</button>
        <button onClick={handleAddCode}>{t('controls.addCode')}</button>
        <button onClick={handleClear} className="danger">{t('controls.clear')}</button>
      </div>
      <div className="stats">
        <span>{t('info.blockCount')}: {blocks.length}</span>
        <span>{t('info.renderCount')}: {getRenderCount()}</span>
      </div>
      <Typography blocks={blocks} config={config} />
    </div>
  )
}

const PerformanceExample: React.FC = () => {
  const { t } = useTranslation()
  const [blockCount, setBlockCount] = useState(10)

  const generateBlocks = (count: number): TypographyBlock[] => {
    const blocks: TypographyBlock[] = []
    for (let i = 0; i < count; i++) {
      blocks.push({
        id: `block-${i}`,
        type: i % 4 === 0 ? 'heading' : 'paragraph',
        level: i % 4 === 0 ? 2 : undefined,
        content: `Block ${i + 1}: This is a test block to demonstrate performance with ${count} total blocks.`,
      })
    }
    return blocks
  }

  const [blocks, setBlocks] = useState<TypographyBlock[]>(() => generateBlocks(blockCount))

  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10)
    setBlockCount(count)
    setBlocks(generateBlocks(count))
  }

  const config: TypographyConfig = {
    editable: true,
    onChange: (newBlocks) => setBlocks(newBlocks),
  }

  return (
    <div className="example performance-example">
      <div className="controls">
        <label>
          Number of blocks:
          <input
            type="range"
            min="1"
            max="100"
            value={blockCount}
            onChange={handleChangeCount}
          />
          <span>{blockCount}</span>
        </label>
      </div>
      <div className="performance-info">
        <p>This example tests performance with multiple blocks. Even with many blocks, the component maintains efficient rendering through optimized re-render strategies.</p>
      </div>
      <Typography blocks={blocks} config={config} />
    </div>
  )
}