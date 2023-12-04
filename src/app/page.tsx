"use client";
import {AxnWorklist} from "@/components/axnWorklist";
import {ComplianceWorklist} from "@/components/complianceWorklist";
import {Predicate} from "@/components/test/predicate";
import {ClaimFields} from "@/components/test/claimField";
import {Enumerations} from "@/components/test/enumeration";
import {Validator} from "@/components/test/validator";
import {Parts} from "@/components/test/part";
import React from "react";
import TabsComponent from "@/components/tabs";

const data = [
  { id: 1, label: "AXN", value:"axn", content: <AxnWorklist /> },
  { id: 2, label: "Compliance", value:"compliance", content: <ComplianceWorklist /> },
]

function HomePage() {
  return (
      <TabsComponent data={data}/>
  )
}

export default HomePage;