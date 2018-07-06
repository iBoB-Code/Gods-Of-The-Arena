import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const typesModel = new Schema({
	name: String
});
export default mongoose.model('types', typesModel)
