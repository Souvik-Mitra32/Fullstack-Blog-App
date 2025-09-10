import { Link } from "react-router"

export function Navbar() {
  return (
    <ul className="nav-list">
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/todos">Todos</Link>
      </li>
    </ul>
  )
}
