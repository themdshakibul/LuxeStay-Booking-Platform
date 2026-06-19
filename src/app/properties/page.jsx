"use client"


import PropertyCard from "@/Components/Apps/HomePage/PropertyCard";
import { Button, Input, Pagination, Spinner } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdClear, MdLocationOn, MdSearch } from "react-icons/md";

const AllPropertiesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search parameters
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") || "All",
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const propertyTypes = [
    "All",
    "Apartment",
    "House",
    "Villa",
    "Studio",
    "Cabin",
    "Penthouse",
  ];

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (propertyType && propertyType !== "All")
        params.append("propertyType", propertyType);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (sort) params.append("sort", sort);
      params.append("page", page);
      params.append("limit", 6); // 6 items per page for clean look and pagination testing

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/properties?${params.toString()}`,
      );

      if (response.data.success) {
        setProperties(response.data.properties);
        setTotalPages(response.data.totalPages);
        setTotalCount(response.data.totalCount);
      }
    } catch (error) {
      console.error("Error fetching properties directory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProperties();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, propertyType, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProperties();
  };

  const handleClearFilters = () => {
    setSearch("");
    setPropertyType("All");
    setSort("newest");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
    router.push("/properties");
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col justify-between font-sans">
      <main className="grow container mx-auto w-full py-12 px-2">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-white tracking-tight">
            Browse Properties
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Discover luxury stays and rental leases verified for you
          </p>
        </div>

        {/* Filter Bar Controls */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-slate-950 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col gap-4 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
            {/* Search Location Input */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Search Location
              </label>
              <Input
                size="sm"
                placeholder="Search by city (e.g. Miami, New York)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                startContent={
                  <MdLocationOn className="text-violet-500 mr-1" size={18} />
                }
                classNames={{
                  inputWrapper:
                    "bg-slate-900 border border-slate-800 text-slate-100 hover:border-slate-700 focus-within:border-violet-500",
                  input: "text-slate-100 placeholder:text-slate-500 text-xs",
                }}
              />
            </div>

            {/* Property Type Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Property Type
              </label>
              <select
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 outline-none focus:border-violet-500"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Price Order */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Sort By
              </label>
              <select
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 outline-none focus:border-violet-500"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest Listings</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* Min Price Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Min Rent ($)
              </label>
              <Input
                type="number"
                size="sm"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                classNames={{
                  inputWrapper:
                    "bg-slate-900 border border-slate-800 text-slate-100 hover:border-slate-700 focus-within:border-violet-500",
                  input: "text-slate-100 placeholder:text-slate-500 text-xs",
                }}
              />
            </div>

            {/* Max Price Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Max Rent ($)
              </label>
              <Input
                type="number"
                size="sm"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                classNames={{
                  inputWrapper:
                    "bg-slate-900 border border-slate-800 text-slate-100 hover:border-slate-700 focus-within:border-violet-500",
                  input: "text-slate-100 placeholder:text-slate-500 text-xs",
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <Button
              size="sm"
              variant="bordered"
              className="border-slate-800 text-slate-400 font-bold hover:bg-slate-900 text-xs"
              onClick={handleClearFilters}
              startContent={<MdClear size={16} />}
            >
              Clear Filters
            </Button>
            <Button
              type="submit"
              size="sm"
              color="primary"
              className="bg-violet-600 font-bold hover:bg-violet-700 text-white text-xs"
              startContent={<MdSearch size={16} />}
            >
              Search Listings
            </Button>
          </div>
        </form>

        {/* Listings Grid */}
        {loading ? (
          <div className="flex justify-center py-32">
            <Spinner
              label="Searching database..."
              color="primary"
              labelColor="primary"
            />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-slate-950/40 rounded-2xl border border-slate-800/50 p-8">
            <p className="text-slate-400 text-base font-semibold">
              No approved properties found matching your search.
            </p>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              className="mt-4 text-xs font-bold text-violet-400"
              onClick={handleClearFilters}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <Pagination
                  total={totalPages}
                  initialPage={page}
                  page={page}
                  onChange={setPage}
                  color="primary"
                  className="text-white"
                  classNames={{
                    cursor: "bg-violet-600 text-white font-bold",
                    item: "text-slate-400 bg-slate-950 border border-slate-850 hover:bg-slate-900 hover:text-white",
                  }}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AllPropertiesPage;
