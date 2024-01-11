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


export default function TabsComponent({ data, setAccordionOpen }: { data: TabModel[], setAccordionOpen: (value: number) => void }) {
    const [activeTab, setActiveTab] = useState<TabModel | undefined>(data?.[0]);

    if (!data || data.length === 0) {
        return null; // or return some default component or message for empty data
    }

    return (
        <Tabs
            id={"custom-animation"}
            value={activeTab?.value}
            onChange={(newValue: number | string) => {
                setActiveTab(data.find((tab) => tab.value === newValue))
                setAccordionOpen(0)
            }
            }
            className={"grid"}
        >
            <TabsHeader>
                {data.map((tab) => (
                    <Tab key={`${tab.value}-${tab.id}`} value={tab.value} onClick={() => {tab.id==1?setAccordionOpen(1):setAccordionOpen(3)}}>
                        {tab.label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody
                animate={{
                    initial: { y: 250 },
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

