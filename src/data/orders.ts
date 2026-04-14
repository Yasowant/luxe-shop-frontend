export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderEvent {
  status: string;
  date: string;
  description: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: OrderItem[];
  total: number;
  status:
    | "Processing"
    | "Confirmed"
    | "Shipped"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
  date: string;
  shippingAddress: string;
  timeline: OrderEvent[];
}

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "2",
    userName: "User",
    userEmail: "user@luxe.com",
    items: [
      {
        productId: "1",
        name: "Premium Leather Sneakers",
        price: 129,
        quantity: 1,
        image: "/placeholder.svg",
      },
      {
        productId: "3",
        name: "Luxury Wristwatch",
        price: 399,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    total: 528,
    status: "Delivered",
    date: "2026-04-01",
    shippingAddress: "123 Main St, New York, NY 10001",
    timeline: [
      {
        status: "Order Placed",
        date: "2026-04-01 09:00",
        description: "Your order has been placed successfully",
      },
      {
        status: "Confirmed",
        date: "2026-04-01 10:30",
        description: "Order confirmed by seller",
      },
      {
        status: "Shipped",
        date: "2026-04-02 14:00",
        description: "Package handed to courier",
      },
      {
        status: "Out for Delivery",
        date: "2026-04-04 08:00",
        description: "Package is out for delivery",
      },
      {
        status: "Delivered",
        date: "2026-04-04 15:30",
        description: "Package delivered successfully",
      },
    ],
  },
  {
    id: "ORD-002",
    userId: "2",
    userName: "User",
    userEmail: "user@luxe.com",
    items: [
      {
        productId: "2",
        name: "Designer Handbag",
        price: 249,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    total: 249,
    status: "Shipped",
    date: "2026-04-05",
    shippingAddress: "123 Main St, New York, NY 10001",
    timeline: [
      {
        status: "Order Placed",
        date: "2026-04-05 11:00",
        description: "Your order has been placed successfully",
      },
      {
        status: "Confirmed",
        date: "2026-04-05 12:00",
        description: "Order confirmed by seller",
      },
      {
        status: "Shipped",
        date: "2026-04-06 09:00",
        description: "Package handed to FedEx - Tracking: FX123456",
      },
    ],
  },
  {
    id: "ORD-003",
    userId: "2",
    userName: "User",
    userEmail: "user@luxe.com",
    items: [
      {
        productId: "4",
        name: "Classic Denim Jacket",
        price: 89,
        quantity: 2,
        image: "/placeholder.svg",
      },
      {
        productId: "6",
        name: "Silk Pattern Scarf",
        price: 69,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    total: 247,
    status: "Processing",
    date: "2026-04-08",
    shippingAddress: "456 Oak Ave, Brooklyn, NY 11201",
    timeline: [
      {
        status: "Order Placed",
        date: "2026-04-08 16:00",
        description: "Your order has been placed successfully",
      },
    ],
  },
  {
    id: "ORD-004",
    userId: "5",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    items: [
      {
        productId: "9",
        name: "Evening Clutch",
        price: 179,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    total: 179,
    status: "Confirmed",
    date: "2026-04-07",
    shippingAddress: "789 Pine St, Manhattan, NY 10002",
    timeline: [
      {
        status: "Order Placed",
        date: "2026-04-07 13:00",
        description: "Your order has been placed successfully",
      },
      {
        status: "Confirmed",
        date: "2026-04-07 14:30",
        description: "Order confirmed by seller",
      },
    ],
  },
  {
    id: "ORD-005",
    userId: "6",
    userName: "Bob Wilson",
    userEmail: "bob@example.com",
    items: [
      {
        productId: "5",
        name: "Running Shoes Pro",
        price: 159,
        quantity: 1,
        image: "/placeholder.svg",
      },
      {
        productId: "7",
        name: "Italian Leather Belt",
        price: 79,
        quantity: 1,
        image: "/placeholder.svg",
      },
    ],
    total: 238,
    status: "Out for Delivery",
    date: "2026-04-03",
    shippingAddress: "321 Elm Dr, Queens, NY 11375",
    timeline: [
      {
        status: "Order Placed",
        date: "2026-04-03 10:00",
        description: "Your order has been placed successfully",
      },
      {
        status: "Confirmed",
        date: "2026-04-03 11:00",
        description: "Order confirmed by seller",
      },
      {
        status: "Shipped",
        date: "2026-04-04 08:00",
        description: "Package shipped via UPS",
      },
      {
        status: "Out for Delivery",
        date: "2026-04-06 07:30",
        description: "Package is out for delivery today",
      },
    ],
  },
];

export const orderStatusColors: Record<string, string> = {
  Processing: "bg-yellow-500/20 text-yellow-400",
  Confirmed: "bg-blue-500/20 text-blue-400",
  Shipped: "bg-purple-500/20 text-purple-400",
  "Out for Delivery": "bg-orange-500/20 text-orange-400",
  Delivered: "bg-green-500/20 text-green-400",
  Cancelled: "bg-red-500/20 text-red-400",
};
