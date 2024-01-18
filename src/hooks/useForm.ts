import {useState,useEffect} from 'react';

const defaultCallback = () => {};
const isJSON = (str:string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
export const useForm = (initialValues:any, callback:any = defaultCallback) => {
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
    const toggleElementList = (e:any) => {
        let {name,value} = e.target;
        value = typeof value === 'string' && isJSON(value) ? JSON.parse(value) : value;
        setInputs((p:any)=> {
            return {
                ...p,
                [name]: p[name].includes(value) ? p[name].filter((e:any) => e !== value) : [...p[name], value]
            }
        });
    }
    const removeElementList = (e:any) => {
        let {name,value} = e.target? e.target : e;
        value = typeof value === 'string' && isJSON(value) ? JSON.parse(value) : value;
        console.log("removeElementList",name,value)
        setInputs((p:any)=> {
            return {
                ...p,
                [name]: p[name].filter((e:any) => e !== value)
            }
        });
    }
    const removeElementListByIndex = (e:any,index:number) => {
        let {name,value} = e.target? e.target : e;
        value = typeof value === 'string' && isJSON(value) ? JSON.parse(value) : value;
        console.log("removeElementList",name,value)
        setInputs((p:any)=> {
            return {
                ...p,
                [name]: p[name].filter((e:any,i:number) => i !== index)
            }
        });
    }
    const removeElementListById = (e:any,customID:string="id") => {
        let {name,value} = e.target? e.target : e;
        value = typeof value === 'string' && isJSON(value) ? JSON.parse(value) : value;
        console.log("removeElementList",name,value)
        setInputs((p:any)=> {
            return {
                ...p,
                [name]: p[name].filter((e:any) => e[customID] !== value[customID])
            }
        });
    }
    const addElementList = (e:any) => {
        let {name,value} = e.target? e.target : e;
        value = typeof value === 'string' && isJSON(value) ? JSON.parse(value) : value;
        console.log("addElementList",name,value)
        setInputs((p:any)=> {
            return {
                ...p,
                [name]: [...p[name], value]
            }
        });
    }
    useEffect(()=>{
        console.log("state",inputs)
    },[inputs])
    return {
        handleSubmit,
        handleInputChange,
        addElementList,
        removeElementList,
        removeElementListByIndex,
        removeElementListById,
        toggleElementList,
        ...inputs
    };
}