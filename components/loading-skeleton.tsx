import { Skeleton } from "@/components/ui/skeleton"

export function GiftCardSkeleton() {
  return (
    <div className="space-y-4 w-full">
      <Skeleton className="h-8 w-3/4" />
      <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}

