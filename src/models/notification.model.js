import mongoose, {Schema} from "mongoose"

// Define sub-schema for notification preferences
const NotificationPreferencesSchema = new Schema({
  email: { type: Boolean, default: true },
  sms: { type: Boolean, default: false },
  push: { type: Boolean, default: true },
}, { _id: false });

// Define sub-schema for notification settings for each user
const UserNotificationSettingsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
  preferences: NotificationPreferencesSchema,
  lastChecked: { type: Date, default: Date.now },
}, { timestamps: true });

// Define main schema for notifications
const NotificationSchema = new Schema({
  type: { type: String, enum: ['assignment', 'grade', 'event', 'message', 'announcement'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  read: { type: Boolean, default: false },
  delivered: { type: Boolean, default: false },
  deliveryMethods: {
    email: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: false },
  },
}, { timestamps: true });

// Model for user notification settings
const UserNotificationSettings = mongoose.model('UserNotificationSettings', UserNotificationSettingsSchema);

// Model for notifications
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = { UserNotificationSettings, Notification };
