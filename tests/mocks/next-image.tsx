import type { ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string; fill?: boolean };

export default function Image({ fill, alt, ...props }: ImageProps) {
  void fill;
  return <img alt={alt} {...props} />;
}
