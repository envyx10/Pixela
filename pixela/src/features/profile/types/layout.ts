import { UserResponse } from "@/api/auth/types";
import { User } from "@/api/users/types";
import { ReactNode } from "react";

/**
 * Props para el componente ContentPanel
 * @interface ContentPanelProps
 */
export interface ContentPanelProps {

    title: string;
    children?: ReactNode;
    isEmpty?: boolean;
    emptyMessage?: string;
    headerAction?: ReactNode;
}

 
/**
 * Props para el componente ProfileInfo
 * @interface ProfileInfoProps
 */
export interface ProfileInfoProps {
    user: UserResponse;
    onEdit: () => void;
    refreshTrigger?: number;
}


/**
 * Props para el componente StarEdit
 * @interface StarEditProps
 */
export interface StarEditProps {
    value: number;
    onChange: (v: number) => void;
    disabled?: boolean;
}

/**
 * Props para el componente ProfileUsers
 * @interface ProfileUsersProps
 */
export interface ProfileUsersProps {
    refresh: boolean;
    onUserUpdated?: (updatedUser: User) => void;
  }