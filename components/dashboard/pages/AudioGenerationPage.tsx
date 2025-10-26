"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  Smile,
  SkipBack,
  SkipForward
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

  const skipBackward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5)
  }

  const skipForward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 5)
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
            {/* Header with metadata */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Volume2 className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Generated Audio</h2>
                  <p className="text-muted-foreground">
                    {selectedVoice ? voices.find(v => v.id === selectedVoice)?.name : 'Default Voice'} • 
                    {selectedEmotion || 'Neutral'}
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Simple Audio Player */}
            <div className="w-full mx-auto flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-secondary/30 backdrop-blur-xl border-0 rounded-3xl p-8 shadow-lg w-full max-w-2xl"
                style={{
                  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
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
                  {/* Skip Backward Button */}
                  <Button
                    onClick={skipBackward}
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-white/10 dark:bg-gray-800/10 border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20"
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>

                  {/* Play/Pause Button */}
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

                  {/* Skip Forward Button */}
                  <Button
                    onClick={skipForward}
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-white/10 dark:bg-gray-800/10 border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-800/20"
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  
                  {/* Download Button */}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-transparent border-0 rounded-xl p-8 max-w-4xl w-full flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Ready to Create</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Enter your text below in any Language and select voice settings to create high-quality speech
              </p>
            </div>
          </motion.div>
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
            placeholder="Input your text in desired language ..."
            className="w-full pl-12 pr-12 bg-transparent border-none resize-none focus:outline-none min-h-[40px] max-h-[200px] text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            style={{ overflow: 'auto' }}
            rows={1}
          />
          
          {/* Character Count - Now in Button Position */}
          <div className="absolute right-3 bottom-3 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            <span>{prompt.length}/5000</span>
          </div>
        </div>

        {/* Voice Selection with Generate Button - Same Line */}
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
            
            <AnimatePresence>
            {showVoiceDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
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
              </motion.div>
            )}
            </AnimatePresence>
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
            
            <AnimatePresence>
            {showEmotionDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
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
              </motion.div>
            )}
            </AnimatePresence>
          </div>
          </div>

          {/* Generate Button - Now in Character Count Position */}
          <div className="ml-auto relative">
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