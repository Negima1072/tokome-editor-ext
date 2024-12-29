import { v4 as uuid } from "uuid";

export const swfetch = (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const url = typeof input === "string" ? input : input.url;
  return new Promise((resolve, reject) => {
    const requestId = uuid();
    window.postMessage(
      { type: "FETCH_REQUEST", url, options: init || {}, requestId },
      window.location.origin
    );
    window.addEventListener("message", function handler(event) {
      if (event.origin !== window.location.origin) return;
      const message = event.data;
      if (message.type === "FETCH_RESPONSE") {
        if (message.requestId === requestId) {
          window.removeEventListener("message", handler);
          if (message.success) {
            const blob = new Blob([JSON.stringify(message.data)], {
              type: "application/json",
            });
            resolve(new Response(blob, { status: 200, statusText: "OK" }));
          } else {
            reject(new Error(message.error || "Unknown error occurred"));
          }
        }
      }
    });
  });
};
