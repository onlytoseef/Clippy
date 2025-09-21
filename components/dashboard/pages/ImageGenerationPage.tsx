"use client"

import { motion } from "framer-motion"
import { useState } from "react"
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
  Lightbulb
} from "lucide-react"

export function ImageGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    prompt: "",
    style: "realistic",
    size: "1024x1024",
    quality: "standard",
    count: 1
  })

  const styles = [
    { id: "realistic", name: "Realistic", preview: Image },
    { id: "artistic", name: "Artistic", preview: Brush },
    { id: "cartoon", name: "Cartoon", preview: Drama },
    { id: "abstract", name: "Abstract", preview: Rainbow },
    { id: "minimalist", name: "Minimalist", preview: Circle },
    { id: "vintage", name: "Vintage", preview: Camera }
  ]

  const sizes = [
    { id: "1024x1024", name: "Square (1024×1024)", ratio: "1:1" },
    { id: "1024x1792", name: "Portrait (1024×1792)", ratio: "9:16" },
    { id: "1792x1024", name: "Landscape (1792×1024)", ratio: "16:9" }
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      // Generate placeholder images
      const newImages = Array(formData.count).fill(null).map((_, i) => 
        `https://picsum.photos/400/400?random=${Date.now() + i}`
      )
      setGeneratedImages(newImages)
      setIsGenerating(false)
    }, 4000)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Images Created", value: "8,432", icon: Image, color: "blue" },
          { label: "Styles Available", value: "50+", icon: Palette, color: "purple" },
          { label: "Generation Speed", value: "3.2s", icon: Zap, color: "yellow" },
          { label: "User Rating", value: "4.9★", icon: Heart, color: "red" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Configuration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Wand2 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Image Generator</h2>
              <p className="text-muted-foreground">Create stunning visuals with AI</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Prompt Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Image Description</label>
              <textarea
                placeholder="Describe the image you want to create... Be detailed for better results!"
                value={formData.prompt}
                onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                className="w-full p-4 bg-secondary/50 border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                rows={4}
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                Tip: Include details like colors, lighting, mood, and style for better results
              </p>
            </div>

            {/* Style Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Art Style</label>
              <div className="grid grid-cols-3 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setFormData({...formData, style: style.id})}
                    className={`p-4 rounded-xl border transition-all text-center ${
                      formData.style === style.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-border bg-secondary/30 hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <style.preview className="w-8 h-8 text-muted-foreground mb-2" />
                      <div className="font-medium text-sm text-center">{style.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size & Quality */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-medium">Image Size</label>
                <div className="grid grid-cols-1 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setFormData({...formData, size: size.id})}
                      className={`p-3 rounded-lg border transition-all text-left ${
                        formData.size === size.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-border bg-secondary/30 hover:bg-secondary/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{size.name}</span>
                        <span className="text-sm text-muted-foreground">{size.ratio}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-medium">Quality</label>
                <select
                  value={formData.quality}
                  onChange={(e) => setFormData({...formData, quality: e.target.value})}
                  className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="standard">Standard</option>
                  <option value="hd">HD Quality</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Number of Images</label>
                <select
                  value={formData.count}
                  onChange={(e) => setFormData({...formData, count: parseInt(e.target.value)})}
                  className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value={1}>1 Image</option>
                  <option value={2}>2 Images</option>
                  <option value={4}>4 Images</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!formData.prompt || isGenerating}
              className="w-full"
              size="lg"
              variant="destructive"
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Creating Your Image...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Generate Images
                </div>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Generated Images */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Image className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Generated Images</h2>
                <p className="text-muted-foreground">Your AI-created artwork</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {generatedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {generatedImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="aspect-square bg-secondary/30 rounded-xl overflow-hidden border border-border">
                      <img 
                        src={image} 
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Image Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Images Generated Yet</h3>
                  <p className="text-muted-foreground">
                    Describe what you want to create and let AI do the magic
                  </p>
                </div>
              </div>
            )}

            {/* Generation Progress */}
            {isGenerating && (
              <div className="bg-secondary/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
                  <span className="font-medium">Creating your masterpiece...</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4 }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  This usually takes 3-5 seconds...
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ImageGenerationPage