export interface IDecisionError {
  errors?: IDecisionErrorMetada[];
  message?: string;
}

export interface IDecisionErrorMetada {
  title: string;
  detail: string;
  status: number;
}

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
  discrete?: boolean;
  interval?: number;
  lower?: number;
  type: string;
  upper?: number;
  values: string[];
}

export interface IAttribute {
  domain: IDomain;
  name: string;
  question: string;
  type: string;
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
