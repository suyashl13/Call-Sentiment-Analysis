import getCookie from "./cookie_helper";

export default function preparedFetch({
  url,
  method,
  includeCredentials,
  headers,
}: {
  url: string;
  method: string;
  headers: any;
  includeCredentials: boolean;
}) {
  return async function (body?: any) {
    const response = await fetch(url, {
      method: method,
      body: body ? JSON.stringify(body) : undefined,
      credentials: includeCredentials ? "include" : undefined,
      headers: {
        "X-CSRFToken": getCookie("csrftoken") ?? undefined,
        ...headers,
      },
    });

    let resInJson;

    try {
      resInJson = await response.json();
    } catch (error: any) {
      console.error(response.body);
      throw Error("cannot parse body into json");
    }

    if (!response.ok) {
      throw resInJson;
    }

    return resInJson;
  };
}
