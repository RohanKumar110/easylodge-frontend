import { Badge } from "@/components/ui/badge";
import { TOP_BOOKING_TABLE_HEADERS } from "@/config/admin.config";
import { bookingStatusVariant } from "@/config/app.config";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function BookingsTable({ bookings }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetBooking, setSheetBooking] = useState(null);

  function handleSheetClick(booking) {
    setSheetOpen(true);
    setSheetBooking(booking);
  }

  return (
    <div className="overflow-hidden border rounded-md">
      <Table>
        <TableHeader className={"bg-muted/50"}>
          <TableRow>
            {TOP_BOOKING_TABLE_HEADERS.map((header) => (
              <TableHead key={header.id} className={header.className}>
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.map((booking) => (
            <TableRow
              key={booking.id}
              className={"cursor-pointer"}
              onClick={() => handleSheetClick(booking)}>
              <TableCell>{booking?.id}</TableCell>
              <TableCell>{booking?.user?.name}</TableCell>
              <TableCell>{booking?.room?.type}</TableCell>
              <TableCell>{booking?.numberOfRooms}</TableCell>
              <TableCell>
                {dayjs(booking?.checkInDate).format("DD MMM YYYY")}
              </TableCell>
              <TableCell>
                {dayjs(booking?.checkOutDate).format("DD MMM YYYY")}
              </TableCell>
              <TableCell className={"px-2"}>
                <Badge
                  className={cn(
                    "text-white px-2 py-1",
                    bookingStatusVariant[booking.status]?.className
                  )}>
                  {bookingStatusVariant[booking.status]?.text}
                </Badge>
              </TableCell>
              <TableCell>{booking?.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <MoreDetailsDialog
        sheetOpen={sheetOpen}
        setSheetOpen={setSheetOpen}
        booking={sheetBooking}
      />
    </div>
  );
}

function MoreDetailsDialog({ sheetOpen, setSheetOpen, booking }) {
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="sm:max-w-125 overflow-auto">
        <SheetHeader>
          <SheetTitle className={"text-center"}>Booking Details</SheetTitle>
          <SheetDescription className="sr-only">
            Complete breakdown of the booking.
          </SheetDescription>
        </SheetHeader>

        {/* User Info */}
        <div className=" border rounded-sm mx-4 mb-4">
          <h3 className="font-semibold p-4 border-b">User Information</h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={"font-semibold"}>Name</TableCell>
                <TableCell>{booking?.user?.name || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>Email</TableCell>
                <TableCell>{booking?.user?.email || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>Gender</TableCell>
                <TableCell>{booking?.user?.gender || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>Date of Birth</TableCell>
                <TableCell>
                  {booking?.user?.dateOfBirth
                    ? dayjs(booking.user.dateOfBirth).format("DD MMM YYYY")
                    : "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>Roles</TableCell>
                <TableCell>
                  {booking?.user?.roles?.join(", ") || "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Booking Info */}
        <div className="border rounded-sm mx-4 mb-4">
          <h3 className="font-semibold p-4 border-b">Booking Information</h3>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={"font-semibold"}>Booking Id</TableCell>
                <TableCell>{booking?.id || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>Room Type</TableCell>
                <TableCell>{booking?.room?.type || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>Rooms Count</TableCell>
                <TableCell>{booking?.numberOfRooms}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>Check-in Date</TableCell>
                <TableCell>
                  {dayjs(booking?.checkInDate).format("DD MMM YYYY")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>
                  Check-out Date
                </TableCell>
                <TableCell>
                  {dayjs(booking?.checkOutDate).format("DD MMM YYYY")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>Status</TableCell>
                <TableCell>{booking?.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>Amount</TableCell>
                <TableCell>{booking?.amount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>Created At</TableCell>
                <TableCell>
                  {dayjs(booking?.createdAt).format("DD MMM YYYY, HH:mm")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={"font-semibold"}>Updated At</TableCell>
                <TableCell>
                  {dayjs(booking?.updatedAt).format("DD MMM YYYY, HH:mm")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Guests Info */}
        {booking?.guests?.length > 0 && (
          <div className="mt-6 border rounded-md">
            <h3 className="font-semibold p-4 border-b">Guests</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>DOB</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {booking.guests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>{guest.name}</TableCell>
                    <TableCell>{guest.gender}</TableCell>
                    <TableCell>
                      {dayjs(guest.dateOfBirth).format("DD MMM YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default BookingsTable;
