import { TrendingUp, Users, Globe, Zap } from "lucide-react"

export const stats = [
    {
        id : 1,
        number: 10,
        suffix: "x",
        title: "Faster Creation",
        description: "Generate voiceovers in minutes",
        icon: Zap,
        color: "text-accent",
    },
    {
        id : 2,
        number: 70,
        suffix: "%",
        title: "Cost Reduction",
        description: "Save on production expenses",
        icon: TrendingUp,
        color: "text-primary",
    },
    {
        id : 3,
        number: 120,
        suffix: "+",
        title: "Languages",
        description: "Global voice options",
        icon: Globe,
        color: "text-accent",
    },
    {
        id : 4,
        number: 50000,
        suffix: "+",
        title: "Happy Users",
        description: "Satisfied customers worldwide",
        icon: Users,
        color: "text-primary",
    },
]