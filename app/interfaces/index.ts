export interface IDecision {
  data: IDecisionMetadata;
}

export interface IDecisionMetadata {
  type: string;
  attributes: {
    timestamp?: string;
    input: { [key in string]: any };
    decision?: string;
  };
}

export interface IModel {
  type: string;
  id: string;
  attributes: IAttributes;
}

export interface IAttributes {
  name: string;
  description: string;
  metadata: IMetadata;
  exclusions: IExclusions;
  publisher: string;
  "publish-date": string;
  measurements: IMeasurements;
}

export interface IMetadata {
  prediction: IPrediction;
  attributes: IAttribute[];
}

export interface IPrediction {
  domain: IDomain;
  name: string;
  question: string;
  type: string;
}

export interface IDomain {
  type: string;
  values: string[];
}

export interface IAttribute {
  domain: IDomain2;
  name: string;
  question: string;
  type: string;
}

export interface IDomain2 {
  discrete?: boolean;
  interval?: number;
  lower?: number;
  type: string;
  upper?: number;
  values?: string[];
}

export interface IExclusions {
  rules: IRule[];
}

export interface IRule {
  antecedent: any;
  consequent: any;
  type: string;
  relation?: IRelation;
}

export interface IRelation {
  index: number;
  threshold: number;
  type: string;
}

export interface IMeasurements {
  levers: ILever[];
  oob_error: number;
}

export interface ILever {
  drop: number;
  index: number;
}
