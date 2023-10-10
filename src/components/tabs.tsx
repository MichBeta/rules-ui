"use client"
import React, { useState } from "react";
import {Rules} from "@/components/rules";
import {Groups} from "@/components/groups";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

type Tab = {
    id: number;
    label: string;
    value: string;
    content: React.ReactNode;
};

const data: Tab[] = [
    { id: 1, label: "Rules", value:"rules", content: <Rules /> },
    { id: 2, label: "Groups", value:"groups", content: <Groups /> },
    { id: 3, label: "Organizations", value:"organizations", content: "Tab 3 content" },
    { id: 4, label: "Imports", value:"imports", content: "Tab 3 content" },
];

export default function TabsComponent() {
    const [activeTab, setActiveTab] = useState<Tab>(data[0]);

    return (
        <Tabs id={"custom-animation"} value={activeTab.value} onChange={setActiveTab}>
            <TabsHeader>
                {data.map((tab) => (
                    <Tab key={tab.id} value={tab.value}>
                        {tab.label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody
                animate={{
                    initial:{ y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                }}
                >
                {data.map((tab) => (
                    <TabPanel key={tab.id} value={tab.value}>
                        {tab.content}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}
