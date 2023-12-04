import {useGetAxnReportTypesQuery} from "@/redux/services/axnReportTypesApi";
import {useState} from "react";
import {useGetAxnReportVersionsQuery} from "@/redux/services/axnReportVersionsApi";
import {useAxnReportDownloaderQuery} from "@/redux/services/axnReportDownloaderApi";


export function AxnClaimViewer() {
    const [claimNumber, setClaimNumber] = useState("");
    const [workItemPK, setWorkItemPK] = useState(0);
    const [reportVersion, setReportVersion] = useState("");
    const {data, error, isLoading, isFetching} = useGetAxnReportTypesQuery(claimNumber)
    const versions = useGetAxnReportVersionsQuery(workItemPK)
    const reportDownloader = useAxnReportDownloaderQuery({workItemPK, reportVersion})
    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setClaimNumber(e.currentTarget.claimNumber.value);
    }
    return (
        <>
            <div className={"overflow-auto"}>
                <form className={"flex flex-col space-y-4"} onSubmit={formSubmitHandler}>
                    <input type="text" placeholder={"Claim Number"}
                           className={"border-2 border-gray-300 rounded-md p-2"} name={"claimNumber"}/>
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Submit
                    </button>
                </form>
            </div>
            {data ?
                data.map((item, index) => (
                    <div key={index} onClick={() => setWorkItemPK(item.WORK_ITEM_PK)}
                         className={"transition ease-in-out bg-white hover:-translate-y-1 hover:scale-110 hover:bg-blue-900 hover:text-white duration-300"}>
                        <div className={"overflow-auto"}>
                            <div className={"flex flex-col space-y-4"}>
                                <div className={"flex flex-row space-x-4"}>
                                    <div className={"font-bold text-center"}>Work Item:</div>
                                    <div>{item.WORK_ITEM_PK}</div>
                                </div>
                                <div className={"flex flex-row space-x-4"}>
                                    <div className={"font-bold text-center"}>Claim Type:</div>
                                    <div>{item.ITEM_TYPE}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                : null}
            {versions.data && workItemPK ?
                versions.data.map((item, index) => (
                    <div key={index} onClick={() => setReportVersion(item)}
                         className={"transition ease-in-out bg-white hover:-translate-y-1 hover:scale-110 hover:bg-[rgb(50,37,94)] hover:text-white duration-300"}>
                        <div className={"overflow-auto"}>
                            <div className={"flex flex-col space-y-4"}>
                                <div className={"flex flex-row space-x-4"}>
                                    <div className={"font-bold text-center"}>Work Item:</div>
                                    <div>{workItemPK}</div>
                                </div>
                                <div className={"flex flex-row space-x-4"}>
                                    <div className={"font-bold text-center"}>Claim Type:</div>
                                    <div>{item}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                : null}
            {reportDownloader.data && reportVersion && workItemPK ?
                <div className={"overflow-auto"}>
                    <div className={"flex flex-col space-y-4"}>
                        <div className={"flex flex-row space-x-4"}>
                            <div className={"font-bold text-center"}>Work Item:</div>
                            <div>{workItemPK}</div>
                        </div>
                        <div className={"flex flex-row space-x-4"}>
                            <div className={"font-bold text-center"}>Claim Type:</div>
                            <div>{reportVersion}</div>
                        </div>
                        <div className={"flex flex-row space-x-4"}>
                            <div className={"font-bold text-center"}>Report:</div>
                            <div>{reportDownloader.data}</div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}