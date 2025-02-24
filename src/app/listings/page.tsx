import { getServerSession } from "next-auth";
import Listings from "./listings";
import { options, prisma } from "../api/auth/[...nextauth]/options";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palm Sunset | Listings",
};
async function ListingsPage() {
  const session = await getServerSession(options);
  const properties = await prisma.property.count();
  return (
    <>
      <Listings session={session} totalProperties={properties} />
    </>
  );
}

export default ListingsPage;
