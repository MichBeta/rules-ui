"use client"
import React, { useState } from "react";
import {TabModel} from "@/models/tab";


export default function TabsComponent({ data, setAccordionOpen }: { data: TabModel[], setAccordionOpen?: (value: number) => void }) {
    const [activeTab, setActiveTab] = useState<string>(data[0].value);

    if (!data || data.length === 0) {
        return null; // or return some default component or message for empty data
    }

    return (
        <>
            <div
                className={"grid"}
            >
                <div >
                    {data.map(tab => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 text-sm font-semibold text-gray-600 ${activeTab === tab.value ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                            onClick={() => setActiveTab(tab.value)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div >
                <div>
                    {data.map(tab => (
                        activeTab === tab.value ? <div key={tab.id}>{tab.content}</div> : null
                    ))}
                </div >
            </div >
        </>
    );
}

