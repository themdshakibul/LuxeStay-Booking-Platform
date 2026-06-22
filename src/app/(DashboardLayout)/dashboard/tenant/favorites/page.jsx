"use client";

import React, { useEffect, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
} from "@nextui-org/react";
import { MdFavorite, MdDelete, MdRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import { getFevoritesCard } from "@/lib/api/Tenent/data";
import { useSession } from "@/lib/auth-client";
import { deleteFevoritesCard } from "@/lib/api/Tenent/action";
import toast from "react-hot-toast";

const FaveritesPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      // eslint-disable-next-line react-hooks/immutability
      fetchFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const fetchFavorites = async () => {
    setLoading(true);
    const response = await getFevoritesCard(user.email);
    setFavorites(response);
    setLoading(false);
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await deleteFevoritesCard(id);
      toast.success("Property removed from favorites!");
      fetchFavorites();
    } catch (error) {
      toast.error("Failed to remove property from favorites!");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Favorites
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Review listings you saved for future bookings
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner label="Loading saved properties..." />
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-16 bg-slate-950 border border-slate-800/60 rounded-2xl p-6">
          <MdFavorite size={48} className="text-slate-650 mx-auto mb-3" />
          <p className="text-slate-400 font-bold text-sm">
            No properties in your favorites list yet.
          </p>
          <Link href="/properties">
            <Button
              size="sm"
              color="primary"
              className="bg-violet-600 font-bold text-xs mt-4"
            >
              Browse Listings
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <Table
            aria-label="Favorites Table"
            className="text-slate-200"
            classNames={{
              wrapper: "bg-slate-950 shadow-none p-0",
              th: "bg-slate-900 text-slate-300 font-bold text-xs border-b border-slate-800 py-4",
              td: "border-b border-slate-900 py-4 text-xs font-semibold",
            }}
          >
            <TableHeader>
              <TableColumn className="text-left">PROPERTY NAME</TableColumn>
              <TableColumn className="text-left">TYPE</TableColumn>
              <TableColumn className="text-left">LOCATION</TableColumn>
              <TableColumn className="text-left">RENT PRICE</TableColumn>
              <TableColumn className="text-left">BATHROOMS</TableColumn>
              <TableColumn className="text-left">BEDROOMS</TableColumn>
              <TableColumn className="text-center">ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {favorites.map((fav) => (
                <TableRow key={fav._id}>
                  <TableCell>
                    <Link
                      href={`/properties/${fav.favoritesId}`}
                      className="hover:text-violet-400 font-bold transition-colors"
                    >
                      {fav.title}
                    </Link>
                  </TableCell>
                  <TableCell>{fav.propertyType}</TableCell>
                  <TableCell>{fav.location}</TableCell>
                  <TableCell>{fav.rent}</TableCell>
                  <TableCell>{fav.bathrooms}</TableCell>
                  <TableCell>{fav.bedrooms}</TableCell>

                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-5">
                      <Link href={`/properties/${fav.favoritesId}`}>
                        <div
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-slate-300 hover:text-white"
                        >
                          <MdRemoveRedEye size={18} />
                        </div>
                      </Link>
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="light"
                        className="text-rose-500 hover:text-rose-600"
                        onClick={() => handleRemoveFavorite(fav._id)}
                      >
                        <MdDelete size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default FaveritesPage;
