type ErrorResponse = {
  message: string;
  data: {
    needsVerification: boolean;
    email: string;
  };
};

interface SkeletonLoaderProps {
  count?: number;
  variant?: string;
}

interface Voice {
  id: string
  name: string
  character: string
  accent: string
  age: string
  description: string
  avatar: string
  audioSample: string
  tags: string[]
}