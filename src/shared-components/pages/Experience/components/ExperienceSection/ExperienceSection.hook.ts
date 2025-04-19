import { useState } from 'react';

export type ModalImage = { url: string; title?: string };

export const useExperienceSection = () => {
  const [modalImage, setModalImage] = useState<ModalImage | null>(null);
  const [pinnedJob, setPinnedJob] = useState<string | null>(null); // Keeping pinnedJob state, though it seems unused in the provided snippet

  const openModal = (image: ModalImage) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return {
    modalImage,
    pinnedJob, // Return pinnedJob state
    openModal,
    closeModal,
    setPinnedJob, // Return setter for pinnedJob
  };
}; 