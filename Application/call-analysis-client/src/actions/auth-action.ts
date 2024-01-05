"use server";

import { redirect } from "next/navigation";

export async function handleGoogleLogin(formData: FormData) {
  redirect('http://localhost:3000/auth/redirect');
}

