import { Fragment, Suspense, type ReactNode } from "react"
import { Await } from "react-router"

type SkeletonTextProps = {
  width?: string | undefined
  inline?: true | undefined
}

export function SkeletonText({ width = "100%", inline }: SkeletonTextProps) {
  return (
    <span
      className="skeleton"
      style={{ width, display: inline ? "inline-block" : "block" }}
    />
  )
}

type SkeletonListProps = {
  amount: number
  children: ReactNode
}

export function SkeletonList({ amount, children }: SkeletonListProps) {
  return Array.from({ length: amount }).map((_, i) => (
    <Fragment key={i}>{children}</Fragment>
  ))
}

export function SkeletonButton() {
  return <div className="skeleton skeleton-btn" />
}

type CustomSuspenseProps<T> = {
  promise: Promise<T>
  children: (data: T) => ReactNode
  fallback: ReactNode
}

export function CustomSuspense<T>({
  promise,
  children,
  fallback,
}: CustomSuspenseProps<T>) {
  return (
    <Suspense fallback={fallback}>
      <Await resolve={promise}>{(data) => children(data)}</Await>
    </Suspense>
  )
}

export function SkeletonInput() {
  return <div className="skeleton skeleton-input" />
}
