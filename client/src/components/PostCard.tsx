import { Link } from "react-router"
import type { Post } from "../pages/Post"
import { SkeletonButton, SkeletonText } from "./Skeleton"

type PostCardProps = Omit<Post, "userId"> & { throughUser?: true | undefined }

export function PostCard({ id, title, body, throughUser }: PostCardProps) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="card-preview-text">{body}</div>
      </div>
      <div className="card-footer">
        <Link
          className="btn"
          to={throughUser ? `../../posts/${id}` : id.toString()}
        >
          View
        </Link>
      </div>
    </div>
  )
}

export function PostCardSkeleton() {
  return (
    <div className="card">
      <div className="card-header">
        <SkeletonText />
      </div>
      <div className="card-body">
        <div className="card-preview-text">
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
          <SkeletonText />
        </div>
      </div>
      <div className="card-footer">
        <SkeletonButton />
      </div>
    </div>
  )
}
