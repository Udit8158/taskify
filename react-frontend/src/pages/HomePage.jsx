import React from "react";
import { Navigate } from "react-router";

export default function HomePage() {
  const authToken = JSON.parse(localStorage.getItem("auth-token"));

  if (!authToken) return <Navigate to="/signin" replace />;
  if (authToken) return <Navigate to="/app" replace />;
}
