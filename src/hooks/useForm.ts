import {useState} from 'react';

export const useForm = (initialValues:any, callback:any) => {
    const [inputs, setInputs] = useState(initialValues);
    const handleSubmit = (event:any) => {
        if (event) {
            event.preventDefault();
        }
        callback();
    }
    const handleInputChange = (event:any) => {
        const {name,value} = event.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }
    const toggleElementList = (event:any) => {
        const {name,value} = event.target;
        const objectValue = JSON.parse(value);
        setInputs((p:any)=> {
            return {
                ...p,
                [name]: p[name].includes(objectValue) ? p[name].filter((e:any) => e !== objectValue) : [...p[name], objectValue]
            }
        });
    }
    return {
        handleSubmit,
        handleInputChange,
        toggleElementList,
        ...inputs
    };
}