"use server";

import { redirect } from "next/navigation";

export async function handleGoogleLogin(formData: FormData) {
  redirect('http://localhost:3000/auth/redirect');
}

export async function handleGoogleLogout(formData: FormData) {
  const response = await fetch('http://localhost:3000/auth/logout', {
    credentials: 'include',
    method: 'GET'
  });

  redirect('/sign-in')  
}