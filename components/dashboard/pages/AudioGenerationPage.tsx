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
  User,
  Flame,
  Heart,
  ChevronDown,
  Send,
  Lightbulb,
  RotateCcw,
  Clock,
  Activity,
  Smile
} from "lucide-react"

type GeneratedAudio = {
  url: string
  filename: string
  duration?: number
}

export function AudioGenerationPage() {
  const [prompt, setPrompt] = useState("")
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null)
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [selectedSpeed, setSelectedSpeed] = useState("0.9")
  const [generatedAudio, setGeneratedAudio] = useState<GeneratedAudio | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showWaveform, setShowWaveform] = useState(true)
  const [showVoiceDropdown, setShowVoiceDropdown] = useState(false)
  const [showEmotionDropdown, setShowEmotionDropdown] = useState(false)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const voices = [
    { id: "Zephyr", name: "Ali Usman" },
    { id: "Rasalgethi", name: "Toseef" },
    { id: "Gacrux", name: "Taliya" },
    { id: "Fenrir", name: "Umar" },
    { id: "Informative", name: "Faisal Warraich" }
  ]

  const emotions = [
    { id: "Urdu Poetry", name: "Urdu Poetry" },
    { id: "Documentary", name: "Documentary" },
    { id: "Cheerful", name: "Cheerful" },
    { id: "Professional", name: "Professional" },
    { id: "Conversational", name: "Conversational" }
  ]

  const speeds = [
    { id: "0.7", name: "Slow", desc: "0.7x speed" },
    { id: "0.9", name: "Normal", desc: "0.9x speed" },
    { id: "1.1", name: "Fast", desc: "1.1x speed" },
    { id: "1.3", name: "Very Fast", desc: "1.3x speed" }
  ]

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [prompt])

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [generatedAudio])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: prompt.trim(),
          voice: selectedVoice || "Zephyr",
          emotion: selectedEmotion || "Urdu Poetry",
          speed: parseFloat(selectedSpeed)
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate audio')
      }

      const blob = await response.blob()
      const audioUrl = URL.createObjectURL(blob)
      const filename = `audio_${Date.now()}.wav`
      
      setGeneratedAudio({
        url: audioUrl,
        filename
      })

    } catch (error) {
      console.error('Audio generation failed:', error)
      alert('Failed to generate audio. Please try again.')
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

  const togglePlayPause = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const downloadAudio = () => {
    if (!generatedAudio) return
    
    const link = document.createElement('a')
    link.href = generatedAudio.url
    link.download = generatedAudio.filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const Waveform = () => (
    <div className="flex items-center justify-center gap-1 h-8">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-orange-500 to-orange-300 rounded-full"
          style={{ 
            height: `${Math.random() * 20 + 8}px`,
            opacity: currentTime > 0 && duration > 0 ? (i < (currentTime / duration) * 20 ? 1 : 0.3) : 0.7
          }}
          animate={{ 
            height: isPlaying ? `${Math.random() * 24 + 8}px` : `${Math.random() * 16 + 8}px`
          }}
          transition={{ 
            repeat: isPlaying ? Infinity : 0,
            duration: 0.5 + Math.random() * 0.5,
            ease: "easeInOut" 
          }}
        />
      ))}
    </div>
  )

  return (
    <div className="h-full p-4 sm:p-6">
      <div className="h-full flex flex-col">
        {/* Audio Preview - Centered */}
        <div className="flex-1 flex items-center justify-center">
        {generatedAudio ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-transparent border-0 rounded-xl p-8 max-w-5xl w-full max-h-[70vh] overflow-y-auto"
          >
            {/* Custom Simple Audio Player */}
            <div className="w-full mx-auto mb-8 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-transparent backdrop-blur-xl border-0 rounded-3xl p-6 shadow-none"
                style={{
                  background: 'transparent',
                  backdropFilter: 'none',
                  WebkitBackdropFilter: 'none',
                }}
              >
                {/* Audio Element */}
                <audio ref={audioRef} src={generatedAudio.url} />
                
                {/* Waveform Visualization */}
                <div className="mb-6">
                  <Waveform />
                </div>
                
                {/* Time Display */}
                <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400 mb-4">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                
                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={togglePlayPause}
                    size="lg"
                    className="rounded-full w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg transition-all duration-200"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </Button>
                  
                  <Button
                    onClick={downloadAudio}
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-white/10 dark:bg-gray-800/10 border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-0 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 flex items-center justify-center">
              <Volume2 className="w-12 h-12 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Generate Audio
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
              Enter your text below and select voice settings to create high-quality speech
            </p>
          </div>
        )}
        </div>

      {/* Input Section - Bottom */}
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
            placeholder="Enter text to convert to speech..."
            className="w-full pl-12 pr-12 bg-transparent border-none resize-none focus:outline-none min-h-[40px] max-h-[200px] text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            style={{ overflow: 'auto' }}
            rows={1}
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

        {/* Voice Selection with Character Count - Same Line */}
        <div className="flex flex-wrap gap-2 mb-2 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
        {/* Voice Dropdown */}
        <div className="relative" data-dropdown>
            <Button
              variant="outline"
              size="sm"
              onMouseEnter={() => setShowVoiceDropdown(true)}
              onMouseLeave={() => setShowVoiceDropdown(false)}
              className={`rounded-full ${selectedVoice ? 'px-3 py-1.5 h-auto' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
            >
              {selectedVoice ? (
                <>
                  <User className="w-3.5 h-3.5 flex-shrink-0 text-[#0072a4]" />
                  <span className="text-xs whitespace-nowrap">{voices.find(v => v.id === selectedVoice)?.name}</span>
                </>
              ) : (
                <User className="w-4 h-4 text-[#0072a4]" />
              )}
            </Button>
            
            {showVoiceDropdown && (
              <div 
                className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 min-w-[140px]"
                onMouseEnter={() => setShowVoiceDropdown(true)}
                onMouseLeave={() => setShowVoiceDropdown(false)}
              >
                {voices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => {
                      setSelectedVoice(voice.id)
                      setShowVoiceDropdown(false)
                    }}
                    className="w-full px-3 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                  >
                    <div className="text-sm">{voice.name}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Emotion Dropdown */}
          <div className="relative" data-dropdown>
            <Button
              variant="outline"
              size="sm"
              onMouseEnter={() => setShowEmotionDropdown(true)}
              onMouseLeave={() => setShowEmotionDropdown(false)}
              className={`rounded-full ${selectedEmotion ? 'px-3 py-1.5 h-auto' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
            >
              {selectedEmotion ? (
                <>
                  <Smile className="w-3.5 h-3.5 flex-shrink-0 text-[#0072a4]" />
                  <span className="text-xs whitespace-nowrap">{selectedEmotion}</span>
                </>
              ) : (
                <Smile className="w-4 h-4 text-[#0072a4]" />
              )}
            </Button>
            
            {showEmotionDropdown && (
              <div 
                className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 min-w-[160px]"
                onMouseEnter={() => setShowEmotionDropdown(true)}
                onMouseLeave={() => setShowEmotionDropdown(false)}
              >
                {emotions.map((emotion) => (
                  <button
                    key={emotion.id}
                    onClick={() => {
                      setSelectedEmotion(emotion.id)
                      setShowEmotionDropdown(false)
                    }}
                    className="w-full px-3 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                  >
                    <div className="text-sm">{emotion.name}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          </div>

          {/* Character Count - Same Line as Features */}
          <div className="text-xs text-muted-foreground whitespace-nowrap ml-auto">
            <span>{prompt.length}/5000 characters</span>
          </div>
        </div>

        </motion.div>
      </div>
      </div>
    </div>
  )
}