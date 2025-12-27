import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import type { TypographyBlock, TypographyStyle } from '../types'

export const parseMarkdown = async (markdown: string): Promise<string> => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown)

  return String(result)
}

export const markdownToBlocks = (markdown: string): TypographyBlock[] => {
  const lines = markdown.split('\n')
  const blocks: TypographyBlock[] = []
  let listItems: TypographyBlock[] = []
  let inCodeBlock = false
  let codeContent: string[] = []

  lines.forEach((line) => {
    const trimmedLine = line.trim()

    // Handle code blocks
    if (trimmedLine.startsWith('```')) {
      if (inCodeBlock) {
        blocks.push({
          id: `block-${blocks.length}`,
          content: codeContent.join('\n'),
          type: 'code',
          markdown: `\`\`\`\n${codeContent.join('\n')}\n\`\`\``,
        })
        codeContent = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
      }
      return
    }

    if (inCodeBlock) {
      codeContent.push(line)
      return
    }

    // Handle headings
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.*)/)
    if (headingMatch) {
      const content = headingMatch[2] ?? ''
      const levelLength = headingMatch[1]?.length ?? 1
      blocks.push({
        id: `block-${blocks.length}`,
        content,
        type: 'heading',
        level: Math.min(Math.max(levelLength, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6,
        markdown: trimmedLine,
      })
      return
    }

    // Handle lists
    const unorderedListMatch = trimmedLine.match(/^[-*+]\s+(.*)/)
    const orderedListMatch = trimmedLine.match(/^\d+\.\s+(.*)/)
    const checklistMatch = trimmedLine.match(/^[-*+]\s+\[([ x])\]\s+(.*)/)

    if (checklistMatch) {
      listItems.push({
        id: `block-${blocks.length}-item-${listItems.length}`,
        content: checklistMatch[2] ?? '',
        type: 'list',
        listType: 'checklist',
        checked: checklistMatch[1] === 'x',
        markdown: trimmedLine,
      })
    } else if (unorderedListMatch) {
      listItems.push({
        id: `block-${blocks.length}-item-${listItems.length}`,
        content: unorderedListMatch[1] ?? '',
        type: 'list',
        listType: 'unordered',
        markdown: trimmedLine,
      })
    } else if (orderedListMatch) {
      listItems.push({
        id: `block-${blocks.length}-item-${listItems.length}`,
        content: orderedListMatch[1] ?? '',
        type: 'list',
        listType: 'ordered',
        markdown: trimmedLine,
      })
    } else if (listItems.length > 0 && trimmedLine === '') {
      // End of list
      const firstItem = listItems[0]
      if (firstItem) {
        blocks.push({
          id: `block-${blocks.length}`,
          content: '',
          type: 'list',
          listType: firstItem.listType,
          children: listItems,
          markdown: listItems.map((item) => item.markdown).join('\n'),
        })
      }
      listItems = []
    }

    // Handle blockquotes
    if (trimmedLine.startsWith('>')) {
      blocks.push({
        id: `block-${blocks.length}`,
        content: trimmedLine.replace(/^>\s*/, ''),
        type: 'quote',
        markdown: trimmedLine,
      })
      return
    }

    // Handle horizontal rules
    if (trimmedLine.match(/^[-*_]{3,}$/)) {
      blocks.push({
        id: `block-${blocks.length}`,
        content: '',
        type: 'divider',
        markdown: trimmedLine,
      })
      return
    }

    // Handle paragraphs
    if (trimmedLine && !listItems.length) {
      blocks.push({
        id: `block-${blocks.length}`,
        content: trimmedLine,
        type: 'paragraph',
        markdown: trimmedLine,
        styles: parseInlineStyles(trimmedLine),
      })
    }
  })

  // Handle any remaining list items
  if (listItems.length > 0) {
    const firstItem = listItems[0]
    if (firstItem) {
      blocks.push({
        id: `block-${blocks.length}`,
        content: '',
        type: 'list',
        listType: firstItem.listType,
        children: listItems,
        markdown: listItems.map((item) => item.markdown).join('\n'),
      })
    }
  }

  return blocks
}

export const parseInlineStyles = (text: string): TypographyStyle => {
  const styles: TypographyStyle = {}

  if (text.includes('**') || text.includes('__')) {
    styles.bold = true
  }
  if (text.includes('*') || text.includes('_')) {
    styles.italic = true
  }
  if (text.includes('~~')) {
    styles.strikethrough = true
  }
  if (text.includes('`')) {
    styles.code = true
  }
  if (text.includes('==')) {
    styles.highlight = true
  }

  return Object.keys(styles).length > 0 ? styles : {}
}

export const blocksToMarkdown = (blocks: TypographyBlock[]): string => {
  return blocks
    .map((block) => {
      if (block.markdown) {
        return block.markdown
      }

      switch (block.type) {
        case 'heading':
          return `${'#'.repeat(block.level || 1)} ${block.content}`
        case 'list':
          if (block.children) {
            return block.children
              .map((child, index) => {
                if (child.listType === 'ordered') {
                  return `${index + 1}. ${child.content}`
                } else if (child.listType === 'checklist') {
                  return `- [${child.checked ? 'x' : ' '}] ${child.content}`
                } else {
                  return `- ${child.content}`
                }
              })
              .join('\n')
          }
          return ''
        case 'code':
          return `\`\`\`\n${block.content}\n\`\`\``
        case 'quote':
          return `> ${block.content}`
        case 'divider':
          return '---'
        case 'paragraph':
        default:
          return applyInlineStyles(block.content, block.styles || {})
      }
    })
    .join('\n\n')
}

export const applyInlineStyles = (text: string, styles: TypographyStyle): string => {
  let result = text

  if (styles.bold) {
    result = `**${result}**`
  }
  if (styles.italic) {
    result = `*${result}*`
  }
  if (styles.strikethrough) {
    result = `~~${result}~~`
  }
  if (styles.code) {
    result = `\`${result}\``
  }
  if (styles.highlight) {
    result = `==${result}==`
  }

  return result
}