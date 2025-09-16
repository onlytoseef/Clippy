"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, User, Eye, EyeOff, Save, Edit, Mic, Calendar, Shield, Camera, X } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
    const [userData, setUserData] = useState({
        name: "Alex Morgan",
        email: "alex.morgan@clippy.com",
        location: "San Francisco, CA",
        joinDate: "January 2023",
        plan: "Pro",
        avatar: null,
        stats: {
            voicesGenerated: 1247,
            storageUsed: "2.3 GB",
            projects: 28
        }
    })

    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        location: userData.location,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showPasswordDialog, setShowPasswordDialog] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSaveProfile = () => {
        setIsLoading(true)
        setTimeout(() => {
            setUserData({
                ...userData,
                name: formData.name,
                email: formData.email,
                location: formData.location
            })
            setIsEditing(false)
            setIsLoading(false)
            alert("Profile updated successfully!")
        }, 1000)
    }

    const handleChangePassword = () => {
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New passwords don't match!")
            return
        }

        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            alert("Password changed successfully!")
            setFormData({
                ...formData,
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            })
            setShowPasswordDialog(false)
            setIsLoading(false)
        }, 1000)
    }

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div className="relative z-10 min-h-screen p-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-muted"
                >
                    {/* Header Section */}
                    <div className="relative px-6 py-8 md:px-8 md:py-12 text-center">
                        {/* Action Buttons */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                            <Link href="/" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-primary font-medium shadow-sm hover:shadow-md transition-shadow">
                                <Mic size={16} />
                                <span className="text-sm">Clippy AI</span>
                            </Link>
                            <div className="flex gap-2">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                                    >
                                        <Edit size={16} />
                                        <span className="hidden sm:inline">Edit Profile</span>
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 bg-white text-foreground rounded-full hover:bg-muted transition-all text-sm font-medium shadow-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSaveProfile}
                                            disabled={isLoading}
                                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all text-sm font-medium shadow-sm hover:shadow-md disabled:opacity-70"
                                        >
                                            {isLoading ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <Save size={16} />
                                            )}
                                            <span>Save</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Photo */}
                        <div className="relative inline-block mb-6">
                            <div className="w-28 h-28 md:w-32 md:h-32 bg-primary rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg">
                                {getInitials(userData.name)}
                            </div>
                            {isEditing && (
                                <button className="absolute bottom-1 right-1 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-105 transition-transform border border-muted">
                                    <Camera size={16} className="text-foreground" />
                                </button>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="space-y-3">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="text-2xl md:text-3xl font-bold text-foreground bg-white rounded-lg px-4 py-2 text-center border-2 border-primary/20 focus:border-primary focus:outline-none"
                                />
                            ) : (
                                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{userData.name}</h1>
                            )}

                            <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
                                <Calendar size={14} />
                                <span>Member since {userData.joinDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-6 py-8 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Account Details */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-xl p-6 border border-muted"
                            >
                                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <User size={20} className="text-primary" />
                                    Account Details
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground/70 mb-2">Email Address</label>

                                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                            <Mail className="text-foreground/40" size={18} />
                                            <span className="text-foreground">{userData.email}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground/70 mb-2">Subscription Plan</label>
                                        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                                                <span className="text-foreground font-medium">{userData.plan} Plan</span>
                                            </div>
                                            <Link href="/subscription" className="text-primary text-sm font-medium hover:text-primary/80">
                                                Upgrade
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Security Settings */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-xl p-6 border border-muted"
                            >
                                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <Shield size={20} className="text-primary" />
                                    Security
                                </h3>

                                <div className="space-y-4">
                                    <div className="p-4 bg-muted/30 rounded-lg">
                                        <p className="text-sm text-foreground/70 mb-3">Last password change: 3 months ago</p>
                                        <button
                                            onClick={() => setShowPasswordDialog(true)}
                                            className="w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                                        >
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Password Change Dialog */}
            <AnimatePresence>
                {showPasswordDialog && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-md"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
                                <button
                                    onClick={() => setShowPasswordDialog(false)}
                                    className="text-foreground/50 hover:text-foreground"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground/70 mb-2">Current Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" size={18} />
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-12 py-3 bg-muted/30 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Enter current password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground/60"
                                        >
                                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground/70 mb-2">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" size={18} />
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-12 py-3 bg-muted/30 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="New password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground/60"
                                        >
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground/70 mb-2">Confirm New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" size={18} />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-12 py-3 bg-muted/30 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Confirm password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground/60"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleChangePassword}
                                    disabled={isLoading}
                                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-70"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Updating...
                                        </div>
                                    ) : "Update Password"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}