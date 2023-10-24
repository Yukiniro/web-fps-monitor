import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

async function updateStateWithStorage() {
  const data = await chrome.storage.local.get("isActive");
  const isActive = !!data?.isActive;
  await chrome.action.setBadgeText({
    text: isActive ? "ON" : "",
  });
}

chrome.runtime.onInstalled.addListener(async () => {
  await updateStateWithStorage();
});

chrome.runtime.onStartup.addListener(async () => {
  await updateStateWithStorage();
});

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === "ON" ? "" : "ON";
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });
  await chrome.action.setBadgeTextColor({
    tabId: tab.id,
    color: "#ffffff",
  });
  await chrome.action.setBadgeBackgroundColor({
    tabId: tab.id,
    color: "#1be46c",
  });
  const isActive = nextState === "ON" ? true : false;
  await chrome.tabs.sendMessage(tab.id, {
    message: isActive ? "shown" : "hidden",
  });
  await chrome.storage.local.set({ isActive });
});

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.message === "init") {
    await updateStateWithStorage();
  }
});
