"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  Eye,
  Globe,
  Hash,
  Building,
  UserCheck
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
  
  // New required fields
  const [channelName, setChannelName] = useState("")
  const [targetAudienceAge, setTargetAudienceAge] = useState("")
  const [language, setLanguage] = useState("")
  const [scriptLength, setScriptLength] = useState("")
  const [targetMarket, setTargetMarket] = useState("")
  
  // Input modal states
  const [showChannelInput, setShowChannelInput] = useState(false)
  const [showAudienceInput, setShowAudienceInput] = useState(false)
  const [showLanguageInput, setShowLanguageInput] = useState(false)
  const [showLengthInput, setShowLengthInput] = useState(false)
  const [showMarketInput, setShowMarketInput] = useState(false)
  
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

  // Load saved settings from localStorage
  useEffect(() => {
    const savedChannelName = localStorage.getItem('script_channelName')
    const savedAudienceAge = localStorage.getItem('script_targetAudienceAge')
    const savedLanguage = localStorage.getItem('script_language')
    const savedLength = localStorage.getItem('script_scriptLength')
    const savedMarket = localStorage.getItem('script_targetMarket')

    if (savedChannelName) setChannelName(savedChannelName)
    if (savedAudienceAge) setTargetAudienceAge(savedAudienceAge)
    if (savedLanguage) setLanguage(savedLanguage)
    if (savedLength) setScriptLength(savedLength)
    if (savedMarket) setTargetMarket(savedMarket)
  }, [])

  // Close input modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-input-modal]')) {
        setShowChannelInput(false)
        setShowAudienceInput(false)
        setShowLanguageInput(false)
        setShowLengthInput(false)
        setShowMarketInput(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Save to localStorage when values change
  useEffect(() => {
    if (channelName) localStorage.setItem('script_channelName', channelName)
  }, [channelName])

  useEffect(() => {
    if (targetAudienceAge) localStorage.setItem('script_targetAudienceAge', targetAudienceAge)
  }, [targetAudienceAge])

  useEffect(() => {
    if (language) localStorage.setItem('script_language', language)
  }, [language])

  useEffect(() => {
    if (scriptLength) localStorage.setItem('script_scriptLength', scriptLength)
  }, [scriptLength])

  useEffect(() => {
    if (targetMarket) localStorage.setItem('script_targetMarket', targetMarket)
  }, [targetMarket])

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    // Check required fields
    if (!channelName.trim() || !targetAudienceAge.trim() || !language.trim() || !scriptLength.trim() || !targetMarket.trim()) {
      alert('Please fill in all required fields: Channel Name, Target Audience Age, Language, Script Length, and Target Market.')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          selectedType,
          selectedTone,
          selectedDuration,
          channelName,
          targetAudienceAge,
          language,
          scriptLength,
          targetMarket
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate script')
      }

      const data = await response.json()
      setGeneratedScript(data.script)
    } catch (error) {
      console.error('Error generating script:', error)
      alert('Failed to generate script. Please try again.')
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
            className="bg-transparent border-0 rounded-xl p-8 max-w-5xl w-full max-h-[70vh] overflow-y-auto"
          >
            {/* Header with metadata */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <FileText className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Generated Script</h2>
                  <p className="text-muted-foreground">Ready to use</p>
                </div>
              </div>
            </div>

            {/* Inner card for content */}
            <div className="w-full mx-auto flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-secondary/30 backdrop-blur-xl border-0 rounded-3xl p-8 shadow-lg w-full max-w-2xl"
                style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(generatedScript) }}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      const blob = new Blob([generatedScript], { type: 'text/plain' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `script_${Date.now()}.txt`
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)
                      URL.revokeObjectURL(url)
                    }}>
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
            </div>
          </motion.div>
        ) : isGenerating ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-transparent border-0 rounded-xl p-8 max-w-4xl w-full flex items-center justify-center"
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
            className="bg-transparent border-0 rounded-xl p-8 max-w-4xl w-full flex items-center justify-center"
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
            placeholder="Describe your script idea..."
            className="w-full pl-12 pr-12 bg-transparent border-none resize-none focus:outline-none min-h-[40px] max-h-[200px] text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            style={{ overflow: 'auto' }}
            rows={1}
          />
          
          {/* Character Count - Now in Input */}
          <div className="absolute right-3 bottom-3 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            <span>{prompt.length}/2000 characters</span>
          </div>
        </div>

        {/* Feature Buttons with Generate Button - Same Line */}
        <div className="flex flex-wrap gap-2 mb-2 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
        {/* Channel Name Input */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChannelInput(!showChannelInput)}
            className={`rounded-full ${channelName ? 'px-3 py-1.5 h-auto bg-green-500/20 border-green-500/50' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
          >
            {channelName ? (
              <>
                <Hash className="w-3.5 h-3.5 flex-shrink-0 text-green-600" />
                <span className="text-xs whitespace-nowrap">{channelName}</span>
              </>
            ) : (
              <Hash className="w-4 h-4 text-[#0072a4]" />
            )}
          </Button>
          
          {showChannelInput && (
            <div data-input-modal className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 p-3 min-w-[200px]">
              <input
                type="text"
                placeholder="Enter channel name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setShowChannelInput(false)
                  }
                }}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-transparent focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={() => setShowChannelInput(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setShowChannelInput(false)}>Save</Button>
              </div>
            </div>
          )}
        </div>

        {/* Target Audience Age Input */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAudienceInput(!showAudienceInput)}
            className={`rounded-full ${targetAudienceAge ? 'px-3 py-1.5 h-auto bg-green-500/20 border-green-500/50' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
          >
            {targetAudienceAge ? (
              <>
                <UserCheck className="w-3.5 h-3.5 flex-shrink-0 text-green-600" />
                <span className="text-xs whitespace-nowrap">{targetAudienceAge}</span>
              </>
            ) : (
              <UserCheck className="w-4 h-4 text-[#0072a4]" />
            )}
          </Button>
          
          {showAudienceInput && (
            <div data-input-modal className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 p-3 min-w-[200px]">
              <input
                type="text"
                placeholder="e.g., 18-35, 25-45"
                value={targetAudienceAge}
                onChange={(e) => setTargetAudienceAge(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setShowAudienceInput(false)
                  }
                }}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-transparent focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={() => setShowAudienceInput(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setShowAudienceInput(false)}>Save</Button>
              </div>
            </div>
          )}
        </div>

        {/* Language Input */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLanguageInput(!showLanguageInput)}
            className={`rounded-full ${language ? 'px-3 py-1.5 h-auto bg-green-500/20 border-green-500/50' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
          >
            {language ? (
              <>
                <Globe className="w-3.5 h-3.5 flex-shrink-0 text-green-600" />
                <span className="text-xs whitespace-nowrap">{language}</span>
              </>
            ) : (
              <Globe className="w-4 h-4 text-[#0072a4]" />
            )}
          </Button>
          
          {showLanguageInput && (
            <div data-input-modal className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 p-3 min-w-[200px]">
              <input
                type="text"
                placeholder="e.g., English, Urdu, Hindi"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setShowLanguageInput(false)
                  }
                }}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-transparent focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={() => setShowLanguageInput(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setShowLanguageInput(false)}>Save</Button>
              </div>
            </div>
          )}
        </div>

        {/* Script Length Input */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLengthInput(!showLengthInput)}
            className={`rounded-full ${scriptLength ? 'px-3 py-1.5 h-auto bg-green-500/20 border-green-500/50' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
          >
            {scriptLength ? (
              <>
                <Clock className="w-3.5 h-3.5 flex-shrink-0 text-green-600" />
                <span className="text-xs whitespace-nowrap">{scriptLength}</span>
              </>
            ) : (
              <Clock className="w-4 h-4 text-[#0072a4]" />
            )}
          </Button>
          
          {showLengthInput && (
            <div data-input-modal className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 p-3 min-w-[200px]">
              <input
                type="text"
                placeholder="e.g., 5 minutes, 300 words"
                value={scriptLength}
                onChange={(e) => setScriptLength(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setShowLengthInput(false)
                  }
                }}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-transparent focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={() => setShowLengthInput(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setShowLengthInput(false)}>Save</Button>
              </div>
            </div>
          )}
        </div>

        {/* Target Market Input */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMarketInput(!showMarketInput)}
            className={`rounded-full ${targetMarket ? 'px-3 py-1.5 h-auto bg-green-500/20 border-green-500/50' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
          >
            {targetMarket ? (
              <>
                <Building className="w-3.5 h-3.5 flex-shrink-0 text-green-600" />
                <span className="text-xs whitespace-nowrap">{targetMarket}</span>
              </>
            ) : (
              <Building className="w-4 h-4 text-[#0072a4]" />
            )}
          </Button>
          
          {showMarketInput && (
            <div data-input-modal className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 p-3 min-w-[200px]">
              <input
                type="text"
                placeholder="e.g., Pakistan, Global, Tech"
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setShowMarketInput(false)
                  }
                }}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-transparent focus:outline-none focus:border-blue-500"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button size="sm" variant="outline" onClick={() => setShowMarketInput(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setShowMarketInput(false)}>Save</Button>
              </div>
            </div>
          )}
        </div>

        {/* Script Type */}
        <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowTypeDropdown(!showTypeDropdown)
              }}
              className={`rounded-full ${selectedType ? 'px-3 py-1.5 h-auto' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
            >
              {selectedType ? (
                <>
                  {React.createElement(scriptTypes.find(t => t.id === selectedType)?.icon || Video, { className: "w-3.5 h-3.5 flex-shrink-0 text-[#0072a4]" })}
                  <span className="text-xs whitespace-nowrap">{scriptTypes.find(t => t.id === selectedType)?.name}</span>
                </>
              ) : (
                <Video className="w-4 h-4 text-[#0072a4]" />
              )}
            </Button>
            
            <AnimatePresence>
            {showTypeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 min-w-[140px]"
                onMouseEnter={() => setShowTypeDropdown(true)}
                onMouseLeave={() => setShowTypeDropdown(false)}
              >
                {scriptTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => insertSelection('type', type.id)}
                      className="w-full px-3 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                    >
                      <div className="text-sm">{type.name}</div>
                    </button>
                  )
                })}
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* Tone */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowToneDropdown(!showToneDropdown)
              }}
              className={`rounded-full ${selectedTone ? 'px-3 py-1.5 h-auto' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
            >
              {selectedTone ? (
                <>
                  <Target className="w-3.5 h-3.5 flex-shrink-0 text-[#0072a4]" />
                  <span className="text-xs whitespace-nowrap">{tones.find(t => t.id === selectedTone)?.name}</span>
                </>
              ) : (
                <Target className="w-4 h-4 text-[#0072a4]" />
              )}
            </Button>
            
            <AnimatePresence>
            {showToneDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 min-w-[160px]"
                onMouseEnter={() => setShowToneDropdown(true)}
                onMouseLeave={() => setShowToneDropdown(false)}
              >
                {tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => insertSelection('tone', tone.id)}
                    className="w-full px-3 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                  >
                    <div className="text-sm">{tone.name}</div>
                  </button>
                ))}
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          {/* Duration */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowDurationDropdown(!showDurationDropdown)
              }}
              className={`rounded-full ${selectedDuration ? 'px-3 py-1.5 h-auto' : 'w-8 h-8 p-0'} flex items-center justify-center gap-1.5 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 text-gray-900 dark:text-gray-100 transition-all`}
            >
              {selectedDuration ? (
                <>
                  <Clock className="w-3.5 h-3.5 flex-shrink-0 text-[#0072a4]" />
                  <span className="text-xs whitespace-nowrap">{durations.find(d => d.id === selectedDuration)?.name}</span>
                </>
              ) : (
                <Clock className="w-4 h-4 text-[#0072a4]" />
              )}
            </Button>
            
            <AnimatePresence>
            {showDurationDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 min-w-[160px]"
                onMouseEnter={() => setShowDurationDropdown(true)}
                onMouseLeave={() => setShowDurationDropdown(false)}
              >
                {durations.map((duration) => (
                  <button
                    key={duration.id}
                    onClick={() => insertSelection('duration', duration.id)}
                    className="w-full px-3 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-900 dark:text-gray-100"
                  >
                    <div className="text-sm">{duration.name}</div>
                  </button>
                ))}
              </motion.div>
            )}
            </AnimatePresence>
          </div>
          </div>

          {/* Generate Button - Now in Features Position */}
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

export default ScriptGenerationPage