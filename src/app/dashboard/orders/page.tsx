import { useSession } from "@/lib/auth/useSession"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { request } from "@/lib/client"

interface Order {
  title: string
  price: number
  quantity: number
  status: string
}

export default async function OrdersPage() {
  // use axios to fetch the orders
  const orders = await request({
    url: "/v1/orders",
  }).then((data) => {
    return data.data.data
  })

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <h2 className="text-lg font-semibold">
            Orders
          </h2>
        </CardHeader>
        <CardContent>
          {orders.map((order) => (
            <div key={order.title}>
              <p>
                {order.title} - $
                {order.price} - x
                {order.quantity} -{" "}
                {order.status}
              </p>
            </div>
          ))}
        </CardContent>
      </CardContent>
    </Card>
  )
}
