import { Link } from "react-router"
import type { Post } from "../pages/Post"

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
