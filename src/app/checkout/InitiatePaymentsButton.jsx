import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import React from "react";

function InitiatePaymentsButton() {
  return (
    <Button
      size="lg"
      className="w-full h-12 gap-2 text-base font-semibold uppercase transition-opacity duration-300 shadow-lg cursor-pointer bg-brand hover:opacity-95">
      <Icon icon="shield" size="30" />
      Proceed to Pay
    </Button>
  );
}

export default InitiatePaymentsButton;
