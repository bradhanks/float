// src/components/portable-text/SanityImage.tsx
'use client';

import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/lib/client';

// Define a more specific type for the 'value' prop that our component receives.
// This 'value' is the image object from your Sanity document.
// We extend SanityImageSource to include our custom fields like 'alt' and 'caption'.
interface CustomSanityImageProps {
  value: SanityImageSource & {
    asset: {
      _ref?: string;
      _type?: string;
      metadata?: {
        lqip?: string;
        [key: string]: any;
      };
      [key: string]: any;
    };
    alt?: string;
    caption?: string;
  };
}

export function SanityImage({ value }: CustomSanityImageProps) {
  // The useNextSanityImage hook from 'next-sanity-image' is a great utility.
  // It takes your Sanity image object and returns the props required by next/image.
  const imageProps = useNextSanityImage(client, value);

  // If the image source is invalid or missing, the hook returns null.
  // In this case, we render nothing to avoid errors.
  if (!imageProps) {
    return null;
  }

  return (
    // Using <figure> and <figcaption> is semantically correct for an image with a caption.
    <figure className="my-8">
      <Image
        {...imageProps}
        // The alt text is crucial for accessibility. We source it directly from the
        // 'alt' field on the image object in Sanity. An empty string is a valid
        // fallback for decorative images.
        alt={value.alt || ''}
        sizes="(max-width: 800px) 100vw, 800px"
        // The 'blur' placeholder provides a better user experience while the image loads.
        // We only enable it if a low-quality image placeholder (lqip) is available.
        placeholder={value.asset?.metadata?.lqip ? 'blur' : 'empty'}
        // The blurDataURL is the base64-encoded lqip string from the asset's metadata.
        blurDataURL={value.asset?.metadata?.lqip}
        className="rounded-lg"
      />
      {/* If a caption is provided in Sanity, we render it below the image. */}
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm italic text-gray-600">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
