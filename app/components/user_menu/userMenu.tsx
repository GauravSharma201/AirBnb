import { Menu, CircleUserRound } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { userMenuBorder } from "@/app/utils/style_vars/plain";

export default function UserMenu() {
  return (
    <div
      className={`flex items-center gap-4 ${userMenuBorder} rounded-[30px] p-2 pl-[14px] cursor-pointer hover:shadow-md`}
    >
      <Menu size={16} />
      <FaUserCircle className="fill-[#6a6a6a]" size={32} />
    </div>
  );
}
