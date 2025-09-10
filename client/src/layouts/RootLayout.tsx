import { Outlet, ScrollRestoration, useNavigation } from "react-router"
import { Navbar } from "../components/Navbar"

export function RootLayout() {
  const { state } = useNavigation()
  const isLoading = state === "loading"

  return (
    <>
      <nav className="top-nav">
        <div className="nav-text-large">My App</div>
        <Navbar />
      </nav>
      {isLoading && <div className="loading-spinner" />}
      <div className={`container ${isLoading ? "loading" : undefined}`}>
        <ScrollRestoration />
        <Outlet />
      </div>
    </>
  )
}
