"use client"

import React from "react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Image, 
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
  Grid3X3
} from "lucide-react"

export function ImageGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [prompt, setPrompt] = useState("")
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null)
  const [showStyleDropdown, setShowStyleDropdown] = useState(false)
  const [showSizeDropdown, setShowSizeDropdown] = useState(false)
  const [showQualityDropdown, setShowQualityDropdown] = useState(false)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const styles = [
    { id: "realistic", name: "Realistic", icon: Image, desc: "Photorealistic images" },
    { id: "artistic", name: "Artistic", icon: Brush, desc: "Creative artistic style" },
    { id: "cartoon", name: "Cartoon", icon: Drama, desc: "Animated cartoon style" },
    { id: "abstract", name: "Abstract", icon: Rainbow, desc: "Abstract art style" },
    { id: "minimalist", name: "Minimalist", icon: Circle, desc: "Clean simple style" },
    { id: "vintage", name: "Vintage", icon: Camera, desc: "Retro vintage look" }
  ]

  const sizes = [
    { id: "square", name: "Square", desc: "1024×1024" },
    { id: "portrait", name: "Portrait", desc: "1024×1792" },
    { id: "landscape", name: "Landscape", desc: "1792×1024" }
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
    const handleClickOutside = () => {
      setShowStyleDropdown(false)
      setShowSizeDropdown(false)
      setShowQualityDropdown(false)
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      // Generate placeholder images
      const newImages = Array.from({ length: 4 }, (_, i) => 
        `https://picsum.photos/512/512?random=${Date.now()}-${i}`
      )
      setGeneratedImages(newImages)
      setIsGenerating(false)
    }, 4000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  const insertSelection = (type: 'style' | 'size' | 'quality', value: string) => {
    if (type === 'style') {
      setSelectedStyle(value)
      setShowStyleDropdown(false)
    } else if (type === 'size') {
      setSelectedSize(value)
      setShowSizeDropdown(false)
    } else if (type === 'quality') {
      setSelectedQuality(value)
      setShowQualityDropdown(false)
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
                  <Image className="w-6 h-6 text-green-400" />
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
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-secondary/30 rounded-xl overflow-hidden border border-border"
                >
                  <img
                    src={image}
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Expand className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
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
                <Image className="w-12 h-12 text-muted-foreground" />
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
          <div className="relative">
            <Button
              variant={selectedStyle ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowStyleDropdown(!showStyleDropdown)
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
              <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10 min-w-48">
                {styles.map((style) => {
                  const Icon = style.icon
                  return (
                    <button
                      key={style.id}
                      onClick={() => insertSelection('style', style.id)}
                      className="w-full px-3 py-2 text-left hover:bg-secondary flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <Icon className="w-4 h-4" />
                      <div>
                        <div className="font-medium">{style.name}</div>
                        <div className="text-xs text-muted-foreground">{style.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Size */}
          <div className="relative">
            <Button
              variant={selectedSize ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowSizeDropdown(!showSizeDropdown)
              }}
              className="flex items-center gap-2"
            >
              <Grid3X3 className="w-4 h-4" />
              {selectedSize ? sizes.find(s => s.id === selectedSize)?.name : "Size"}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showSizeDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => insertSelection('size', size.id)}
                    className="w-full px-3 py-2 text-left hover:bg-secondary first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="font-medium">{size.name}</div>
                    <div className="text-xs text-muted-foreground">{size.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quality */}
          <div className="relative">
            <Button
              variant={selectedQuality ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowQualityDropdown(!showQualityDropdown)
              }}
              className="flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {selectedQuality ? qualities.find(q => q.id === selectedQuality)?.name : "Quality"}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showQualityDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10">
                {qualities.map((quality) => (
                  <button
                    key={quality.id}
                    onClick={() => insertSelection('quality', quality.id)}
                    className="w-full px-3 py-2 text-left hover:bg-secondary first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="font-medium">{quality.name}</div>
                    <div className="text-xs text-muted-foreground">{quality.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

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