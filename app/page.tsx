"use client";

import { ModelError, ModelForm, ModelSelect } from "@/components";
import { GENERIC_ERROR_MSG, MESSAGE_DELAY } from "@/constants";
import { IDecision, IModel } from "@/interfaces";
import {
  fetchModelDetails,
  fetchModels,
  makeDecision,
  saveDecision,
} from "@/services/api";
import { getDecisionError, mergeInputDecisions } from "@/utils";
import { useEffect, useState } from "react";

const Home = () => {
  const [models, setModels] = useState<IModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<IModel>();
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [metadata, setMetadata] = useState<any[]>([]);
  const [decision, setDecision] = useState<IDecision>();
  const [errMessage, setErrMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadModels() {
      try {
        const fetchedModels = await fetchModels();
        setModels(fetchedModels);
      } catch (_e) {
        setErrMessage(GENERIC_ERROR_MSG);
      } finally {
        setLoading(false);
      }
    }

    loadModels();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (errMessage) setErrMessage(undefined);
    }, MESSAGE_DELAY);

    return () => clearTimeout(timer);
  }, [errMessage]);

  const handleModelSelect = async (modelId: string) => {
    try {
      const modelDetails = await fetchModelDetails(modelId);
      setSelectedModel(modelDetails);

      const fields = modelDetails?.attributes?.metadata?.attributes;
      setMetadata(fields);

      setInputs(
        fields.reduce(
          (acc: Record<string, string>, attr: any) => ({
            ...acc,
            [attr.name]: "",
          }),
          {}
        )
      );

      if (decision) {
        setDecision(undefined);
      }
    } catch (_e) {
      setErrMessage(GENERIC_ERROR_MSG);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!selectedModel) return;

    try {
      if (errMessage) setErrMessage(undefined);

      const result = await makeDecision(
        selectedModel.id,
        mergeInputDecisions(selectedModel?.type, inputs)
      );
      setDecision(result);

      // Save decision to MongoDB
      await saveDecision(selectedModel.id, inputs, result);
    } catch (error) {
      setErrMessage(
        getDecisionError((error as any)?.response?.data) ?? GENERIC_ERROR_MSG
      );
    }
  };

  if (loading)
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg">Loading...</div>
    );

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold mb-4">TOM API Model Selection</h1>

      {errMessage && (
        <ModelError
          heading="Error!"
          message={errMessage}
          onClose={() => setErrMessage(undefined)}
        />
      )}

      <ModelSelect
        models={models}
        onSelect={handleModelSelect}
        value={selectedModel}
      />

      {selectedModel && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">
            {selectedModel.attributes.name}
          </h2>
          <ModelForm
            inputs={inputs}
            metadata={metadata}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
      )}

      {decision && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold">Decision</h3>
          {decision?.data && (
            <p className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400">
              {decision?.data?.attributes?.decision}
            </p>
          )}
          {!decision?.data && <pre>{JSON.stringify(decision, null, 2)}</pre>}
        </div>
      )}
    </div>
  );
};

export default Home;
