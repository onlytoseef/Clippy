import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const PlanDialog = ({showDialog, setShowDialog}: {showDialog: boolean, setShowDialog: (showDialog: boolean) => void}) => {
    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Purchase Plan Required</DialogTitle>
                    <DialogDescription>
                        You need to purchase a plan before accessing your dashboard.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" className="rounded-full" onClick={() => setShowDialog(false)}>
                        Cancel
                    </Button>
                    <Link href="/pricing" onClick={() => setShowDialog(false)}>
                        <Button>View Plans</Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default PlanDialog