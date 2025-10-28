// src/components/ProfileDialog.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSchema, ProfileSchema } from "@/validations/profile"
import { useEffect } from "react"

interface ProfileDialogProps {
  open: boolean
  onClose: () => void
  defaultValues: ProfileSchema
  onSave: (values: ProfileSchema) => void
  isPending?: boolean
}

const ProfileDialog = ({
  open,
  onClose,
  defaultValues,
  onSave,
  isPending,
}: ProfileDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  useEffect(() => {
    if (open) reset(defaultValues)
  }, [open, defaultValues, reset])

  const onSubmit = (values: ProfileSchema) => {
    onSave(values)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}

      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <Input
            label="Address"
            placeholder="Enter your address"
            {...register("address")}
            error={errors.address?.message}
          />

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              className="flex-1 rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ProfileDialog
