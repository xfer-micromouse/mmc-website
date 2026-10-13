"use client"

import { useState } from "react"

/**
 * YouTube video shown as a thumbnail with a play button until clicked
 * ("lite YouTube"). Keeps the heavy player off the page until wanted, and
 * keeps wheel input on our page so chapter scrolling works over the video.
 */
export function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block h-full w-full"
      aria-label={`Pokreni video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-signal/60 bg-floor/80 text-signal shadow-[0_0_30px_-6px_rgb(var(--signal))] backdrop-blur transition-transform group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute bottom-3 left-3 rounded bg-floor/80 px-2 py-1 font-mono text-[11px] text-muted">{title}</span>
    </button>
  )
}
