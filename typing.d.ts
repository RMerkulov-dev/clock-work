import React from "react";
import {IconType} from "react-icons";
import {FieldErrors, FieldValues} from "react-hook-form";
import {StateCreator} from "zustand";
import {PersistOptions} from "zustand/middleware";

interface ModalStore{
    isOpen:boolean;
    onOpen:()=> void;
    onClose:()=>void;
}

interface LoadingStore{
    isLoading:boolean;
    onLoadingStart:()=> void;
    onLoadingFinish:()=>void;
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

interface LoaderProps{
    label:string
}

interface AuthProps{
    isLogin:boolean;
    onLogin:()=>void;
    onLogout:()=>void;
}
type MyPersist = (
    config: StateCreator<AuthProps>,
    options: PersistOptions<AuthProps>
) => StateCreator<MyState>

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

interface TotalTime {
    totalTime: number;
}

export interface AuthState {
    userId: string | null;
    token: string | null;
    setUserId: (userId: string | null,token:string|null) => void;

}

type Interval={
    _id:string,
    startTime:string,
    endTime:string
    description: string;
}

export interface TimesInterval {
intervals:Interval[]
}

export interface StatisticsProps {
    classname?: string;
    title: string;
    children: React.ReactNode;
}
