import { cn } from '@/components/ui/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-04", className)}
      {...props}
    />
  )
}

export { Skeleton }
