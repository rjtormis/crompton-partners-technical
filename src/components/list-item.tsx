"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Bath, Bed, DollarSign, Map } from "lucide-react";
import { Property } from "@prisma/client";
import { useRouter } from "next/navigation";

function ListingItem({ listing }: { listing: Property }) {
  const images = listing.images as string[];
  const router = useRouter();

  const handleChangeRoute = () => {
    router.push(`/listings/${listing.id}`);
  };

  return (
    <Card
      className=" flex flex-col overflow-hidden hover:cursor-pointer"
      onClick={handleChangeRoute}
    >
      {/* Image */}
      <div className="relative w-full h-40">
        <Image
          src={`${process.env.NEXT_PUBLIC_AWS_LINK}/${images[0]}`}
          alt={`Property ${listing.name}`}
          className="rounded-t-xl "
          fill
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title + Badge */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">{listing.name}</h1>
          <Badge variant="outline">Admin</Badge>
        </div>

        {/* Details: Bathrooms, Price, etc. */}
        <div className="flex flex-col justify-around text-sm text-gray-600 mt-2 gap-2">
          <div className="grid grid-cols-2">
            <div className=" flex items-center gap-2 ">
              <Bath size={18} /> <span>{listing.bathroom} Bathrooms</span>
            </div>
            <div className=" flex items-center gap-2 ">
              <Bed size={18} /> <span>{listing.bedroom} Bedrooms</span>
            </div>
          </div>
          <div className=" flex items-center gap-2">
            <DollarSign size={18} /> AED <span>{listing.price}</span>
          </div>
          <div className=" flex items-center gap-2">
            <Map size={18} /> <span>{listing.location} Bathrooms</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ListingItem;
