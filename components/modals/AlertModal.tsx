import React, { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  onCancel?(): void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  onCancel,
}) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <Modal
        title="Are you sure"
        description="This action casnnot be undone"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          {" "}
          <Button disabled={loading} variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AlertModal;
