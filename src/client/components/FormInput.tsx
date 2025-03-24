import { useState, ChangeEvent, FormEvent } from 'react';

type FormInputProps = {
  submitNewSheet: (sheetName: string) => void;
};

const FormInput: React.FC<FormInputProps> = ({ submitNewSheet }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.length === 0) return;

    submitNewSheet(inputValue);
    setInputValue('');
  };

  return (
    <div className="formBlock">
      <form onSubmit={handleSubmit}>
        <div>
          <span>Add a sheet</span>
        </div>
        <div>
          <input
            onChange={handleChange}
            value={inputValue}
            placeholder="New sheet name"
          />
          <button className="submit" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInput;

