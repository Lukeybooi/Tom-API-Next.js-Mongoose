import { FC } from "react";

interface IMetadata {
  name: string;
  question: string;
  type: string;
  domain?: { values?: string[]; upper?: number; lower?: number };
}

interface IProps {
  inputs: Record<string, string>;
  metadata: IMetadata[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBatch: () => void;
}

export const ModelForm: FC<IProps> = ({
  inputs,
  metadata,
  onChange,
  onSubmit,
  onBatch,
}) => (
  <div className="space-y-2">
    {metadata.map(({ name, question, type, domain }) => (
      <div key={name}>
        <label className="block">{question}</label>
        {type === "Nominal" && domain?.values ? (
          <select
            name={name}
            value={inputs[name]}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select an option</option>
            {domain.values.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="number"
            name={name}
            value={inputs[name]}
            onChange={onChange}
            min={domain?.lower ?? ""}
            max={domain?.upper ?? ""}
            className="w-full p-2 border rounded"
          />
        )}
      </div>
    ))}
    <button
      type="button"
      onClick={onSubmit}
      className="w-full py-2 bg-blue-500 text-white rounded-md"
    >
      Submit
    </button>

    <button
      type="button"
      onClick={onBatch}
      className="w-full py-2 bg-green-400 text-white rounded-md"
    >
      Get Batch File Payload
    </button>
  </div>
);

export default ModelForm;
