import { OCTAVE } from "./config";

/**
 * Creates a sampler and resolves when it is done loading.
 *
 * @param {Tone} toneObject - Main Tone.js object.
 * @param {string} baseUrl - Base location of all the sound files.
 * @param {Object} urls - Note mappings.
 * @returns {Promise<Sampler>} A playable instrument that can play any note based off the supplied samples.
 */
const createSampler = async (toneObject, baseUrl, urls) =>
  new Promise((resolve, reject) => {
    let instrument = new toneObject.Sampler({
      baseUrl: baseUrl,
      urls: urls,
      onload: () => {
        resolve(instrument.connect(new toneObject.Volume(-12).toDestination()));
      },
    });
  });

/**
 * Creates a piano sampler.
 *
 * @param {Tone} toneObject - Main Tone.js object.
 * @returns {Promise<Sampler>} - A sampler created using piano sounds.
 */
const PIANO = (toneObject) =>
  createSampler(toneObject, "/samples/piano/", {
    A1: "A1.mp3",
    A2: "A2.mp3",
    A3: "A3.mp3",
    A4: "A4.mp3",
    A5: "A5.mp3",
    A6: "A6.mp3",
    A7: "A7.mp3",
    "A#1": "As1.mp3",
    "A#2": "As2.mp3",
    "A#3": "As3.mp3",
    "A#4": "As4.mp3",
    "A#5": "As5.mp3",
    "A#6": "As6.mp3",
    "A#7": "As7.mp3",
    B1: "B1.mp3",
    B2: "B2.mp3",
    B3: "B3.mp3",
    B4: "B4.mp3",
    B5: "B5.mp3",
    B6: "B6.mp3",
    B7: "B7.mp3",
    C1: "C1.mp3",
    C2: "C2.mp3",
    C3: "C3.mp3",
    C4: "C4.mp3",
    C5: "C5.mp3",
    C6: "C6.mp3",
    C7: "C7.mp3",
    C8: "C8.mp3",
    "C#1": "Cs1.mp3",
    "C#2": "Cs2.mp3",
    "C#3": "Cs3.mp3",
    "C#4": "Cs4.mp3",
    "C#5": "Cs5.mp3",
    "C#6": "Cs6.mp3",
    "C#7": "Cs7.mp3",
    D1: "D1.mp3",
    D2: "D2.mp3",
    D3: "D3.mp3",
    D4: "D4.mp3",
    D5: "D5.mp3",
    D6: "D6.mp3",
    D7: "D7.mp3",
    "D#1": "Ds1.mp3",
    "D#2": "Ds2.mp3",
    "D#3": "Ds3.mp3",
    "D#4": "Ds4.mp3",
    "D#5": "Ds5.mp3",
    "D#6": "Ds6.mp3",
    "D#7": "Ds7.mp3",
    E1: "E1.mp3",
    E2: "E2.mp3",
    E3: "E3.mp3",
    E4: "E4.mp3",
    E5: "E5.mp3",
    E6: "E6.mp3",
    E7: "E7.mp3",
    F1: "F1.mp3",
    F2: "F2.mp3",
    F3: "F3.mp3",
    F4: "F4.mp3",
    F5: "F5.mp3",
    F6: "F6.mp3",
    F7: "F7.mp3",
    "F#1": "Fs1.mp3",
    "F#2": "Fs2.mp3",
    "F#3": "Fs3.mp3",
    "F#4": "Fs4.mp3",
    "F#5": "Fs5.mp3",
    "F#6": "Fs6.mp3",
    "F#7": "Fs7.mp3",
    G1: "G1.mp3",
    G2: "G2.mp3",
    G3: "G3.mp3",
    G4: "G4.mp3",
    G5: "G5.mp3",
    G6: "G6.mp3",
    G7: "G7.mp3",
    "G#1": "Gs1.mp3",
    "G#2": "Gs2.mp3",
    "G#3": "Gs3.mp3",
    "G#4": "Gs4.mp3",
    "G#5": "Gs5.mp3",
    "G#6": "Gs6.mp3",
    "G#7": "Gs7.mp3",
  });

/**
 * Creates a french horn sampler.
 *
 * @param {Tone} toneObject - Main Tone.js object.
 * @returns {Promise<Sampler>} - A sampler created using french horn sounds.
 */
const FRENCH_HORN = (toneObject) =>
  createSampler(toneObject, "/samples/french-horn/", {
    A1: "A1.mp3",
    A3: "A3.mp3",
    C2: "C2.mp3",
    C4: "C4.mp3",
    D3: "D3.mp3",
    D5: "D5.mp3",
    "D#2": "Ds2.mp3",
    F3: "F3.mp3",
    F5: "F5.mp3",
    G2: "G2.mp3",
  });

/**
 * Creates a guitar sampler.
 *
 * @param {Tone} toneObject - Main Tone.js object.
 * @returns {Promise<Sampler>} - A sampler created using guitar sounds.
 */
const GUITAR = (toneObject) =>
  createSampler(toneObject, "/samples/guitar-acoustic/", {
    A2: "A2.mp3",
    A4: "A4.mp3",
    "A#3": "As3.mp3",
    B2: "B2.mp3",
    B4: "B4.mp3",
    C4: "C4.mp3",
    "C#3": "Cs3.mp3",
    "C#5": "Cs5.mp3",
    D3: "D3.mp3",
    D5: "D5.mp3",
    "D#3": "Ds3.mp3",
    E2: "E2.mp3",
    E4: "E4.mp3",
    F3: "F3.mp3",
    "F#2": "Fs2.mp3",
    "F#4": "Fs4.mp3",
    G3: "G3.mp3",
    "G#2": "Gs2.mp3",
    "G#4": "Gs4.mp3",
    A3: "A3.mp3",
    "A#2": "As2.mp3",
    "A#4": "As4.mp3",
    B3: "B3.mp3",
    C3: "C3.mp3",
    C5: "C5.mp3",
    "C#4": "Cs4.mp3",
    D2: "D2.mp3",
    D4: "D4.mp3",
    "D#2": "Ds2.mp3",
    "D#4": "Ds4.mp3",
    E3: "E3.mp3",
    F2: "F2.mp3",
    F4: "F4.mp3",
    "F#3": "Fs3.mp3",
    G2: "G2.mp3",
    G4: "G4.mp3",
    "G#3": "Gs3.mp3",
  });

/**
 * Creates a drum sampler.
 *
 * @param {Tone} toneObject - Main Tone.js object.
 * @returns {Promise<Sampler>} - A sampler created using drum sounds.
 */
const DRUMS = (toneObject) =>
  createSampler(toneObject, "/samples/drums/", {
    [`B${OCTAVE}`]: "drums1.mp3",
    [`A${OCTAVE}`]: "drums2.mp3",
    [`G${OCTAVE}`]: "drums3.mp3",
    [`F${OCTAVE}`]: "drums4.mp3",
    [`E${OCTAVE}`]: "drums5.mp3",
    [`D${OCTAVE}`]: "drums6.mp3",
    [`C${OCTAVE}`]: "drums7.mp3",
  });

// Used to convert instrument types from the backend API into other useful instrument-related objects.
export const INSTRUMENTS = {
  piano: { label: "Piano", sampler: PIANO },
  "french horn": { label: "French Horn", sampler: FRENCH_HORN },
  guitar: { label: "Guitar", sampler: GUITAR },
  drums: { label: "Drums", sampler: DRUMS },
};
