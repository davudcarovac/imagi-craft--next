"use client";

import { actions } from "@/utils/actions";
import ActionCard from "../ActionCard";

const HomeClient = () => {
  return (
    <div className="h-screen w-full px-8">
      <div className="max-w-[1280px]  mx-auto pt-[100px]  ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {actions.map((item) => (
            <ActionCard key={item.actionName} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
