"use client";

import { pricingPlans } from "@/utils/plans";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import React, { useState } from "react";
import PricingCard from "./components/PricingCard";
import { useAuthContext } from "@/hooks/useAuthContext";

const PricingClient = () => {
  const options: string[] = ["Monthly", "Yearly"];
  const [value, setValue] = useState<string>(options[0]);

  const { user } = useAuthContext();

  const userPlan = user?.plan;
  const userPlanPrice = pricingPlans.find(
    (item) => item.name.toLowerCase() === userPlan?.toLowerCase()
  )?.price;

  return (
    <div className="w-full flex justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      <div className="w-full max-w-[1170px] bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-start justify-between">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-[#1aac83] saira-font">
              Our suitable packages
            </h2>
            <p className="text-gray-500 my-2">
              Your plan expires in -- (under development)
            </p>
          </div>

          <div>
            <SelectButton
              value={value}
              onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
              options={options}
            />
          </div>
        </div>

        {/* Cards */}
        <div>
          {" "}
          <div className="flex flex-wrap justify-center gap-6 p-4">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                userPlan={userPlan}
                userPlanPrice={userPlanPrice}
                plan={plan}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingClient;
