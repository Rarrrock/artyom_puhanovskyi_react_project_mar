import Image from 'next/image';
import Link from "next/link";
import GenreDropDown from "@/components/GenreDropDown";
import SearchInput from "@/components/SearchInput";
import ThemeToggler from "@/components/ThemeToggler";

const Header = () => {
    return (
        <div className="w-full flex items-center justify-between backdrop-blur-2xl transition-colors p-5 bg-[#12121280] gap-4 md:gap-0 sticky z-50 top-0">
            {/* Logo */}
            <Link href={"/"}>
                <Image
                    src="/images/logo.jpg"
                    alt="Logo"
                    width={120}
                    height={100}
                    priority={true}
                    className="cursor-pointer w-40 h-auto"
                />
            </Link>
            {/* Others */}
            <div className="text-white flex space-x-2 items-center">
                {/* Genre */}
                <GenreDropDown />
                {/* Search */}
                <SearchInput />
                {/* Theme */}
                <ThemeToggler />
            </div>
        </div>
    );
};

export default Header;