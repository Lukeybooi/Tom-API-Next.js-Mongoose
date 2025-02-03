"use client";

import { ModelError, ModelForm, ModelSelect } from "@/components";
import { fetchModelDetails, fetchModels, makeDecision } from "@/services/api";
import { useEffect, useState } from "react";

interface IModel {
  id: string;
  attributes: {
    name: string;
    metadata: {
      attributes: { name: string }[];
    };
  };
}

interface IDecision {
  input: { [key in string]: any };
  decision: string;
  meets_confidence: boolean;
}

const GENERIC_ERROR_MSG = "Something went wrong, please try again later.";
const MESSAGE_DELAY = 3000;

const Home = () => {
  const [models, setModels] = useState<IModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<IModel>();
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [decision, setDecision] = useState<IDecision>();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadModels() {
      try {
        const fetchedModels = await fetchModels();
        setModels(fetchedModels);
      } catch (_e) {
        setMessage(GENERIC_ERROR_MSG);
      } finally {
        setLoading(false);
      }
    }

    loadModels();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (message) setMessage(undefined);
    }, MESSAGE_DELAY);

    return () => clearTimeout(timer);
  }, [message]);

  const handleModelSelect = async (modelId: string) => {
    try {
      const modelDetails = await fetchModelDetails(modelId);
      setSelectedModel(modelDetails);
      setInputs(
        modelDetails.attributes.metadata.attributes.reduce(
          (acc, attr) => ({ ...acc, [attr.name]: "" }),
          {}
        )
      );
    } catch (_e) {
      setMessage(GENERIC_ERROR_MSG);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!selectedModel) return;

    try {
      const result = await makeDecision(selectedModel.id, inputs);
      setDecision(result?.decision);
    } catch (_e) {
      setMessage(GENERIC_ERROR_MSG);
    }
  };

  if (loading)
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg">Loading...</div>
    );

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold mb-4">TOM API Model Selection</h1>

      {message && (
        <ModelError
          heading="Error!"
          message={message}
          onClose={() => setMessage(undefined)}
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
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
      )}

      {decision && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold">Decision</h3>
          {decision?.decision && (
            <p className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400">
              {decision.decision}
            </p>
          )}
          {!decision?.decision && (
            <pre>{JSON.stringify(decision, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
