
import { useStore } from "../../store/store";

let store = useStore();
let chrome = window.chrome;

export default function Sync() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          message: JSON.stringify(store.tags),
        });
      });
      
}