import { FC } from "react";

interface IProps {
  inputs: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ModelForm: FC<IProps> = ({ inputs, onChange, onSubmit }) => (
  <div className="space-y-2">
    {Object.keys(inputs).map((key) => (
      <div key={key}>
        <label className="block">{key}</label>
        <input
          type="text"
          name={key}
          value={inputs[key]}
          onChange={onChange}
          className="w-full p-2 border rounded"
        />
      </div>
    ))}
    <button
      onClick={onSubmit}
      className="w-full py-2 bg-blue-500 text-white rounded-md"
    >
      Submit
    </button>
  </div>
);

export default ModelForm;
