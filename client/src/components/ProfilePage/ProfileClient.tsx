"use client";

import { useGeo } from "@/hooks/useGeo";
import React, { useEffect } from "react";
import EditableInput from "./components/EditableInput";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/useGetUser";
import { formatDate } from "@/utils/formatDate";

const ProfileClient = () => {
  const { data, isPending, error } = useGeo();
  const { user, isPending: isPendingUser } = useGetUser();
  const router = useRouter();
  const { dispatch } = useAuthContext();
  const formattedDate = formatDate(user?.createdAt);
  const plan = user?.isPremium ? "Premium" : "Basic";
  const premiumExpires = user?.premiumExpires
    ? formatDate(user.premiumExpires)
    : "--";

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    router.push("/login");
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <div className="pt-2 pb-10 flex gap-4 xs:gap-0flex-col xs:items-center justify-between xs:flex-row  ">
        <div>
          <h2 className="text-[#1aac83] saira-font text-3xl font-semibold ">
            Profile
          </h2>
          <p className="text-gray-500 text-sm">
            You can change the profile name by clicking on it
          </p>
        </div>
        <button className="bg-[#ffb400] hover:bg-[#e6a200] text-black px-4 py-2 cursor-pointer flex items-center gap-2 font-semibold saira-font rounded-md transition">
          <i className="pi pi-crown"></i>
          Upgrade plan
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <EditableInput
          initialValue={user?.name}
          labelName="Name"
          editable={true}
          isLoading={isPendingUser}
        />
        <EditableInput
          initialValue={user?.email}
          labelName="Email"
          isLoading={isPendingUser}
        />
        <EditableInput
          initialValue={data?.country}
          isLoading={isPending}
          labelName="Country"
        />
        <EditableInput
          initialValue={data?.city}
          isLoading={isPending}
          labelName="City"
        />
        <EditableInput
          initialValue={formattedDate}
          labelName="Created"
          isLoading={isPendingUser}
        />
        <EditableInput
          initialValue={plan}
          labelName="Plan"
          isLoading={isPendingUser}
        />
        <EditableInput
          initialValue={premiumExpires}
          labelName="Premium expires"
          isLoading={isPendingUser}
        />
      </div>
      <div className="w-full pt-6 pb-3 ">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-500 cursor-pointer rounded-md font-semibold saira-font"
        >
          <i className="pi pi-sign-out" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileClient;
