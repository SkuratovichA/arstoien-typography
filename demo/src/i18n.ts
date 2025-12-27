import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'demo.title': 'Typography Component Demo',
      'demo.subtitle': 'A Notion-like editable typography component',
      'example.basic': 'Basic Example',
      'example.markdown': 'Markdown Import/Export',
      'example.customStyles': 'Custom Styles',
      'example.readonly': 'Read-only Mode',
      'example.interactive': 'Interactive Editor',
      'example.performance': 'Performance Test',
      'controls.addParagraph': 'Add Paragraph',
      'controls.addHeading': 'Add Heading',
      'controls.addList': 'Add List',
      'controls.addCode': 'Add Code Block',
      'controls.clear': 'Clear All',
      'controls.exportMarkdown': 'Export as Markdown',
      'controls.importMarkdown': 'Import Markdown',
      'info.renderCount': 'Render Count',
      'info.blockCount': 'Block Count',
      'placeholder.default': 'Click to start typing...',
      'placeholder.heading': 'Enter heading...',
      'placeholder.code': 'Enter code...',
      'instructions.keyboard': 'Keyboard Shortcuts',
      'instructions.enter': 'Enter: New block',
      'instructions.shiftEnter': 'Shift+Enter: New line',
      'instructions.backspace': 'Backspace: Delete empty block',
      'instructions.arrows': 'Arrow keys: Navigate blocks',
      'instructions.tab': 'Tab/Shift+Tab: Move block up/down',
      'instructions.duplicate': 'Cmd/Ctrl+Shift+D: Duplicate block',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n