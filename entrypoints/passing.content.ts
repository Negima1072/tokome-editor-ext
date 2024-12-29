export default defineContentScript({
  matches: ["https://www.nicovideo.jp/watch/*"],
  runAt: "document_idle",
  main() {
    window.addEventListener("message", (ev) => {
      if (ev.origin !== window.location.origin) return;
      const message = ev.data;
      if (message.type === "FETCH_REQUEST") {
        browser.runtime.sendMessage(
          {
            type: "FETCH_DATA",
            url: message.url,
            method: message.options.method,
            headers: message.options.headers,
            body: message.options.body,
          },
          (response) => {
            if (browser.runtime.lastError) {
              window.postMessage(
                {
                  type: "FETCH_RESPONSE",
                  success: false,
                  error:
                    browser.runtime.lastError.message ||
                    "browser runtime lastError",
                  requestId: message.requestId,
                },
                window.location.origin
              );
            } else {
              window.postMessage(
                {
                  type: "FETCH_RESPONSE",
                  success: response.success,
                  data: response.data,
                  error: response.error,
                  requestId: message.requestId,
                },
                window.location.origin
              );
            }
          }
        );
      }
    });
  },
});
