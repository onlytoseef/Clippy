import { Star, Zap, Crown, Building ,Image, Mic} from "lucide-react";

export const plans = [
  {
    name: "Student",
    price: 0,
    description: "Perfect for students exploring Clippy",
    icon: Star,
    features: [
      { title: "Script", value: "2,000 characters (no limit)" },
      { title: "Voiceover", value: "1,000 credits (~30 sec voiceover)" },
      { title: "Images", value: "20 credits (with watermark)" },
    ],
    popular: false,
  },
  {
    name: "Creator",
    price: 5,
    description: "For individual creators and freelancers",
    icon: Zap,
    features: [
      { title: "Script", value: "100K characters" },
      { title: "Voiceover", value: "100K credits" },
      { title: "Images", value: "250 credits" },
    ],
    popular: true,
  },
  {
    name: "Business",
    price: 15,
    description: "For teams and small businesses",
    icon: Building,
    features: [
      { title: "Script", value: "350K characters" },
      { title: "Voiceover", value: "350K credits" },
      { title: "Images", value: "1,000 credits" },
    ],
    popular: false,
  },
  {
    name: "Enterprise",
    price: 50,
    description: "For large enterprises and organizations",
    icon: Crown,
    features: [
      { title: "Script", value: "1M characters" },
      { title: "Voiceover", value: "1M credits" },
      { title: "Images", value: "2,000 credits" },
    ],
    popular: false,
  },
];

export const imagePlans = [
  { images: 500, credits: "1K", price: 5 },
  { images: 1000, credits: "2K", price: 10 },
  { images: 1500, credits: "3K", price: 15 },
  { images: 2500, credits: "5K", price: 25 },
  { images: 3500, credits: "7K", price: 35 },
  { images: 5000, credits: "10K", price: 45, discount: "10% OFF" },
];

export const voicePlans = [
  { credits: "100K credits", price: 3 },
  { credits: "250K credits", price: 5 },
  { credits: "500K credits", price: 10 },
  { credits: "1M credits", price: 20 },
  { credits: "2.5M credits", price: 50 },
  { credits: "5M credits", price: 90, discount: "10% OFF" },
];
