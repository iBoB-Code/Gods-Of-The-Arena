import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gladiateursModel = new Schema({
	type: { type: Schema.Types.ObjectId, ref: 'types' },
	name: String,
	custom: [ String ],
	stats: { victories: Number, defeats: Number }
});
export default mongoose.model('gladiateurs', gladiateursModel)
