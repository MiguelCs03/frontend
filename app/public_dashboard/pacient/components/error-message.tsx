interface ErrorMessageProps {
  error: string
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null
  
  return (
    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg">
      {error}
    </div>
  )
}
