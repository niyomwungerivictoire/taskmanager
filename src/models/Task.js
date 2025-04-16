import mongoose, { model, Schema } from "mongoose";

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Ensure uniqueness of title per user, not globally
TaskSchema.index({ user: 1, title: 1 }, { unique: true });

const Task = mongoose.models.Task || model("Task", TaskSchema);

export default Task;