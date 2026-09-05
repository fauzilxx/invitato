/**
 * Centralized configuration for the Ricky & Fellycia wedding invitation.
 * Styled for luxury, modern-futuristic aesthetic matching Invitato reference.
 */

import { ASSETS } from "./assets";

export const COUPLE = {
  groom: {
    name: "Ricky",
    fullName: "Ricky Bastila",
    parentage: "Putra dari Bapak Handoko & Ibu Susanti",
    photo: ASSETS.gallery[4], // photo 5
  },
  bride: {
    name: "Fellycia",
    fullName: "Felicia Wijaya",
    parentage: "Putri dari Bapak Wijaya & Ibu Liana",
    photo: ASSETS.gallery[5], // photo 6
  },
  hashtag: "#RickyFellinlove",
};

export const EVENT = {
  date: "Sabtu, 25 Desember 2026",
  location: "The Ritz-Carlton, Mega Kuningan, Jakarta",
  akad: {
    title: "Akad Nikah",
    date: "Sabtu, 25 Desember 2026",
    time: "09:00 - 10:00 WIB",
    venue: "Chapel The Ritz-Carlton",
    address: "Jl. DR. Ide Anak Agung Gde Agung Kav. E.1.1, Jakarta",
  },
  resepsi: {
    title: "Resepsi Pernikahan",
    date: "Sabtu, 25 Desember 2026",
    time: "11:00 - 14:00 WIB",
    venue: "Grand Ballroom The Ritz-Carlton",
    address: "Jl. DR. Ide Anak Agung Gde Agung Kav. E.1.1, Jakarta",
  },
} as const;

export const TIMELINE = [
  {
    time: "09:00 WIB",
    title: "WEDDING CEREMONY",
    subtitle: "Akad Nikah",
    iconType: "rings",
    side: "right",
  },
  {
    time: "10:00 WIB",
    title: "WELCOME TOAST",
    subtitle: "Foto & Ramah Tamah",
    iconType: "toast",
    side: "left",
  },
  {
    time: "11:00 WIB",
    title: "WEDDING LUNCH",
    subtitle: "Resepsi Utama",
    iconType: "lunch",
    side: "right",
  },
  {
    time: "12:00 WIB",
    title: "CAKE CUTTING",
    subtitle: "Pemotongan Kue",
    iconType: "cake",
    side: "left",
  },
  {
    time: "12:45 WIB",
    title: "COCKTAIL HOUR",
    subtitle: "Santap & Hiburan",
    iconType: "cocktail",
    side: "right",
  },
  {
    time: "13:30 WIB",
    title: "FIRST DANCE",
    subtitle: "Dansa Pasangan",
    iconType: "music",
    side: "left",
  },
  {
    time: "14:00 WIB",
    title: "BUFFET DINNER",
    subtitle: "Jamuan Makan",
    iconType: "dinner",
    side: "right",
  },
  {
    time: "15:00 WIB",
    title: "FIREWORKS",
    subtitle: "Pesta Kembang Api",
    iconType: "fireworks",
    side: "left",
  },
] as const;

// Target date for countdown
export const WEDDING_DATE = new Date("2026-12-25T09:00:00+07:00");

export const MAPS = {
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.284!2d106.8834!3d-6.2176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e94e6e5e5f%3A0x301576d14feb9e0!2sThe%20Ritz-Carlton%2C%20Jakarta%20-%20Mega%20Kuningan!5e0!3m2!1sen!2sid!4v1693000000000!5m2!1sen!2sid",
  directionsUrl:
    "https://www.google.com/maps/dir//The+Ritz-Carlton,+Jakarta+-+Mega+Kuningan",
} as const;

export const VIDEOS = {
  prewedding: {
    title: "PRE WEDDING",
    embedUrl: "https://www.youtube.com/embed/dt25SFw8H4Y",
    watchUrl: "https://www.youtube.com/watch?v=dt25SFw8H4Y",
  },
  livestream: {
    title: "LIVE STREAMING",
    embedUrl: "https://www.youtube.com/embed/y3MLiFHAf4w",
    watchUrl: "https://www.youtube.com/watch?v=y3MLiFHAf4w",
  },
} as const;

export const QUOTE = {
  text: '"I was sound asleep, but in my dreams I was wide awake. Oh, listen! It\'s the sound of my lover knocking, calling!"',
  source: "Song of Songs 5:2 MSG",
} as const;

export const HERO_IMAGES = {
  desktopLeft: ASSETS.gallery[0], // Yacht couple photo for left preview panel
  mobileCover: ASSETS.gallery[7], // Evening pre-wedding photo for mobile & right cover
  coverRight:  ASSETS.gallery[7], // Evening pre-wedding photo for right cover section
};

export const GALLERY_IMAGES = [
  { src: ASSETS.gallery[0], alt: "Ricky & Fellycia - Pre-wedding Yacht 1" },
  { src: ASSETS.gallery[1], alt: "Ricky & Fellycia - Pre-wedding Lounge 2" },
  { src: ASSETS.gallery[2], alt: "Ricky & Fellycia - Pre-wedding White Wall 3" },
  { src: ASSETS.gallery[3], alt: "Ricky & Fellycia - Pre-wedding Black Tux 4" },
  { src: ASSETS.gallery[4], alt: "Ricky & Fellycia - Groom with Doberman" },
  { src: ASSETS.gallery[5], alt: "Ricky & Fellycia - Bride Portrait" },
  { src: ASSETS.gallery[6], alt: "Ricky & Fellycia - Pre-wedding Outdoors 7" },
  { src: ASSETS.gallery[7], alt: "Ricky & Fellycia - Pre-wedding Evening 8" },
  { src: ASSETS.gallery[8], alt: "Ricky & Fellycia - Pre-wedding Studio 9" },
  { src: ASSETS.gallery[9], alt: "Ricky & Fellycia - Pre-wedding Romantic 10" },
];

export const MUSIC_URL = ASSETS.music;

