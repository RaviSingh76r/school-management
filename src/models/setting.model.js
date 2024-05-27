import mongoose, {Schema} from "mongoose"


// Define sub-schema for notification settings
const NotificationSettingsSchema = new Schema({
  emailAlerts: { type: Boolean, default: true },
  smsAlerts: { type: Boolean, default: false },
  pushNotifications: { type: Boolean, default: true },
}, { _id: false });

// Define sub-schema for privacy settings
const PrivacySettingsSchema = new Schema({
  profileVisibility: { type: String, enum: ['public', 'private', 'friends'], default: 'friends' },
  dataSharing: { type: Boolean, default: true },
  connectedAccounts: [{ type: String }],
}, { _id: false });

// Define sub-schema for security settings
const SecuritySettingsSchema = new Schema({
  twoFactorAuth: { type: Boolean, default: false },
  loginHistory: [{ type: Date }],
  trustedDevices: [{ type: String }],
}, { _id: false });

// Define sub-schema for preference settings
const PreferencesSettingsSchema = new Schema({
  language: { type: String, enum: ['en', 'es', 'fr', 'de', 'zh'], default: 'en' },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  dashboardLayout: { type: String, default: 'default' },
}, { _id: false });

// Main schema for user settings
const UserSettingsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
  role: { type: String, enum: ['parent', 'teacher', 'admin', 'student'], required: true },
  accountSettings: {
    profilePicture: { type: String, default: '' },
    changePassword: { type: Boolean, default: false },
  },
  notificationSettings: NotificationSettingsSchema,
  privacySettings: PrivacySettingsSchema,
  securitySettings: SecuritySettingsSchema,
  preferencesSettings: PreferencesSettingsSchema,
}, { timestamps: true });

// Create the model
const UserSettings = mongoose.model('UserSettings', UserSettingsSchema);

module.exports = UserSettings;
