"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProfileSkeleton() {
  return (
    <main className="mx-auto flex max-w-[1400px] flex-col bg-light-white-200 p-5 dark:bg-primary-gray-900 xl:px-16 xl:py-8">
      {/* Section to add spacing around corners of screen */}
      <section>
        <h1 className="text-xl font-bold text-primary-gray-900 dark:text-white">
          <Skeleton width={150} height={25} />
        </h1>

        <article className="mt-5 flex h-[301px] flex-col rounded-lg bg-white dark:bg-primary-gray-850 md:h-[240px]">
          {/* Provides the image background  */}
          <section className="relative h-3/5 w-full">
            <Skeleton height="100%" className="rounded-t-lg" />
          </section>

          {/* Provides the user information */}
          <section className="relative flex justify-between p-3 md:justify-end">
            <article className="relative -top-12 md:absolute md:left-7 md:flex md:gap-5">
              <span className="md:hidden">
                <Skeleton circle width={70} height={70} />
              </span>

              <span className="hidden md:block">
                <Skeleton circle width={125} height={125} />
              </span>

              <section className="mt-1.5 text-primary-gray-900 md:relative md:bottom-2 md:flex md:flex-col md:justify-end">
                <Skeleton width={150} height={25} />
                <Skeleton width={100} height={20} />
              </section>
            </article>

            <article className="flex items-end justify-end md:relative">
              <Skeleton width={130} height={40} className="rounded-lg" />
            </article>
          </section>
        </article>

        <article>
          {/* My Rented Cars */}
          <h2 className="mt-10 font-semibold text-primary-gray-400">
            <Skeleton width={200} height={20} />
          </h2>
          <section className="mt-5 grid w-full grid-cols-1 items-center justify-center gap-5 smd:grid-cols-2 mdl:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, idx) => (
              <Skeleton key={idx} height={300} className="rounded-lg" />
            ))}
          </section>

          {/* My Cars for Rent */}
          <h2 className="mt-10 hidden font-semibold text-primary-gray-400 md:block">
            <Skeleton width={200} height={20} />
          </h2>
          <section className="mt-5 grid w-full grid-cols-1 items-center justify-center gap-5 smd:grid-cols-2 mdl:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, idx) => (
              <Skeleton key={idx} height={300} className="rounded-lg" />
            ))}
          </section>

          {/* My Favorite Cars */}
          <h2 className="mt-10 hidden font-semibold text-primary-gray-400 md:block">
            <Skeleton width={200} height={20} />
          </h2>
          <section className="mt-5 grid w-full grid-cols-1 items-center justify-center gap-5 smd:grid-cols-2 mdl:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, idx) => (
              <Skeleton key={idx} height={300} className="rounded-lg" />
            ))}
          </section>
        </article>
      </section>
    </main>
  );
}
