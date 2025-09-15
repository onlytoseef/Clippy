import React from 'react'

interface TitleProps {
  title: string
  subTitle: string
}

const Title = ({ title, subTitle }: TitleProps) => {
    return (
        <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-primary">{title}</h2>
            <p className="text-foreground/70 text-sm">{subTitle}</p>
        </div>
    )
}

export default Title
