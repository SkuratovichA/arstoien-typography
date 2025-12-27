export interface TypographyStyle {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  highlight?: boolean
  color?: string
  backgroundColor?: string
  fontSize?: string
  fontFamily?: string
}

export interface TypographyBlock {
  id: string
  content: string
  styles?: TypographyStyle
  markdown?: string
  type: 'paragraph' | 'heading' | 'list' | 'code' | 'quote' | 'divider'
  level?: 1 | 2 | 3 | 4 | 5 | 6 // for headings
  listType?: 'ordered' | 'unordered' | 'checklist'
  checked?: boolean
  children?: TypographyBlock[]
}

export interface TypographyConfig {
  colors?: {
    primary?: string
    secondary?: string
    accent?: string
    text?: string
    background?: string
    highlight?: string
    [key: string]: string | undefined
  }
  fonts?: {
    body?: string
    heading?: string
    code?: string
  }
  sizes?: {
    base?: string
    small?: string
    large?: string
    h1?: string
    h2?: string
    h3?: string
    h4?: string
    h5?: string
    h6?: string
  }
  editable?: boolean
  placeholder?: string
  onChange?: (blocks: TypographyBlock[]) => void
  onSelectionChange?: (selection: Selection | null) => void
  maxLength?: number
  autoFocus?: boolean
}

export interface TypographyProps {
  blocks?: TypographyBlock[]
  config?: TypographyConfig
  className?: string
  readOnly?: boolean
}

export interface Selection {
  blockId: string
  start: number
  end: number
}