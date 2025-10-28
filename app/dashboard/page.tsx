"use client"

import { useState } from "react"
import { TopNavDashboard } from "@/components/dashboard/TopNavDashboard"
import { 
  ScriptGenerationPage,
  ImageGenerationPage,
  AudioGenerationPage,
  VideoGenerationPage 
} from "@/components/dashboard/pages"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('script');

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
      case 'account':
        return <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Account Settings</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Account page coming soon...</p>
          </div>
        </div>
      default:
        return <AudioGenerationPage />
    }
  }

  return (
    <TopNavDashboard activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </TopNavDashboard>
  )
}