"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

function MapComponent() {
  const manilaPosition = [14.5995, 120.9842];

  return (
    <MapContainer
      center={{ lat: manilaPosition[0], lng: manilaPosition[1] }}
      zoom={10}
      scrollWheelZoom={true}
      className="h-full w-full my-auto "
      // style={{ height: "100vh", width: "30vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {data.map((campground) => (
        <Marker
          position={{ lat: campground.latLng[0], lng: campground.latLng[1] }}
          icon={customIcon}
        >
          <Popup>
            <div className="flex gap-2">
              <img src={landing} alt="" className="w-[40px] h-[40px] object-cover" />
              <span className="text-xs m-auto">{campground.name}</span>
            </div>
          </Popup>
        </Marker>
      ))} */}
    </MapContainer>
  );
}

export default MapComponent;
