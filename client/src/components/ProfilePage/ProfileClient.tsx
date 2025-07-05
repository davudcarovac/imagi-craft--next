"use client";

import Image from "next/image";
import { useGeo } from "@/hooks/useGeo";
import React, { useEffect, useRef, useState } from "react";
import EditableInput from "./components/EditableInput";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/useGetUser";
import { formatDate } from "@/utils/formatDate";
import userImg from "@/assets/button images/user.png";
import { useUploadProfileImage } from "@/hooks/useUploadProfileImage";

const ProfileClient = () => {
  const { data, isPending, error } = useGeo();
  const { user, isPending: isPendingUser } = useGetUser();
  const { mutate } = useUploadProfileImage();
  const router = useRouter();
  const { dispatch } = useAuthContext();
  const formattedDate = formatDate(user?.createdAt);
  const plan = user?.isPremium ? "Premium" : "Basic";
  const premiumExpires = user?.premiumExpires
    ? formatDate(user.premiumExpires)
    : "--";

  const [file, setFile] = useState<File | null>(null);
  const [profileImg, setProfileImg] = useState(user?.profileImage || userImg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Klik na sliku otvara file picker
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Kada se izabere fajl, setuj fajl i prikaz preview slike,
  // odmah triggeruj upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Prikaz preview slike
      const imageUrl = URL.createObjectURL(selectedFile);
      setProfileImg(imageUrl);

      // Napravi formData i uploaduj odmah
      const formData = new FormData();
      formData.append("file", selectedFile);

      mutate(formData, {
        onSuccess: (response) => {
          console.log("Upload image response ===> ", response);
          // Poželjno je da posle uspešnog uploada ažuriraš profileImg sa URL-om sa servera,
          // ako server vraća novi URL:
          if (response?.profileImageUrl) {
            setProfileImg(response.profileImageUrl);
          }
        },
        onError: (error) => {
          console.log("Upload image error ===> ", error);
        },
      });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    router.push("/login");
  };

  useEffect(() => {
    if (user?.profileImage) {
      setProfileImg(user.profileImage);
    } else {
      setProfileImg(userImg);
    }
  }, [user]);

  return (
    <div>
      <div className="pt-2 pb-6 sm:pb-10 flex gap-4 flex-col sm:items-center justify-between sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <div
              onClick={handleImageClick}
              className="cursor-pointer rounded-full overflow-hidden w-24 h-24 border-4 border-[#1aac83]"
              title="Click to change profile image"
            >
              <Image
                src={profileImg}
                alt="profile-img"
                width={96}
                height={96}
                className="object-cover"
                unoptimized
              />
            </div>

            <div>
              <h2 className="text-[#1aac83] saira-font text-3xl font-semibold">
                Profile
              </h2>
              <p className="text-gray-500 text-sm">
                You can change the profile picture by clicking on it
              </p>
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
