"use client";

import { useEffect, useState } from "react";

import { CreateManufacturerModal } from "@/components/dashboard/modals/create-manufacturer";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateManufacturerModal />
    </>
  );
};

export default ModalProvider;
