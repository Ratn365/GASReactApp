import { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';
import { getSheetsData, deleteSheet, setActiveSheet, addSheet  } from "../api/sheetManager";
import { SheetDetails } from "../../common/type";

const SheetEditor: React.FC = () => {
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
      <TransitionGroup className="sheet-list">
        {names.length > 0 &&
          names.map((name) => (
            <CSSTransition classNames="sheetNames" timeout={500} key={name.name}>
              <SheetButton
                sheetDetails={name}
                deleteSheet={deleteSheetfn}
                setActiveSheet={setActiveSheetfn}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

export default SheetEditor;
 
