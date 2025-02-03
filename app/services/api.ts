import { IDecision, IModel } from "@/interfaces";
import axios from "axios";

const API_KEY: string | undefined = process.env.NEXT_PUBLIC_TOM_API_KEY;
const API_TOKEN_PREFIX: string = "Token";
const API_URL: string = "https://api.up2tom.com/v3";

export const fetchModels = async (): Promise<IModel[]> => {
  const res = await axios.get<{ data: IModel[] }>(`${API_URL}/models`, {
    headers: { Authorization: `${API_TOKEN_PREFIX} ${API_KEY}` },
  });

  return res.data.data;
};

export const fetchModelDetails = async (modelId: string): Promise<IModel> => {
  const res = await axios.get<{ data: IModel }>(
    `${API_URL}/models/${modelId}`,
    {
      headers: { Authorization: `${API_TOKEN_PREFIX} ${API_KEY}` },
    }
  );

  return res.data.data;
};

export const makeDecision = async (
  modelId: string,
  input: IDecision
): Promise<IDecision> => {
  const res = await axios.post(`${API_URL}/decision/${modelId}`, input, {
    headers: {
      Authorization: `${API_TOKEN_PREFIX} ${API_KEY}`,
      "Content-Type": "application/vnd.api+json",
    },
  });
  return res.data;
};

export const queryBatch = async (
  modelIds: string,
  inputs: { [key in string]: any }
): Promise<void> => {
  const res = await axios.post(
    `${API_URL}/batch`,
    { modelIds, inputs },
    { headers: { Authorization: `${API_TOKEN_PREFIX} ${API_KEY}` } }
  );
  return res.data;
};

export const saveDecision = async (
  modelId: string,
  inputs: Record<string, string>,
  decision: any
): Promise<void> => {
  await axios.post("/api/decisions", { modelId, inputs, decision });
};
