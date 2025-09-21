"use client"

import { motion } from "framer-motion"
import { useState } from "react"
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
  Lightbulb
} from "lucide-react"

export function VideoGenerationPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    prompt: "",
    style: "realistic",
    duration: "5",
    aspect: "16:9",
    quality: "standard",
    videoType: "text-to-video"
  })

  const videoTypes = [
    { 
      id: "text-to-video", 
      name: "Text to Video", 
      icon: FileVideo, 
      desc: "Generate video from text description" 
    },
    { 
      id: "image-to-video", 
      name: "Image to Video", 
      icon: ImageIcon, 
      desc: "Animate static images into video" 
    },
    { 
      id: "style-transfer", 
      name: "Style Transfer", 
      icon: Edit, 
      desc: "Apply artistic styles to video" 
    },
    { 
      id: "video-enhance", 
      name: "Video Enhancement", 
      icon: Camera, 
      desc: "Upscale and improve video quality" 
    }
  ]

  const styles = [
    { id: "realistic", name: "Realistic", preview: Film },
    { id: "animated", name: "Animated", preview: Brush },
    { id: "cinematic", name: "Cinematic", preview: Camera },
    { id: "artistic", name: "Artistic", preview: ImageIcon },
    { id: "vintage", name: "Vintage", preview: Archive },
    { id: "futuristic", name: "Futuristic", preview: Rocket }
  ]

  const aspects = [
    { id: "16:9", name: "Landscape (16:9)", width: "1920x1080" },
    { id: "9:16", name: "Portrait (9:16)", width: "1080x1920" },
    { id: "1:1", name: "Square (1:1)", width: "1080x1080" },
    { id: "4:3", name: "Classic (4:3)", width: "1440x1080" }
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedVideo("sample-video-url")
      setIsGenerating(false)
    }, 8000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(files)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Videos Created", value: "3,247", icon: Video, color: "blue" },
          { label: "Total Duration", value: "2.4K hrs", icon: Clock, color: "purple" },
          { label: "AI Models", value: "12+", icon: Film, color: "orange" },
          { label: "Success Rate", value: "96%", icon: Camera, color: "green" }
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
        {/* Video Configuration */}
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
              <h2 className="text-2xl font-bold">Video Generator</h2>
              <p className="text-muted-foreground">Create stunning videos with AI</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Video Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Generation Type</label>
              <div className="grid grid-cols-1 gap-3">
                {videoTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => setFormData({...formData, videoType: type.id})}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        formData.videoType === type.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-border bg-secondary/30 hover:bg-secondary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{type.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{type.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* File Upload (for image-to-video and enhancement) */}
            {(formData.videoType === 'image-to-video' || formData.videoType === 'video-enhance') && (
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Upload {formData.videoType === 'image-to-video' ? 'Images' : 'Video'}
                </label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <input
                    type="file"
                    accept={formData.videoType === 'image-to-video' ? "image/*" : "video/*"}
                    multiple={formData.videoType === 'image-to-video'}
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formData.videoType === 'image-to-video' 
                        ? 'PNG, JPG, WEBP up to 10MB each' 
                        : 'MP4, MOV, AVI up to 100MB'
                      }
                    </p>
                  </label>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Files:</p>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-secondary/30 rounded-lg">
                        <FileVideo className="w-4 h-4" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {(file.size / 1024 / 1024).toFixed(1)}MB
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Prompt Input (for text-to-video) */}
            {formData.videoType === 'text-to-video' && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Video Description</label>
                <textarea
                  placeholder="Describe the video you want to create... Be detailed and specific!"
                  value={formData.prompt}
                  onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                  className="w-full p-4 bg-secondary/50 border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" />
                  Include camera movements, lighting, mood, and specific actions
                </p>
              </div>
            )}

            {/* Style Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Video Style</label>
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

            {/* Video Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-medium">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="3">3 seconds</option>
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                  <option value="15">15 seconds</option>
                  <option value="30">30 seconds</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Aspect Ratio</label>
                <select
                  value={formData.aspect}
                  onChange={(e) => setFormData({...formData, aspect: e.target.value})}
                  className="w-full p-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  {aspects.map((aspect) => (
                    <option key={aspect.id} value={aspect.id}>
                      {aspect.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quality Settings */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Video Quality</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFormData({...formData, quality: 'standard'})}
                  className={`p-3 rounded-lg border transition-all ${
                    formData.quality === 'standard'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-border bg-secondary/30 hover:bg-secondary/50'
                  }`}
                >
                  <div className="font-medium">Standard</div>
                  <div className="text-xs text-muted-foreground">720p • Faster</div>
                </button>
                <button
                  onClick={() => setFormData({...formData, quality: 'hd'})}
                  className={`p-3 rounded-lg border transition-all ${
                    formData.quality === 'hd'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-border bg-secondary/30 hover:bg-secondary/50'
                  }`}
                >
                  <div className="font-medium">HD</div>
                  <div className="text-xs text-muted-foreground">1080p • Higher Quality</div>
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={
                isGenerating || 
                (formData.videoType === 'text-to-video' && !formData.prompt) ||
                ((formData.videoType === 'image-to-video' || formData.videoType === 'video-enhance') && uploadedFiles.length === 0)
              }
              className="w-full"
              size="lg"
              variant="destructive"
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating Video...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Generate Video
                </div>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Video Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Video className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Video Preview</h2>
                <p className="text-muted-foreground">Watch your generated video</p>
              </div>
            </div>

            {generatedVideo && (
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {generatedVideo ? (
              <>
                {/* Video Player */}
                <div className="aspect-video bg-secondary/30 rounded-xl overflow-hidden border border-border relative">
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

                {/* Video Info */}
                <div className="bg-secondary/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">Generated Video</h3>
                      <p className="text-sm text-muted-foreground">
                        Style: {styles.find(s => s.id === formData.style)?.name} • 
                        Duration: {formData.duration}s • 
                        Quality: {formData.quality.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-secondary rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: isPlaying ? "100%" : "0%" }}
                      transition={{ duration: parseInt(formData.duration), ease: "linear" }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0:00</span>
                    <span>0:{formData.duration.padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Video Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">{formData.aspect}</div>
                    <div className="text-xs text-muted-foreground">Aspect</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">MP4</div>
                    <div className="text-xs text-muted-foreground">Format</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400">{formData.duration}s</div>
                    <div className="text-xs text-muted-foreground">Length</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Video Generated Yet</h3>
                  <p className="text-muted-foreground">
                    Create your first AI-generated video
                  </p>
                </div>
              </div>
            )}

            {/* Generation Progress */}
            {isGenerating && (
              <div className="bg-secondary/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
                  <span className="font-medium">Creating your video...</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8 }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Processing {formData.duration}s video in {formData.style} style...
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default VideoGenerationPage