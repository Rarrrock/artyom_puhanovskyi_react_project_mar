import {getDiscoverMovies} from "@/lib/getMovies";
import HeroCarousel from "@/components/HeroCarosel";

interface Props {
    id?: string;
    keywords?: string;
}

const CaroselBanner = async ({ id, keywords }: Props) => {
    const movies = await getDiscoverMovies(id, keywords);

    return <HeroCarousel movies={movies} />;
};

export default CaroselBanner;