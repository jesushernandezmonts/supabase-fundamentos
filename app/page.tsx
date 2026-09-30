"use client";

import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import { posts as fallbackPosts, type Post } from "./mocks/posts";
import { supabase } from "./lib/supabase";


export default function Home() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);

  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          setPosts(data as Post[]);
          return;
        }
      } catch (error) {
        console.warn("No se pudieron cargar los posts de Supabase, usando fallback local.", error);
      }

      setPosts(fallbackPosts);
    }

    getPosts();
  }, []);

  const handleLike = (postId: number | string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card-bg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Post
          </h1>
        </div>
      </header>

      {/* Feed de posts */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onLike={handleLike} />
          ))}
        </div>
      </main>
    </div>
  );
}
