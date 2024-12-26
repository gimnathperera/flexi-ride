"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SearchSkeleton() {
  return (
    <div className="w-full">
      {/* Skeleton for Car Grid */}
      <article className="grid w-full grid-cols-1 items-center justify-center gap-5 lg:grid-cols-2 lgx:grid-cols-3 2xl:grid-cols-4">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="rounded-lg border p-4 shadow-md dark:border-gray-700 dark:shadow-lg"
            >
              <Skeleton height={150} className="rounded-md" />
              <Skeleton width={"60%"} height={20} className="mt-3" />
              <Skeleton width={"80%"} height={20} className="mt-2" />
              <div className="mt-4 flex items-center justify-between">
                <Skeleton width={50} height={20} />
                <Skeleton width={30} height={20} />
              </div>
            </div>
          ))}
      </article>

      {/* Skeleton for Show More button */}
      <div className="mb-5 mt-10 flex items-center justify-center">
        <Skeleton height={40} width={200} className="rounded-lg" />
      </div>
    </div>
  );
}
