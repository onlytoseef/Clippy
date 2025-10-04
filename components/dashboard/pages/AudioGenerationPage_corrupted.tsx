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
  const [selectedVoice, setSelectedVoice] = useState<string>('Zephyr')
  const [selectedEmotion, setSelectedEmotion] = useState<string>('Urdu Poetry')


  
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
    { id: "Calm", name: "Calm" },
    { id: "Dramatic", name: "Dramatic" }
  ]

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [prompt])





  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // Map display names to full speaking style prompts
    const speakingStyleMap: { [key: string]: string } = {
      'Urdu Poetry': 'A deep, measured Urdu voice with precise diction, classical intonation, poetic rhythm, and theatrical pauses full of gravitas',
      'Documentary': 'A calm, deep, steady-paced voice with clear articulation, reflective pauses, and an authoritative yet soothing tone, carrying a sense of wisdom and cinematic gravity',
      'Cheerful': 'Say cheerfully',
      'Professional': 'Say professionally', 
      'Calm': 'Say calmly',
      'Dramatic': 'Say dramatically'
    }
    
    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voiceName: selectedVoice,
          speakingStyle: speakingStyleMap[selectedEmotion] || 'Say cheerfully',
          content: prompt.trim()
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate audio')
      }

      const data = await response.json()
      console.log('API Response:', data)
      setGeneratedAudio(data.audioUrl)
    } catch (error) {
      console.error('Audio generation error:', error)
      alert(error instanceof Error ? error.message : 'Failed to generate audio')
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

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const insertSelection = (type: 'voice' | 'emotion', value: string) => {
    console.log(`Selecting ${type}:`, value) // Debug log
    if (type === 'voice') {
      setSelectedVoice(value)
    } else if (type === 'emotion') {
      setSelectedEmotion(value)
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
            className="bg-transparent w-full max-w-full flex flex-col items-center justify-center"
          >


            {/* Custom Simple Audio Player */}
            <div className="w-full max-w-sm mx-auto mb-8">
              <motion.div 
                className="bg-white/5 dark:bg-gray-800/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 dark:border-gray-700/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Hidden Audio Element */}
                <audio 
                  ref={audioRef}
                  src={generatedAudio}
                  preload="metadata"
                  onError={(e) => {
                    console.error('Audio playback error:', e)
                  }}
                />

                {/* WhatsApp-style Voice Message Player */}
                <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl p-4 max-w-md mx-auto">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                      onClick={() => {
                        if (audioRef.current) {
                          if (audioRef.current.paused) {
                            audioRef.current.play();
                            setIsPlaying(true);
                          } else {
                            audioRef.current.pause();
                            setIsPlaying(false);
                          }
                        }
                      }}
                    >
                      {isPlaying ? (
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </motion.button>

                    {/* Waveform-style Progress */}
                    <div className="flex-1 flex items-center gap-1">
                      {/* Animated waveform bars */}
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-200 ${
                            i < 6 ? 'bg-orange-500 h-4' : 
                            i < 12 ? 'bg-gray-400 dark:bg-gray-600 h-2' : 
                            'bg-gray-300 dark:bg-gray-700 h-3'
                          } ${isPlaying && i < 6 ? 'animate-pulse' : ''}`}
                        />
                      ))}
                    </div>

                    {/* Duration */}
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono min-w-[2.5rem]">
                      0:00
                    </span>

                    {/* Download Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 rounded-full flex items-center justify-center transition-all duration-200 border border-blue-400/30"
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = generatedAudio
                        link.download = `generated-audio-${Date.now()}.wav`
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }}
                    >
                      <Download className="w-3.5 h-3.5 text-blue-400" />
                    </motion.button>
                  </div>

                  {/* Hidden progress bar for functionality */}
                  <div className="hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full transition-all duration-300"
                      style={{ width: "0%" }}
                      id="audio-progress"
                    />
                  </div>
                </div>
              </motion.div>
            </div>


          </motion.div>
        ) : isGenerating ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-xl p-8 max-w-4xl w-full flex items-center justify-center"
          >
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Generating Audio...</h3>
              <p className="text-muted-foreground">
                Creating speech with {selectedVoice ? voices.find(v => v.id === selectedVoice)?.name : 'default'} voice
              </p>
              <div className="mt-4 w-64 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-full h-2 mx-auto">
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
            className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-xl p-8 max-w-4xl w-full flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
      <div className="mt-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-4 transition-all duration-200 max-w-3xl w-full"
        >


        {/* Feature Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Voice */}
          <div className="relative group" data-dropdown>
            <Button
              variant={selectedVoice ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100"
            >
              <User className="w-4 h-4" />
              {selectedVoice ? voices.find(v => v.id === selectedVoice)?.name || 'Ali Usman' : 'Select Voice'}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            <div className="absolute top-full left-0 mt-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-lg shadow-xl z-50 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {voices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      insertSelection('voice', voice.id)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <div>
                      <div className="font-medium">{voice.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>



          {/* Emotion */}
          <div className="relative group" data-dropdown>
            <Button
              variant={selectedEmotion ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100"
            >
              <Heart className="w-4 h-4" />
              {selectedEmotion ? emotions.find(e => e.id === selectedEmotion)?.name || 'Urdu Poetry' : 'Select Style'}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            <div className="absolute top-full left-0 mt-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-lg shadow-xl z-50 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.id}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      insertSelection('emotion', emotion.id)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    <div className="font-medium">{emotion.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input Field */}
        <div className="relative bg-transparent border border-white/10 dark:border-gray-700/10 rounded-2xl p-3 transition-all duration-200 hover:border-white/20 dark:hover:border-gray-600/20">
          <div className="absolute top-3 left-3 z-10">
            <Wand2 className="w-5 h-5 text-orange-400" />
          </div>
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter text to convert to speech..."
            className="w-full pl-12 pr-12 bg-transparent border-none resize-none focus:outline-none min-h-[60px] max-h-[200px] text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
  )
}