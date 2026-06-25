/* eslint-disable react-hooks/immutability */
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import { MdShield } from "react-icons/md";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";
import { getAllUsers } from "@/lib/api/Admin/data";
import { updateUserRole } from "@/lib/api/Admin/actions";
import Image from "next/image";
import LoadingPages from "@/Components/Shared/Reusable/LoadingPages";

const ITEMS_PER_PAGE = 10;

export default function AdminUsers() {
  const { data: session } = authClient.useSession();
  const currentUser = session?.user;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await authClient.token();
    const token = data?.token;

    setLoading(true);
    try {
      const data = await getAllUsers(token);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (userId, userEmail, currentRole) => {
    if (userEmail === currentUser?.email) {
      Swal.fire({
        icon: "warning",
        title: "Self Modification",
        text: "You cannot change your own admin role.",
      });
      return;
    }

    const { value: roleSelected } = await Swal.fire({
      title: "Update User Role",
      text: `Select a new role for ${userEmail}:`,
      input: "select",
      inputOptions: { tenant: "Tenant", owner: "Owner", admin: "Admin" },
      inputValue: currentRole,
      showCancelButton: true,
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#0f172a",
      inputValidator: (value) => {
        if (value === currentRole) return "Please select a different role.";
      },
    });

    if (roleSelected) {
      try {
        const data = await updateUserRole(userId, roleSelected);
        if (data.success) {
          setUsers(
            users.map((u) =>
              u._id === userId ? { ...u, role: roleSelected } : u,
            ),
          );
          Swal.fire({
            icon: "success",
            title: "Role Updated",
            text: `User role changed to ${roleSelected}.`,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      } catch (error) {
        console.error("Role update failed:", error);
        Swal.fire({
          icon: "error",
          title: "Action Failed",
          text: "Error updating user role.",
        });
      }
    }
  };

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Manage Users
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Review user accounts and modify access roles
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingPages />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-16 bg-slate-950 border border-slate-800 rounded-2xl">
          <p className="text-slate-500 italic">
            No registered users in the database.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <Table
              aria-label="Users Table"
              className="text-slate-200"
              classNames={{
                wrapper: "bg-slate-950 shadow-none p-0",
                th: "bg-slate-900 text-slate-300 text-left font-bold text-sm border-b border-slate-800 py-4",
                td: "border-b border-slate-900 py-4 text-sm font-semibold",
              }}
            >
              <TableHeader>
                <TableColumn>User Details</TableColumn>
                <TableColumn>Email Address</TableColumn>
                <TableColumn>Current Role</TableColumn>
                <TableColumn className="text-center">Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={user?.image}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="object-cover w-10 h-10 rounded-full overflow-hidden border-2 border-violet-600 shrink-0"
                        />
                        <span className="font-bold text-white">
                          {user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm font-semibold select-all">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="sm"
                        variant="flat"
                        className={`font-bold text-sm flex items-center justify-center uppercase ${
                          user.role === "owner"
                            ? "bg-yellow-100 text-yellow-700 px-2"
                            : user.role === "admin"
                              ? "bg-green-100 text-green-700 px-2"
                              : "bg-red-100 text-red-700 px-2"
                        }`}
                      >
                        {user.role}
                      </Chip>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        variant="bordered"
                        className="border-slate-800 text-slate-300 font-bold text-sm h-7 px-3 hover:bg-slate-900 flex items-center gap-1 mx-auto"
                        onClick={() =>
                          handleChangeRole(
                            user._id || user.id,
                            user.email,
                            user.role,
                          )
                        }
                        startContent={<MdShield size={12} />}
                      >
                        Change Role
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination
                total={totalPages}
                page={page}
                onChange={setPage}
                color="secondary"
                showControls
              />
            </div>
          )}

          <p className="text-center text-slate-500 text-xs">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(page * ITEMS_PER_PAGE, users.length)} of {users.length}{" "}
            users
          </p>
        </div>
      )}
    </div>
  );
}
