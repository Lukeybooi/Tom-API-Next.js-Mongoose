import axios from "axios";

const API_KEY: string | undefined = process.env.NEXT_PUBLIC_TOM_API_KEY;
const API_URL: string = "https://api.up2tom.com/v3";

export interface Model {
  id: string;
  attributes: {
    name: string;
    metadata: {
      attributes: { name: string }[];
    };
  };
}

export interface DecisionResponse {
  decision: any;
}

export const fetchModels = async (): Promise<Model[]> => {
  const res = await axios.get<{ data: Model[] }>(`${API_URL}/models`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  return res.data.data;
};

export const fetchModelDetails = async (modelId: string): Promise<Model> => {
  const res = await axios.get<{ data: Model }>(`${API_URL}/models/${modelId}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  return res.data.data;
};

export const makeDecision = async (
  modelId: string,
  input: Record<string, string>
): Promise<DecisionResponse> => {
  const res = await axios.post<{ decision: any }>(
    `${API_URL}/decision/${modelId}`,
    { input },
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
    }
  );
  return res.data;
};


