import { largestSrc, srcSetFor, type Photo as PhotoType } from "@/lib/catalog";

type Props = {
  photo: PhotoType;
  sizes: string;
  className?: string;
  eager?: boolean;
  draggable?: boolean;
};

/** Standard, SEO-friendly responsive <img> (Playbook §37–§38). */
export default function Photo({ photo, sizes, className, eager, draggable }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={largestSrc(photo)}
      srcSet={srcSetFor(photo)}
      sizes={sizes}
      width={photo.w}
      height={photo.h}
      alt={photo.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      draggable={draggable ?? false}
    />
  );
}

export function ExifChips({ photo }: { photo: PhotoType }) {
  return (
    <span className="chips" aria-label="Camera metadata">
      <span className="chip">{photo.lens}</span>
      <span className="chip">{photo.aperture}</span>
      <span className="chip">{photo.shutter}</span>
      <span className="chip">ISO {photo.iso}</span>
      <span className="chip">{photo.film}</span>
    </span>
  );
}
