"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    input: z.string().min(2).max(30),
});

const SearchInput = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        router.push(`/search/${values.input}`);
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="text-black space-y-1"
            >
                <FormField
                    control={form.control}
                    name="input"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                {/* Здесь добавляем классы text-black и dark:text-white */}
                                <Input
                                    placeholder="Search ..."
                                    {...field}
                                    className="text-black dark:text-white"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default SearchInput;
