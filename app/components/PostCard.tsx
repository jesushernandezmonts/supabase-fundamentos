import Image from "next/image";
import { type Post } from "../mocks/posts";
import { RelativeTime } from "./RelativeTime";
import HeartIcon from "./Hearticon";

export default function PostCard({
  post,
  onLike,
}: {
  post: Post;
  onLike: (id: number | string) => void;
}) {
  const username = post.user?.username || `Post #${String(post.id).slice(0, 8)}`;
  const avatarUrl =
    post.user?.avatar ||
    "https://lyjriwcbkbzlabhzrcnl.supabase.co/storage/v1/object/public/supagram/profiles/descargar%20(2).jpg";

  return (
    <article className="bg-card-bg border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Header con usuario y avatar */}
      <div className="flex items-center gap-3 p-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary shrink-0 bg-primary/10 flex items-center justify-center">
          {post.user?.avatar ? (
            <Image
              src={avatarUrl}
              alt={username}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-xs font-bold text-primary">
              #{String(post.id).slice(0, 2)}
            </span>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-foreground truncate">{username}</span>
          <span className="text-xs text-foreground/50">
            <RelativeTime date={post.created_at} />
          </span>
        </div>
      </div>

      {/* Imagen del post */}
      {post.image_url && (
        <div className="relative w-full aspect-square bg-black/10">
          <Image
            src={post.image_url}
            alt={post.caption || `Post de ${username}`}
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover"
          />
        </div>
      )}

      {/* Acciones y caption */}
      <div className="p-4">
        {/* Botón de like con contador */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onLike(post.id)}
            className="hover:scale-110 transition-transform active:scale-95 text-foreground"
            aria-label={post.isLiked ? "Quitar like" : "Dar like"}
          >
            <HeartIcon filled={post.isLiked} className="w-7 h-7" />
          </button>
          <span className="font-semibold text-foreground">
            {(post.likes ?? 0).toLocaleString()} likes
          </span>
        </div>

        {/* Caption */}
        {post.caption && (
          <p className="mt-2 text-foreground break-words">
            <span className="font-semibold mr-2">{username}</span>
            <span className="text-foreground/80">{post.caption}</span>
          </p>
        )}
      </div>
    </article>
  );
}

export { PostCard };