import React from "react";

export type TabModel = {
    id: number;
    label: string;
    value: string;
    content: React.ReactNode;
};