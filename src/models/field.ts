interface ParameterType {
    GUID : string,
    ParameterType : string,
    Discriminator : string,
    Enumeration : string,
    CalculateVariance : boolean,
}

 interface Field {
    name: string;
    category: string;
    type: ParameterType;
    xpath?: string;
    canCalculateVariance?:boolean;

}
