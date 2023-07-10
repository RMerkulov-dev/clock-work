import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { ModalProps } from "../../../../typing";
import { IoMdClose } from "react-icons/io";
import { Button } from "../index";

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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto bg-custom-500">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <IoMdClose
                  size={30}
                  className="text-gray-500 absolute right-2 top-2 cursor-pointer"
                  onClick={handleClose}
                />
                <div className="mt-2">{body}</div>

                <div className="mt-4">
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                <div className="mt-4 text-center">{footer}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

// <Transition
//     appear
//     show={isOpen || true}
//     as={Fragment}
//     enter="transition duration-100 ease-out"
//     enterFrom="transform scale-95 opacity-0"
//     enterTo="transform scale-100 opacity-100"
//     leave="transition duration-75 ease-out"
//     leaveFrom="transform scale-100 opacity-100"
//     leaveTo="transform scale-95 opacity-0"
// >
//   <Dialog as="div" className="relative z-10" onClose={() => {}}>
//     <Dialog.Panel
//         className=" container bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg p-4  relative
//           w-full
//           h-screen
//           mx-auto
//           my-auto
//           flex items-center justify-start flex-col"
//     >
//       <Dialog.Title className="text-center text-gray-100">
//         {title}
//       </Dialog.Title>
//       <IoMdClose
//           size={30}
//           className="text-gray-100 absolute right-2 top-2"
//           onClick={handleClose}
//       />
//
//       <div>{body}</div>
//
//       <Button
//           disabled={disabled}
//           label={actionLabel}
//           onClick={handleSubmit}
//       />
//       <div>{footer}</div>
//     </Dialog.Panel>
//   </Dialog>
// </Transition>
