import { PricingPlan } from "@/types/types";
import { Check } from "lucide-react";
import { Button } from "primereact/button";

const PricingCard = ({ plan }: { plan: PricingPlan }) => (
  <div className="shadow-xl bg-white rounded-2xl p-8 border-t-3 border-[#1aac83]">
    {" "}
    <h5 className="saira-font text-[#1aac83] font-semibold">{plan.name}</h5>
    {/* <p>{plan.description}</p> */}
    <div className=" my-3 pb-5 border-b border-solid border-gray-200">
      <p className="flex items-center gap-2  saira-font">
        <span className="text-4xl text-black font-bold">${plan.price}</span> /
        Month
      </p>
    </div>
    <ul className="my-4 flex flex-col gap-3">
      {plan.features.map((feature, i) => (
        <li key={i} className="flex items-start gap-2 ">
          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-sm">{feature.text}</span>
        </li>
      ))}
    </ul>
    <div className="w-full flex items-center justify-center my-3">
      <button className="w-full text-white bg-[#1aac83] rounded-3xl py-2 px-4 font-semibold saira-font">
        Subscribe
      </button>
    </div>
  </div>
);

export default PricingCard;
