"use client";

import { actions } from "@/utils/actions";
import ActionCard from "../ActionCard";

const HomeClient = () => {
  return (
    <div className="min-h-screen w-full px-8 py-16 bg-[#F2FCFA] flex justify-center">
      <div className="max-w-[1280px] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {actions.map((item) => (
            <ActionCard key={item.actionName} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
