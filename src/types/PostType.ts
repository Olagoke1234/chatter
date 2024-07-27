// src/types/Post.ts

export interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: any;
  likes: number;
  comments: any[];
}
