import mongoose, { Document, Schema } from "mongoose";

interface IDecision extends Document {
  modelId: string;
  inputs: Record<string, string>;
  decision: Record<string, any>;
  timestamp: Date;
}

const DecisionSchema: Schema = new Schema({
  modelId: { type: String, required: true },
  inputs: { type: Object, required: true },
  decision: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Decision ||
  mongoose.model<IDecision>("Decision", DecisionSchema);
