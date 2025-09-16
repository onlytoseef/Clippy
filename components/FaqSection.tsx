"use client"
import Title from "./Title"
import FaqList from "./FaqList"

export function FaqSection() {

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <Title
          heading="Frequently Asked"
          highlight="Questions"
          subheading="Everything you need to know about Clippy's AI voice generation"
        />

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <FaqList
            type="home"
          />
        </div>
      </div>
    </section>
  )
}
