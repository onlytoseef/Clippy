"use client"

import React from "react"
import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Video, 
  Mic, 
  Presentation, 
  Smartphone, 
  Wand2, 
  RefreshCw,
  Sparkles,
  FileText,
  Clock,
  Target,
  Users,
  Send,
  ChevronDown,
  Copy,
  Download,
  Eye
} from "lucide-react"

export function ScriptGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedTone, setSelectedTone] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [showToneDropdown, setShowToneDropdown] = useState(false)
  const [showDurationDropdown, setShowDurationDropdown] = useState(false)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scriptTypes = [
    { id: "video", name: "Video Script", icon: Video, desc: "YouTube, TikTok, Instagram" },
    { id: "podcast", name: "Podcast Script", icon: Mic, desc: "Audio content, interviews" },
    { id: "presentation", name: "Presentation", icon: Presentation, desc: "Business, educational" },
    { id: "social", name: "Social Media", icon: Smartphone, desc: "Posts, captions, stories" }
  ]

  const tones = [
    { id: "professional", name: "Professional" },
    { id: "casual", name: "Casual" },
    { id: "humorous", name: "Humorous" },
    { id: "educational", name: "Educational" },
    { id: "persuasive", name: "Persuasive" },
    { id: "storytelling", name: "Storytelling" }
  ]

  const durations = [
    { id: "30s", name: "30 seconds" },
    { id: "1m", name: "1 minute" },
    { id: "3m", name: "3 minutes" },
    { id: "5m", name: "5 minutes" },
    { id: "10m", name: "10+ minutes" }
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
      setShowTypeDropdown(false)
      setShowToneDropdown(false)
      setShowDurationDropdown(false)
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedScript(`# ${selectedType ? scriptTypes.find(t => t.id === selectedType)?.name : 'Custom'} Script

## Topic: ${prompt}

**Tone**: ${selectedTone || 'Natural'}
**Duration**: ${selectedDuration || 'Flexible'}

---

**[INTRO - 0:00-0:10]**
Hook your audience with an attention-grabbing opening that directly addresses ${prompt}. Start with a question, surprising fact, or bold statement.

**[MAIN CONTENT - 0:10-0:45]**
• Key Point 1: Explain the main concept behind ${prompt}
• Key Point 2: Provide practical examples or case studies
• Key Point 3: Address common questions or concerns

**[CALL TO ACTION - 0:45-1:00]**
End with a clear call to action. Ask viewers to like, subscribe, comment, or take the next step related to ${prompt}.

---

**Script Notes:**
- Keep energy high throughout
- Use conversational language
- Include natural pauses for emphasis
- Adapt pacing based on ${selectedTone || 'your chosen'} tone

**Estimated Duration**: ${selectedDuration || '1-2 minutes'}`)
      setIsGenerating(false)
    }, 3000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  const insertSelection = (type: 'type' | 'tone' | 'duration', value: string) => {
    if (type === 'type') {
      setSelectedType(value)
      setShowTypeDropdown(false)
    } else if (type === 'tone') {
      setSelectedTone(value)
      setShowToneDropdown(false)
    } else if (type === 'duration') {
      setSelectedDuration(value)
      setShowDurationDropdown(false)
    }
  }

  return (
    <div className="h-full p-4 sm:p-6">
      <div className="h-full flex flex-col">
        {/* Generated Script Display - Centered */}
        <div className="flex-1 flex items-center justify-center">
        {generatedScript ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-8 max-w-4xl w-full max-h-[70vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <FileText className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Generated Script</h2>
                  <p className="text-muted-foreground">Ready to use</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                {generatedScript}
              </pre>
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
              <h3 className="text-lg font-medium mb-2">Generating Script...</h3>
              <p className="text-muted-foreground">
                Creating your {selectedType ? scriptTypes.find(t => t.id === selectedType)?.name.toLowerCase() : 'custom script'}
              </p>
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
                <FileText className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Ready to Generate</h3>
              <p className="text-muted-foreground">
                Enter your prompt below to create an engaging script
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Field Section - Bottom */}
      <div className="mt-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-xl p-4 transition-all duration-200 max-w-3xl w-full"
        >


        {/* Feature Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Script Type */}
          <div className="relative">
            <Button
              variant={selectedType ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowTypeDropdown(!showTypeDropdown)
              }}
              className="flex items-center gap-2 bg-orange-500/20 dark:bg-orange-600/20 backdrop-blur-xl border border-orange-300/30 dark:border-orange-400/30 hover:bg-orange-500/30 dark:hover:bg-orange-600/30 text-orange-900 dark:text-orange-100"
            >
              {selectedType ? (
                <>
                  {React.createElement(scriptTypes.find(t => t.id === selectedType)?.icon || Video, { className: "w-4 h-4" })}
                  {scriptTypes.find(t => t.id === selectedType)?.name}
                </>
              ) : (
                <>
                  <Video className="w-4 h-4" />
                  Script Type
                </>
              )}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showTypeDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-lg shadow-xl z-50 min-w-48">
                {scriptTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => insertSelection('type', type.id)}
                      className="w-full px-3 py-2 text-left hover:bg-white/10 dark:hover:bg-white/5 flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                    >
                      <Icon className="w-4 h-4" />
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-xs text-muted-foreground">{type.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Tone */}
          <div className="relative">
            <Button
              variant={selectedTone ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowToneDropdown(!showToneDropdown)
              }}
              className="flex items-center gap-2 bg-orange-500/20 dark:bg-orange-600/20 backdrop-blur-xl border border-orange-300/30 dark:border-orange-400/30 hover:bg-orange-500/30 dark:hover:bg-orange-600/30 text-orange-900 dark:text-orange-100"
            >
              {selectedTone ? tones.find(t => t.id === selectedTone)?.name : "Tone"}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showToneDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-lg shadow-xl z-50">
                {tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => insertSelection('tone', tone.id)}
                    className="w-full px-3 py-2 text-left hover:bg-white/10 dark:hover:bg-white/5 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                  >
                    {tone.name}
                  </button>
                ))}
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
              className="flex items-center gap-2 bg-orange-500/20 dark:bg-orange-600/20 backdrop-blur-xl border border-orange-300/30 dark:border-orange-400/30 hover:bg-orange-500/30 dark:hover:bg-orange-600/30 text-orange-900 dark:text-orange-100"
            >
              <Clock className="w-4 h-4" />
              {selectedDuration ? durations.find(d => d.id === selectedDuration)?.name : "Duration"}
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {showDurationDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-lg shadow-xl z-50">
                {durations.map((duration) => (
                  <button
                    key={duration.id}
                    onClick={() => insertSelection('duration', duration.id)}
                    className="w-full px-3 py-2 text-left hover:bg-white/10 dark:hover:bg-white/5 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                  >
                    {duration.name}
                  </button>
                ))}
              </div>
            )}
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
            placeholder="Describe your script topic..."
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
          <span>Press Enter to generate or Shift+Enter for new line</span>
          <span>{prompt.length}/2000 characters</span>
        </div>
        </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ScriptGenerationPage