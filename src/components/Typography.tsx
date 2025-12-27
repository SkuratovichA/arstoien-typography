import React, { useCallback, useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import type { TypographyProps } from '../types'
import { useTypography } from '../hooks/useTypography'
import { TypographyBlock } from './TypographyBlock'
import './Typography.css'

export const Typography: React.FC<TypographyProps> = ({
  blocks: initialBlocks = [],
  config,
  className,
  readOnly = false,
}) => {
  const {
    blocks,
    selectedBlockId,
    isEditing,
    setSelectedBlockId,
    setIsEditing,
    updateBlock,
    addBlock,
    removeBlock,
    moveBlock,
    getRenderCount,
  } = useTypography(initialBlocks, config)

  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleBlockClick = useCallback(
    (blockId: string) => {
      if (!readOnly && !config?.editable === false) {
        setSelectedBlockId(blockId)
        setIsEditing(true)
      }
    },
    [readOnly, config, setSelectedBlockId, setIsEditing],
  )

  const handleBlockBlur = useCallback(() => {
    setIsEditing(false)
  }, [setIsEditing])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, blockId: string) => {
      if (readOnly) return

      const currentIndex = blocks.findIndex((b) => b.id === blockId)

      switch (e.key) {
        case 'Enter':
          if (!e.shiftKey) {
            e.preventDefault()
            const newBlockId = addBlock(
              {
                content: '',
                type: 'paragraph',
              },
              blockId,
            )
            setTimeout(() => {
              setSelectedBlockId(newBlockId)
              setIsEditing(true)
            }, 0)
          }
          break

        case 'Backspace':
          const currentBlock = blocks[currentIndex]
          if (currentBlock && currentBlock.content === '' && blocks.length > 1) {
            e.preventDefault()
            removeBlock(blockId)
            if (currentIndex > 0) {
              const prevBlock = blocks[currentIndex - 1]
              if (prevBlock) {
                setSelectedBlockId(prevBlock.id)
                setIsEditing(true)
              }
            }
          }
          break

        case 'ArrowUp':
          if (currentIndex > 0) {
            e.preventDefault()
            const prevBlock = blocks[currentIndex - 1]
            if (prevBlock) {
              setSelectedBlockId(prevBlock.id)
            }
            setIsEditing(true)
          }
          break

        case 'ArrowDown':
          if (currentIndex < blocks.length - 1) {
            e.preventDefault()
            const nextBlock = blocks[currentIndex + 1]
            if (nextBlock) {
              setSelectedBlockId(nextBlock.id)
            }
            setIsEditing(true)
          }
          break

        case 'Tab':
          e.preventDefault()
          if (e.shiftKey && currentIndex > 0) {
            moveBlock(blockId, 'up')
          } else if (!e.shiftKey && currentIndex < blocks.length - 1) {
            moveBlock(blockId, 'down')
          }
          break
      }
    },
    [
      blocks,
      readOnly,
      addBlock,
      removeBlock,
      moveBlock,
      setSelectedBlockId,
      setIsEditing,
    ],
  )

  useEffect(() => {
    if (config?.autoFocus && blocks.length > 0 && !readOnly) {
      const firstBlock = blocks[0]
      if (firstBlock) {
        setSelectedBlockId(firstBlock.id)
        setIsEditing(true)
      }
    }
  }, [])

  if (blocks.length === 0 && !readOnly) {
    const initialBlockId = addBlock({
      content: config?.placeholder || '',
      type: 'paragraph',
    })
    setSelectedBlockId(initialBlockId)
  }

  return (
    <div
      ref={containerRef}
      className={clsx('typography-container', className, {
        'typography-editable': !readOnly && config?.editable !== false,
        'typography-readonly': readOnly || config?.editable === false,
      })}
      style={{
        '--typography-primary': config?.colors?.primary,
        '--typography-secondary': config?.colors?.secondary,
        '--typography-accent': config?.colors?.accent,
        '--typography-text': config?.colors?.text,
        '--typography-background': config?.colors?.background,
        '--typography-highlight': config?.colors?.highlight,
        '--typography-font-body': config?.fonts?.body,
        '--typography-font-heading': config?.fonts?.heading,
        '--typography-font-code': config?.fonts?.code,
      } as React.CSSProperties}
      data-render-count={getRenderCount()}
    >
      {blocks.map((block) => (
        <TypographyBlock
          key={block.id}
          block={block}
          isSelected={selectedBlockId === block.id}
          isEditing={selectedBlockId === block.id && isEditing}
          readOnly={readOnly || config?.editable === false}
          config={config}
          onClick={() => handleBlockClick(block.id)}
          onBlur={handleBlockBlur}
          onUpdate={(updates) => updateBlock(block.id, updates)}
          onKeyDown={(e) => handleKeyDown(e, block.id)}
        />
      ))}
    </div>
  )
}