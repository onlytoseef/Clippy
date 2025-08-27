import { Button } from "@/components/ui/button"
import Title from "./Title"

export function EnterpriseSection() {
  return (
    <div className="container mx-auto px-4 relative z-10 py-24">
      <Title
        heading="Connect With Our"
        highlight="Enterprise Team"
        subheading="Learn how we can optimize your voice content strategy while reducing operational costs. Our team will reach
            out to discuss your specific requirements."
      />
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="xl"
          variant="destructive"
        >
          Sign Up
        </Button>

        <Button
          variant="outline"
          size="xl"
        >
          Contact Sales
        </Button>
      </div>
    </div>
  )
}
