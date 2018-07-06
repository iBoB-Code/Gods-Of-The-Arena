import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const battlesModel = new Schema({
	fighterA: { type: Schema.Types.ObjectId, ref: 'types' },
	fighterB: { type: Schema.Types.ObjectId, ref: 'types' },
	animal: Boolean
});
export default mongoose.model('battles', battlesModel)
