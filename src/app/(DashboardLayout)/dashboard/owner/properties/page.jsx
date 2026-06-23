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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  MdOutlineApartment,
  MdDelete,
  MdEdit,
  MdRemoveRedEye,
} from "react-icons/md";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { myProperties } from "@/lib/api/Add-Properties/data";
import EditPropertiesModal from "@/Components/Apps/Dashboard/OwnerPage/PropertiesPage/EditPropertiesModal";
import { deleteProperty } from "@/lib/api/Add-Properties/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function MyProperties() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  const router = useRouter();

  // State for Rejection Feedback Modal
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const {
    isOpen: isFeedbackOpen,
    onOpen: onFeedbackOpen,
    onOpenChange: onFeedbackOpenChange,
  } = useDisclosure();

  // State for Edit Modal
  const [selectedProperty, setSelectedProperty] = useState(null);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const fetchProperties = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const propertiesData = await myProperties(session?.user?.email);
      setProperties(propertiesData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleDelete = async (id) => {
    const res = await deleteProperty(id);
    if (res) {
      fetchProperties();
      toast.success("Property deleted successfully");
    } else {
      toast.error(res?.message);
    }
  };

  const handleOpenFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    onFeedbackOpen();
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    onEditOpen();
  };

  const statusColorMap = {
    Pending: "warning",
    Approved: "success",
    Rejected: "danger",
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            My Properties
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Review active, pending, or rejected property listings
          </p>
        </div>
        <Button
          size="sm"
          color="primary"
          className="bg-violet-600 font-bold text-white shadow-lg"
          onPress={() => router.push("/dashboard/owner/add-property")}
        >
          Add New Property
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner label="Retrieving listings..." />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-16 bg-slate-950 border border-slate-800/60 rounded-2xl p-6">
          <MdOutlineApartment
            size={48}
            className="text-slate-600 mx-auto mb-3"
          />
          <p className="text-slate-400 font-bold text-sm">
            No properties listed in your portfolio yet.
          </p>
        </div>
      ) : (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <Table
            aria-label="Owner Properties Table"
            className="text-slate-200"
            classNames={{
              wrapper: "bg-slate-950 shadow-none p-0",
              th: "bg-slate-900 text-slate-300 font-bold text-sm border-b border-slate-800 py-4",
              td: "border-b border-slate-900 py-4 text-sm font-semibold",
            }}
          >
            <TableHeader>
              <TableColumn className="text-left">PROPERTY TITLE</TableColumn>
              <TableColumn className="text-left">LOCATION</TableColumn>
              <TableColumn className="text-left">RENT</TableColumn>
              <TableColumn className="text-left">TYPE</TableColumn>
              <TableColumn className="text-left">STATUS</TableColumn>
              <TableColumn className="text-center">ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {properties.map((prop) => (
                <TableRow key={prop._id}>
                  <TableCell>
                    {prop.status === "Approved" ? (
                      <Link
                        href={`/properties/${prop._id}`}
                        className="hover:text-violet-400 font-bold transition-colors"
                      >
                        {prop.title}
                      </Link>
                    ) : (
                      <span className="text-slate-300 font-bold">
                        {prop.title}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{prop.location}</TableCell>
                  <TableCell>{prop.rent}</TableCell>
                  <TableCell>{prop.propertyType}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Chip
                        size="sm"
                        variant="flat"
                        className={`font-bold text-sm flex items-center justify-center uppercase ${
                          prop.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 px-2"
                            : prop.status === "Approved"
                              ? "bg-green-100 text-green-700 px-2"
                              : "bg-red-100 text-red-700 px-2"
                        }`}
                      >
                        {prop.status}
                      </Chip>
                      {prop.status === "Rejected" && (
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-rose-400 rounded-full flex items-center justify-center hover:bg-slate-900 text-sm"
                          onClick={() =>
                            handleOpenFeedback(prop.rejectionFeedback)
                          }
                          title="View Rejection Feedback"
                        >
                          <MdRemoveRedEye size={16} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      {/* Edit Button */}
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-violet-400 rounded-full flex items-center hover:bg-slate-900"
                        title="Edit Property"
                        onClick={() => handleEditClick(prop)}
                      >
                        <MdEdit size={18} />
                      </Button>
                      {/* Delete Button */}
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="light"
                        className="text-rose-500 hover:text-rose-600"
                        onClick={() => handleDelete(prop._id)}
                        title="Delete Property"
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

      {/* Rejection Feedback Modal */}
      <Modal
        isOpen={isFeedbackOpen}
        onOpenChange={onFeedbackOpenChange}
        placement="center"
        className="bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b border-slate-800 font-black text-white mt-5">
                Rejection Feedback
              </ModalHeader>
              <ModalBody className="py-6">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                  Moderator Feedback Comment:
                </p>
                <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl text-slate-350 text-sm italic leading-relaxed">
                  {selectedFeedback}
                </div>
              </ModalBody>
              <ModalFooter className="border-t border-slate-800">
                <Button
                  color="primary"
                  className="bg-violet-600 font-bold rounded-xl"
                  onClick={onClose}
                >
                  Dismiss
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Modal Component */}
      <EditPropertiesModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        propertyData={selectedProperty}
        onSuccess={fetchProperties}
        fetchProperties={fetchProperties}
      />
    </div>
  );
}
