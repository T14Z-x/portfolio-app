import type { JSX } from "react";

export type CircularGalleryItem = {
  image: string;
  text: string;
};

export type CircularGalleryProps = {
  items: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
};

declare function CircularGallery(props: CircularGalleryProps): JSX.Element;

export default CircularGallery;
