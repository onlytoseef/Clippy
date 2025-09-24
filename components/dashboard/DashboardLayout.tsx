"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Image, 
  Volume2, 
  Video, 
  Menu, 
  X, 
  Sparkles,
  LogOut,
  Settings
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { 
      id: 'script', 
      name: 'Script Generation', 
      icon: FileText, 
      description: 'Generate AI-powered scripts' 
    },
    { 
      id: 'image', 
      name: 'Image Generation', 
      icon: Image, 
      description: 'Create stunning visuals' 
    },
    { 
      id: 'audio', 
      name: 'Audio Generation', 
      icon: Volume2, 
      description: 'Generate voice & music' 
    },
    { 
      id: 'video', 
      name: 'Video Generation', 
      icon: Video, 
      description: 'Create video content' 
    },
  ]

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </motion.div>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 w-80 h-screen bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:z-0 lg:w-80 lg:flex-shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:!translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold">Clippy Dashboard</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">AI Content Studio</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all touch-manipulation ${
                      isActive 
                        ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-orange-500/40' 
                        : 'hover:bg-secondary/50 active:bg-secondary/70'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-orange-500/20' : 'bg-secondary'
                      }`}>
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          isActive ? 'text-orange-400' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <div className={`font-medium text-sm sm:text-base ${
                          isActive ? 'text-white' : 'text-foreground'
                        }`}>
                          {item.name}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-border">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-sm sm:text-base">
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm sm:text-base">
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 h-screen flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-4 sm:px-6 py-4 lg:pl-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden flex-shrink-0"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-bold capitalize truncate">
                  {navigation.find(item => item.id === activeTab)?.name}
                </h2>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  {navigation.find(item => item.id === activeTab)?.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="hidden md:flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs sm:text-sm">AI Models Online</span>
              </div>
              
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 sm:p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout