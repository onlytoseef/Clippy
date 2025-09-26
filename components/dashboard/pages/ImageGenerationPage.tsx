"use client"

import React from "react"
import { motion } from "framer-motion"
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
  const [selectedSize, setSelectedSize] = useState<string>('1K')
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>('1:1')
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
          sampleImageSize: selectedSize,
          aspectRatio: selectedAspectRatio,
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
    <div className="h-full flex flex-col p-6">
      {/* Generated Images Display - Centered */}
      <div className="flex-1 flex items-center justify-center">
        {generatedImages.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-8 max-w-6xl w-full max-h-[70vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <ImageIcon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Generated Images</h2>
                  <p className="text-muted-foreground">{generatedImages.length} images ready</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-secondary/30 rounded-xl overflow-hidden border border-border"
                >
                  <Image
                    src={image.dataUrl}
                    width={256}
                    height={256}
                    alt={`Generated image ${image.index}`}
                    className="w-full h-64 object-cover"
                  />
                  
                  {/* Download button - bottom left */}
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      downloadImage(image)
                    }}
                    className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Download className="w-4 h-4" />
                  </Button>

                  {/* Center overlay buttons */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          expandImage(image)
                        }}
                      >
                        <Expand className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          copyImage(image)
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : isGenerating ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-xl p-8 max-w-4xl w-full flex items-center justify-center"
          >
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Generating Images...</h3>
              <p className="text-muted-foreground">
                Creating {selectedStyle ? styles.find(s => s.id === selectedStyle)?.name.toLowerCase() : 'beautiful'} images for you
              </p>
              <div className="mt-4 w-64 bg-secondary rounded-full h-2 mx-auto">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4 }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-xl p-8 max-w-4xl w-full flex items-center justify-center"
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

      {/* Input Field Section - Bottom */}
      <div className="mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Wand2 className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Image Generator</h3>
            <p className="text-sm text-muted-foreground">
              Describe your image and select style options
            </p>
          </div>
        </div>

        {/* Feature Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Style */}
          <div className="relative" data-dropdown>
            <Button
              variant={selectedStyle ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowStyleDropdown(prev => !prev)
              }}
              className="flex items-center gap-2"
            >
              {selectedStyle ? (
                <>
                  {React.createElement(styles.find(s => s.id === selectedStyle)?.icon || Brush, { className: "w-4 h-4" })}
                  {styles.find(s => s.id === selectedStyle)?.name}
                </>
              ) : (
                <>
                  <Brush className="w-4 h-4" />
                  Style
                </>
              )}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showStyleDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 min-w-48">
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
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <div>
                        <div className="font-medium">{style.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{style.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Image Size */}
          <div className="relative" data-dropdown>
            <Button
              variant={selectedSize !== '1K' ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowSizeDropdown(prev => !prev)
              }}
              className="flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {imageSizes.find(s => s.id === selectedSize)?.name || "1K Quality"}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showSizeDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
                {imageSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      insertSelection('size', size.id)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    <div className="font-medium">{size.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{size.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Aspect Ratio */}
          <div className="relative" data-dropdown>
            <Button
              variant={selectedAspectRatio !== '1:1' ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowAspectRatioDropdown(prev => !prev)
              }}
              className="flex items-center gap-2"
            >
              <Grid3X3 className="w-4 h-4" />
              {aspectRatios.find(a => a.id === selectedAspectRatio)?.name || "Square"}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showAspectRatioDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      insertSelection('aspectRatio', ratio.id)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    <div className="font-medium">{ratio.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{ratio.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quality */}
          <div className="relative" data-dropdown>
            <Button
              variant={selectedQuality ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowQualityDropdown(prev => !prev)
              }}
              className="flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {selectedQuality ? qualities.find(q => q.id === selectedQuality)?.name : "Quality"}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showQualityDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
                {qualities.map((quality) => (
                  <button
                    key={quality.id}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      insertSelection('quality', quality.id)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    <div className="font-medium">{quality.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{quality.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Number of Images */}
          <div className="relative" data-dropdown>
            <Button
              variant={numberOfImages > 1 ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowNumberDropdown(prev => !prev)
              }}
              className="flex items-center gap-2"
            >
              <Grid3X3 className="w-4 h-4" />
              {numberOfImages} Image{numberOfImages > 1 ? 's' : ''}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showNumberDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
                {[1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      selectNumberOfImages(count)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    <div className="font-medium">{count} Image{count > 1 ? 's' : ''}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Generate {count} image{count > 1 ? 's' : ''} at once
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Token Usage Display */}
        {tokensUsed > 0 && (
          <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium">Tokens Used: {tokensUsed}</span>
            </div>
          </div>
        )}

        {/* Input Field */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your image... (e.g., 'A majestic mountain landscape at sunset with golden light')"
            className="w-full p-4 pr-12 bg-secondary/50 border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[60px] max-h-[200px]"
            style={{ overflow: 'hidden' }}
          />
          
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            size="sm"
            className="absolute right-2 bottom-2"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>Press Enter to generate or Shift+Enter for new line</span>
          <span>{prompt.length}/1000 characters</span>
        </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ImageGenerationPage