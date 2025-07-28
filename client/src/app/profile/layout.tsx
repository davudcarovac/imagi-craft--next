"use client";

import { TabMenu } from "primereact/tabmenu";
import { usePathname, useRouter } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    { label: "Overview", icon: "pi pi-user", to: "/profile/overview" },
    { label: "Security", icon: "pi pi-lock", to: "/profile/security" },
  ];

  // Nađi index aktivnog taba prema URL-u
  const activeIndex = items.findIndex((item) => pathname === item.to);

  return (
    <div className="h-80vh px-5 ">
      <TabMenu
        model={items.map((item) => ({
          label: item.label,
          icon: item.icon,
          command: () => router.push(item.to),
        }))}
        activeIndex={activeIndex}
        className="max-w-[800px] mx-auto mt-10 rounded-t-md "
      />

      <div className="max-w-[800px] mx-auto mt-2 mb-10 bg-white p-5 rounded-md">
        {children}
      </div>
    </div>
  );
}
