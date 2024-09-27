import { model, Schema } from 'mongoose';
const UserSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  username: { type: String },
  first_name: String,
  last_name: String,
  changed_subcribe: { type: Boolean, default: false },
});

export const UserModel = model('users', UserSchema);
