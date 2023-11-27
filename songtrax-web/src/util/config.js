import secret from "../secret";

// If true, uses extension components for testing. Set to false for submission.
export const USE_EXTENSIONS = true;

// API key assigned to this repository.
export const API_KEY = secret["api_key"];
// Base URL used for retrieving and manipulating resources
export const BASE_URL = "https://comp2140.uqcloud.net/api/";

// Seconds note should be held for when activated.
export const ACTIVATION_DURATION = 0.2;
// Seconds a note holds for when previewed.
export const BAR_DURATION = 0.5;
// Number of bars that fit in a note sequence.
export const SEQUENCE_LENGTH = 16;
// The octave assigned to preview playback. Not very scalable for the future.
export const OCTAVE = "5";