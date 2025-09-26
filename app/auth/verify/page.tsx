import React from 'react'
import VerificationForm from '@/components/forms/verification'
import { Suspense } from 'react'

const VerificationPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerificationForm />
        </Suspense>
    )
}

export default VerificationPage