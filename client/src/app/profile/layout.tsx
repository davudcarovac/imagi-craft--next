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
    { label: "Overview", icon: "pi pi-home", to: "/profile" },
    { label: "Security", icon: "pi pi-shield", to: "/profile/security" },
    // dodaj još tabova po potrebi
  ];

  // Nađi index aktivnog taba prema URL-u
  const activeIndex = items.findIndex((item) => pathname === item.to);

  return (
    <div>
      <TabMenu
        model={items.map((item) => ({
          label: item.label,
          icon: item.icon,
          command: () => router.push(item.to),
        }))}
        activeIndex={activeIndex}
      />

      <div style={{ marginTop: "1rem" }}>{children}</div>
    </div>
  );
}
