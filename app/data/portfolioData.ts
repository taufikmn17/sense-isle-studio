export interface PortfolioItem {
  id: string;
  title: string;
  category: "residential" | "commercial";
  image: string;
  location: string;
  year: string;
  description: string;
  purpose: string;
}

export const portfolioData: PortfolioItem[] = [
  // --- RESIDENTIAL (12 Items) ---
  {
    id: "ox-wood",
    title: "OX WOOD",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
    location: "Jakarta, Indonesia",
    year: "2025",
    description:
      "A luxury modern tropical residence combining natural wood elements and exposed concrete structures.",
    purpose:
      "Delivering an eco-friendly private dwelling with optimal airflow and natural lighting.",
  },
  {
    id: "umah-daun",
    title: "UMAH DAUN",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
    location: "Bali, Indonesia",
    year: "2024",
    description:
      "An exclusive resort villa design blending harmoniously with the green landscape.",
    purpose:
      "Creating a tranquil, private sanctuary fully integrated with tropical nature.",
  },
  {
    id: "ocean-breeze",
    title: "OCEAN BREEZE",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop",
    location: "Lombok, Indonesia",
    year: "2025",
    description:
      "A beachfront coastal home with large panoramic glass openings.",
    purpose:
      "Maximizing visual connection to the open sea while providing resilience against the coastal climate.",
  },
  {
    id: "the-jewel",
    title: "THE JEWEL",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
    location: "Surabaya, Indonesia",
    year: "2023",
    description:
      "A minimalist urban residential architectural masterpiece with modern geometric facade details.",
    purpose:
      "Showcasing elegant contemporary urban aesthetics and optimizing spatial function on a limited plot.",
  },
  {
    id: "serenity-heights",
    title: "SERENITY HEIGHTS",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop",
    location: "Bandung, Indonesia",
    year: "2025",
    description:
      "A hillside villa retreat featuring multi-level wooden decks and open-air living pavilions.",
    purpose:
      "Providing panoramic valley views while maintaining structural stability on sloping terrain.",
  },
  {
    id: "zenith-house",
    title: "ZENITH HOUSE",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1000&auto=format&fit=crop",
    location: "Jakarta, Indonesia",
    year: "2024",
    description:
      "A sophisticated contemporary mansion featuring a central indoor courtyard and minimalist water features.",
    purpose:
      "Integrating traditional tropical inner-court concepts with cutting-edge modern smart home technology.",
  },
  {
    id: "alpine-glow",
    title: "ALPINE GLOW",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    location: "Malang, Indonesia",
    year: "2023",
    description:
      "A cozy highland cabin-style residence built with local stone cladding and floor-to-ceiling glass walls.",
    purpose:
      "Offering a warm, insulating structural layout designed for cool mountain weather conditions.",
  },
  {
    id: "veridia-residence",
    title: "VERIDIA RESIDENCE",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop",
    location: "Bali, Indonesia",
    year: "2025",
    description:
      "An eco-luxury private dwelling surrounded by private rice paddy terraces and organic ponds.",
    purpose:
      "Promoting sustainable living through rainwater harvesting and passive solar architectural design.",
  },
  {
    id: "solaris-villa",
    title: "SOLARIS VILLA",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop",
    location: "Seminyak, Indonesia",
    year: "2024",
    description:
      "A sleek modernist holiday home featuring a sunken lounge adjacent to a crystalline infinity pool.",
    purpose:
      "Maximizing entertainment space and outdoor leisure lifestyle for tropical vacationers.",
  },
  {
    id: "aura-haven",
    title: "AURA HAVEN",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
    location: "Yogyakarta, Indonesia",
    year: "2023",
    description:
      "A compact urban townhouse utilizing vertical gardens and clever louvered screens for privacy.",
    purpose:
      "Creating a peaceful, private refuge shielded from dense neighborhood environments.",
  },
  {
    id: "horizon-crest",
    title: "HORIZON CREST",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1000&auto=format&fit=crop",
    location: "Bogor, Indonesia",
    year: "2025",
    description:
      "A sprawling suburban family estate featuring expansive green lawns and a cantilevered master suite.",
    purpose:
      "Providing multi-generational functional living spaces with unhindered views of mountain ranges.",
  },
  {
    id: "the-monolith",
    title: "THE MONOLITH",
    category: "residential",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1000&auto=format&fit=crop",
    location: "Medan, Indonesia",
    year: "2024",
    description:
      "An avant-garde brutalist concrete house balanced with warm teak wood interior accents.",
    purpose:
      "Showcasing bold architectural statements while delivering comfortable, acoustic-controlled living.",
  },

  // --- COMMERCIAL (12 Items) ---
  {
    id: "krisna-retail",
    title: "KRISNA RETAIL",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
    location: "Bali, Indonesia",
    year: "2025",
    description:
      "A modern commercial shopping center with an artistic facade and natural lighting.",
    purpose:
      "Providing a comfortable, dynamic shopping experience that attracts commercial visitors.",
  },
  {
    id: "krisna-sunset",
    title: "KRISNA SUNSET",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    location: "Bali, Indonesia",
    year: "2024",
    description:
      "A large-scale iconic commercial lifestyle destination serving as a hub for tourist crowds.",
    purpose:
      "Providing an integrated commercial public space supporting lifestyle and tourism activities.",
  },
  {
    id: "muem-waktuku",
    title: "MUEM WAKTUKU",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1000&auto=format&fit=crop",
    location: "Yogyakarta, Indonesia",
    year: "2024",
    description:
      "An aesthetic art gallery and restaurant area featuring an organic curved roof.",
    purpose:
      "Combining art exhibition and culinary spaces within a warm and inspiring architectural atmosphere.",
  },
  {
    id: "colliers",
    title: "COLLIERS",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    location: "Jakarta, Indonesia",
    year: "2023",
    description:
      "A skyscraper office building with futuristic workspace interiors.",
    purpose:
      "Building a high-standard professional work environment that supports business efficiency and collaboration.",
  },
  {
    id: "velox-hub",
    title: "VELOX HUB",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    location: "Surabaya, Indonesia",
    year: "2025",
    description:
      "A collaborative co-working space featuring industrial metal finishes and indoor vertical forests.",
    purpose:
      "Fostering creativity, networking, and productivity for startup entrepreneurs and tech agencies.",
  },
  {
    id: "aura-pavilion",
    title: "AURA PAVILION",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000&auto=format&fit=crop",
    location: "Bandung, Indonesia",
    year: "2024",
    description:
      "A multi-functional exhibition hall and boutique hotel lobby with grand double-height glass panels.",
    purpose:
      "Creating a high-end memorable hospitality arrival experience for international guests.",
  },
  {
    id: "nexa-plaza",
    title: "NEXA PLAZA",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1000&auto=format&fit=crop",
    location: "Semarang, Indonesia",
    year: "2023",
    description:
      "A boutique retail complex integrating open-air walkways with shaded cooling architectural structures.",
    purpose:
      "Enhancing foot traffic flow and tenant visibility in a tropical urban climate.",
  },
  {
    id: "zenith-tower",
    title: "ZENITH TOWER",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    location: "Jakarta, Indonesia",
    year: "2025",
    description:
      "A sustainable corporate headquarters featuring smart energy-saving glass curtain facades.",
    purpose:
      "Achieving net-zero operational efficiency while projecting corporate prestige and authority.",
  },
  {
    id: "vortex-mall",
    title: "VORTEX MALL",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1000&auto=format&fit=crop",
    location: "Tangerang, Indonesia",
    year: "2025",
    description:
      "A next-generation retail and entertainment complex centered around an open-air amphitheater.",
    purpose:
      "Providing an immersive communal lifestyle destination that merges indoor retail with natural outdoor open spaces.",
  },
  {
    id: "metro-square",
    title: "METRO SQUARE",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1000&auto=format&fit=crop",
    location: "Bekasi, Indonesia",
    year: "2024",
    description:
      "A mixed-use commercial hub featuring streamlined retail podiums and dynamic architectural lighting.",
    purpose:
      "Maximizing commercial leasing yield while offering pedestrian-friendly zones for urban shoppers.",
  },
  {
    id: "solana-cafe-space",
    title: "SOLANA SPACE",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
    location: "Bali, Indonesia",
    year: "2023",
    description:
      "A bohemian-industrial culinary compound featuring open bamboo structures and sunken dining pods.",
    purpose:
      "Creating an Instagram-worthy culinary destination optimized for tropical climate dining and social engagement.",
  },
  {
    id: "pinnacle-suites",
    title: "PINNACLE SUITES",
    category: "commercial",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
    location: "Surabaya, Indonesia",
    year: "2025",
    description:
      "A boutique business hotel tower integrating vertical sky gardens on every third guest floor.",
    purpose:
      "Redefining urban hospitality architecture by combining luxury business accommodation with biophilic design principles.",
  },
];
