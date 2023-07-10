import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { ModalProps } from "../../../../typing";
import { Button } from "../index";
import { IoMdClose } from "react-icons/io";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  disabled,
  secondaryAction,
  footer,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  // if (!isOpen) {
  //   return null;
  // }

  //FIXME:
  return (
    <Transition
      appear
      show={isOpen || true}
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Dialog.Panel
          className=" container bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg p-4  relative
          w-full
          h-screen
          mx-auto
          my-auto
          flex items-center justify-start flex-col"
        >
          <Dialog.Title className="text-center text-gray-100">
            {title}
          </Dialog.Title>
          <IoMdClose
            size={30}
            className="text-gray-100 absolute right-2 top-2"
            onClick={handleClose}
          />

          <div>{body}</div>

          <Button
            disabled={disabled}
            label={actionLabel}
            onClick={handleSubmit}
          />
          <div>{footer}</div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

export default Modal;
