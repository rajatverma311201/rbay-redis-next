"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { signin, signup } from "@/actions/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createBidAction } from "@/actions/items";

const FormSchema = z.object({
    amount: z.union([z.string(), z.number()]),
});

interface PlaceBidProps {
    itemId: string;
    itemPrice: number;
    itemEndingAt: number;
}

export const PlaceBid: React.FC<PlaceBidProps> = ({
    itemId,
    itemEndingAt,
    itemPrice,
}) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            amount: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        toast.loading("Please Wait...");

        const { amount } = data;
        let amt: number;

        if (typeof amount === "string") {
            amt = parseFloat(amount);
            if (isNaN(amt)) {
                toast.error("Please enter a valid number");
                return;
            }
        } else {
            amt = amount;
        }

        if (amt < itemPrice + 0.01) {
            toast.error("Bid amount must be greater than current price");
            return;
        }

        try {
            const success = await createBidAction(itemId, amt, itemEndingAt);

            if (success) {
                toast.dismiss();
                toast.success("Bid placed successfully");
                router.refresh();
            }
        } catch (error: any) {
            toast.dismiss();
            toast.error(error.message);
        } finally {
            form.reset();
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Place Bid</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bid Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={`$${(itemPrice + 0.01).toFixed(2)} minimum`}
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full disabled:cursor-not-allowed disabled:opacity-75"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2
                                        className="mr-5 animate-spin text-primary-foreground"
                                        // size={18}
                                    />{" "}
                                    Please Wait
                                </>
                            ) : (
                                "Place Bid"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter />
        </Card>
    );
};
