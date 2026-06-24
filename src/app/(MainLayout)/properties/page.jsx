"use client";

import PropertyCard from "@/Components/Apps/HomePage/PropertyCard";
import { Button, Input } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";
import {
  MdClear,
  MdSearch,
  MdFilterList,
  MdKeyboardArrowDown,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { useDebounce } from "use-debounce";

const buildParams = (s, pt, so, minP, maxP, pg) => {
  const params = new URLSearchParams();
  if (s) params.set("search", s);
  if (pt && pt !== "All") params.set("propertyType", pt);
  if (minP) params.set("minPrice", minP);
  if (maxP) params.set("maxPrice", maxP);
  if (so && so !== "newest") params.set("sort", so);
  if (pg && pg > 1) params.set("page", pg);
  return params;
};

const AllPropertiesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch] = useDebounce(search, 600);
  const [propertyType, setPropertyType] = useState(
    searchParams.get("propertyType") || "All",
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [appliedMinPrice, setAppliedMinPrice] = useState(
    searchParams.get("minPrice") || "",
  );
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(
    searchParams.get("maxPrice") || "",
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const propertyTypes = [
    { key: "All", label: "All Types" },
    { key: "Apartment", label: "Apartment" },
    { key: "House", label: "House" },
    { key: "Villa", label: "Villa" },
    { key: "Studio", label: "Studio" },
    { key: "Cabin", label: "Cabin" },
    { key: "Penthouse", label: "Penthouse" },
  ];

  const sortOptions = [
    { key: "newest", label: "Newest First" },
    { key: "price_asc", label: "Price: Low to High" },
    { key: "price_desc", label: "Price: High to Low" },
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (propertyType && propertyType !== "All")
          params.set("propertyType", propertyType);
        if (appliedMinPrice) params.set("minPrice", appliedMinPrice);
        if (appliedMaxPrice) params.set("maxPrice", appliedMaxPrice);
        if (sort && sort !== "newest") params.set("sort", sort);
        params.set("page", page);
        params.set("limit", 9);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/property?${params.toString()}`,
        );
        const json = await res.json();

        const data = json.data || [];
        const total = json.total || 0;
        const pages = json.totalPages || (total > 0 ? Math.ceil(total / 9) : 1);

        setProperties(data);
        setTotalCount(total);
        setTotalPages(pages);
      } catch (err) {
        setError("Failed to load properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [
    debouncedSearch,
    propertyType,
    sort,
    appliedMinPrice,
    appliedMaxPrice,
    page,
  ]);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    const params = buildParams(
      debouncedSearch,
      propertyType,
      sort,
      appliedMinPrice,
      appliedMaxPrice,
      p,
    );
    router.push(`/properties${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTypeChange = (e) => {
    const val = e.target.value;
    setPropertyType(val);
    setPage(1);
    const params = buildParams(
      debouncedSearch,
      val,
      sort,
      appliedMinPrice,
      appliedMaxPrice,
      1,
    );
    router.push(`/properties${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSort(val);
    setPage(1);
    const params = buildParams(
      debouncedSearch,
      propertyType,
      val,
      appliedMinPrice,
      appliedMaxPrice,
      1,
    );
    router.push(`/properties${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
  };

  const handleSearchClick = () => {
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setPage(1);
    const params = buildParams(
      debouncedSearch,
      propertyType,
      sort,
      minPrice,
      maxPrice,
      1,
    );
    router.push(`/properties${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setPropertyType("All");
    setSort("newest");
    setMinPrice("");
    setMaxPrice("");
    setAppliedMinPrice("");
    setAppliedMaxPrice("");
    setPage(1);
    router.push("/properties");
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (propertyType !== "All") count++;
    if (appliedMinPrice || appliedMaxPrice) count++;
    return count;
  }, [search, propertyType, appliedMinPrice, appliedMaxPrice]);

  // Generate page numbers array with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const nativeSelectClass =
    "w-full h-12 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm px-3 pr-8 appearance-none cursor-pointer focus:outline-none focus:border-violet-500 transition-colors";

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen pb-12">
      <main className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white">
              All Properties
            </h1>
            <p className="text-slate-400 mt-1">
              Discover handpicked luxury homes and apartments
            </p>
          </div>
          {totalCount > 0 && (
            <p className="text-slate-400 mt-3 md:mt-0 text-sm">
              Showing{" "}
              <span className="text-white font-semibold">
                {properties.length}
              </span>{" "}
              of <span className="text-white font-semibold">{totalCount}</span>{" "}
              properties
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-2xl mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-violet-500/10 rounded-xl flex items-center justify-center shrink-0">
              <MdFilterList className="text-violet-500" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="text-xs bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full">
                {activeFiltersCount} active
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end w-full">
            {/* Search */}
            <div className="md:col-span-2 lg:col-span-4 w-full">
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                LOCATION
              </label>
              <Input
                size="lg"
                placeholder="Search city, area or landmark..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={nativeSelectClass}
              />
            </div>

            {/* Type */}
            <div className="lg:col-span-2 w-full">
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                TYPE
              </label>
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={handleTypeChange}
                  className={nativeSelectClass}
                >
                  {propertyTypes.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <MdKeyboardArrowDown
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Sort */}
            <div className="lg:col-span-2 w-full">
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                SORT
              </label>
              <div className="relative">
                <select
                  value={sort}
                  onChange={handleSortChange}
                  className={nativeSelectClass}
                >
                  {sortOptions.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <MdKeyboardArrowDown
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Min Price */}
            <div className="lg:col-span-2 w-full">
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                MIN $
              </label>
              <Input
                type="number"
                size="lg"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className={nativeSelectClass}
              />
            </div>

            {/* Max Price */}
            <div className="lg:col-span-2 w-full">
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                MAX $
              </label>
              <Input
                type="number"
                size="lg"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className={nativeSelectClass}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              size="md"
              variant="bordered"
              onClick={handleClearFilters}
              startContent={<MdClear size={18} />}
              className="border-slate-700"
            >
              Clear
            </Button>
            <Button
              size="md"
              color="primary"
              startContent={<MdSearch size={18} />}
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Results */}
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-6 rounded-2xl text-center mb-10">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-950 rounded-3xl h-96 animate-pulse"
              />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-slate-400">No properties found</p>
            <Button
              className="mt-6"
              color="primary"
              onClick={handleClearFilters}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {/* Custom Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-16">
                <p className="text-slate-400 text-sm">
                  Page <span className="text-white font-semibold">{page}</span>{" "}
                  of{" "}
                  <span className="text-white font-semibold">{totalPages}</span>
                </p>

                <div className="flex items-center gap-2">
                  {/* Prev button */}
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <MdChevronLeft size={20} />
                  </button>

                  {/* Page numbers */}
                  {getPageNumbers().map((p, i) =>
                    p === "..." ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="w-10 h-10 flex items-center justify-center text-slate-500 text-sm"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold border transition-colors ${
                          page === p
                            ? "bg-violet-600 border-violet-600 text-white"
                            : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}

                  {/* Next button */}
                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <MdChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

function AllProperties() {
  return (
    <Suspense fallback={<p> loding...</p>}>
      <AllPropertiesPage />
    </Suspense>
  );
}

export default AllProperties;
