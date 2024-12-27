export const swfetch = (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const url = typeof input === "string" ? input : input.url;
  const method = init?.method || "GET";
  const headers = init?.headers || {};
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        action: "fetchData",
        url,
        method,
        headers,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else if (response.success) {
          // Mock the Fetch Response object
          const blob = new Blob([JSON.stringify(response.data)], {
            type: "application/json",
          });
          resolve(new Response(blob, { status: 200, statusText: "OK" }));
        } else {
          reject(new Error(response.error || "Unknown error occurred"));
        }
      }
    );
  });
};
