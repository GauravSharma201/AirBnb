import { Air_bnb_logo } from "@/app/utils/icons/icons";
import Link from "next/link";
import { Globe } from "lucide-react";
import { SearchHeaderHovStyle } from "@/app/utils/style_vars/hover";
import SearchBar from "../searchBar";
import UserMenu from "@/app/components/user_menu/userMenu";

// --> min-w-[772px] change header layout...

export default function Header() {
  return (
    <div>
      <div className="w-full px-10 py-6 flex items-baseline justify-between border-b-[1.6px] border-gray-100">
        <div className="mr-[26px] flex-1 relative top-[13px]">
          <Link href={"/"}>
            <Air_bnb_logo />
          </Link>
        </div>

        <SearchBar />
        <div className="ml-[26px] flex flex-1 items-center font-sans justify-end">
          <div className="flex items-center mr-2">
            <button
              className={`${SearchHeaderHovStyle} font-sans font-medium leading-5 text-sm text-[#222] text-nowrap`}
            >
              Airbnb your home
            </button>
            <div className={SearchHeaderHovStyle}>
              <Globe size={16} />
            </div>
          </div>
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
