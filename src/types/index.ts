export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  role: string;
  institution: string;
  bio: string;
  location: string;
  github: string;
  linkedin: string;
  skills: string[];
  followersCount: number;
  followingCount: number;
  problemsCount: number;
  projectsCount: number;
  solutionsCount: number;
}

export interface CommentItem {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  role: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface PostItem {
  id: string;
  author: {
    name: string;
    handle: string;
    role: string;
    institution: string;
    avatar: string;
    verified: boolean;
  };
  timestamp: string;
  category: string;
  status: "Open" | "Exploring" | "In Validation" | "Solved";
  title: string;
  description: string;
  image: string;
  imageCaption?: string;
  skills: string[];
  constraints: { label: string; value: string; status?: "ok" | "warn" | "danger" }[];
  cdevMatch?: {
    score: number;
    reference: string;
    targetId: string;
  };
  likesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  commentsCount: number;
  comments: CommentItem[];
  location: string;
}

export interface StorySlide {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  stat?: string;
  statLabel?: string;
  actionLabel?: string;
  actionView?: string;
}

export interface StoryItem {
  id: string;
  title: string;
  author: string;
  avatar: string;
  badge: string;
  category: string;
  slides: StorySlide[];
}

export interface BuilderItem {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  institution: string;
  domain: string;
  followers: string;
  isFollowing: boolean;
}

export interface TrendingProblem {
  id: string;
  title: string;
  category: string;
  matches: string;
  postsCount: number;
  tag: string;
}

export interface RecommendedSolution {
  id: string;
  title: string;
  year: string;
  domain: string;
  matchScore: number;
  proofCount: number;
  verifiedBy: string;
}

export interface ConstraintComparison {
  id: string;
  name: string;
  sourceValue: string;
  targetValue: string;
  type: "Compatible" | "Conflicting" | "Missing" | "Unknown";
  note: string;
}

export interface ProofObligation {
  id: string;
  title: string;
  statement: string;
  status: "Verified" | "In Review" | "Pending Evidence";
  assignedTo: string;
  evidenceFile?: string;
  evidenceType?: string;
  testScore?: string;
}

