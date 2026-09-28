import Image from "next/image";
import { cn } from "../_lib/cn";

type PhotoProps = {
  /** Picsum photo id, stored at /public/img/{id}.jpg */
  id: number;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Adds the dark-mode veil from the --dim token. On by default. */
  dim?: boolean;
};

/** Fills its nearest positioned parent. The parent owns size and aspect ratio. */
export function Photo({
  id,
  alt,
  sizes,
  priority,
  className,
  dim = true,
}: PhotoProps) {
  return (
    <>
      <Image
        src={`/variants/with-taste-skill/sonnet-5.5/img/${id}.jpg`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
      {dim && <span aria-hidden className="absolute inset-0 bg-(--dim)" />}
    </>
  );
}
