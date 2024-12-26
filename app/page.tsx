"use client";

import { Button, CarCard, PickDropCard, PopularCarCard } from "@/components";
import CarLoader from "@/components/CarLoader";
import {
  carSearch,
  fetchAllCars,
  fetchPopularCars,
  totalCarCount,
} from "@/lib/actions/car.actions";
import { CarCardProps } from "@/types";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  // PickDropCard states
  const [location, setLocation] = useState("");
  const [availabilityFrom, setAvailabilityFrom] = useState("");
  const [availabilityTo, setAvailabilityTo] = useState("");

  // Storing data
  const [cars, setCars] = useState<CarCardProps[]>([]);
  const [popularCars, setPopularCars] = useState<CarCardProps[]>([]);

  // Show more cars functionality
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // hide popular cars
  const [hidePopularCars, setHidePopularCars] = useState(false);

  // Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isShowMoreLoading, setIsShowMoreLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch the total count of cars and store it in totalCount
        const count = await totalCarCount();
        setTotalCount(count);

        // Fetch regular and popular cars
        const regularData = await fetchAllCars(currentPage, 8);

        const popularData = await fetchPopularCars();

        // Set the new data
        setCars(regularData);
        setPopularCars(popularData);
        setIsLoading(false);
        setIsShowMoreLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [currentPage]);

  // Sends data to the backend
  const fetchFilteredCars = async () => {
    try {
      // Fetch filtered cars based on search criteria
      const result = await carSearch({
        location,
        availabilityFrom,
        availabilityTo,
      });

      // Update the cars state with the filtered results
      if (result) {
        setCars(result);

        // Reset currentPage and totalCount if needed
        setCurrentPage(1);
        setTotalCount(result.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    fetchFilteredCars();
    setHidePopularCars(true);
  };

  // show more cars
  const handleLoadMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
    setIsShowMoreLoading(true);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-[1400px] flex-col items-center px-6 py-3 xl:px-16 xl:py-8">
      <section className="relative mb-8 w-full rounded-lg bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/ad-car-right-4.jpg"
            alt="Luxury Car"
            className="h-full w-full rounded-lg object-cover object-center opacity-70"
            width={1920}
            height={1080}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center py-24 text-center md:py-32">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Drive Your Dream Car Today
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-gray-300 sm:text-xl">
              Discover an exceptional selection of luxury and sports cars at
              unbeatable prices. Rent your dream ride and hit the road in style.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <a
                href="/search"
                className="rounded-lg bg-blue-600 px-6 py-3 text-white shadow transition hover:bg-blue-500"
              >
                Explore Cars
              </a>
              <a
                href="#"
                className="rounded-lg bg-gray-100 px-6 py-3 text-gray-900 shadow transition hover:bg-gray-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        <CarLoader />
      ) : (
        <>
          <PickDropCard
            location={location}
            setLocation={setLocation}
            availabilityFrom={availabilityFrom}
            setAvailabilityFrom={setAvailabilityFrom}
            availabilityTo={availabilityTo}
            setAvailabilityTo={setAvailabilityTo}
            handleSubmit={handleSubmit}
          />
          {!hidePopularCars && (
            <section className="relative mt-6 flex w-full flex-col">
              <h2 className="mb-8 text-sm font-semibold text-primary-gray-400">
                Popular Cars
              </h2>

              <div className="grid w-full grid-cols-1 items-center justify-center gap-5 smd:grid-cols-2 mdl:grid-cols-3 xl:grid-cols-4">
                {popularCars.map((car) => (
                  <PopularCarCard
                    key={car._id}
                    id={car._id}
                    title={car.title}
                    type={car.type}
                    images={car.images}
                    fuel={car.fuel}
                    transmission={car.transmission}
                    people={car.people}
                    price={car.price}
                    priceBeforeDiscount={car.priceBeforeDiscount}
                    description={car.description}
                    isRented={car.isRented}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Recommended Cars Section */}
          <section className="mt-6 flex w-full flex-col">
            <h2 className="mb-8 text-sm font-semibold text-primary-gray-400">
              Recommended Cars
            </h2>

            {cars.length > 0 ? (
              <div className="grid w-full grid-cols-1 items-center justify-center gap-5 smd:grid-cols-2 mdl:grid-cols-3 xl:grid-cols-4">
                {cars.map((car) => (
                  <CarCard
                    key={car._id}
                    id={car._id}
                    title={car.title}
                    type={car.type}
                    images={car.images}
                    fuel={car.fuel}
                    transmission={car.transmission}
                    people={car.people}
                    price={car.price}
                    priceBeforeDiscount={car.priceBeforeDiscount}
                    description={car.description}
                    isRented={car.isRented}
                  />
                ))}
              </div>
            ) : (
              <section className="animate-pulse text-center dark:text-white">
                WARNING: No cars available in {location}. Please try another
                location.
              </section>
            )}

            {cars.length < totalCount - 4 && (
              <div className="mb-5 mt-10 flex items-center justify-center">
                <Button
                  bgColor="bg-primary-blue-500"
                  textColor="text-white"
                  title="Show more cars"
                  handleClick={handleLoadMoreClick}
                  isLoading={isShowMoreLoading}
                />
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
