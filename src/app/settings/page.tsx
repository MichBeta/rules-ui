"use client"
import TabsComponent from "@/components/tabs";
import {Rules} from "@/components/rules";
import {Groups} from "@/components/groups";
import {Organizations} from "@/components/organizations";
import React from "react";
import {TabModel} from "@/models/tab";
import {Import} from "@/components/import";

const data: TabModel[] = [
    { id: 1, label: "Rules", value:"rules", content: <Rules /> },
    { id: 2, label: "Groups", value:"groups", content: <Groups /> },
    { id: 3, label: "Organizations", value:"organizations", content: <Organizations /> },
    { id: 4, label: "Imports", value:"imports", content: <Import /> },
];
function Settings() {
    return (
        <TabsComponent data={data}/>
    )
}

export default Settings;