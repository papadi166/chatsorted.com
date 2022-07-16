
chrome.runtime.onInstalled.addListener(() => {
    //alert('Hello, World!');
    console.log("test")
  });




  async function getCurrentTab() {
    let queryOptions = { active: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    chrome.storage.local.set({'actualUrl':tab.url});

     // To get
    
  }

chrome.tabs.onActivated.addListener(function(activeInfo) {
    getCurrentTab()
});
  


  