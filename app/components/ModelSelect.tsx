import { FC } from "react";

interface IProps {
  models: { id: string; attributes: { name: string } }[];
  onSelect: (modelId: string) => void;
  value: { [key in string]: any } | undefined;
}

export const ModelSelect: FC<IProps> = ({ models, onSelect, value }) => (
  <select
    onChange={(e) => onSelect(e.target.value)}
    className="w-full p-2 border rounded"
  >
    {!value && <option>Select a Model</option>}
    {models.map((model) => (
      <option key={model.id} value={model.id}>
        {model.attributes.name}
      </option>
    ))}
  </select>
);

export default ModelSelect;
