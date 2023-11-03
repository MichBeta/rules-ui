import {
    Card,
    Input,
    Chip,
    Typography,
} from "@material-tailwind/react";
import {useState} from "react";
import {useGetClaimFieldsQuery} from "@/redux/services/claimFieldApi";
import {ClaimField} from "@/models/claimField";

export function Validator() {
    const {data, error, isLoading, isFetching} = useGetClaimFieldsQuery(null)
    const [text, setText] = useState("");
    const [match, setMatch] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isValid = validateExpression(e.target.value, data as ClaimField[]);
        if(isValid) {
            setMatch(`Expression "${e.target.value}" is ${isValid ? 'valid' : 'invalid'}`);
        }
        else {
            setMatch(`Expression "${e.target.value}" is ${isValid ? 'valid' : 'invalid'}`);
        }
    }
    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Validator
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Enter the text to test
            </Typography>
            <div className="mb-4 flex flex-col gap-6">
                <Input size="lg" label="Test text" crossOrigin={undefined} type="text" onChange={handleChange} />
            </div>
            {match ? <Typography color="gray" className="mt-1 font-normal">
                {match}
            </Typography> : null}
        </Card>
    )
}

function validateExpression(expression: string, data: ClaimField[]): boolean {
    try {
        // check if expression contains "]["
        if (expression.indexOf("][") > -1 || expression.indexOf("[]") > -1) {
            return false;
        }
        // extract all the strings between square brackets and save them in an array without the brackets
        const matches = expression.match(/\[(.*?)\]/g)?.map((item) => item.replace(/\[|\]/g, ""));
        if(!matches) {
            return false;
        }
        const matchesWithoutPrefix = matches.map((item) => item.replace("Previous(", "").replace("Original(", "").replace(")", ""));
        // extract all the names from the data array and save them in an array
        const names = data.map((item) => item.name);
        // check if all the names from the expression are in the names array
        const isValid = matchesWithoutPrefix.every((item) => names.includes(item));

        if(!isValid) {
            return false;
        }
        const exp = expression.replace(/\[.*?\]/g, "1");
        eval(exp);
        return true;
    } catch (error) {
        return false;
    }
}