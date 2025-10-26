"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { 
  Image as ImageIcon, 
  Wand2, 
  Download, 
  RefreshCw,
  Sparkles,
  Palette,
  Zap,
  Heart,
  Share,
  Camera,
  Brush,
  Drama,
  Rainbow,
  Circle,
  Send,
  ChevronDown,
  Copy,
  Expand,
  Grid3X3,
  Square
} from "lucide-react"

interface GeneratedImage {
  id: string
  base64: string
  dataUrl: string
  index: number
}

export function ImageGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
  const [prompt, setPrompt] = useState("")
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string | null>(null)
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null)
  const [numberOfImages, setNumberOfImages] = useState<number>(1)
  const [tokensUsed, setTokensUsed] = useState<number>(0)
  const [showStyleDropdown, setShowStyleDropdown] = useState(false)
  const [showSizeDropdown, setShowSizeDropdown] = useState(false)
  const [showAspectRatioDropdown, setShowAspectRatioDropdown] = useState(false)
  const [showQualityDropdown, setShowQualityDropdown] = useState(false)
  const [showNumberDropdown, setShowNumberDropdown] = useState(false)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const styles = [
    { id: "realistic", name: "Realistic", icon: ImageIcon, desc: "Photorealistic images" },
    { id: "artistic", name: "Artistic", icon: Brush, desc: "Creative artistic style" },
    { id: "cartoon", name: "Cartoon", icon: Drama, desc: "Animated cartoon style" },
    { id: "abstract", name: "Abstract", icon: Rainbow, desc: "Abstract art style" },
    { id: "minimalist", name: "Minimalist", icon: Circle, desc: "Clean simple style" },
    { id: "vintage", name: "Vintage", icon: Camera, desc: "Retro vintage look" }
  ]

  const imageSizes = [
    { id: "1K", name: "1K Quality", desc: "1024px (Default)" },
    { id: "2K", name: "2K Quality", desc: "2048px (Higher)" }
  ]

  const aspectRatios = [
    { id: "1:1", name: "Square", desc: "1:1 (Equal)" },
    { id: "3:4", name: "Portrait", desc: "3:4 (Vertical)" },
    { id: "4:3", name: "Landscape", desc: "4:3 (Horizontal)" },
    { id: "9:16", name: "Tall", desc: "9:16 (Mobile)" },
    { id: "16:9", name: "Wide", desc: "16:9 (Widescreen)" }
  ]

  const qualities = [
    { id: "standard", name: "Standard", desc: "Fast generation" },
    { id: "hd", name: "HD Quality", desc: "Higher detail" },
    { id: "ultra", name: "Ultra HD", desc: "Best quality" }
  ]

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [prompt])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-dropdown]')) {
        setShowStyleDropdown(false)
        setShowSizeDropdown(false)
        setShowAspectRatioDropdown(false)
        setShowQualityDropdown(false)
        setShowNumberDropdown(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside, true)
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    try {
      console.log('Sending request to Google AI Studio...')
      console.log('Prompt:', prompt.trim())
      console.log('Number of images:', numberOfImages)
      console.log('Image size:', selectedSize)
      console.log('Aspect ratio:', selectedAspectRatio)
      
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          numberOfImages: numberOfImages,
          sampleImageSize: selectedSize || '1K',
          aspectRatio: selectedAspectRatio || '1:1',
          personGeneration: 'allow_all'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate images')
      }

      console.log('✅ Images received from Google AI!')
      console.log('Generated images:', data.images.length)
      console.log('Tokens used:', data.tokensUsed)

      // Update state with generated images
      setGeneratedImages(data.images)
      setTokensUsed(prev => prev + data.tokensUsed)

    } catch (error: unknown) {
      console.error('❌ Generation failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      alert(`Failed to generate images: ${errorMessage}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  const insertSelection = (type: 'style' | 'size' | 'aspectRatio' | 'quality', value: string) => {
    if (type === 'style') {
      setSelectedStyle(value)
      setShowStyleDropdown(false)
    } else if (type === 'size') {
      setSelectedSize(value)
      setShowSizeDropdown(false)
    } else if (type === 'aspectRatio') {
      setSelectedAspectRatio(value)
      setShowAspectRatioDropdown(false)
    } else if (type === 'quality') {
      setSelectedQuality(value)
      setShowQualityDropdown(false)
    }
  }

  const selectNumberOfImages = (count: number) => {
    setNumberOfImages(count)
    setShowNumberDropdown(false)
  }

  const downloadImage = async (image: GeneratedImage) => {
    console.log('Download clicked for image:', image)
    try {
      // Try to download using the dataUrl first
      if (image.dataUrl) {
        const link = document.createElement('a')
        link.href = image.dataUrl
        link.download = `clippy-generated-${image.index}-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        console.log('Download successful using dataUrl')
        return
      }
      
      // Fallback: convert base64 to blob and download
      if (image.base64) {
        const base64Data = image.base64.includes('data:') ? image.base64 : `data:image/png;base64,${image.base64}`
        const response = await fetch(base64Data)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = url
        link.download = `clippy-generated-${image.index}-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        URL.revokeObjectURL(url)
        console.log('Download successful using base64 conversion')
      }
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    }
  }

  const expandImage = (image: GeneratedImage) => {
    console.log('Expand image clicked:', image)
    // Create a modal or overlay to show the image in full size
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4'
    modal.onclick = () => document.body.removeChild(modal)
    
    const img = document.createElement('img')
    img.src = image.dataUrl || image.base64
    img.className = 'max-w-full max-h-full object-contain rounded-lg'
    img.alt = `Generated image ${image.index}`
    
    const closeBtn = document.createElement('button')
    closeBtn.innerHTML = '✕'
    closeBtn.className = 'absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70'
    closeBtn.onclick = () => document.body.removeChild(modal)
    
    modal.appendChild(img)
    modal.appendChild(closeBtn)
    document.body.appendChild(modal)
  }

  const copyImage = async (image: GeneratedImage) => {
    console.log('Copy image clicked:', image)
    try {
      if (image.dataUrl) {
        const response = await fetch(image.dataUrl)
        const blob = await response.blob()
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ])
        alert('Image copied to clipboard!')
      } else if (image.base64) {
        const base64Data = image.base64.includes('data:') ? image.base64 : `data:image/png;base64,${image.base64}`
        const response = await fetch(base64Data)
        const blob = await response.blob()
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ])
        alert('Image copied to clipboard!')
      }
    } catch (error) {
      console.error('Copy failed:', error)
      // Fallback: copy the base64 data URL as text
      try {
        const textToCopy = image.dataUrl || image.base64
        await navigator.clipboard.writeText(textToCopy)
        alert('Image data copied as text to clipboard!')
      } catch (textError) {
        console.error('Text copy also failed:', textError)
        alert('Copy failed. Please try downloading the image instead.')
      }
    }
  }

  return (
    <div className="h-full p-4 sm:p-6">
      <div className="h-full flex flex-col">
        {/* Generated Images Display - Centered */}
        <div className="flex-1 flex items-center justify-center">
        {generatedImages.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-transparent border-0 rounded-xl p-8 max-w-5xl w-full max-h-[70vh] overflow-y-auto"
          >
            {/* Header with metadata */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <ImageIcon className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Generated Images</h2>
                  <p className="text-muted-foreground">
                    {generatedImages.length} image{generatedImages.length > 1 ? 's' : ''} • 
                    {selectedStyle ? ` Style: ${styles.find(s => s.id === selectedStyle)?.name}` : ''} • 
                    {selectedSize} Quality
                  </p>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
              {generatedImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-secondary/30 rounded-xl overflow-hidden"
                  style={{
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                  }}
                >
                  <Image
                    src={image.dataUrl}
                    width={256}
                    height={256}
                    alt={`Generated image ${image.index}`}
                    className="w-full h-64 object-cover"
                  />
                  
                  {/* Action buttons in a row */}
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        downloadImage(image)
                      }}
                      className="h-8 w-8"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>

                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        expandImage(image)
                      }}
                      className="h-8 w-8"
                    >
                      <Expand className="w-3.5 h-3.5" />
                    </Button>

                    <Button 
                      size="icon"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyImage(image)
                      }}
                      className="h-8 w-8"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : isGenerating ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-transparent border-0 rounded-xl p-8 max-w-5xl w-full max-h-[70vh] overflow-y-auto"
          >
            {/* Header with metadata */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <RefreshCw className="w-6 h-6 text-purple-400 animate-spin" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Generating Images...</h2>
                  <p className="text-muted-foreground">
                    Creating {numberOfImages} {selectedStyle ? styles.find(s => s.id === selectedStyle)?.name.toLowerCase() : 'beautiful'} image{numberOfImages > 1 ? 's' : ''} for you
                  </p>
                </div>
              </div>
            </div>

            {/* Skeleton Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
              {Array.from({ length: numberOfImages }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative bg-secondary/30 rounded-xl overflow-hidden w-full"
                  style={{
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                  }}
                >
                  {/* Skeleton Image */}
                  <div className="w-full h-64 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse relative overflow-hidden">
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 opacity-30" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6 w-full max-w-md mx-auto">
              <div className="bg-secondary rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-transparent border-0 rounded-xl p-8 max-w-4xl w-full flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Ready to Create</h3>
              <p className="text-muted-foreground">
                Describe your image and let AI bring it to life
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Input Interface */}
      <div className="mt-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-4 transition-all duration-200 max-w-3xl w-full"
        >

        {/* Input Field - Now at Top */}
        <div className="relative bg-transparent border border-white/10 dark:border-gray-700/10 rounded-3xl p-3 transition-all duration-200 hover:border-white/20 dark:hover:border-gray-600/20 mb-4">
          <div className="absolute top-3 left-3 z-10">
            <Wand2 className="w-5 h-5 text-orange-400" />
          </div>
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your image..."
            className="w-full pl-12 pr-12 bg-transparent border-none resize-none focus:outline-none min-h-[40px] max-h-[200px] text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            style={{ overflow: 'auto' }}
            rows={1}
          />
          
          {/* Character Count - Now in Button Position */}
          <div className="absolute right-3 bottom-3 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            <span>{prompt.length}/1000</span>
          </div>
        </div>

        {/* Feature Buttons with Character Count - Same Line */}
        <div className="flex flex-wrap gap-2  items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
          {/* Style */}
          <div className="relative" data-dropdown>
            <Button
              variant={selectedStyle ? "default" : "outline"}
              size="sm"
              onMouseEnter={() => setShowStyleDropdown(true)}
              onMouseLeave={() => setShowStyleDropdown(false)}
              className={`rounded-full ${selectedStyle ? 'px-3 py-1.5 h-auto' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
            >
              {selectedStyle ? (
                <>
                  <Brush className="w-3.5 h-3.5 flex-shrink-0 text-[#0072a4]" />
                  <span className="text-xs whitespace-nowrap">{styles.find(s => s.id === selectedStyle)?.name}</span>
                </>
              ) : (
                <Brush className="w-4 h-4 text-[#0072a4]" />
              )}
            </Button>
            
            <AnimatePresence>
            {showStyleDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 min-w-[160px]"
                onMouseEnter={() => setShowStyleDropdown(true)}
                onMouseLeave={() => setShowStyleDropdown(false)}
              >
                {styles.map((style) => {
                  const Icon = style.icon
                  return (
                    <button
                      key={style.id}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        insertSelection('style', style.id)
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                    >
                      <Icon className="w-4 h-4" />
                      <div>
                        <div className="font-medium">{style.name}</div>
                        <div className="text-xs text-muted-foreground">{style.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* Image Size */}
          <div className="relative" data-dropdown>
            <Button
              variant={selectedSize ? "default" : "outline"}
              size="sm"
              onMouseEnter={() => setShowSizeDropdown(true)}
              onMouseLeave={() => setShowSizeDropdown(false)}
              className={`rounded-full ${selectedSize ? 'px-3 py-1.5 h-auto' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
            >
              {selectedSize ? (
                <>
                  <Zap className="w-3.5 h-3.5 flex-shrink-0 text-[#0072a4]" />
                  <span className="text-xs whitespace-nowrap">{imageSizes.find(s => s.id === selectedSize)?.name}</span>
                </>
              ) : (
                <Zap className="w-4 h-4 text-[#0072a4]" />
              )}
            </Button>
            
            <AnimatePresence>
            {showSizeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50"
                onMouseEnter={() => setShowSizeDropdown(true)}
                onMouseLeave={() => setShowSizeDropdown(false)}
              >
                {imageSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      insertSelection('size', size.id)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                  >
                    <div className="font-medium">{size.name}</div>
                    <div className="text-xs text-muted-foreground">{size.desc}</div>
                  </button>
                ))}
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* Aspect Ratio */}
          <div className="relative" data-dropdown>
            <Button
              variant={selectedAspectRatio ? "default" : "outline"}
              size="sm"
              onMouseEnter={() => setShowAspectRatioDropdown(true)}
              onMouseLeave={() => setShowAspectRatioDropdown(false)}
              className={`rounded-full ${selectedAspectRatio ? 'px-3 py-1.5 h-auto' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
            >
              {selectedAspectRatio ? (
                <>
                  <Grid3X3 className="w-3.5 h-3.5 flex-shrink-0 text-[#0072a4]" />
                  <span className="text-xs whitespace-nowrap">{aspectRatios.find(a => a.id === selectedAspectRatio)?.name}</span>
                </>
              ) : (
                <Grid3X3 className="w-4 h-4 text-[#0072a4]" />
              )}
            </Button>
            
            <AnimatePresence>
            {showAspectRatioDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50"
                onMouseEnter={() => setShowAspectRatioDropdown(true)}
                onMouseLeave={() => setShowAspectRatioDropdown(false)}
              >
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      insertSelection('aspectRatio', ratio.id)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                  >
                    <div className="font-medium">{ratio.name}</div>
                    <div className="text-xs text-muted-foreground">{ratio.desc}</div>
                  </button>
                ))}
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* Quality */}
          <div className="relative" data-dropdown>
            <Button
              variant={selectedQuality ? "default" : "outline"}
              size="sm"
              onMouseEnter={() => setShowQualityDropdown(true)}
              onMouseLeave={() => setShowQualityDropdown(false)}
              className={`rounded-full ${selectedQuality ? 'px-3 py-1.5 h-auto' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
            >
              {selectedQuality ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-[#0072a4]" />
                  <span className="text-xs whitespace-nowrap">{qualities.find(q => q.id === selectedQuality)?.name}</span>
                </>
              ) : (
                <Sparkles className="w-4 h-4 text-[#0072a4]" />
              )}
            </Button>
            
            <AnimatePresence>
            {showQualityDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50"
                onMouseEnter={() => setShowQualityDropdown(true)}
                onMouseLeave={() => setShowQualityDropdown(false)}
              >
                {qualities.map((quality) => (
                  <button
                    key={quality.id}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      insertSelection('quality', quality.id)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                  >
                    <div className="font-medium">{quality.name}</div>
                    <div className="text-xs text-muted-foreground">{quality.desc}</div>
                  </button>
                ))}
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* Number of Images */}
          <div className="relative" data-dropdown>
            <Button
              variant={numberOfImages > 1 ? "default" : "outline"}
              size="sm"
              onMouseEnter={() => setShowNumberDropdown(true)}
              onMouseLeave={() => setShowNumberDropdown(false)}
              className={`rounded-full ${numberOfImages > 1 ? 'px-3 py-1.5 h-auto' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
            >
              {numberOfImages > 1 ? (
                <>
                  <Camera className="w-3.5 h-3.5 flex-shrink-0 text-[#0072a4]" />
                  <span className="text-xs whitespace-nowrap">{numberOfImages}</span>
                </>
              ) : (
                <Camera className="w-4 h-4 text-[#0072a4]" />
              )}
            </Button>
            
            <AnimatePresence>
            {showNumberDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50"
                onMouseEnter={() => setShowNumberDropdown(true)}
                onMouseLeave={() => setShowNumberDropdown(false)}
              >
                {[1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      selectNumberOfImages(count)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                  >
                    <div className="font-medium">{count} Image{count > 1 ? 's' : ''}</div>
                    <div className="text-xs text-muted-foreground">
                      Generate {count} image{count > 1 ? 's' : ''} at once
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
            </AnimatePresence>
          </div>
          </div>

          {/* Generate Button - Now in Character Count Position */}
          <div className="ml-auto hover:cursor-pointer relative">
            <Button
            
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="relative font-normal hover:cursor-pointer px-5 py-3 rounded-full transition-all duration-300 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed border-0 text-[#0072a4] text-base bg-white dark:bg-gray-900"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              <span className="absolute inset-0 rounded-full" style={{
                background: 'linear-gradient(to right, #5ED1E4, #A8D5AA, #F4C27E, #ED823A)',
                padding: '5px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }} />
              <span className="relative z-10 flex items-center gap-2 text-[#0072a4]">
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-pulse text-[#0072a4]" />
                    <span>Generating...</span>
                    <Sparkles className="w-5 h-5 animate-pulse text-[#0072a4]" />
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#0072a4]" />
                    <span>Generate</span>
                  </>
                )}
              </span>
            </Button>
          </div>
        </div>

        </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ImageGenerationPage