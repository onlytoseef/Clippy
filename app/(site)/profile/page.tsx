"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, User, Phone, MapPin, Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useGetUser, useUpdateUser } from "@/hooks/useAuth"
import { Skeleton } from "@/components/ui/skeleton"
import ProfileDialog from "@/components/dialogs/profile"
import { ProfileSchema } from "@/validations/profile"
import SkeletonLoader from "@/components/common/SkeletonLoader"

export default function ProfilePage() {
    const { data, isLoading } = useGetUser()
    const { mutate: updateUser, isPending } = useUpdateUser()

    const [showEditDialog, setShowEditDialog] = useState(false)

    const handleSaveProfile = (values: ProfileSchema) => {
        updateUser(values, {
            onSuccess: () => setShowEditDialog(false),
        })
    }

    return (
        <div className="min-h-screen">
            <div className="min-h-screen p-4 py-8">
                <div className="w-full max-w-5xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                    >
                        <ArrowLeft size={20} />
                        <p className="text-sm font-medium">Back to Home</p>
                    </Link>

                    {/* Loader */}
                    {isLoading ? (
                       <SkeletonLoader variant="profile" />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Profile Header Card */}
                            <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden mb-6">
                                <div className="relative h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-foreground/10"></div>

                                <div className="px-6 pb-6 md:px-8 md:pb-8">
                                    <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-12">
                                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                                            <Avatar className="w-24 h-24 md:w-30 md:h-30 border-4 border-card shadow-xl">
                                                <AvatarImage
                                                    src={data?.avatar || "/avatar.jpg"}
                                                    alt={data?.name || "User"}
                                                />
                                            </Avatar>
                                            <div className="mb-2 mt-10">
                                                <h1 className="text-2xl font-bold text-foreground">
                                                    {data?.name}
                                                </h1>
                                                <p className="text-sm text-muted-foreground">{data?.email}</p>
                                            </div>
                                        </div>

                                        <Button onClick={() => setShowEditDialog(true)} size="lg">
                                            <Edit size={18} />
                                            <p>Edit Profile</p>
                                        </Button>
                                    </div>
                                </div>
                            </div>


                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Contact Information */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-card rounded-xl shadow-lg border border-border p-6"
                                >
                                    <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <User size={18} className="text-primary" />
                                        </div>
                                        <p>Contact Information</p>
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="group">
                                            <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                                                Phone Number
                                            </label>
                                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border group-hover:border-primary/30 transition-colors">
                                                <Phone className="text-muted-foreground flex-shrink-0" size={18} />
                                                <p className="text-foreground">
                                                    {data?.phone || (
                                                        <p className="text-muted-foreground italic inline">
                                                            Not provided
                                                        </p>
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                                                Address
                                            </label>
                                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border group-hover:border-primary/30 transition-colors">
                                                <MapPin className="text-muted-foreground flex-shrink-0" size={18} />
                                                <p className="text-foreground">
                                                    {data?.address || (
                                                        <p className="text-muted-foreground italic inline">
                                                            Not provided
                                                        </p>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Account & Subscription */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-card rounded-xl shadow-lg border border-border p-6"
                                >
                                    <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Mail size={18} className="text-primary" />
                                        </div>
                                        <p>Account Details</p>
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="group">
                                            <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                                                Email Address
                                            </label>
                                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                                                <Mail className="text-muted-foreground flex-shrink-0" size={18} />
                                                <p className="text-foreground break-all">{data?.email}</p>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                                                Subscription Plan
                                            </label>
                                            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                                    <p className="text-foreground font-semibold">
                                                        {data?.plan || "Free"} Plan
                                                    </p>
                                                </div>
                                                <Link
                                                    href="/pricing"
                                                    className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors"
                                                >
                                                    Upgrade →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Dialog */}
            {!isLoading && (
                <ProfileDialog
                    open={showEditDialog}
                    onClose={() => setShowEditDialog(false)}
                    defaultValues={{
                        name: data?.name || "",
                        phone: data?.phone || "",
                        address: data?.address || "",
                    }}
                    onSave={handleSaveProfile}
                    isPending={isPending}
                />
            )}
        </div>
    )
}
