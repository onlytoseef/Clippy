import Title from "./Title"
import Card from "./Card"


export function FeaturesSection() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <Title
                    heading="Why Choose"
                    highlight="Clippy"
                    subheading="Experience the future of voice generation with cutting-edge AI technology that delivers
                    professional results in seconds"
                />

                <Card
                    type="home"
                />

            </div>
        </section>
    )
}