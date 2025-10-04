"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Image, 
  Volume2, 
  Video,
  User,
  Settings,
  LogOut
} from "lucide-react"
import { useState, useEffect } from "react"

interface TopNavDashboardProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TopNavDashboard({ children, activeTab, onTabChange }: TopNavDashboardProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-profile-dropdown]')) {
        setShowProfileDropdown(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const navigation = [
    { 
      id: 'script', 
      name: 'Script', 
      icon: FileText,
    },
    { 
      id: 'audio', 
      name: 'Audio', 
      icon: Volume2,
    },
    { 
      id: 'image', 
      name: 'Image', 
      icon: Image,
    },
    { 
      id: 'video', 
      name: 'Video', 
      icon: Video,
    },
    { 
      id: 'account', 
      name: 'Account', 
      icon: User,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Top Navigation Bar */}
      <div className="flex justify-center pt-4 md:pt-6 px-2 sm:px-4">
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-full shadow-xl">
          <div className="flex items-center justify-center px-4 sm:px-8 md:px-12 py-2 sm:py-3">
            
            {/* Centered Navigation Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'account') {
                        setShowProfileDropdown(!showProfileDropdown)
                      } else {
                        onTabChange(item.id)
                      }
                    }}
                    className={`relative flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/30 dark:bg-white/10 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                    <span className="text-xs sm:text-xs mt-0.5 sm:mt-1 font-medium hidden xs:block sm:block">{item.name}</span>
                    
                    {/* Active Indicator */}
                    {isActive && item.id !== 'account' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Account Dropdown Indicator */}
                    {item.id === 'account' && showProfileDropdown && (
                      <motion.div
                        className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-0.5 bg-gray-600 dark:bg-gray-400 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Dropdown - Positioned Relative to Account Icon */}
      {showProfileDropdown && (
        <div className="flex justify-center px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 right-4 w-48 bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-xl shadow-xl py-2"
            data-profile-dropdown
          >
            <div className="px-4 py-2 border-b border-white/20 dark:border-gray-700/30">
              <p className="font-medium text-gray-900 dark:text-gray-100">John Doe</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">john@example.com</p>
            </div>
            
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-white/5 rounded-lg mx-2 my-1">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </button>
            
            <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-100/20 dark:hover:bg-red-900/20 rounded-lg mx-2 my-1">
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </motion.div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}