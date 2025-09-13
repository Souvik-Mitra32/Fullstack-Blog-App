import type { ReactNode } from "react"

type FormGroupProps = {
  error: string | undefined
  children: ReactNode
}

export function FormGroup({ error, children }: FormGroupProps) {
  return (
    <div className={`form-group ${error ? "error" : undefined}`}>
      {children}
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}
