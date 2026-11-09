import {
  UserProfile,
  PostItem,
  StoryItem,
  BuilderItem,
  TrendingProblem,
  RecommendedSolution,
  ConstraintComparison,
  ProofObligation
} from "@/types";

export const initialProfile: UserProfile = {
  name: "Dr. Dhivya Raman",
  handle: "@dhivya_research",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80",
  role: "Principal Research Fellow",
  institution: "Delft Center for Verifiable Engineering",
  bio: "Designing verifiable open hardware and passive thermal systems. Investigating phase-change dynamics for off-grid healthcare cold-chains. Every solution should leave evidence.",
  location: "Delft, Netherlands · Global Commons",
  github: "github.com/dhivya-raman",
  linkedin: "linkedin.com/in/dhivya-raman",
  skills: [
    "Thermal Dynamics",
    "Phase-Change Materials",
    "Sensorless Diagnostics",
    "Formal Verification",
    "Clean-Tech Hardware",
    "ISO-13485"
  ],
  followersCount: 1420,
  followingCount: 384,
  problemsCount: 14,
  projectsCount: 8,
  solutionsCount: 23,
};

export const mockStories: StoryItem[] = [
  {
    id: "story-new-problems",
    title: "New Problems",
    author: "Global Commons",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&auto=format&fit=crop&q=80",
    badge: "12 New",
    category: "Fresh Intake",
    slides: [
      {
        title: "Thermal Storage for Remote Clinics",
        subtitle: "72-Hour Zero Power Cold Chain",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
        description: "Clinics in sub-Saharan regions lose 35% of vaccine potency during regional brownouts. Requires passive latency buffer under 48°C ambient.",
        stat: "94% CDEV Match",
        statLabel: "Historic PCM candidate identified",
        actionLabel: "Inspect Problem Brief",
        actionView: "problems",
      },
      {
        title: "Acoustic Cavitation for Microplastics",
        subtitle: "Municipal Wastewater Filtration",
        image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80",
        description: "Breaking down synthetic polymer microfibers (<50μm) without consumable synthetic chemical membranes.",
        stat: "3 Lab Bids",
        statLabel: "Stanford & TU Munich reviewing",
        actionLabel: "View in Feed",
        actionView: "home",
      }
    ]
  },
  {
    id: "story-trending",
    title: "Trending",
    author: "CDEV Radar",
    avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=80",
    badge: "Hot Match",
    category: "High Compatibility",
    slides: [
      {
        title: "Tidal Turbine Predictive Maintenance",
        subtitle: "Submerged Strain Analytics",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
        description: "Hydro-kinetic stress analysis adapting aerodynamic flutter models from wind turbines to high-density saltwater flow.",
        stat: "82% Overlap",
        statLabel: "Adapted from offshore wind 2018",
        actionLabel: "Open CDEV Matrix",
        actionView: "cdev",
      }
    ]
  },
  {
    id: "story-builders",
    title: "Active Builders",
    author: "Researcher Spotlight",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    badge: "5 Active",
    category: "Community",
    slides: [
      {
        title: "Dr. Elena Rostova & Team",
        subtitle: "Materials Physics Lab, Zurich",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80",
        description: "Validated 4 proof obligations this week for non-toxic bio-wax encapsulation in sub-tropical field tests.",
        stat: "19 Sign-offs",
        statLabel: "Peer reviewed test logs",
        actionLabel: "Explore Builders",
        actionView: "projects",
      }
    ]
  },
  {
    id: "story-solved",
    title: "Recently Solved",
    author: "Evidence Archive",
    avatar: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=150&auto=format&fit=crop&q=80",
    badge: "Validated",
    category: "Historical Breakthrough",
    slides: [
      {
        title: "Zero-Water Semiconductor Rinse",
        subtitle: "Subcritical CO2 Surface Cleansing",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
        description: "Eliminated 94% of deionized ultrapure water consumption on 300mm silicon wafers with zero defect residue.",
        stat: "100% Verified",
        statLabel: "SEM imaging certified by IMEC",
        actionLabel: "Inspect Solution Lineage",
        actionView: "solutions",
      }
    ]
  },
  {
    id: "story-featured",
    title: "Featured Tech",
    author: "Showcase",
    avatar: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=150&auto=format&fit=crop&q=80",
    badge: "Case Study",
    category: "Open Hardware",
    slides: [
      {
        title: "Open Cold-Vault Mk IV",
        subtitle: "Full Adaptation Case Study",
        image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&auto=format&fit=crop&q=80",
        description: "From 2019 aerospace thermal shielding to a $35 vaccine cooler saving lives across 14 rural clinics.",
        stat: "72.4 Hours",
        statLabel: "Hold time at 43°C ambient",
        actionLabel: "Open Public Showcase",
        actionView: "showcase",
      }
    ]
  }
];

export const mockPosts: PostItem[] = [
  {
    id: "post-1",
    author: {
      name: "Dr. Dhivya Raman",
      handle: "@dhivya_research",
      role: "Lead Hardware Researcher",
      institution: "Delft Center for Verifiable Eng.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      verified: true
    },
    timestamp: "2 hours ago",
    category: "Energy Storage · Healthcare",
    status: "Open",
    title: "Low-Cost Thermal Storage for Off-Grid Clinics",
    description: "We are developing a 100% passive vaccine storage vault capable of sustaining 2°C to 8°C internal temperature for 72+ continuous hours under 45°C ambient heat. CDEV radar matched this with a 2019 aerospace phase-change thermal pack. Seeking mechanical & thermal engineers to test local bio-wax composite matrices.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80",
    imageCaption: "Cross-sectional thermal finite-element analysis of PCM barrier and vacuum insulation matrix under 45°C boundary flux.",
    skills: ["#ThermalDynamics", "#PhaseChangeMaterials", "#WHO-PQS", "#CAD", "#LowCostManufacturing"],
    constraints: [
      { label: "Target Duration", value: "72 Hours", status: "ok" },
      { label: "Ambient Temp", value: "-5°C to 48°C", status: "ok" },
      { label: "Max Unit Cost", value: "< $45 USD", status: "warn" },
      { label: "Power Draw", value: "0 Watts (Passive)", status: "ok" }
    ],
    cdevMatch: {
      score: 94,
      reference: "Delft Aerospace PCM Pack (2019)",
      targetId: "cdev"
    },
    likesCount: 142,
    isLiked: false,
    isSaved: true,
    commentsCount: 18,
    location: "Delft, Netherlands · Global Field Sites",
    comments: [
      {
        id: "c1",
        author: "Marcus Vance",
        handle: "@m_vance",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        role: "Senior Thermal Analyst @ MIT",
        text: "The paraffin wax latent heat curve matches the 72h requirement, but watch for volume expansion during phase transitions. Have you modeled 15% elastomeric expansion margins?",
        timestamp: "1h ago",
        likes: 14
      },
      {
        id: "c2",
        author: "Dr. Elena Rostova",
        handle: "@elena_chem",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Materials Scientist @ ETH Zurich",
        text: "We tested a coconut oil-derived bio-ester eutectic mix in our Zurich chamber last month. Enthalpy reached 214 kJ/kg at 4.2°C melting point. Happy to share telemetry into your project room!",
        timestamp: "38m ago",
        likes: 22
      }
    ]
  },
  {
    id: "post-2",
    author: {
      name: "Alex Rivera",
      handle: "@arivera_marine",
      role: "Ocean Systems Engineer",
      institution: "Scripps Marine Institute",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      verified: true
    },
    timestamp: "5 hours ago",
    category: "Marine · Robotics",
    status: "Exploring",
    title: "Predictive Maintenance for Tidal Turbines Without Submerged Sensors",
    description: "Submerged tidal turbine gearboxes in high-salinity marine channels degrade rapidly. Saltwater destroys contact strain gauges within 6 months. We need to infer rotor cavitation and structural fatigue strictly through grid-side generator electrical frequency distortion and acoustic surface hydrophones.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000&auto=format&fit=crop&q=80",
    imageCaption: "Offshore tidal current array testbed in Orkney Islands. Wave energy spectra mapped against generator torque anomalies.",
    skills: ["#DigitalTwin", "#SignalProcessing", "#MarineRobotics", "#FFT", "#PredictiveMaintenance"],
    constraints: [
      { label: "Submerged Sensors", value: "0 allowed", status: "ok" },
      { label: "Detection Lead Time", value: "> 14 Days", status: "ok" },
      { label: "False Positive Rate", value: "< 1.5%", status: "warn" }
    ],
    cdevMatch: {
      score: 82,
      reference: "Vestas Wind Aero-Flutter Model (2018)",
      targetId: "cdev"
    },
    likesCount: 89,
    isLiked: true,
    isSaved: false,
    commentsCount: 7,
    location: "San Diego, CA & Orkney, UK",
    comments: [
      {
        id: "c3",
        author: "Chen Wei",
        handle: "@chen_dsp",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
        role: "Signal Processing Lead",
        text: "Grid frequency harmonics (specifically 3rd & 5th order sidebands) correlate tightly with eccentric rotor friction. Check IEEE PES 2021 paper #489.",
        timestamp: "3h ago",
        likes: 9
      }
    ]
  },
  {
    id: "post-3",
    author: {
      name: "Dr. Kenji Sato",
      handle: "@kenji_sato_semis",
      role: "Advanced Microfabrication Lead",
      institution: "Tokyo Tech Nanotech Center",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      verified: true
    },
    timestamp: "Yesterday",
    category: "Semiconductors · Green Chem",
    status: "In Validation",
    title: "Waterless Organic Residue Cleansing for 300mm Wafers",
    description: "Semiconductor foundries consume millions of gallons of ultrapure water daily just for photoresist stripping. Our team adapted an supercritical CO2 extraction technique originally developed for pharmaceutical decaffeination. Initial AFM scans show 0.02 particles/cm² residual defect density.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80",
    imageCaption: "AFM topography scan of treated silicon surface showing sub-nanometer roughness after scCO2 treatment.",
    skills: ["#Semiconductors", "#SupercriticalFluids", "#ZeroWater", "#AtomicForceMicroscopy"],
    constraints: [
      { label: "Water Usage", value: "0 Liters", status: "ok" },
      { label: "Throughput", value: "60 Wafers/hr", status: "ok" },
      { label: "Max Surface Temp", value: "< 75°C", status: "ok" }
    ],
    cdevMatch: {
      score: 76,
      reference: "Pharma Supercritical CO2 Extraction (2014)",
      targetId: "cdev"
    },
    likesCount: 231,
    isLiked: false,
    isSaved: true,
    commentsCount: 29,
    location: "Tokyo, Japan",
    comments: []
  },
  {
    id: "post-4",
    author: {
      name: "Sarah Lin",
      handle: "@sarahlin_bio",
      role: "Biomaterials Architect",
      institution: "Circular Bio-Foundry",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      verified: true
    },
    timestamp: "2 days ago",
    category: "Materials · Agriculture",
    status: "Solved",
    title: "Chitosan-Lignin Biodegradable Barrier for Fresh Produce",
    description: "Successfully validated! We replaced synthetic polyethylene wax coatings on citrus fruits with an ocean-sourced chitosan + upcycled lignin nanocomposite. Extended shelf life by 19 days under ambient sub-Saharan conditions with 100% soil biodegradability in 28 days.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1000&auto=format&fit=crop&q=80",
    imageCaption: "High-resolution SEM micrograph of cross-linked biopolymer coating resisting fungal hyphae penetration.",
    skills: ["#Biomaterials", "#FoodSecurity", "#Chitosan", "#Upcycling", "#DegradablePackaging"],
    constraints: [
      { label: "PFAS / Plastics", value: "0%", status: "ok" },
      { label: "Shelf Life Gain", value: "+19 Days", status: "ok" },
      { label: "Soil Decomposition", value: "28 Days", status: "ok" }
    ],
    cdevMatch: {
      score: 91,
      reference: "Chitosan Surgical Hemostatic Bandage (2017)",
      targetId: "cdev"
    },
    likesCount: 418,
    isLiked: true,
    isSaved: true,
    commentsCount: 44,
    location: "Singapore & Nairobi",
    comments: []
  }
];

export const mockBuilders: BuilderItem[] = [
  {
    id: "b1",
    name: "Dr. Elena Rostova",
    handle: "@elena_chem",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Materials Physics Fellow",
    institution: "ETH Zurich",
    domain: "Phase Change Materials",
    followers: "3.2k",
    isFollowing: false
  },
  {
    id: "b2",
    name: "Marcus Vance",
    handle: "@m_vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Thermal Systems Architect",
    institution: "MIT Energy Lab",
    domain: "Cryo & Passive Heat Buffers",
    followers: "4.8k",
    isFollowing: true
  },
  {
    id: "b3",
    name: "Chen Wei",
    handle: "@chen_dsp",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    role: "Acoustics & Signal Engineer",
    institution: "Imperial College London",
    domain: "Turbine Vibration Diagnostics",
    followers: "1.9k",
    isFollowing: false
  },
  {
    id: "b4",
    name: "Amara Diallo",
    handle: "@amara_d",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    role: "Field Cold-Chain Specialist",
    institution: "Dakar Health Alliance",
    domain: "Rural Healthcare Hardware",
    followers: "2.5k",
    isFollowing: false
  }
];

export const mockTrending: TrendingProblem[] = [
  {
    id: "tr-1",
    title: "Thermal buffer without active power",
    category: "Energy",
    matches: "94% CDEV Match",
    postsCount: 142,
    tag: "#PassiveCooling"
  },
  {
    id: "tr-2",
    title: "Sensorless tidal turbine fatigue",
    category: "Robotics",
    matches: "82% CDEV Match",
    postsCount: 89,
    tag: "#AcousticDiagnostics"
  },
  {
    id: "tr-3",
    title: "Waterless wafer solvent recovery",
    category: "CleanTech",
    matches: "76% CDEV Match",
    postsCount: 114,
    tag: "#SupercriticalCO2"
  },
  {
    id: "tr-4",
    title: "PFAS-free edible barrier coatings",
    category: "Materials",
    matches: "91% CDEV Match",
    postsCount: 206,
    tag: "#BioPackaging"
  }
];

export const mockRecommendedSolutions: RecommendedSolution[] = [
  {
    id: "sol-1",
    title: "Delft Aerospace PCM Heat Shield",
    year: "2019",
    domain: "Aerospace / Heat Transfer",
    matchScore: 94,
    proofCount: 8,
    verifiedBy: "ESA & Delft Tech"
  },
  {
    id: "sol-2",
    title: "Vestas High-Reynolds Flutter Model",
    year: "2018",
    domain: "Wind Turbines / Fluid Dynamics",
    matchScore: 82,
    proofCount: 12,
    verifiedBy: "DNV GL Marine"
  },
  {
    id: "sol-3",
    title: "Pharma Supercritical Decaffeination Loop",
    year: "2014",
    domain: "Chemical Engineering",
    matchScore: 76,
    proofCount: 6,
    verifiedBy: "FDA Verified Master File"
  }
];

export const mockCdevConstraints: ConstraintComparison[] = [
  {
    id: "c-1",
    name: "Operating Temperature Window",
    sourceValue: "-10°C to +45°C (Aerospace cabin spec)",
    targetValue: "-5°C to +50°C (Sub-Saharan desert field test)",
    type: "Compatible",
    note: "Thermal envelope overlaps by 96%. Latent plateau remains stable at 4.2°C."
  },
  {
    id: "c-2",
    name: "Passive Energy Input",
    sourceValue: "Zero electrical input (Phase-change latent heat)",
    targetValue: "Zero electrical input (Off-grid clinic mandate)",
    type: "Compatible",
    note: "Direct 1:1 match. Eliminates reliance on unreliable rural diesel generators."
  },
  {
    id: "c-3",
    name: "Continuous Hold Duration",
    sourceValue: "48 hours in flight transit",
    targetValue: "72 hours continuous cold retention",
    type: "Missing",
    note: "Requires 1.35x increase in PCM core density or double vacuum-panel envelope."
  },
  {
    id: "c-4",
    name: "Encapsulation Shell Material",
    sourceValue: "Aviation-grade milled Aluminum 6061-T6",
    targetValue: "Locally sourced recycled HDPE / Bio-wax pouch",
    type: "Conflicting",
    note: "Aluminum is too costly ($120/unit vs $45 budget). Adaptation must re-derive thermal conductivity through polymer blend."
  },
  {
    id: "c-5",
    name: "Maintenance Interval",
    sourceValue: "Certified hangar inspection every 90 days",
    targetValue: "Zero annual field servicing by medical staff",
    type: "Conflicting",
    note: "Enclosure must be hermetically seam-welded to prevent PCM leakage over 5+ years."
  },
  {
    id: "c-6",
    name: "Transport Vibration & Drop Shock",
    sourceValue: "FAA RTCA DO-160G Section 8",
    targetValue: "WHO PQS 2-meter drop test onto unpaved dirt",
    type: "Unknown",
    note: "Need physical drop-tower validation on the bio-composite prototype."
  }
];

export const mockProofObligations: ProofObligation[] = [
  {
    id: "PO-01",
    title: "Latent Heat Enthalpy Verification",
    statement: "Verify that the adapted coconut ester/paraffin blend maintains latent heat capacity >= 210 kJ/kg between +2°C and +8°C across 100 freeze-thaw cycles.",
    status: "Verified",
    assignedTo: "Dr. Elena Rostova",
    evidenceFile: "differential_scanning_calorimetry_dsc_run_94.pdf",
    evidenceType: "Calorimetry DSC Trace",
    testScore: "214.2 kJ/kg (Pass)"
  },
  {
    id: "PO-02",
    title: "Vacuum Insulation Core Integrity Under 50°C",
    statement: "Demonstrate that the thermal conductivity of recycled aerogel blanket remains <= 0.018 W/(m·K) when subjected to 50°C outer wall temperature.",
    status: "Verified",
    assignedTo: "Dr. Dhivya Raman",
    evidenceFile: "thermal_flux_chamber_72h_telemetry.csv",
    evidenceType: "Calibrated Logger Telemetry",
    testScore: "0.0162 W/(m·K) (Pass)"
  },
  {
    id: "PO-03",
    title: "Hermetic Bio-Seal Cyclic Pressure Stress",
    statement: "Confirm that ultrasonic-welded HDPE pouch exhibits zero mass loss (<0.01g) after 30 days under cyclic barometric pressure (85 kPa to 105 kPa).",
    status: "In Review",
    assignedTo: "Marcus Vance",
    evidenceFile: "helium_mass_spec_leak_report_v2.pdf",
    evidenceType: "Spectrometry Leak Detection",
    testScore: "Awaiting final signatory"
  },
  {
    id: "PO-04",
    title: "Field Rough-Transit Impact Attenuation",
    statement: "Ensure interior vaccine vials experience <= 15G shock deceleration during a 2.0-meter drop onto packed soil as defined in WHO PQS protocol E004.",
    status: "Pending Evidence",
    assignedTo: "Amara Diallo",
    evidenceType: "Tri-axial Accelerometer Drop Log",
    testScore: "Field test scheduled for next week"
  }
];

