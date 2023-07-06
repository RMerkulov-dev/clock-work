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

