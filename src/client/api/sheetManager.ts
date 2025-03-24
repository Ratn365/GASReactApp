import { SheetDetails } from "../../common/type";

import { GASClient } from "gas-client";
import * as server from "../../server/main";
const { serverFunctions } = new GASClient<typeof server>();

const getSheetsData = async (): Promise<SheetDetails[]> => {
    const response = await serverFunctions.getSheetsData();
    return response;
};
const deleteSheet = async (sheetIndex: number): Promise<SheetDetails[]> => {
    const response = await serverFunctions.deleteSheet(sheetIndex);
    return response;
};
const setActiveSheet = async (sheetName: string): Promise<SheetDetails[]> => {
    const response = await serverFunctions.setActiveSheet(sheetName);
    return response;
};
const addSheet = async (newSheetName: string): Promise<SheetDetails[]> => {
    const response = await serverFunctions.addSheet(newSheetName);
    return response;
};

export { getSheetsData, deleteSheet, setActiveSheet, addSheet };
