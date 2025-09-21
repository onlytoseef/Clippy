"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { 
  ScriptGenerationPage,
  ImageGenerationPage,
  AudioGenerationPage,
  VideoGenerationPage 
} from "@/components/dashboard/pages"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('script') // Default to script generation

  const renderContent = () => {
    switch (activeTab) {
      case 'script':
        return <ScriptGenerationPage />
      case 'image':
        return <ImageGenerationPage />
      case 'audio':
        return <AudioGenerationPage />
      case 'video':
        return <VideoGenerationPage />
      default:
        return <ScriptGenerationPage />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}