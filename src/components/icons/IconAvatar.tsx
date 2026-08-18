import Image from "next/image";
import type { IconFigure } from "@/types/content";
import { iconInitials } from "@/lib/icon-names";
import { cn } from "@/lib/utils";

const SIZE_CLASS = {
  sm: "size-9 text-[0.65rem]",
  md: "size-14 text-sm md:size-16 md:text-base",
  lg: "size-16 text-lg md:size-24 md:text-2xl",
} as const;

interface IconAvatarProps {
  figure: IconFigure;
  size?: keyof typeof SIZE_CLASS;
  showPhoto?: boolean;
  /** Decorative by default, pass a string when the image is the sole name cue. */
  alt?: string;
  className?: string;
}

export function IconAvatar({
  figure,
  size = "md",
  showPhoto = true,
  alt = "",
  className,
}: IconAvatarProps) {
  const photo = showPhoto && figure.image;

  if (photo) {
    return (
      <Image
        src={figure.image!.src}
        alt={alt}
        width={96}
        height={96}
        sizes="96px"
        className={cn("shrink-0 rounded-full object-cover", SIZE_CLASS[size], className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-accent/15 font-serif font-bold text-accent",
        SIZE_CLASS[size],
        className,
      )}
      aria-hidden
    >
      {iconInitials(figure.name)}
    </span>
  );
}
