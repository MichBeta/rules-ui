export interface FieldValue {
    name: string;
    code: string;
}

export interface CompareOperator {
    name: string;
    code: string;
}

export interface Field {
    values: FieldValue[];
    name: string;
    compareOperators: CompareOperator[];
    code: string;
    type: string;
}

export interface MetaData {
    name: string;
    code: string;
    fields: Field[];
}