// SheetButton Component
import { SheetDetails } from "../../common/type";


type SheetButtonProps = {
  sheetDetails: SheetDetails;
  deleteSheet: (index: number) => void;
  setActiveSheet: (name: string) => void;
};

function SheetButton({ sheetDetails, deleteSheet, setActiveSheet }: SheetButtonProps) {
  const { index, name, isActive } = sheetDetails;

  return (
    <div className="sheetLine">
      <button className="delete" onClick={() => deleteSheet(index)}>
        &times;
      </button>
      <button className="basicButton" onClick={() => setActiveSheet(name)}>
        <span className={`sheetNameText ${isActive ? 'active-sheet' : ''}`}>{name}</span>
      </button>
    </div>
  );
};

export default SheetButton;