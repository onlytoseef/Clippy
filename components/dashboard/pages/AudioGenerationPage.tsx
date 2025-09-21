"use client"

import { motion } from "framer-motion"
import { useState } from "react"
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
  Lightbulb
} from "lucide-react"

export function AudioGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    text: "",
    voice: "oliver",
    speed: "1.0",
    emotion: "neutral",
    audioType: "speech"
  })

  const voices = [
    { id: "oliver", name: "Oliver", accent: "Canadian", gender: "Male", preview: User },
    { id: "emma", name: "Emma", accent: "Australian", gender: "Female", preview: User },
    { id: "marcus", name: "Marcus", accent: "British", gender: "Male", preview: User },
    { id: "luna", name: "Luna", accent: "American", gender: "Female", preview: User },
    { id: "david", name: "David", accent: "American", gender: "Male", preview: User },
    { id: "sarah", name: "Sarah", accent: "American", gender: "Female", preview: User }
  ]

  const emotions = [
    { id: "neutral", name: "Neutral", icon: Meh },
    { id: "happy", name: "Happy", icon: Smile },
    { id: "excited", name: "Excited", icon: Zap },
    { id: "calm", name: "Calm", icon: Heart },
    { id: "serious", name: "Serious", icon: Frown },
    { id: "friendly", name: "Friendly", icon: MessageCircle }
  ]

  const audioTypes = [
    { id: "speech", name: "Speech/Voiceover", icon: Mic, desc: "Natural human speech" },
    { id: "narration", name: "Narration", icon: Volume2, desc: "Storytelling voice" },
    { id: "announcement", name: "Announcement", icon: Headphones, desc: "Clear announcements" },
    { id: "conversation", name: "Conversation", icon: Music, desc: "Dialogue style" }
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedAudio("sample-audio-url")
      setIsGenerating(false)
    }, 3000)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Audio Generated", value: "12.3K", icon: Volume2, color: "blue" },
          { label: "Voice Models", value: "25+", icon: Mic, color: "purple" },
          { label: "Avg. Quality", value: "HD+", icon: Headphones, color: "green" },
          { label: "Processing Time", value: "2.1s", icon: Clock, color: "orange" }
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
        {/* Audio Configuration */}
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
              <h2 className="text-2xl font-bold">Audio Generator</h2>
              <p className="text-muted-foreground">Create lifelike voice & audio</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Text Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Text to Convert</label>
              <textarea
                placeholder="Enter the text you want to convert to speech..."
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                className="w-full p-4 bg-secondary/50 border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                rows={4}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" />
                  Add punctuation for natural pauses
                </span>
                <span>{formData.text.length}/5000 characters</span>
              </div>
            </div>

            {/* Audio Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Audio Type</label>
              <div className="grid grid-cols-2 gap-3">
                {audioTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => setFormData({...formData, audioType: type.id})}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        formData.audioType === type.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-border bg-secondary/30 hover:bg-secondary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{type.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{type.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Voice Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Voice Model</label>
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                {voices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setFormData({...formData, voice: voice.id})}
                    className={`p-3 rounded-lg border transition-all text-left ${
                      formData.voice === voice.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-border bg-secondary/30 hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <voice.preview className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{voice.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {voice.gender} • {voice.accent}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-medium">Speaking Speed</label>
                <select
                  value={formData.speed}
                  onChange={(e) => setFormData({...formData, speed: e.target.value})}
                  className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="0.5">0.5x (Slow)</option>
                  <option value="0.75">0.75x</option>
                  <option value="1.0">1.0x (Normal)</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x (Fast)</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Emotion</label>
                <select
                  value={formData.emotion}
                  onChange={(e) => setFormData({...formData, emotion: e.target.value})}
                  className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  {emotions.map((emotion) => {
                    const Icon = emotion.icon
                    return (
                      <option key={emotion.id} value={emotion.id}>
                        {emotion.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!formData.text || isGenerating}
              className="w-full"
              size="lg"
              variant="destructive"
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating Audio...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Generate Audio
                </div>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Audio Player & Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Volume2 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Audio Preview</h2>
                <p className="text-muted-foreground">Listen to your generated audio</p>
              </div>
            </div>

            {generatedAudio && (
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {generatedAudio ? (
              <>
                {/* Audio Player */}
                <div className="bg-secondary/30 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">Generated Audio</h3>
                      <p className="text-sm text-muted-foreground">
                        Voice: {voices.find(v => v.id === formData.voice)?.name} • 
                        Speed: {formData.speed}x • 
                        Emotion: {emotions.find(e => e.id === formData.emotion)?.name}
                      </p>
                    </div>
                    <Button
                      onClick={togglePlayback}
                      variant="secondary"
                      size="lg"
                      className="rounded-full w-12 h-12"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>
                  </div>

                  {/* Waveform Visualization */}
                  <div className="flex items-center justify-center gap-1 h-16 mb-4">
                    {[...Array(50)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full"
                        animate={isPlaying ? {
                          height: [4, Math.random() * 40 + 10, 4],
                          opacity: [0.3, 1, 0.3]
                        } : { height: 4, opacity: 0.3 }}
                        transition={{
                          duration: 0.8 + Math.random() * 0.4,
                          repeat: isPlaying ? Infinity : 0,
                          ease: "easeInOut",
                          delay: i * 0.05
                        }}
                      />
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-secondary rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: isPlaying ? "100%" : "0%" }}
                      transition={{ duration: 10, ease: "linear" }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0:00</span>
                    <span>0:15</span>
                  </div>
                </div>

                {/* Audio Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">HD</div>
                    <div className="text-xs text-muted-foreground">Quality</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">MP3</div>
                    <div className="text-xs text-muted-foreground">Format</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400">15s</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Volume2 className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Audio Generated Yet</h3>
                  <p className="text-muted-foreground">
                    Enter your text and generate your first AI voice
                  </p>
                </div>
              </div>
            )}

            {/* Generation Progress */}
            {isGenerating && (
              <div className="bg-secondary/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
                  <span className="font-medium">Converting text to speech...</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Processing with {voices.find(v => v.id === formData.voice)?.name}&apos;s voice...
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AudioGenerationPage