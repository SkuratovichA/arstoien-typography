import { useCallback, useEffect, useRef, useState } from 'react'
import type { TypographyBlock, TypographyConfig } from '../types'
import { blocksToMarkdown, markdownToBlocks } from '../utils/markdown'

export const useTypography = (
  initialBlocks: TypographyBlock[] = [],
  config?: TypographyConfig,
) => {
  const [blocks, setBlocks] = useState<TypographyBlock[]>(initialBlocks)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [markdown, setMarkdown] = useState('')
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current++
  }, [blocks])

  useEffect(() => {
    const newMarkdown = blocksToMarkdown(blocks)
    setMarkdown(newMarkdown)
  }, [blocks])

  const updateBlock = useCallback(
    (blockId: string, updates: Partial<TypographyBlock>) => {
      setBlocks((prevBlocks) =>
        prevBlocks.map((block) =>
          block.id === blockId ? { ...block, ...updates } : block,
        ),
      )
      if (config?.onChange) {
        config.onChange(blocks)
      }
    },
    [blocks, config],
  )

  const addBlock = useCallback(
    (block: Omit<TypographyBlock, 'id'>, afterBlockId?: string) => {
      const newBlock: TypographyBlock = {
        ...block,
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }

      setBlocks((prevBlocks) => {
        if (afterBlockId) {
          const index = prevBlocks.findIndex((b) => b.id === afterBlockId)
          if (index !== -1) {
            const newBlocks = [...prevBlocks]
            newBlocks.splice(index + 1, 0, newBlock)
            return newBlocks
          }
        }
        return [...prevBlocks, newBlock]
      })

      if (config?.onChange) {
        config.onChange(blocks)
      }

      return newBlock.id
    },
    [blocks, config],
  )

  const removeBlock = useCallback(
    (blockId: string) => {
      setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== blockId))
      if (config?.onChange) {
        config.onChange(blocks)
      }
    },
    [blocks, config],
  )

  const moveBlock = useCallback(
    (blockId: string, direction: 'up' | 'down') => {
      setBlocks((prevBlocks) => {
        const index = prevBlocks.findIndex((b) => b.id === blockId)
        if (index === -1) return prevBlocks

        const newBlocks = [...prevBlocks]
        if (direction === 'up' && index > 0) {
          const current = newBlocks[index]
          const prev = newBlocks[index - 1]
          if (current && prev) {
            newBlocks[index - 1] = current
            newBlocks[index] = prev
          }
        } else if (direction === 'down' && index < newBlocks.length - 1) {
          const current = newBlocks[index]
          const next = newBlocks[index + 1]
          if (current && next) {
            newBlocks[index] = next
            newBlocks[index + 1] = current
          }
        }
        return newBlocks
      })

      if (config?.onChange) {
        config.onChange(blocks)
      }
    },
    [blocks, config],
  )

  const setBlocksFromMarkdown = useCallback(
    (markdown: string) => {
      const newBlocks = markdownToBlocks(markdown)
      setBlocks(newBlocks)
      if (config?.onChange) {
        config.onChange(newBlocks)
      }
    },
    [config],
  )

  const getRenderCount = useCallback(() => renderCount.current, [])

  return {
    blocks,
    markdown,
    selectedBlockId,
    isEditing,
    setBlocks,
    setSelectedBlockId,
    setIsEditing,
    updateBlock,
    addBlock,
    removeBlock,
    moveBlock,
    setBlocksFromMarkdown,
    getRenderCount,
  }
}