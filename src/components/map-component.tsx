"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Property } from "@prisma/client";
import { Icon } from "leaflet";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

function MapComponent({ listings }: { listings: Property[] }) {
  const uaePosition = [24.4539, 54.3773];
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.freepik.com/512/74/74383.png",
    iconSize: [30, 30], // You can adjust the size as needed
  });
  return (
    <MapContainer
      center={{ lat: uaePosition[0], lng: uaePosition[1] }}
      zoom={10}
      scrollWheelZoom={true}
      className="h-full w-full my-auto "
      // style={{ height: "100vh", width: "30vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((l) => {
        const images = l.images as string[];
        return (
          <Marker key={l.id} position={{ lat: l.lng, lng: l.lat }} icon={customIcon}>
            <Popup>
              <div className="flex flex-col gap-2">
                <Image
                  alt={`${l.name} Picture`}
                  src={`${process.env.NEXT_PUBLIC_AWS_LINK}/${images[0]}`}
                  width={40}
                  height={40}
                  className="object-cover m-auto rounded-xl "
                />
                <span className="text-xs m-auto">{l.name}</span>
                <Link href={`/listings/${l.id}`} target="_blank">
                  <Button variant="outline" className="w-full">
                    View
                  </Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapComponent;
