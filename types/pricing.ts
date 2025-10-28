export interface Pricing {
  _id?: string;
  name: string;
  price: number;
  popular?: boolean;

  script_credits: number;
  script_description?: string;

  voice_credits: number;
  voice_description?: string;

  image_credits: number;
  image_description?: string;

  video_credits: number;
  video_description?: string;
};
