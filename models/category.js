const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocaleSchema = new Schema({
    language_iso: { type: String, required: true },
    title: {type: String, required: true },
    seo_title: { type: String, default: undefined },
    summary: {type: String, required: true },
    seo_summary: { type: String, default: undefined },
    description: {type: String, required: true },
    seo_description: { type: String, default: undefined },
    specify_seo_values: { type: Boolean, required: true },
});

const MediaSchema = new Schema({
    icon: { type: String, default: undefined },
    portrait: { type: [ String ], default: undefined },
    landscape: {type: [ String ], default: undefined },
    square: {type: [ String ], default: undefined },
});

const SettingsSchema = new Schema({
    is_premium: { type: Boolean, required: true },
    excluded_domains: { type: [ String ], default: undefined },
    excluded_countries_iso: { type: [ String ], default: undefined },
    excluded_network_endpoints: { type: [ Number ], default: undefined },
    age_rating: { type: String, required: true },
});

const LocksSchema = new Schema({
    is_locked_for_editing: { type: String, default: undefined },
    current_editor: { type: String, default: undefined },
    is_locked_for_moderation_process: { type: String, default: undefined },
    is_locked_for_backend_process: { type: String, default: undefined },
    current_backend_process: { type: String, default: undefined },
});

const categorySchema = new Schema({
    // opting to use built-in _id instead
    slug: { type: String, unique: true, required: true },
    locale: {
        type: [ LocaleSchema ],
        required: true,
        default: undefined,
        validate: {
            validator: v => v.length > 0,
            message: 'Please specify at least 1 Locale'
        },
    },
    media: { type: MediaSchema, required: true },
    settings: { type: SettingsSchema, required: true },
    locks: { type: LocksSchema, required: true },
    parent_id: { type: String, default: undefined },
    ancestor_ids: { type: [ String ], default: undefined },
    product: { type: String, default: undefined },
    path: { type: String, default: undefined },
    is_indexed: { type: Boolean, required: true },
    published_at: { type: Date, default: undefined },
    created_at: { type: Date, default: undefined },
    updated_at: { type: Date, default: undefined },
});

module.exports = mongoose.model('Category', categorySchema, 'categories');