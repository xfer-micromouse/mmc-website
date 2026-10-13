"use client"

import { useRef, useState } from "react"
import { X } from "lucide-react"
import { SectionWrapper } from "@/components/section-wrapper"
import { DecodeText } from "@/components/decode-text"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import Link from "next/link"
import { FIRST_EDITION_YEAR, firstEditionGallery } from "@/lib/config"
import { cn } from "@/lib/utils"

type Photo = (typeof firstEditionGallery)[number]

/** First-edition photos; `limit` shows a teaser with a link to the full archive. */
export function Gallery({ limit }: { limit?: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<Photo | null>(null)

  const show = (photo: Photo) => {
    setOpen(photo)
    dialogRef.current?.showModal()
  }

  return (
    <SectionWrapper id="galerija">
      <h2 className="mt-4 font-mono text-3xl font-medium tracking-tight text-accent-soft md:text-4xl">
        <DecodeText text={`> dump /memory/${FIRST_EDITION_YEAR}`} />
      </h2>

      <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {firstEditionGallery.slice(0, limit).map((photo, index) => (
          <GalleryItem key={photo.camera} photo={photo} index={index} onOpen={() => show(photo)} />
        ))}
      </ul>

      {limit !== undefined && (
        <Link href={`/arhiva/${FIRST_EDITION_YEAR}`} className="mt-10 inline-block font-mono text-sm text-accent-soft underline decoration-accent underline-offset-4 hover:text-foreground">
          &gt; cd /arhiva/{FIRST_EDITION_YEAR}
        </Link>
      )}

      {/* Native dialog: focus trap and Escape-to-close come from the browser. */}
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-floor/95"
        aria-label={open ? `${open.camera}: ${open.tag}` : undefined}
      >
        {open && (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.src} alt={`${open.tag}, Micromouse Zagreb ${FIRST_EDITION_YEAR}`} className="max-h-[90dvh] max-w-[94vw] object-contain" />
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="absolute right-2 top-2 rounded-md bg-floor/80 p-2 text-foreground"
              aria-label="Zatvori"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </dialog>
    </SectionWrapper>
  )
}

function GalleryItem({ photo, index, onOpen }: { photo: Photo; index: number; onOpen: () => void }) {
  const { ref, isVisible } = useScrollReveal<HTMLLIElement>(0.25)

  return (
    <li
      ref={ref}
      className={cn(
        "flex flex-col transition duration-700 ease-out",
        index === 0 && "sm:col-span-2 lg:row-span-2",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
    >
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          "spotlight group/photo relative block w-full overflow-hidden rounded-sm bg-floor",
          index === 0 ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]"
        )}
        aria-label={`Otvori fotografiju: ${photo.tag}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover/photo:scale-[1.04] motion-reduce:transition-none" />
        <span className="viewfinder pointer-events-none absolute inset-3" aria-hidden="true" />
        <span className="scanlines pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100" aria-hidden="true" />
        <span className="silkscreen absolute left-5 top-5 bg-floor/70 px-1.5 py-0.5 text-foreground">
          {photo.camera} // {photo.tag}
        </span>
      </button>
      <p className="silkscreen mt-3 normal-case tracking-[0.08em] text-muted">{photo.caption}</p>
    </li>
  )
}
