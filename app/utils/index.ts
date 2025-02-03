import { IDecision } from "@/interfaces";

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
