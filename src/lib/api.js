export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function api(path, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("bloodlink_token") : null;
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers, cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export async function uploadToImgBB(file) {
  if (!file) return "";
  const form = new FormData();
  form.append("image", file);
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: form });
  const data = await res.json();
  if (!data.success) throw new Error("Avatar upload failed");
  return data.data.display_url;
}
