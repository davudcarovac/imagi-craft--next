"use client";

import Image from "next/image";
import { useGeo } from "@/hooks/useGeo";
import React, { useEffect, useRef, useState } from "react";
import EditableInput from "./components/EditableInput";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/useGetUser";
import { formatDate } from "@/utils/formatDate";
import defaultProfileImage from "@/assets/button images/user.png";
import { useUploadProfileImage } from "@/hooks/useUploadProfileImage";
import { StaticImageData } from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Tag } from "primereact/tag";
import { useLogout } from "@/hooks/useLogout";
import loadingUserImg from "@/assets/button images/delete.png";

const ProfileClient = () => {
  const { data, isPending } = useGeo();
  const { user, isPending: isPendingUser } = useGetUser();
  const { mutate } = useUploadProfileImage();
  const router = useRouter();
  const { mutate: logoutMutate } = useLogout();

  const { dispatch } = useAuthContext();
  const formattedDate = user?.createdAt ? formatDate(user.createdAt) : "--";
  const plan = user?.isPremium ? "Premium" : "Basic";
  const premiumExpires = user?.premiumExpires
    ? formatDate(user.premiumExpires)
    : "--";

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [profileImg, setProfileImg] = useState<string | StaticImageData>(
    user?.profileImage || defaultProfileImage
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user?.profileImage) {
      setProfileImg(user.profileImage);
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);

      mutate(formData, {
        onSuccess: (response) => {
          console.log("Profile image upload ", response);
          if (response?.imageUrl) {
            setProfileImg(response.imageUrl);
            queryClient.invalidateQueries({ queryKey: ["user"] });
            dispatch({
              type: "UPDATE_PROFILE_IMAGE",
              payload: response.imageUrl,
            });
          }
        },
        onError: (error: Error) => {
          console.error("Upload failed:", error);
        },
      });
    }
  };

  const logout = () => {
    logoutMutate(undefined, {
      onSuccess: (response) => {
        dispatch({ type: "LOGOUT" });
        console.log(response);
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
        }
        queryClient.cancelQueries({ queryKey: ["user"] });
        queryClient.removeQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["user"] });

        router.push("/login");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div>
      <div className="pt-2 pb-6 sm:pb-10 flex gap-4 flex-col sm:items-center justify-between sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <div
              onClick={handleImageClick}
              className="cursor-pointer flex items-center justify-center rounded-full overflow-hidden w-24 h-24 relative
             border border-gray-200 ring-2 ring-white ring-offset-2 ring-offset-gray-100 hover:ring-blue-300 transition-all duration-300"
              title="Click to change profile image"
            >
              <Image
                src={profileImg}
                alt="profile-img"
                fill
                className="object-cover w-full h-full"
                unoptimized
                loading="eager"
                priority
              />
            </div>

            <div>
              <h2 className="text-[#1aac83] saira-font text-3xl font-semibold">
                Profile
              </h2>
              <p className="text-gray-500 text-sm">
                You can change the profile picture by clicking on it
              </p>
              {user?.profileImage && (
                // <Tag
                //   severity="danger"
                //   value="remove avatar"
                //   rounded
                //   className="p-1 my-2 cursor-pointer"
                // ></Tag>

                <button className="cursor-pointer">
                  <p className="   text-red-600 font-semibold text-sm">
                    remove profile image
                  </p>
                </button>
              )}{" "}
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button className="bg-[#ffb400] hover:bg-[#e6a200] text-black px-4 py-2 cursor-pointer flex items-center gap-2 font-semibold saira-font rounded-md w-fit transition">
          <i className="pi pi-crown"></i>
          Upgrade plan
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <EditableInput
          initialValue={user?.name || ""}
          labelName="Name"
          editable={true}
          isLoading={isPendingUser}
        />
        <EditableInput
          initialValue={user?.email || ""}
          labelName="Email"
          isLoading={isPendingUser}
        />
        <EditableInput
          initialValue={data?.country || ""}
          isLoading={isPending}
          labelName="Country"
        />
        <EditableInput
          initialValue={data?.city || ""}
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

      <div className="w-full pt-6 pb-3">
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
