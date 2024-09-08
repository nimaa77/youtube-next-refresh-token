"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { useSession } from "@/lib/auth/useSession"
import {
  useEffect,
  useState,
} from "react"

interface Order {
  title: string
  price: number
  quantity: number
  status: string
}

export default function OrdersPage() {
  const session = useSession()

  const [orders, setOrders] = useState<
    Order[]
  >([])

  useEffect(() => {
    fetch(
      "http://localhost:4000/v1/orders",
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )
      .then((response) =>
        response.json()
      )
      .then((data) => {
        setOrders(data.data)
      })
  }, [])

  console.log({ orders })

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <h2 className="text-lg font-semibold">
            Orders
          </h2>
        </CardHeader>
        <CardDescription>
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
        </CardDescription>
      </CardContent>
    </Card>
  )
}
