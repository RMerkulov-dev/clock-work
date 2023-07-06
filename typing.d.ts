import React from "react";
import {IconType} from "react-icons";

interface ModalStore{
    isOpen:boolean;
    onOpen:()=> void;
    onClose:()=>void;
}

interface ButtonProps{
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

interface ModalProps{
    isOpen?:boolean;
    onClose:()=>void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

