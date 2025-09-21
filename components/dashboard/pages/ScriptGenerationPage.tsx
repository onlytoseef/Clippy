"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Wand2, 
  Copy, 
  Download, 
  RefreshCw,
  Sparkles,
  Clock,
  Target,
  Users,
  Video,
  Mic,
  Presentation,
  Smartphone,
  Lightbulb
} from "lucide-react"

export function ScriptGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState("")
  const [formData, setFormData] = useState({
    topic: "",
    tone: "professional",
    duration: "2-3",
    audience: "general",
    scriptType: "video"
  })

  const scriptTypes = [
    { id: "video", name: "Video Script", icon: Video },
    { id: "podcast", name: "Podcast Script", icon: Mic },
    { id: "presentation", name: "Presentation", icon: Presentation },
    { id: "social", name: "Social Media", icon: Smartphone }
  ]

  const tones = [
    { id: "professional", name: "Professional", color: "blue" },
    { id: "casual", name: "Casual", color: "green" },
    { id: "energetic", name: "Energetic", color: "orange" },
    { id: "educational", name: "Educational", color: "purple" }
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedScript(`# ${formData.topic} Script

## Introduction
Welcome to this comprehensive guide about ${formData.topic}. In the next ${formData.duration} minutes, we'll explore the key concepts and practical applications that will help you understand this topic better.

## Main Content
Let's dive into the core aspects of ${formData.topic}. This ${formData.tone} approach will ensure that our ${formData.audience} audience can easily follow along and gain valuable insights.

### Key Points:
- Understanding the fundamentals
- Practical applications and examples
- Common challenges and solutions
- Future trends and opportunities

## Conclusion
Thank you for joining us on this journey through ${formData.topic}. We hope this ${formData.scriptType} has provided you with actionable insights and valuable knowledge.

Remember to subscribe for more content like this, and don't forget to share your thoughts in the comments below!`)
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Scripts Generated", value: "1,234", icon: FileText, color: "blue" },
          { label: "Time Saved", value: "48 hrs", icon: Clock, color: "green" },
          { label: "Success Rate", value: "98%", icon: Target, color: "purple" },
          { label: "Happy Users", value: "5.2K", icon: Users, color: "orange" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg bg-${stat.color}-500/20`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Script Configuration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-xl p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Wand2 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Script Generator</h2>
              <p className="text-muted-foreground">Create AI-powered scripts for any purpose</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Topic Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Topic/Subject</label>
              <input
                type="text"
                placeholder="e.g., Introduction to AI and Machine Learning"
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
                className="w-full p-4 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            {/* Script Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Script Type</label>
              <div className="grid grid-cols-2 gap-3">
                {scriptTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData({...formData, scriptType: type.id})}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      formData.scriptType === type.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-border bg-secondary/30 hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <type.icon className="w-8 h-8 text-muted-foreground mb-2" />
                      <div className="font-medium text-center">{type.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Tone & Style</label>
              <div className="grid grid-cols-2 gap-3">
                {tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setFormData({...formData, tone: tone.id})}
                    className={`p-3 rounded-lg border transition-all ${
                      formData.tone === tone.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-border bg-secondary/30 hover:bg-secondary/50'
                    }`}
                  >
                    {tone.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration & Audience */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-medium">Duration (minutes)</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="1-2">1-2 minutes</option>
                  <option value="2-3">2-3 minutes</option>
                  <option value="5-10">5-10 minutes</option>
                  <option value="10+">10+ minutes</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Target Audience</label>
                <select
                  value={formData.audience}
                  onChange={(e) => setFormData({...formData, audience: e.target.value})}
                  className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="general">General Audience</option>
                  <option value="professionals">Professionals</option>
                  <option value="students">Students</option>
                  <option value="experts">Subject Experts</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!formData.topic || isGenerating}
              className="w-full"
              size="lg"
              variant="destructive"
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating Script...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Generate Script
                </div>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Generated Script */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <FileText className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Generated Script</h2>
                <p className="text-muted-foreground">Your AI-created content</p>
              </div>
            </div>

            {generatedScript && (
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
            )}
          </div>

          <div className="h-96 overflow-y-auto">
            {generatedScript ? (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-secondary/30 p-6 rounded-xl border border-border">
                  {generatedScript}
                </pre>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Script Generated Yet</h3>
                  <p className="text-muted-foreground">
                    Enter your topic and preferences to generate your first AI script
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ScriptGenerationPage