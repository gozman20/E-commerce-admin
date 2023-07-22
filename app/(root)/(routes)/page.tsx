"use client";
import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/useStoreModal";
import React, { useEffect } from "react";

const SetUpPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
};

export default SetUpPage;
