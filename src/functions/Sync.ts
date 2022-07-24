
import { useStore } from "../../store/store";

let store = useStore();
let chrome = window.chrome;

export default function Sync() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        let tags_for_content = JSON.stringify(store.tags)
        console.log('sending to content tags: ')
        console.log(JSON.parse(tags_for_content))
        chrome.tabs.sendMessage(activeTab.id, {
          message: tags_for_content
        });
        let t = store.tags
        console.log(typeof(t))
      });
      
}