// types/PostType.ts

// export type ContentItem =
//   | { type: "text"; text: string }
//   | { type: "image"; imageUrl: string }
//   | { type: "video"; content: string } // Video content should be a URL
//   | { type: "audio"; audioUrl: string };

export type ContentItem =
  | { type: "text"; content: string } // Changed text to content
  | { type: "image"; imageUrl: string }
  | { type: "video"; content: string }
  | { type: "audio"; audioUrl: string };

export interface Comment {
  author: string;
  text: string;
}

export interface PostType {
  id: string;
  title: string;
  content: ContentItem[];
  likes: number;
  comments: Comment[];
  author: string;
  timestamp: string; // Consider using Date type if you convert this in the component
}
