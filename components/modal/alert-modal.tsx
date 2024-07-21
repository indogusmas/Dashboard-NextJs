'use client';
import React, { useEffect, useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface AlertModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export  const AlertModal: React.FC<AlertModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  const [isMounted,setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  },[]);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
    title={title}
    description={description}
    isOpen={isOpen}
    onClose={onClose}
    >
      <div className='flex w-full items-center justify-end space-x-2 pt-6'>
        <Button onClick={onClose} className="w-48 justify-center">
          OK
        </Button>
      </div>
    </Modal>
  )
}
