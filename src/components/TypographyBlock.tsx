import React, { useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import type { TypographyBlock as TypographyBlockType, TypographyConfig } from '../types'

interface TypographyBlockProps {
  block: TypographyBlockType
  isSelected: boolean
  isEditing: boolean
  readOnly: boolean
  config?: TypographyConfig
  onClick: () => void
  onBlur: () => void
  onUpdate: (updates: Partial<TypographyBlockType>) => void
  onKeyDown: (e: React.KeyboardEvent) => void
}

export const TypographyBlock: React.FC<TypographyBlockProps> = ({
  block,
  isSelected,
  isEditing,
  readOnly,
  config,
  onClick,
  onBlur,
  onUpdate,
  onKeyDown,
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const lastEditingState = useRef(isEditing)

  useEffect(() => {
    if (isEditing && !lastEditingState.current && contentRef.current) {
      // Just started editing - set initial content and focus
      contentRef.current.textContent = block.content
      contentRef.current.focus()

      // Move cursor to end
      const range = document.createRange()
      const sel = window.getSelection()
      const textNode = contentRef.current.firstChild || contentRef.current

      range.selectNodeContents(textNode)
      range.collapse(false)
      sel?.removeAllRanges()
      sel?.addRange(range)
    } else if (!isEditing && lastEditingState.current && contentRef.current) {
      // Just stopped editing - update displayed content
      contentRef.current.textContent = block.content
    }

    lastEditingState.current = isEditing
  }, [isEditing, block.content])

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.textContent || ''

    if (config?.maxLength && newContent.length > config.maxLength) {
      e.preventDefault()
      return
    }

    onUpdate({ content: newContent })
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      selection.deleteFromDocument()
      selection.getRangeAt(0).insertNode(document.createTextNode(text))
      selection.collapseToEnd()
      handleInput(e as unknown as React.FormEvent<HTMLDivElement>)
    }
  }

  const renderContent = () => {
    const Element = block.type === 'heading' ? `h${block.level || 1}` : 'div'
    const className = clsx(
      'typography-block',
      `typography-block--${block.type}`,
      {
        'typography-block--selected': isSelected,
        'typography-block--editing': isEditing,
        'typography-block--bold': block.styles?.bold,
        'typography-block--italic': block.styles?.italic,
        'typography-block--underline': block.styles?.underline,
        'typography-block--strikethrough': block.styles?.strikethrough,
        'typography-block--code': block.styles?.code,
        'typography-block--highlight': block.styles?.highlight,
      },
    )

    const style: React.CSSProperties = {
      color: block.styles?.color,
      backgroundColor: block.styles?.backgroundColor,
      fontSize: block.styles?.fontSize,
      fontFamily: block.styles?.fontFamily,
    }

    if (block.type === 'divider') {
      return <hr className={className} />
    }

    if (block.type === 'list' && block.children) {
      const ListElement = block.listType === 'ordered' ? 'ol' : 'ul'
      return (
        <ListElement className={className}>
          {block.children.map((child) => (
            <li
              key={child.id}
              className={clsx('typography-list-item', {
                'typography-list-item--checked': child.checked,
              })}
            >
              {child.listType === 'checklist' && (
                <input
                  type="checkbox"
                  checked={child.checked || false}
                  onChange={() => onUpdate({
                    children: block.children?.map(c =>
                      c.id === child.id ? { ...c, checked: !c.checked } : c
                    )
                  })}
                  disabled={readOnly}
                  className="typography-checkbox"
                />
              )}
              <span>{child.content}</span>
            </li>
          ))}
        </ListElement>
      )
    }

    if (block.type === 'code') {
      return (
        <pre className={className}>
          <code
            ref={contentRef as React.RefObject<HTMLElement>}
            contentEditable={!readOnly && isEditing}
            suppressContentEditableWarning
            onInput={handleInput}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onPaste={handlePaste}
            onClick={onClick}
          >
            {!isEditing && block.content}
          </code>
        </pre>
      )
    }

    if (block.type === 'quote') {
      return (
        <blockquote
          className={className}
          ref={contentRef as React.RefObject<HTMLQuoteElement>}
          contentEditable={!readOnly && isEditing}
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onPaste={handlePaste}
          onClick={onClick}
          style={style}
        >
          {!isEditing && (block.content || config?.placeholder)}
        </blockquote>
      )
    }

    return React.createElement(
      Element as keyof JSX.IntrinsicElements,
      {
        className,
        ref: contentRef,
        contentEditable: !readOnly && isEditing,
        suppressContentEditableWarning: true,
        onInput: handleInput,
        onBlur,
        onKeyDown,
        onPaste: handlePaste,
        onClick,
        style,
        'data-placeholder': !block.content && !isEditing ? config?.placeholder : undefined,
      },
      !isEditing && (block.content || ''),
    )
  }

  return <>{renderContent()}</>
}