import React from "react";
import { USE_HASH_ROUTER } from "../config/routerMode";

const basePath = (import.meta.env.BASE_URL || "/");

export default function Debug() {
  const show = typeof window !== "undefined" && window.location.search.includes("debug");
  if (!show) return null;
  return (
    <div style={{ position: "fixed", top: 0, left: 0, background: "#eee", zIndex: 9999, fontSize: 12, padding: 4 }}>
      <div>BASE_PATH: <b>{basePath}</b></div>
      <div>window.location.pathname: <b>{window.location.pathname}</b></div>
      <div>window.location.href: <b>{window.location.href}</b></div>
      <div>USE_HASH_ROUTER: <b>{USE_HASH_ROUTER ? "true" : "false"}</b></div>
    </div>
  );
}
