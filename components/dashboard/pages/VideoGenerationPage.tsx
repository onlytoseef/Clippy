"use client"

import React from "react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Video, 
  Wand2, 
  Upload,
  Play, 
  Pause,
  Download, 
  RefreshCw,
  Sparkles,
  Film,
  Camera,
  Edit,
  Clock,
  FileVideo,
  Image as ImageIcon,
  Brush,
  Drama,
  Rocket,
  Archive,
  Lightbulb,
  Send,
  ChevronDown,
  Copy,
  Share,
  Grid3X3
} from "lucide-react"

export function VideoGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
  const [selectedAspect, setSelectedAspect] = useState<string | null>(null)
  const [showStyleDropdown, setShowStyleDropdown] = useState(false)
  const [showDurationDropdown, setShowDurationDropdown] = useState(false)
  const [showAspectDropdown, setShowAspectDropdown] = useState(false)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const styles = [
    { id: "realistic", name: "Realistic", icon: Film, desc: "Photorealistic videos" },
    { id: "animated", name: "Animated", icon: Brush, desc: "Cartoon animation style" },
    { id: "cinematic", name: "Cinematic", icon: Camera, desc: "Movie-like quality" },
    { id: "artistic", name: "Artistic", icon: ImageIcon, desc: "Creative art style" },
    { id: "vintage", name: "Vintage", icon: Archive, desc: "Retro vintage look" },
    { id: "futuristic", name: "Futuristic", icon: Rocket, desc: "Sci-fi aesthetic" }
  ]

  const durations = [
    { id: "3", name: "3 seconds" },
    { id: "5", name: "5 seconds" },
    { id: "10", name: "10 seconds" },
    { id: "15", name: "15 seconds" },
    { id: "30", name: "30 seconds" }
  ]

  const aspects = [
    { id: "16:9", name: "Landscape", desc: "1920×1080" },
    { id: "9:16", name: "Portrait", desc: "1080×1920" },
    { id: "1:1", name: "Square", desc: "1080×1080" },
    { id: "4:3", name: "Classic", desc: "1440×1080" }
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
      setShowDurationDropdown(false)
      setShowAspectDropdown(false)
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedVideo("sample-video-url")
      setIsGenerating(false)
    }, 8000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const insertSelection = (type: 'style' | 'duration' | 'aspect', value: string) => {
    if (type === 'style') {
      setSelectedStyle(value)
      setShowStyleDropdown(false)
    } else if (type === 'duration') {
      setSelectedDuration(value)
      setShowDurationDropdown(false)
    } else if (type === 'aspect') {
      setSelectedAspect(value)
      setShowAspectDropdown(false)
    }
  }

  return (
    <div className="h-full flex flex-col p-6">
      {/* Video Preview - Centered */}
      <div className="flex-1 flex items-center justify-center">
        {generatedVideo ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-8 max-w-5xl w-full max-h-[70vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Video className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Generated Video</h2>
                  <p className="text-muted-foreground">
                    Style: {selectedStyle ? styles.find(s => s.id === selectedStyle)?.name : 'Default'} • 
                    Duration: {selectedDuration || '5'}s • 
                    Aspect: {selectedAspect || '16:9'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-secondary/30 rounded-xl overflow-hidden border border-border relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <Button
                  onClick={togglePlayback}
                  variant="secondary"
                  size="lg"
                  className="rounded-full w-16 h-16"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>
              </div>
            </div>

            {/* Video Controls */}
            <div className="bg-secondary/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium">Video Playback</h3>
                  <p className="text-sm text-muted-foreground">Generated content ready</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{ duration: parseInt(selectedDuration || '5'), ease: "linear" }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0:00</span>
                <span>0:{(selectedDuration || '5').padStart(2, '0')}</span>
              </div>
            </div>

            {/* Video Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">{selectedAspect || '16:9'}</div>
                <div className="text-xs text-muted-foreground">Aspect</div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">MP4</div>
                <div className="text-xs text-muted-foreground">Format</div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">{selectedDuration || '5'}s</div>
                <div className="text-xs text-muted-foreground">Length</div>
              </div>
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
              <h3 className="text-lg font-medium mb-2">Creating Video...</h3>
              <p className="text-muted-foreground">
                Generating {selectedDuration || '5'}s video in {selectedStyle ? styles.find(s => s.id === selectedStyle)?.name.toLowerCase() : 'default'} style
              </p>
              <div className="mt-4 w-64 bg-secondary rounded-full h-2 mx-auto">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8 }}
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
                <Video className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Ready to Create</h3>
              <p className="text-muted-foreground">
                Describe your video and let AI bring it to life
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Input Interface */}
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
            <h3 className="text-lg font-bold">Video Generator</h3>
            <p className="text-sm text-muted-foreground">
              Describe your video scene and select options
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
                  {React.createElement(styles.find(s => s.id === selectedStyle)?.icon || Film, { className: "w-4 h-4" })}
                  {styles.find(s => s.id === selectedStyle)?.name}
                </>
              ) : (
                <>
                  <Film className="w-4 h-4" />
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

          {/* Duration */}
          <div className="relative">
            <Button
              variant={selectedDuration ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowDurationDropdown(!showDurationDropdown)
              }}
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              {selectedDuration ? durations.find(d => d.id === selectedDuration)?.name : "Duration"}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showDurationDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10">
                {durations.map((duration) => (
                  <button
                    key={duration.id}
                    onClick={() => insertSelection('duration', duration.id)}
                    className="w-full px-3 py-2 text-left hover:bg-secondary first:rounded-t-lg last:rounded-b-lg"
                  >
                    {duration.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Aspect Ratio */}
          <div className="relative">
            <Button
              variant={selectedAspect ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowAspectDropdown(!showAspectDropdown)
              }}
              className="flex items-center gap-2"
            >
              <Grid3X3 className="w-4 h-4" />
              {selectedAspect ? aspects.find(a => a.id === selectedAspect)?.name : "Aspect"}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showAspectDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10">
                {aspects.map((aspect) => (
                  <button
                    key={aspect.id}
                    onClick={() => insertSelection('aspect', aspect.id)}
                    className="w-full px-3 py-2 text-left hover:bg-secondary first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="font-medium">{aspect.name}</div>
                    <div className="text-xs text-muted-foreground">{aspect.desc}</div>
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
            placeholder="Describe your video scene... (e.g., 'A serene sunset over ocean waves with birds flying')"
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
          <div className="flex items-center gap-1">
            <Lightbulb className="w-3 h-3" />
            <span>Include camera movements, lighting, and specific actions</span>
          </div>
          <span>{prompt.length}/800 characters</span>
        </div>
        </motion.div>
      </div>
    </div>
  )
}