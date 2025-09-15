import { Outlet, ScrollRestoration } from "react-router"
import { Navbar } from "../components/Navbar"

export function RootLayout() {
  return (
    <>
      <nav className="top-nav">
        <div className="nav-text-large">My App</div>
        <Navbar />
      </nav>
      <div className="container">
        <ScrollRestoration />
        <Outlet />
      </div>
    </>
  )
}
