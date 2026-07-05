import Icons from "@/lib/icons";
import { Button } from "./ui/button";

function HotelImage({ image, onRemove }) {
  return (
    <div className="relative">
      <img
        src={image}
        alt="Hotel image"
        width={96}
        height={96}
        className="object-cover size-24 rounded-md"
      />
      <Button
        size={"icon"}
        type="button"
        variant={"destructive"}
        onClick={onRemove}
        className={
          "absolute size-6 rounded-full -top-2 -right-2 cursor-pointer"
        }>
        <Icons icon={"close"} size="14" />
      </Button>
    </div>
  );
}

export default HotelImage;
