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
import { Genres } from "@/type";

const genreArray = [
    { id: 100, name: "Action" },
    { id: 101, name: "Animation" },
];

const GenreDropDown = async () => {
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en-US";
    const options: RequestInit = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_KEY}`,
        },
        next: {
            revalidate: 60 * 60 * 24,
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

        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="text-white flex items-center text-sm font-medium">
                    Genre <ChevronDown className="ml-1" size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {data?.genres?.map((genre) => (
                        <DropdownMenuItem key={genre?.id}>
                            <Link href={`/genre/${genre?.id}?genre=${genre?.name}`}>
                                {genre?.name}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    } catch (error) {
        console.error("Error loading genres:", error);
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="text-white flex items-center text-sm font-medium">
                    Genre <ChevronDown className="ml-1" size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Error loading genres</DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
};

export default GenreDropDown;
