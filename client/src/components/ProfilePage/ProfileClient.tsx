"use client";

import { useGeo } from "@/hooks/useGeo";
import React from "react";

const ProfileClient = () => {
  const { data, isPending, error } = useGeo();

  if (isPending) return <p>Loading...</p>;

  if (error) {
    console.log(error);
    return <p>Error</p>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default ProfileClient;
