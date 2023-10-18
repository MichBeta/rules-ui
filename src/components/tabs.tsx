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
import {TabModel} from "@/models/tab";


export default function TabsComponent({data}: {data: TabModel[]}) {
    const [activeTab, setActiveTab] = useState<TabModel>(data[0]);

    return (
        <Tabs id={"custom-animation"} value={activeTab.value} onChange={setActiveTab}>
            <TabsHeader>
                {data.map((tab) => (
                    <Tab key={`${tab.value}-${tab.id}`} value={tab.value}>
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
                    <TabPanel key={`${tab.value}-${tab.id}`} value={tab.value}>
                        {tab.content}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}
