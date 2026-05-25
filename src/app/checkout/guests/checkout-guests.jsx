import React, { useState } from "react";
import AddGuestDialog from "./add-guests-dialog";

function CheckOutGuests({ bookingId }) {
  const [bookingGuests, setBookingGuests] = useState([]);

  return (
    <div>
      <AddGuestDialog
        bookingId={bookingId}
        bookingGuests={bookingGuests}
        setBookingGuests={setBookingGuests}
      />
    </div>
  );
}

export default CheckOutGuests;
