import { IDecisionError, IDecision } from "@/interfaces";

export const mergeInputDecisions = (
  type: string,
  input: { [key in string]: any }
): IDecision => ({
  data: {
    type,
    attributes: {
      input,
    },
  },
});

export const getDecisionError = (e: IDecisionError | string): string | null => {
  if (typeof e === "string") {
    return e;
  }

  return e?.errors?.[0]?.detail ?? e?.message ?? null;
};
