import { cn } from "@/lib/utils"

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-[14px] bg-mist", className)} {...props} />
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-card border border-line bg-white p-6", className)}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-4 h-8 w-40" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-2/3" />
    </div>
  )
}
