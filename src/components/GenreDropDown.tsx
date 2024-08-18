"use client"; // Добавляем эту строку

import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Genres } from "../modules/type";

const GenreDropDown = () => {
    const [genres, setGenres] = useState<Genres | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            const url = "https://api.themoviedb.org/3/genre/movie/list?language=en-US";
            const options: RequestInit = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_KEY}`,
                },
                };

            try {
                    console.log("Fetching genres from API...");
                    const response = await fetch(url, options);

                    console.log("API response status:", response.status);
                    if (!response.ok) {
                console.error("Failed to fetch genres, status:", response.status);
                throw new Error("Failed to fetch genres");
            }

            const data = (await response.json()) as Genres;
            console.log("Genres data:", data);
            setGenres(data);
        } catch (error) {
                console.error("Error loading genres:", error);
                setError("Error loading genres");
            }
        };

            fetchGenres();
        }, []);

        if (error) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger className="text-white flex items-center text-sm font-medium">
                        Genre <ChevronDown className="ml-1" size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{error}</DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }

        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="text-white flex items-center text-sm font-medium">
                    Genre <ChevronDown className="ml-1" size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {genres?.genres?.map((genre) => (
                        <DropdownMenuItem key={genre?.id}>
                            <Link href={`/genre/${genre?.id}?genre=${genre?.name}`}>
                                {genre?.name}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    export default GenreDropDown;
