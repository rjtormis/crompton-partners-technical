import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Overview() {
  return (
    <div className="grid grid-cols-3 gap-4 my-10">
      {/* Total Properties Listed */}
      <Card>
        <CardHeader>
          <CardTitle>Total Properties Listed</CardTitle>
          <CardDescription>Breakdown of active, sold, and rented properties</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Active: <strong>25</strong>
          </p>
          <p>
            Sold: <strong>10</strong>
          </p>
          <p>
            Rented: <strong>15</strong>
          </p>
        </CardContent>
      </Card>

      {/* Recent Listings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Listings</CardTitle>
          <CardDescription>Latest properties added</CardDescription>
        </CardHeader>
        <CardContent className="-p">
          <p>
            🏡 Luxury Villa in Dubai - <span className="text-gray-500">2 hours ago</span>
          </p>
          <p>
            🏢 Modern Apartment in NYC - <span className="text-gray-500">5 hours ago</span>
          </p>
          <p>
            🏖️ Beach House in LA - <span className="text-gray-500">1 day ago</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Overview;
