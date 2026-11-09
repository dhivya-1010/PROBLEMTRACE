"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Bell,
  Search,
  PlusSquare,
  Sparkles,
  Network
} from "lucide-react";
import { initialProfile, mockStories, mockPosts } from "@/data/mockData";
import { PostItem, UserProfile } from "@/types";
import { ToastProvider, useToast } from "@/components/ui/Toast";

// Layout components
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";

// Feed components
import { StoriesBar } from "@/components/feed/StoriesBar";
import { CreatePostComposer } from "@/components/feed/CreatePostComposer";
import { CreatePostModal } from "@/components/feed/CreatePostModal";
import { PostCard } from "@/components/feed/PostCard";
import { ExpressInterestModal } from "@/components/feed/ExpressInterestModal";

// Views
import { ExploreGrid } from "@/components/explore/ExploreGrid";
import { ProblemsView } from "@/components/problems/ProblemsView";
import { ProfileView } from "@/components/profile/ProfileView";
import { CdevView } from "@/components/cdev/CdevView";
import { LineageView } from "@/components/lineage/LineageView";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { EvidenceView } from "@/components/evidence/EvidenceView";
import { ShowcaseView } from "@/components/showcase/ShowcaseView";
import { MessagesView } from "@/components/messages/MessagesView";
import { NotificationsDrawer } from "@/components/notifications/NotificationsDrawer";
import { AdminView } from "@/components/admin/AdminView";
import { SettingsView } from "@/components/settings/SettingsView";

function MainApp() {
  const { showToast } = useToast();

  // Navigation State
  const [activeView, setActiveView] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedExploreTag, setSelectedExploreTag] = useState<string>("");

  // Sidebar expand state (Click-to-expand, click-outside-to-shrink)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const sidebarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (
        sidebarContainerRef.current &&
        !sidebarContainerRef.current.contains(e.target as Node)
      ) {
        setIsSidebarExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleGlobalClick);
    return () => document.removeEventListener("mousedown", handleGlobalClick);
  }, []);

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [interestPost, setInterestPost] = useState<PostItem | null>(null);

  // User Profile State (Persistent in localStorage)
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  // Posts State (Persistent in localStorage)
  const [posts, setPosts] = useState<PostItem[]>(mockPosts);

  // Initialize and load from localStorage
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("problemtrace_user_profile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
      const storedPosts = localStorage.getItem("problemtrace_feed_posts");
      if (storedPosts) {
        const parsed = JSON.parse(storedPosts);
        if (Array.isArray(parsed) && parsed.length >= mockPosts.length) {
          setPosts(parsed);
        } else {
          const userCreated = Array.isArray(parsed) ? parsed.filter((p: any) => !p.id.startsWith("post-")) : [];
          const merged = [...userCreated, ...mockPosts];
          setPosts(merged);
          localStorage.setItem("problemtrace_feed_posts", JSON.stringify(merged));
        }
      } else {
        localStorage.setItem("problemtrace_feed_posts", JSON.stringify(mockPosts));
      }
    } catch (e) {
      console.warn("Could not read from localStorage", e);
    }
  }, []);

  // Save profile changes
  const handleSaveProfile = (updated: UserProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem("problemtrace_user_profile", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save profile to localStorage", e);
    }
  };

  // Helper to persist posts
  const persistPosts = (updated: PostItem[]) => {
    setPosts(updated);
    try {
      localStorage.setItem("problemtrace_feed_posts", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save posts to localStorage", e);
    }
  };

  // Add new post
  const handleAddPost = (newPost: PostItem) => {
    const updated = [newPost, ...posts];
    persistPosts(updated);
    setProfile((prev) => ({
      ...prev,
      problemsCount: prev.problemsCount + 1,
    }));
  };

  // Toggle Like on post
  const handleToggleLike = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const nextLiked = !p.isLiked;
        return {
          ...p,
          isLiked: nextLiked,
          likesCount: nextLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1),
        };
      }
      return p;
    });
    persistPosts(updated);
  };

  // Toggle Save on post
  const handleToggleSave = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const nextSaved = !p.isSaved;
        showToast(
          nextSaved ? "Saved to your research notebook" : "Removed from saved",
          "info"
        );
        return { ...p, isSaved: nextSaved };
      }
      return p;
    });
    persistPosts(updated);
  };

  // Add Comment on post
  const handleAddComment = (postId: string, commentText: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const newComment = {
          id: `c-${Date.now()}`,
          author: profile.name,
          handle: profile.handle,
          avatar: profile.avatar,
          role: profile.role,
          text: commentText,
          timestamp: "Just now",
          likes: 0,
        };
        return {
          ...p,
          comments: [newComment, ...p.comments],
        };
      }
      return p;
    });
    persistPosts(updated);
  };

  const isFeedView = activeView === "home";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      {/* Desktop Floating Left Sidebar Spacer (Expands on click & smoothly moves content) */}
      <div
        ref={sidebarContainerRef}
        onClick={() => setIsSidebarExpanded(true)}
        className={`hidden lg:block shrink-0 transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isSidebarExpanded ? "w-[264px]" : "w-20"
        }`}
      >
        <LeftSidebar
          activeView={activeView}
          setActiveView={(v) => {
            setActiveView(v);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          openCreateModal={() => setIsCreateOpen(true)}
          profile={profile}
          isExpanded={isSidebarExpanded}
          onToggleExpand={() => setIsSidebarExpanded((prev) => !prev)}
        />
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between shadow-2xs">
        <div
          onClick={() => setActiveView("home")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center">
            <Network className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold tracking-[0.16em] text-slate-900">
            PROBLEMTRACE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="p-1.5 text-slate-700 hover:text-slate-900"
          >
            <PlusSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveView("notifications")}
            className="p-1.5 text-slate-700 hover:text-slate-900 relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-teal-500" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto space-y-2 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {[
              { id: "home", label: "Home Feed" },
              { id: "explore", label: "Explore Discovery" },
              { id: "problems", label: "Problem Explorer" },
              { id: "projects", label: "My Projects" },
              { id: "cdev", label: "CDEV Analysis" },
              { id: "solutions", label: "Solution Lineage" },
              { id: "evidence", label: "Evidence Validation" },
              { id: "showcase", label: "Public Showcase" },
              { id: "messages", label: "Messages" },
              { id: "notifications", label: "Notifications" },
              { id: "profile", label: "My Profile" },
              { id: "settings", label: "Settings" },
              { id: "admin", label: "Admin Console" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeView === item.id
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex justify-center w-full min-w-0 pt-16 lg:pt-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
        <main
          className={`w-full px-4 sm:px-6 lg:px-8 py-6 min-w-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isFeedView
              ? "max-w-xl xl:max-w-2xl 2xl:max-w-2xl"
              : "max-w-6xl 2xl:max-w-7xl"
          }`}
        >
          {/* VIEW: HOME (Social Feed) */}
          {activeView === "home" && (
            <div className="w-full space-y-6">
              {/* Community Stories */}
              <StoriesBar
                stories={mockStories}
                profile={profile}
                openCreateModal={() => setIsCreateOpen(true)}
                onNavigateAction={(v) => {
                  setActiveView(v);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* Inline Composer */}
              <CreatePostComposer
                profile={profile}
                onClick={() => setIsCreateOpen(true)}
              />

              {/* Feed Stream */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onExpressInterest={(p) => setInterestPost(p)}
                    onNavigateAction={(v) => {
                      setActiveView(v);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    onToggleLike={handleToggleLike}
                    onToggleSave={handleToggleSave}
                    onAddComment={handleAddComment}
                  />
                ))}
              </div>
            </div>
          )}

          {/* VIEW: EXPLORE */}
          {activeView === "explore" && (
            <ExploreGrid
              posts={posts}
              onExpressInterest={(p) => setInterestPost(p)}
              onNavigateAction={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onToggleLike={handleToggleLike}
              onToggleSave={handleToggleSave}
              onAddComment={handleAddComment}
            />
          )}

          {/* VIEW: PROBLEMS */}
          {activeView === "problems" && (
            <ProblemsView
              posts={posts}
              onOpenCreate={() => setIsCreateOpen(true)}
              onExpressInterest={(p) => setInterestPost(p)}
              onNavigateAction={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              initialTag={selectedExploreTag}
            />
          )}

          {/* VIEW: CDEV ANALYSIS */}
          {activeView === "cdev" && (
            <CdevView
              onNavigateAction={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {/* VIEW: SOLUTION LINEAGE */}
          {activeView === "solutions" && (
            <LineageView
              onNavigateAction={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {/* VIEW: PROJECTS */}
          {activeView === "projects" && (
            <ProjectsView
              profile={profile}
              onNavigateAction={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {/* VIEW: EVIDENCE */}
          {activeView === "evidence" && (
            <EvidenceView
              onNavigateAction={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {/* VIEW: SHOWCASE */}
          {activeView === "showcase" && (
            <ShowcaseView
              onNavigateAction={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {/* VIEW: MESSAGES */}
          {activeView === "messages" && <MessagesView profile={profile} />}

          {/* VIEW: NOTIFICATIONS */}
          {activeView === "notifications" && (
            <NotificationsDrawer
              onNavigateAction={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {/* VIEW: SAVED */}
          {activeView === "saved" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
                <h1 className="text-xl font-bold text-slate-900">
                  Saved Research & Historical Solutions
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Bookmarked problems and verified prior art for your reference
                </p>
              </div>

              <div className="space-y-6">
                {posts.filter((p) => p.isSaved).length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                    <p className="text-sm font-semibold">No saved problem briefs yet</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Click the bookmark icon on any problem brief in your feed to save it here.
                    </p>
                  </div>
                ) : (
                  posts
                    .filter((p) => p.isSaved)
                    .map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onExpressInterest={(p) => setInterestPost(p)}
                        onNavigateAction={(v) => {
                          setActiveView(v);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        onToggleLike={handleToggleLike}
                        onToggleSave={handleToggleSave}
                        onAddComment={handleAddComment}
                      />
                    ))
                )}
              </div>
            </div>
          )}

          {/* VIEW: PROFILE */}
          {activeView === "profile" && (
            <ProfileView
              profile={profile}
              posts={posts}
              onSaveProfile={handleSaveProfile}
              onSelectPost={(p) => setInterestPost(p)}
              onNavigateAction={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {/* VIEW: SETTINGS */}
          {activeView === "settings" && (
            <SettingsView
              profile={profile}
              onSaveProfile={handleSaveProfile}
              onNavigateAction={(v) => {
                setActiveView(v);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {/* VIEW: ADMIN */}
          {activeView === "admin" && <AdminView />}
        </main>

        {/* Desktop Right Sidebar (Only on Home Feed view for authentic 3-column social experience) */}
        {isFeedView && (
          <RightSidebar
            profile={profile}
            setActiveView={(v) => {
              setActiveView(v);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onSelectTag={(tag) => {
              setSelectedExploreTag(tag);
              setActiveView("problems");
            }}
          />
        )}
      </div>

      {/* Global Modals */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        profile={profile}
        onAddPost={handleAddPost}
      />

      <ExpressInterestModal
        post={interestPost}
        onClose={() => setInterestPost(null)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
