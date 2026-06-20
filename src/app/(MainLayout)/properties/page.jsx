"use client";

import PropertyCard from "@/Components/Apps/HomePage/PropertyCard";
import { Button, Input, Pagination, ComboBox, ListBox } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  MdClear,
  MdLocationOn,
  MdSearch,
  MdFilterList,
  MdSort,
} from "react-icons/md";
import { useDebounce } from "use-debounce";

// Demo Data
const demoProperties = [
  {
    _id: "1",
    title: "Luxury Ocean View Apartment",
    location: "Gulshan-2, Dhaka",
    description:
      "Stunning 3 bedroom apartment with breathtaking city and lake views.",
    rent: 125000,
    rentType: "Monthly",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    propertySize: 1850,
    images:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",

    owner: "owner@example.com",
  },
  {
    _id: "2",
    title: "Modern Family House",
    location: "Banani, Dhaka",
    description: "Spacious family home with garden and rooftop terrace.",
    rent: 85000,
    rentType: "Monthly",
    propertyType: "House",
    bedrooms: 4,
    bathrooms: 4,
    propertySize: 3200,
    images:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",

    owner: "houseowner@gmail.com",
  },
  {
    _id: "3",
    title: "Premium Villa with Pool",
    location: "Bashundhara, Dhaka",
    description:
      "Exclusive villa featuring private swimming pool and luxurious interiors.",
    rent: 20000,
    rentType: "Monthly",
    propertyType: "Villa",
    bedrooms: 5,
    bathrooms: 5,
    propertySize: 5200,
    images:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    owner: "villa@luxury.com",
  },
];

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

  // Fetch with Demo Data + Filters
  const fetchProperties = useCallback(() => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      let filtered = [...demoProperties];

      if (debouncedSearch) {
        const term = debouncedSearch.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(term) ||
            p.location.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term),
        );
      }

      if (propertyType && propertyType !== "All") {
        filtered = filtered.filter((p) => p.propertyType === propertyType);
      }

      if (minPrice)
        filtered = filtered.filter((p) => p.rent >= Number(minPrice));
      if (maxPrice)
        filtered = filtered.filter((p) => p.rent <= Number(maxPrice));

      if (sort === "price_asc") {
        filtered.sort((a, b) => a.rent - b.rent);
      } else if (sort === "price_desc") {
        filtered.sort((a, b) => b.rent - a.rent);
      }

      setProperties(filtered);
      setTotalCount(filtered.length);
      setTotalPages(Math.ceil(filtered.length / 9) || 1);
      setLoading(false);
    }, 500);
  }, [debouncedSearch, propertyType, sort, minPrice, maxPrice]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProperties();
  }, [fetchProperties]);

  const updateURL = useCallback(
    (newParams = {}) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value && value !== "" && value !== "All" && value !== "newest") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      if (!newParams.page) params.set("page", "1");
      router.push(`/properties?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleFilterChange = (key, value) => {
    setPage(1);
    updateURL({ [key]: value });
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

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (propertyType !== "All") count++;
    if (minPrice || maxPrice) count++;
    return count;
  }, [search, propertyType, minPrice, maxPrice]);

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

        {/* Filters Section */}
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
            {/* Search Bar */}
            <div className="md:col-span-2 lg:col-span-4 w-full">
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                LOCATION
              </label>
              <Input
                size="lg"
                placeholder="Search city, area or landmark..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
                classNames={{
                  base: "w-full",
                  inputWrapper:
                    "bg-slate-900 border-slate-700 focus-within:border-violet-500 h-12 text-base",
                }}
              />
            </div>

            {/* Property Type */}
            <div className="lg:col-span-2 w-full">
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                TYPE
              </label>
              <ComboBox
                selectedKey={propertyType}
                onSelectionChange={(key) => {
                  setPropertyType(key);
                  handleFilterChange("propertyType", key);
                }}
              >
                <ComboBox.InputGroup>
                  <Input
                    classNames={{ inputWrapper: "h-12" }}
                    placeholder="All Types"
                  />
                  <ComboBox.Trigger />
                </ComboBox.InputGroup>
                <ComboBox.Popover>
                  <ListBox>
                    {propertyTypes.map((item) => (
                      <ListBox.Item key={item.key}>{item.label}</ListBox.Item>
                    ))}
                  </ListBox>
                </ComboBox.Popover>
              </ComboBox>
            </div>

            {/* Sort */}
            <div className="lg:col-span-2 w-full">
              <label className="text-xs uppercase tracking-widest text-slate-400 mb-1.5 block">
                SORT
              </label>
              <ComboBox
                selectedKey={sort}
                onSelectionChange={(key) => {
                  setSort(key);
                  handleFilterChange("sort", key);
                }}
              >
                <ComboBox.InputGroup>
                  <Input
                    classNames={{ inputWrapper: "h-12" }}
                    placeholder="Sort"
                  />
                  <ComboBox.Trigger />
                </ComboBox.InputGroup>
                <ComboBox.Popover>
                  <ListBox>
                    {sortOptions.map((item) => (
                      <ListBox.Item key={item.key}>{item.label}</ListBox.Item>
                    ))}
                  </ListBox>
                </ComboBox.Popover>
              </ComboBox>
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
                classNames={{ inputWrapper: "h-12" }}
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
                classNames={{ inputWrapper: "h-12" }}
              />
            </div>
          </div>

          {/* Action Buttons */}
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
              onClick={fetchProperties}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Results Section */}
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
              {demoProperties.map((demoP) => (
                <PropertyCard key={demoP._id} property={demoP} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-16">
                <Pagination
                  total={totalPages}
                  page={page}
                  onChange={(p) => {
                    setPage(p);
                    updateURL({ page: p });
                  }}
                  color="primary"
                  size="lg"
                  showControls
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
