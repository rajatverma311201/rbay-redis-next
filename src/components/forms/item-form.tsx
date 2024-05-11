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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { createItemAction } from "@/actions/items";
import { toast } from "sonner";
const FormSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    description: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    duration: z.string(),
});

interface ItemFormProps {}

export const ItemForm: React.FC<ItemFormProps> = ({}) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "Chair",
            description: "This is a fantastic chair that you would love",
            duration: "60",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        // console.log(data);
        toast.loading("Creating Item...");
        try {
            const itemId = await createItemAction(data);

            toast.dismiss();
            toast.success("Item created successfully");
            router.push(`/items/${itemId}`);
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to create item");
        }
    }
    return (
        <div className="grid place-items-center px-2 py-10 md:py-20">
            <Card className="mx-auto w-full sm:w-auto">
                <CardHeader>
                    <CardTitle>Create a new Item</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full space-y-6 sm:min-w-96"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter item name"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter the item description"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value.toString()}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Duration" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={`${60}`}>
                                                    One Minute
                                                </SelectItem>
                                                <SelectItem
                                                    value={`${60 * 10}`}
                                                >
                                                    Ten Minutes
                                                </SelectItem>
                                                <SelectItem
                                                    value={`${24 * 60 * 60}`}
                                                >
                                                    One Day
                                                </SelectItem>
                                                <SelectItem
                                                    value={`${7 * 24 * 60 * 60}`}
                                                >
                                                    One Week
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full text-white disabled:cursor-not-allowed disabled:opacity-75"
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
                                    "Create Item"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter />
            </Card>
        </div>
    );
};
