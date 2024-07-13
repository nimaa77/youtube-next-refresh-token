import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface Order {
  title: string;
  price: number;
  quantity: number;
  status: string;
}

export default function OrdersPage() {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <h2 className="text-lg font-semibold">Orders</h2>
        </CardHeader>
        <CardDescription>{/* TODO */}</CardDescription>
      </CardContent>
    </Card>
  );
}
