"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Package, Receipt } from "lucide-react";
import { OrderDetails } from "@/types/payment-type";

type Props = {
  orderDetails: OrderDetails;
};

export const OrderSummary = ({ orderDetails }: Props) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Order #{orderDetails.orderId}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Date</span>
            </div>
            <span className="text-sm">{orderDetails.date}</span>
          </div>
          <Separator />
          {orderDetails.items.map((item, index) => (
            <div key={index} className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="font-medium">{item.name}</p>
              </div>
              <span>{item.price}</span>
            </div>
          ))}
          <Separator />
          <div className="flex items-center justify-between font-medium">
            <span>Total</span>
            <span>{orderDetails.total}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span>Estimated delivery</span>
          </div>
          <span className="font-medium">Digital delivery - Immediate</span>
        </div>
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-muted-foreground" />
            <span>Receipt</span>
          </div>
          <Button variant="link" className="p-0 h-auto">
            View receipt
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
