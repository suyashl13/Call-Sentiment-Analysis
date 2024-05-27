
export async function getCalls(url?: string | null) {
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

export async function getAdminHomeScreenCalls() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/admin/phone-call/all-calls`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    const data = await res.json();
    return data;
}

export async function getEmployees() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/admin-user/all-employees`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    const data = await res.json();
    return data;
}

export async function changeEmployeeStatus(employeeId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/admin-user/change-active-status/${employeeId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    const data = await res.json();
    return data;
}

export async function getEmployeeCallsById(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/employee/phone-call/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    const data = await res.json();
    return data;
}