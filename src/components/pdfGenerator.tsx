import React from 'react';
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import PDFGeneratorProps from "@/components/pdfGenerator";

interface MyDocumentProps {
    template: string
}

const MyDocument = ({template}: MyDocumentProps) => (
    <Document>
        <Page>
            <View>
                <Text>{template}</Text>
            </View>
        </Page>
    </Document>
);

interface PDFGeneratorProps {
    template: string
}

const PDFGenerator = ({template}: PDFGeneratorProps) => (
    <PDFViewer width="1000" height="600">
        <MyDocument
            template={template}
        />
    </PDFViewer>
);

export default PDFGenerator;
