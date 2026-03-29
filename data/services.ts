export type ServiceCategoryId =
  | "hardscape"
  | "outdoor-living"
  | "water"
  | "softscape"
  | "turf"
  | "design";

export type ServiceCategory = {
  id: ServiceCategoryId;
  title: string;
  intro: string;
  bullets: string[];
  /** Filename in /public/media when a current asset fits; omit to keep the gradient placeholder. */
  media?: { file: string; alt: string };
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "hardscape",
    title: "Hardscaping & Structural Work",
    media: {
      file: "gate design 8.jpg",
      alt: "Finished gate and stone entry hardscape with clean joints and structural detailing.",
    },
    intro:
      "Structural outdoor construction built for drainage, load, and longevity—then finished so every joint, edge, and transition reads clean from curb to courtyard.",
    bullets: [
      "Retaining Walls: Segmental Block, Natural Stone, Boulder, And Timber Where Appropriate",
      "Terracing And Multi-Level Yard Shaping",
      "Seat Walls, Garden Walls, Pillars, And Columns",
      "Patios And Terraces: Concrete Pavers, Natural Stone, And Flagstone",
      "Walkways, Garden Paths, And Circulation",
      "Driveways And Motor Courts, Including Permeable Pavers When Specified",
      "Steps, Stoops, Landings, And Outdoor Stairs (Stone, Paver, Timber)",
      "Edging, Curbs, And Border Definition",
      "Raised And Built-In Planters",
      "Masonry And Stone Veneer On Structures",
      "Base Prep, Grading, Compaction, And Structural Bedding",
      "Drainage As Part Of Scope: French Drains, Catch Basins, Channel Drains, Dry Wells",
    ],
  },
  {
    id: "outdoor-living",
    title: "Outdoor Living & Built Amenities",
    intro:
      "Spaces meant for gathering, cooking, and unwinding—integrated with your hardscape so lighting, sight lines, and materials feel intentional day and night.",
    bullets: [
      "Outdoor Kitchens And BBQ Islands",
      "Fire Pits, Fire Tables, And Masonry Outdoor Fireplaces",
      "Pergolas, Arbors, And Trellises",
      "Decks And Elevated Platforms (Wood And Composite)",
      "Pool Surrounds, Pool Coping, And Splash Pads",
      "Bocce Courts, Putting Greens, And Synthetic-Turf Specialty Areas",
      "Low-Voltage Landscape Lighting Integrated With Hardscape And Planting Beds",
    ],
  },
  {
    id: "water",
    title: "Water Features",
    media: {
      file: "beechwood 8.jpg",
      alt: "Water fountain feature at a Beechwood residence landscape project.",
    },
    intro:
      "Custom water from subtle movement to full aquatic focal points—engineered for clarity, sound, and dependable circulation.",
    bullets: [
      "Decorative Fountains And Bubblers",
      "Spillways And Water Walls",
      "Pondless Waterfalls",
      "Streams And Creek Beds",
      "Koi Ponds With Fish-Safe Filtration",
      "Natural-Style Ponds And Planted Aquatic Zones",
      "Reflecting Pools And Formal Rills",
      "Pumps, Filtration, Aeration, And Seasonal Care As Offered",
    ],
  },
  {
    id: "softscape",
    title: "Softscape & Planting",
    media: {
      file: "beechwood 2.jpg",
      alt: "Planting and softscape integrated with hardscape at a Beechwood residence project.",
    },
    intro:
      "Living layers that soften structure, frame views, and perform in your microclimate—from instant lawn to layered beds that age beautifully.",
    bullets: [
      "Planting Design: Trees, Shrubs, Perennials, And Ornamental Grasses",
      "Sod Installation And Lawn Establishment",
      "Soil Amendment And Bed Preparation",
      "Mulch And Bark Installation",
      "Native And Drought-Tolerant Planting",
      "Seasonal Color And Annual Rotations",
      "Erosion Control And Slope Stabilization With Plants And Appropriate Structures",
    ],
  },
  {
    id: "turf",
    title: "Turf & Lawn Alternatives",
    intro:
      "High-performance synthetic surfaces where drainage, pet use, or traffic demand more than traditional lawn—installed like infrastructure, not a mat on top.",
    bullets: [
      "Premium Artificial Turf With Pet-Friendly, Drainage-Focused Installs",
      "Synthetic Lawn For Play Areas, Side Yards, And High-Traffic Zones",
    ],
  },
  {
    id: "design",
    title: "Design & Project Types",
    intro:
      "Whether you are reimagining one zone or the entire property, we align phasing, budget, and construction so the outcome feels cohesive—not piecemeal.",
    bullets: [
      "Full Exterior Design And Remodels",
      "Master Plans And Phased Construction",
      "Consultation-Only And Design-Only Engagements When Offered",
    ],
  },
];

export type FeaturedServiceId =
  | "full-design-remodels"
  | "retaining-hardscape"
  | "patios-paving"
  | "water-features"
  | "outdoor-living"
  | "planting-turf";

export type FeaturedService = {
  id: FeaturedServiceId;
  title: string;
  shortDescription: string;
};

/** Order = display order on the home page (6 cards). */
export const FEATURED_SERVICES: FeaturedService[] = [
  {
    id: "full-design-remodels",
    title: "Full Design & Exterior Remodels",
    shortDescription:
      "Complete property transformations from concept through final walkthrough—one cohesive outdoor plan.",
  },
  {
    id: "retaining-hardscape",
    title: "Retaining Walls & Structural Hardscape",
    shortDescription:
      "Engineered walls, terraces, and structural stonework that maximize usable space and long-term stability.",
  },
  {
    id: "patios-paving",
    title: "Patios, Walkways & Driveways",
    shortDescription:
      "Pavers, natural stone, and flagstone laid with disciplined base work, drainage, and crisp detailing.",
  },
  {
    id: "water-features",
    title: "Fountains, Ponds & Water Features",
    shortDescription:
      "Fountains, waterfalls, koi ponds, and custom circulation—built for sound, clarity, and reliability.",
  },
  {
    id: "outdoor-living",
    title: "Outdoor Living & Lighting",
    shortDescription:
      "Kitchens, fire features, pergolas, decks, pool surrounds, and integrated low-voltage lighting.",
  },
  {
    id: "planting-turf",
    title: "Planting, Sod & Premium Turf",
    shortDescription:
      "Trees, shrubs, beds, sod, and high-drainage artificial turf tailored to use, sun, and soil.",
  },
];
