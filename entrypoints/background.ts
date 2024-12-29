export default defineBackground({
  main() {
    browser.runtime.onMessage.addListener((message, _, sendResponse) => {
      if (message.type === "FETCH_DATA") {
        const { url, method = "GET", headers = {}, body = null } = message;
        browser.cookies.get(
          { url: "https://nicovideo.jp", name: "user_session" },
          (cookie) => {
            if (cookie?.value) {
              fetch(url, {
                method,
                headers: {
                  ...headers,
                  Cookie: `${cookie.name}=${cookie.value}`,
                },
                body,
              })
                .then(async (response) => {
                  const data = await response.json();
                  sendResponse({ success: true, data });
                })
                .catch((error) => {
                  sendResponse({ success: false, error: error.message });
                });
            } else {
              sendResponse({
                success: false,
                error: "Cookie 'user_session' not found",
              });
            }
          }
        );
      } else {
        sendResponse();
      }
      return true;
    });
  },
});
