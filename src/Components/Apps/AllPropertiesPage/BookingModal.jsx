// "use client";
// import React from "react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Input,
// } from "@nextui-org/react";

// export default function BookingModal({ isOpen, onOpenChange }) {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onOpenChange={onOpenChange}
//       placement="center"
//       backdrop="blur"
//       className="dark:bg-[#0f172a] rounded-2xl p-2"
//     >
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ModalHeader className="p-10">Booking Request</ModalHeader>
//             <ModalBody className="py-4 gap-6">
//               {/* User Name */}
//               <div className="flex flex-col gap-1">
//                 <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
//                   User Name
//                 </span>
//                 <Input
//                   defaultValue="Programming-Hero Instructor"
//                   variant="bordered"
//                   color="primary"
//                 />
//               </div>

//               {/* Email */}
//               <div className="flex flex-col gap-1">
//                 <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
//                   Email
//                 </span>
//                 <Input
//                   defaultValue="owner@gmail.com"
//                   variant="bordered"
//                   color="primary"
//                 />
//               </div>

//               {/* Phone */}
//               <div className="flex flex-col gap-1">
//                 <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
//                   Phone
//                 </span>
//                 <Input
//                   placeholder="017XXXXXXXX"
//                   variant="bordered"
//                   color="primary"
//                 />
//               </div>

//               {/* Date */}
//               <div className="flex flex-col gap-1">
//                 <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
//                   Preferred Booking Date
//                 </span>
//                 <Input type="date" variant="bordered" color="primary" />
//               </div>
//             </ModalBody>
//             <ModalFooter>
//               <Button variant="flat" color="danger" onPress={onClose}>
//                 Cancel
//               </Button>
//               <Button color="primary" className="font-bold" onPress={onClose}>
//                 Confirm Booking
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// }

"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

export default function BookingModal({ isOpen, onOpenChange }) {
  const onClick = (e) => {
    e.preventDefault();
    console.log("clicked");
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      className="dark:bg-[#0f172a] rounded-2xl p-2"
    >
      <ModalContent>
        {(onClose) => (
          <form onClick={onClick}>
            <ModalHeader className="pt-10">Booking Request</ModalHeader>
            <ModalBody className="py-4 gap-6">
              {/* User Name */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  User Name
                </span>
                <Input
                  isRequired
                  defaultValue="Md Shakibul Islam"
                  variant="bordered"
                  color="primary"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email
                </span>
                <Input
                  isRequired
                  type="email"
                  defaultValue="owner@gmail.com"
                  variant="bordered"
                  color="primary"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Phone
                </span>
                <Input
                  isRequired
                  type="tel"
                  placeholder="017XXXXXXXX"
                  variant="bordered"
                  color="primary"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Preferred Booking Date
                </span>
                <Input
                  isRequired
                  type="date"
                  variant="bordered"
                  color="primary"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" color="danger" onPress={onClose}>
                Cancel
              </Button>
              <Button type="submit" color="primary" className="font-bold">
                Confirm Booking
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
