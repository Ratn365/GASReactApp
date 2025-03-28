import { useEffect, useState } from 'react';
import FormInput from '../components/FormInput';
import SheetButton from '../components/SheetButton';
import { getSheetsData, deleteSheet, setActiveSheet, addSheet } from "../api/sheetManager";
import { SheetDetails } from "../../common/type";

function SheetEditor() {
  const [names, setNames] = useState<SheetDetails[]>([]);

  useEffect(() => {
    getSheetsData().then(setNames).catch(alert);
  }, []);

  const deleteSheetfn = (sheetIndex: number) => {
    deleteSheet(sheetIndex).then(setNames).catch(alert);
  };

  const setActiveSheetfn = (sheetName: string) => {
    setActiveSheet(sheetName).then(setNames).catch(alert);
  };

  const submitNewSheet = async (newSheetName: string) => {
    try {
      const response = await addSheet(newSheetName);
      setNames(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <FormInput submitNewSheet={submitNewSheet} />
      {names.length > 0 &&
        names.map((name) => (
          <SheetButton
            sheetDetails={name}
            deleteSheet={deleteSheetfn}
            setActiveSheet={setActiveSheetfn}
          />
        ))}

    </div>
  );
};

export default SheetEditor;

