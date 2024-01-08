export default function getApiBaseUrl() {
  if (process.env.NODE_ENV === "production") {
    return "https://shop-zu2k.onrender.com";
  }

  return "http://localhost:3000";
}
