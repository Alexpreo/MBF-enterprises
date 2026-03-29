import type { FeaturedSlide } from "@/components/FeaturedCarousel";

/** Public URL for a file in /public/media (handles spaces). */
export function mediaUrl(filename: string): string {
  return `/media/${encodeURIComponent(filename)}`;
}

export type ProjectMediaItem =
  | { type: "image"; file: string; alt: string }
  | { type: "video"; file: string; posterFile?: string; alt: string };

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  category: "Hardscaping" | "Turf" | "Water Features";
  summary: string;
  /** Index into `media` used for the portfolio grid thumbnail. */
  coverMediaIndex: number;
  media: ProjectMediaItem[];
};

const beechwoodImages = Array.from({ length: 8 }, (_, i) => ({
  type: "image" as const,
  file: `beechwood ${i + 1}.jpg`,
  alt: `Beechwood project photo ${i + 1}`,
}));

const gateDesignImages = Array.from({ length: 8 }, (_, i) => ({
  type: "image" as const,
  file: `gate design ${i + 1}.jpg`,
  alt: `Gate design project photo ${i + 1}`,
}));

const indoorPlanterImages = Array.from({ length: 5 }, (_, i) => ({
  type: "image" as const,
  file: `indoor planter ${i + 1}.jpg`,
  alt: `Indoor planter project photo ${i + 1}`,
}));

const townHouseImages = Array.from({ length: 8 }, (_, i) => ({
  type: "image" as const,
  file: `town house project ${i + 1}.jpg`,
  alt: `Town house project photo ${i + 1}`,
}));

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "beechwood",
    slug: "beechwood",
    title: "Beechwood Residence",
    category: "Hardscaping",
    summary: "Full exterior hardscape and planting transformation.",
    coverMediaIndex: 0,
    media: [
      {
        type: "video",
        file: "Beechwood video.mp4",
        posterFile: "beechwood 1.jpg",
        alt: "Beechwood project walkthrough",
      },
      ...beechwoodImages,
    ],
  },
  {
    id: "gate-design",
    slug: "gate-design",
    title: "Gate & Entry Design",
    category: "Hardscaping",
    summary: "From concept drawings through finished entry and gates.",
    coverMediaIndex: 0,
    media: gateDesignImages,
  },
  {
    id: "indoor-planter",
    slug: "indoor-planter",
    title: "Indoor Planter Feature",
    category: "Hardscaping",
    summary: "Custom built-in planters and finish details.",
    coverMediaIndex: 0,
    media: indoorPlanterImages,
  },
  {
    id: "townhouse",
    slug: "townhouse",
    title: "Townhouse Exterior",
    category: "Hardscaping",
    summary: "Compact lot, elevated curb appeal and usable outdoor space.",
    coverMediaIndex: 0,
    media: [
      ...townHouseImages,
      {
        type: "video",
        file: "backyard video no clue.mp4",
        posterFile: "town house project 1.jpg",
        alt: "Townhouse outdoor space video",
      },
      {
        type: "video",
        file: "another random video.mp4",
        posterFile: "town house project 2.jpg",
        alt: "Project highlight video",
      },
    ],
  },
];

/** Hero background (portrait video — same clip mobile & desktop for now). */
export const HERO_VIDEO = {
  src: mediaUrl("Beechwood video.mp4"),
  poster: mediaUrl("beechwood 1.jpg"),
};

/**
 * Story rail: gate design sequence from design and plans through finished project.
 */
export const STORY_RAIL_SLIDES: FeaturedSlide[] = [
  {
    id: "story-design",
    phase: "Design",
    title: "Design Direction",
    caption: "Early concepts and material direction for gates, entry flow, and detailing.",
    imageSrc: mediaUrl("gate design 1.jpg"),
  },
  {
    id: "story-plans",
    phase: "Plans",
    title: "Drawings & Layout",
    caption: "Plans lock in dimensions, hardware, and how the entry reads from the street.",
    imageSrc: mediaUrl("gate design 2.jpg"),
  },
  {
    id: "story-build",
    phase: "Build",
    title: "Build & Installation",
    caption: "Structure, panels, and gates go in with exact alignment and long-term performance in mind.",
    imageSrc: mediaUrl("gate design 4.jpg"),
  },
  {
    id: "story-finish",
    phase: "Finish",
    title: "Finish & Detail",
    caption: "Hardware, adjustments, and final finishes that complete the look.",
    imageSrc: mediaUrl("gate design 6.jpg"),
  },
  {
    id: "story-reveal",
    phase: "Reveal",
    title: "Finished Project",
    caption: "The completed entry — ready for daily use and the impression you wanted.",
    imageSrc: mediaUrl("gate design 8.jpg"),
  },
];

export function projectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}

export function mediaItemToSrc(item: ProjectMediaItem): {
  src: string;
  posterSrc?: string;
  type: "image" | "video";
  alt: string;
} {
  if (item.type === "video") {
    return {
      type: "video",
      src: mediaUrl(item.file),
      posterSrc: item.posterFile ? mediaUrl(item.posterFile) : undefined,
      alt: item.alt,
    };
  }
  return { type: "image", src: mediaUrl(item.file), alt: item.alt };
}
