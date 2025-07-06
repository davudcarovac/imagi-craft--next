import { TieredMenu } from "primereact/tieredmenu";
import { MenuItem } from "primereact/menuitem";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuthContext";
import defaultProfileImage from "@/assets/button images/user.png";
import Image from "next/image";
import { useLogout } from "@/hooks/useLogout";
import { Toast } from "primereact/toast";
import { useGetUser } from "@/hooks/useGetUser";

const UserMenu = () => {
  const menuRef = useRef<TieredMenu | null>(null);
  // const toast = useRef<Toast>(null);
  const router = useRouter();
  const { dispatch, user: localUser } = useAuthContext();
  const { user } = useGetUser();
  const { mutate } = useLogout();
  const [profileImage, setProfileImg] = useState(
    user?.profileImage || defaultProfileImage
  );

  useEffect(() => {
    if (user) {
      setProfileImg(user.profileImage || defaultProfileImage);
    } else {
      setProfileImg(defaultProfileImage);
    }
  }, [user]);

  const logout = () => {
    mutate(undefined, {
      onSuccess: (response) => {
        dispatch({ type: "LOGOUT" });
        console.log(response);
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
        }
        router.push("/login");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const items: MenuItem[] = [
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => router.push("/profile"),
      template: (item, options) => (
        <div
          onClick={options.onClick}
          className="flex items-center justify-between px-4 py-2 hover:bg-[#f9f9f9] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <i className={`${item.icon} `} />
            <span className="font-medium text-sm">{item.label}</span>
          </div>
        </div>
      ),
    },
    {
      label: "Services",
      icon: "pi pi-cog",
      command: () => router.push("/"),
      template: (item, options) => (
        <div
          onClick={options.onClick}
          className="flex items-center justify-between px-4 py-2 hover:bg-[#f9f9f9] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <i className={`${item.icon} `} />
            <span className="font-medium text-sm">{item.label}</span>
          </div>
        </div>
      ),
    },
    {
      label: "Premium",
      icon: "pi pi-crown",
      template: (item, options) => (
        <div
          onClick={options.onClick}
          className="flex items-center justify-between px-4 py-2 hover:bg-[#f9f9f9] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <i className={`${item.icon} text-yellow-500`} />
            <span className="font-medium text-sm">{item.label}</span>
          </div>
          <span className="text-xs text-[#888] italic">PRO</span>
        </div>
      ),
    },
    {
      separator: true,
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => logout(),
      template: (item, options) => (
        <div
          onClick={options.onClick}
          className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
        >
          <i className={`${item.icon}`} />
          <span className="text-sm font-medium">{item.label}</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <Toast />
      <TieredMenu
        model={items}
        popup
        ref={menuRef}
        className="w-52 rounded-lg shadow-lg border border-gray-200"
      />
      <button
        onClick={(e) => menuRef.current?.toggle(e)}
        aria-haspopup
        aria-controls="tiered_menu"
        className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-[#1aac83]/10 text-[#1aac83] hover:bg-[#1aac83]/20 transition"
      >
        {/* <i className="pi pi-user text-xl" /> */}
        <div
          className="cursor-pointer flex items-center justify-center rounded-full overflow-hidden w-10 h-10 relative
           "
        >
          <Image
            src={profileImage}
            alt="profile-img"
            fill
            className="object-cover w-full h-full"
            unoptimized
            priority
          />
        </div>
      </button>
    </>
  );
};

export default UserMenu;
