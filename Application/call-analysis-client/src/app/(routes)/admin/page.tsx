import React from "react";

export default async function AdminPage() {
  const user = await (
    await fetch("http://localhost:3000/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
  ).json();

  return <div>{JSON.stringify(user)}</div>;
}
