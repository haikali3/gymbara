"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Header from "@/components/_layout/header";
import Footer from "@/components/_layout/footer";
import { ArrowRight, CheckCircle, Home, Package, Receipt } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { OrderDetails } from "@/app/types/payment-type";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isVerifying, setIsVerifying] = useState(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  // https://chatgpt.com/c/67e67ab5-f284-8009-8304-a6c492b289d7

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        toast({
          title: "Missing session ID",
          description: "Could not verify your payment.",
          variant: "destructive",
        });
        setIsVerifying(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/verify-session?session_id=${sessionId}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          const message = await res.text();
          throw new Error(message);
        }

        const data = await res.json();
        setOrderDetails(data);

        toast({
          title: "Payment successful",
          description: "Welcome to Gymbara Premium!",
        });
      } catch (error: any) {
        toast({
          title: "Payment verification failed",
          description: error?.message || "Something went wrong.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifySession();
  }, [sessionId]);

  console.log(orderDetails);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="gymbara" />

      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-3xl py-10 px-4 md:py-16">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground mt-2">
              Thank you for your purchase. Your payment has been processed
              successfully.
            </p>
          </div>

          {orderDetails && (
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
                    <div
                      key={index}
                      className="flex items-start justify-between"
                    >
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
                  <span className="font-medium">
                    Digital delivery - Immediate
                  </span>
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
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild className="gap-2 w-full">
              <Link href="/workouts">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild className="gap-2 w-full">
              <Link href="/">
                Start Working Out
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
