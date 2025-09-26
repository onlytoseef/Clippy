"use client"

import React from "react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Volume2, 
  Wand2, 
  Play, 
  Pause,
  Download, 
  RefreshCw,
  Sparkles,
  Music,
  Mic,
  Headphones,
  Clock,
  User,
  Flag,
  Smile,
  Zap,
  Heart,
  MessageCircle,
  Frown,
  Meh,
  Lightbulb,
  Send,
  ChevronDown,
  Copy,
  Share
} from "lucide-react"

export function AudioGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null)
  const [selectedSpeed, setSelectedSpeed] = useState<string | null>(null)
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [showVoiceDropdown, setShowVoiceDropdown] = useState(false)
  const [showSpeedDropdown, setShowSpeedDropdown] = useState(false)
  const [showEmotionDropdown, setShowEmotionDropdown] = useState(false)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const voices = [
    { id: "oliver", name: "Oliver", accent: "Canadian", gender: "Male", icon: User },
    { id: "emma", name: "Emma", accent: "Australian", gender: "Female", icon: User },
    { id: "marcus", name: "Marcus", accent: "British", gender: "Male", icon: User },
    { id: "sophia", name: "Sophia", accent: "American", gender: "Female", icon: User },
    { id: "liam", name: "Liam", accent: "Irish", gender: "Male", icon: User },
    { id: "ava", name: "Ava", accent: "Indian", gender: "Female", icon: User }
  ]

  const speeds = [
    { id: "0.5", name: "0.5x (Slow)" },
    { id: "0.75", name: "0.75x" },
    { id: "1", name: "1x (Normal)" },
    { id: "1.25", name: "1.25x" },
    { id: "1.5", name: "1.5x (Fast)" },
    { id: "2", name: "2x (Very Fast)" }
  ]

  const emotions = [
    { id: "neutral", name: "Neutral", icon: Meh, desc: "Natural tone" },
    { id: "happy", name: "Happy", icon: Smile, desc: "Cheerful voice" },
    { id: "excited", name: "Excited", icon: Zap, desc: "Energetic tone" },
    { id: "calm", name: "Calm", icon: Heart, desc: "Peaceful voice" },
    { id: "professional", name: "Professional", icon: MessageCircle, desc: "Business tone" },
    { id: "sad", name: "Sad", icon: Frown, desc: "Melancholic tone" }
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
      setShowVoiceDropdown(false)
      setShowSpeedDropdown(false)
      setShowEmotionDropdown(false)
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedAudio("sample-audio-url")
      setIsGenerating(false)
    }, 5000)
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

  const insertSelection = (type: 'voice' | 'speed' | 'emotion', value: string) => {
    if (type === 'voice') {
      setSelectedVoice(value)
      setShowVoiceDropdown(false)
    } else if (type === 'speed') {
      setSelectedSpeed(value)
      setShowSpeedDropdown(false)
    } else if (type === 'emotion') {
      setSelectedEmotion(value)
      setShowEmotionDropdown(false)
    }
  }

  return (
    <div className="h-full flex flex-col p-6">
      {/* Audio Preview - Centered */}
      <div className="flex-1 flex items-center justify-center">
        {generatedAudio ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-8 max-w-4xl w-full max-h-[70vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Volume2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Generated Audio</h2>
                  <p className="text-muted-foreground">
                    Voice: {selectedVoice ? voices.find(v => v.id === selectedVoice)?.name : 'Default'} • 
                    Speed: {selectedSpeed || '1'}x • 
                    Emotion: {selectedEmotion ? emotions.find(e => e.id === selectedEmotion)?.name : 'Neutral'}
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

            {/* Audio Player */}
            <div className="bg-secondary/30 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={togglePlayback}
                    variant="secondary"
                    size="lg"
                    className="rounded-full w-12 h-12"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  
                  <div>
                    <h3 className="font-medium">Audio Playback</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedVoice ? voices.find(v => v.id === selectedVoice)?.name : 'Default'} voice
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">2:34</div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </div>
              </div>

              {/* Waveform Visualization */}
              <div className="flex items-end justify-center gap-1 h-16 mb-4">
                {Array.from({ length: 50 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-t from-blue-500 to-purple-500 w-1 rounded-full"
                    style={{ height: `${Math.random() * 100}%` }}
                    animate={isPlaying ? {
                      height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: isPlaying ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{ duration: 154, ease: "linear" }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0:00</span>
                <span>2:34</span>
              </div>
            </div>

            {/* Audio Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">MP3</div>
                <div className="text-xs text-muted-foreground">Format</div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">320kbps</div>
                <div className="text-xs text-muted-foreground">Quality</div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">{selectedSpeed || '1'}x</div>
                <div className="text-xs text-muted-foreground">Speed</div>
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
              <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Generating Audio...</h3>
              <p className="text-muted-foreground">
                Creating speech with {selectedVoice ? voices.find(v => v.id === selectedVoice)?.name : 'default'} voice
              </p>
              <div className="mt-4 w-64 bg-secondary rounded-full h-2 mx-auto">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5 }}
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
                <Volume2 className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Ready to Generate</h3>
              <p className="text-muted-foreground">
                Enter your text and let AI create natural speech
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
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Wand2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Text to Speech</h3>
            <p className="text-sm text-muted-foreground">
              Enter text and select voice options
            </p>
          </div>
        </div>

        {/* Feature Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Voice */}
          <div className="relative">
            <Button
              variant={selectedVoice ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowVoiceDropdown(!showVoiceDropdown)
              }}
              className="flex items-center gap-2"
            >
              {selectedVoice ? (
                <>
                  <User className="w-4 h-4" />
                  {voices.find(v => v.id === selectedVoice)?.name}
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  Voice
                </>
              )}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showVoiceDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10 min-w-48">
                {voices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => insertSelection('voice', voice.id)}
                    className="w-full px-3 py-2 text-left hover:bg-secondary flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <User className="w-4 h-4" />
                    <div>
                      <div className="font-medium">{voice.name}</div>
                      <div className="text-xs text-muted-foreground">{voice.accent} • {voice.gender}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Speed */}
          <div className="relative">
            <Button
              variant={selectedSpeed ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowSpeedDropdown(!showSpeedDropdown)
              }}
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              {selectedSpeed ? speeds.find(s => s.id === selectedSpeed)?.name : "Speed"}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showSpeedDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10">
                {speeds.map((speed) => (
                  <button
                    key={speed.id}
                    onClick={() => insertSelection('speed', speed.id)}
                    className="w-full px-3 py-2 text-left hover:bg-secondary first:rounded-t-lg last:rounded-b-lg"
                  >
                    {speed.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Emotion */}
          <div className="relative">
            <Button
              variant={selectedEmotion ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowEmotionDropdown(!showEmotionDropdown)
              }}
              className="flex items-center gap-2"
            >
              {selectedEmotion ? (
                <>
                  {React.createElement(emotions.find(e => e.id === selectedEmotion)?.icon || Smile, { className: "w-4 h-4" })}
                  {emotions.find(e => e.id === selectedEmotion)?.name}
                </>
              ) : (
                <>
                  <Smile className="w-4 h-4" />
                  Emotion
                </>
              )}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showEmotionDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10 min-w-48">
                {emotions.map((emotion) => {
                  const Icon = emotion.icon
                  return (
                    <button
                      key={emotion.id}
                      onClick={() => insertSelection('emotion', emotion.id)}
                      className="w-full px-3 py-2 text-left hover:bg-secondary flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <Icon className="w-4 h-4" />
                      <div>
                        <div className="font-medium">{emotion.name}</div>
                        <div className="text-xs text-muted-foreground">{emotion.desc}</div>
                      </div>
                    </button>
                  )
                })}
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
            placeholder="Enter text to convert to speech... (e.g., 'Welcome to our platform. We're excited to help you achieve your goals.')"
            className="w-full p-4 pr-12 bg-secondary/50 border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[60px] max-h-[200px]"
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
            <span>Use clear punctuation for natural speech rhythm</span>
          </div>
          <span>{prompt.length}/5000 characters</span>
        </div>
        </motion.div>
      </div>
    </div>
  )
}