import { prisma } from "@/app/api/auth/[...nextauth]/options";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function Overview() {
  const [totalActive, totalSold, totalRented, totalVilla, totalApartment, totalRoom] =
    await Promise.all([
      prisma.property.count({
        where: {
          status: "available",
        },
      }),
      prisma.property.count({
        where: {
          status: "sold",
        },
      }),
      prisma.property.count({
        where: {
          status: "rented",
        },
      }),
      prisma.property.count({
        where: {
          type: "villa",
        },
      }),
      prisma.property.count({
        where: {
          type: "apartment",
        },
      }),
      prisma.property.count({
        where: {
          type: "room",
        },
      }),
    ]);

  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      {/* Total Properties Listed */}
      <Card>
        <CardHeader>
          <CardTitle>Total Properties Listed</CardTitle>
          <CardDescription>Breakdown of active, sold, and rented properties</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2">
            <div>
              <p>
                Active: <strong>{totalActive}</strong>
              </p>
              <p>
                Sold: <strong>{totalSold}</strong>
              </p>
              <p>
                Rented: <strong>{totalRented}</strong>
              </p>
            </div>
            <div>
              <p>
                Villa: <strong>{totalVilla}</strong>
              </p>
              <p>
                Apartment: <strong>{totalApartment}</strong>
              </p>
              <p>
                Room: <strong>{totalRoom}</strong>
              </p>
            </div>
          </div>
          <div className="my-4">
            <p>
              Total: <strong>{totalActive + totalSold + totalRented}</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Overview;
