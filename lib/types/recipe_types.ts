interface Ingredient {
  name: string; // In case you want to store names directly
  category: string;
  source: string;
  imageURL: string;
  measurement: string;
}

interface Image {
  url: string;
  description?: string;
  step?: number;
  ingredients: Ingredient[];
}

interface Review {
  reviewId: string;
  // You can expand with userId, rating, text, etc.
}

interface Recipe {
  chefId: string;
  description: string;
  images: Image[];
  ingredients: Ingredient[];
  instructions: string;
  nftToken: string;
  reviews: Review[];
  title: string;
}

interface SVGIcons {
  sanitizedSVG: string;
  svgURL: string;
}

interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: Array<{
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    duration?: number;
    videos?: {
      large: PixabayVideo;
      medium: PixabayVideo;
      small: PixabayVideo;
      tiny: PixabayVideo;
    };
    webformatURL: string;
    largeImageURL: string;
  }>;
}

interface PixabayVideo {
  url: string;
  width: number;
  height: number;
  size: number;
  thumbnail: string;
}
