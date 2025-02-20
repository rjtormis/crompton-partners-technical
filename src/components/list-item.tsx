import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image, { StaticImageData } from "next/image";

function ListingItem({
  image,
  name,
  price,
  bathrooms,
  location,
}: {
  image: StaticImageData;
  name: string;
  price: number;
  bathrooms: number;
  location: string;
}) {
  return (
    <Card className=" flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-40">
        <Image src={image} alt={name} className="rounded-t-xl " fill />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title + Badge */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">{name}</h1>
          <Badge variant="outline">Admin</Badge>
        </div>

        {/* Details: Bathrooms, Price, etc. */}
        <div className="flex flex-col justify-around text-sm text-gray-600 mt-2">
          <p>🛁 {bathrooms} Bathrooms</p>
          <p>💰 ${price}</p>
          <p>📍 {location}</p>
        </div>
      </div>
    </Card>
  );
}

export default ListingItem;
