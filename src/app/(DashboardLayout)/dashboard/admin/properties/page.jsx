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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { MdCheck, MdClose, MdDelete, MdOutlineApartment } from "react-icons/md";
import Swal from "sweetalert2";
import { getAllProperties } from "@/lib/api/Admin/data";
import { deleteProperty, updatePropertyStatus } from "@/lib/api/Admin/actions";

const ITEMS_PER_PAGE = 10;

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Rejection modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [rejectionFeedback, setRejectionFeedback] = useState("");
  const [rejectSubmitLoading, setRejectSubmitLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await getAllProperties();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (propId) => {
    const result = await Swal.fire({
      title: "Approve Property?",
      text: "This listing will go live immediately.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#0f172a",
      confirmButtonText: "Yes, approve it",
    });

    if (result.isConfirmed) {
      try {
        const data = await updatePropertyStatus(propId, "Approved", "");
        if (data.success) {
          setProperties(
            properties.map((p) =>
              p._id === propId
                ? { ...p, status: "Approved", rejectionFeedback: "" }
                : p,
            ),
          );
          Swal.fire({
            icon: "success",
            title: "Approved",
            text: "Property has been approved and listed.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error("Approve failed:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not approve property.",
        });
      }
    }
  };

  const handleOpenRejectModal = (propId) => {
    setSelectedPropertyId(propId);
    setRejectionFeedback("");
    onOpen();
  };

  const handleRejectConfirm = async (onClose) => {
    if (!rejectionFeedback.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Feedback Required",
        text: "Please enter a rejection reason.",
      });
      return;
    }

    setRejectSubmitLoading(true);
    try {
      const data = await updatePropertyStatus(
        selectedPropertyId,
        "Rejected",
        rejectionFeedback,
      );
      if (data.success) {
        setProperties(
          properties.map((p) =>
            p._id === selectedPropertyId
              ? { ...p, status: "Rejected", rejectionFeedback }
              : p,
          ),
        );
        onClose();
        Swal.fire({
          icon: "success",
          title: "Rejected",
          text: "Feedback sent to the owner.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Reject failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not reject property.",
      });
    } finally {
      setRejectSubmitLoading(false);
    }
  };

  const handleDelete = async (propId) => {
    const result = await Swal.fire({
      title: "Delete Property?",
      text: "This will permanently remove the listing.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#0f172a",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        const data = await deleteProperty(propId);
        if (data.success) {
          setProperties(properties.filter((p) => p._id !== propId));
          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Property removed from database.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not delete property.",
        });
      }
    }
  };

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const paginatedProperties = properties.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Moderate Properties
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Review listings, approve properties, or provide rejection comments
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner label="Loading listings..." />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-16 bg-slate-950 border border-slate-800 rounded-2xl p-6">
          <MdOutlineApartment
            size={48}
            className="text-slate-600 mx-auto mb-3"
          />
          <p className="text-slate-400 font-bold text-sm">
            No properties submitted on the platform.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <Table
              aria-label="Admin Properties Table"
              className="text-slate-200"
              classNames={{
                wrapper: "bg-slate-950 shadow-none p-0",
                th: "bg-slate-900 text-slate-300 text-left font-bold text-sm border-b border-slate-800 py-4",
                td: "border-b border-slate-900 py-4 text-sm font-semibold",
              }}
            >
              <TableHeader>
                <TableColumn>Title</TableColumn>
                <TableColumn>Owner</TableColumn>
                <TableColumn>Location</TableColumn>
                <TableColumn>Rent</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn className="text-center">Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {paginatedProperties.map((prop) => (
                  <TableRow key={prop._id}>
                    <TableCell className="font-bold text-white">
                      {prop.title}
                    </TableCell>
                    <TableCell className="font-mono text-slate-400 select-all">
                      {prop.ownerEmail}
                    </TableCell>
                    <TableCell>{prop.location}</TableCell>
                    <TableCell>{Number(prop.rent).toLocaleString()}</TableCell>
                    <TableCell>{prop.propertyType}</TableCell>
                    <TableCell>
                      <Chip
                        size="sm"
                        variant="flat"
                        className={`font-bold text-sm uppercase ${
                          prop.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 px-2"
                            : prop.status === "Approved"
                              ? "bg-green-100 text-green-700 px-2"
                              : "bg-red-100 text-red-700 px-2"
                        }`}
                      >
                        {prop.status}
                      </Chip>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {prop.status === "Pending" && (
                          <>
                            <Button
                              isIconOnly
                              className="bg-emerald-500 rounded-full flex items-center  text-white hover:bg-emerald-600 w-6 h-6"
                              onClick={() => handleApprove(prop._id)}
                              title="Approve"
                            >
                              <MdCheck size={18} />
                            </Button>
                            <Button
                              isIconOnly
                              size="sm"
                              className="bg-rose-500 rounded-full flex items-center text-white hover:bg-rose-600 w-6 h-6"
                              onClick={() => handleOpenRejectModal(prop._id)}
                              title="Reject"
                            >
                              <MdClose size={18} />
                            </Button>
                          </>
                        )}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-rose-500 hover:text-rose-600"
                          onClick={() => handleDelete(prop._id)}
                          title="Delete"
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
            {Math.min(page * ITEMS_PER_PAGE, properties.length)} of{" "}
            {properties.length} properties
          </p>
        </div>
      )}

      {/* Reject Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b border-slate-800 font-black text-white mt-5">
                Reject Property Listing
              </ModalHeader>
              <ModalBody className="py-6 flex flex-col gap-4">
                <p className="text-slate-400 text-xs leading-relaxed">
                  Please provide a reason for rejection. The owner will see this
                  feedback in their dashboard.
                </p>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Rejection Feedback
                  </label>
                  <Textarea
                    placeholder="e.g. Image resolution is too low, incomplete description..."
                    value={rejectionFeedback}
                    onChange={(e) => setRejectionFeedback(e.target.value)}
                    minRows={3}
                    classNames={{
                      inputWrapper:
                        "bg-slate-900 border border-slate-800 hover:border-slate-700 focus-within:border-violet-500",
                      input:
                        "text-slate-100 placeholder:text-slate-500 text-xs",
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="border-t border-slate-800">
                <Button
                  variant="light"
                  className="text-slate-400 hover:bg-slate-900 rounded-xl"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  className="bg-rose-500 font-bold rounded-xl text-white"
                  onClick={() => handleRejectConfirm(onClose)}
                  isLoading={rejectSubmitLoading}
                >
                  Confirm Rejection
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
