export async function getCalls(url?: string) {
    console.log(url);
    const res = await fetch(url || `${process.env.NEXT_PUBLIC_BASE_URI}/employee/phone-call?offset=1&limit=10`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const data = await res.json();
    return data;
}