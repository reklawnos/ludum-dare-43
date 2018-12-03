const NAMES = [
  "Wholebooks",
  "Amazong",
  "Shopliftfy",
  "Hoolio.io",
  "Spliblr",
  "Guber",
  "Wamboo",
  "Instacrush",
  "Polywhopper",
  "Oddio",
  "Skwimbot",
  "Wink.ly",
  "Qualiteeb",
  "Innovenovoto",
  "Busy.ly",
  "Vendomo",
];
export default function generateCompanyName() {

  return NAMES[Math.floor(Math.random() * NAMES.length)];
}
