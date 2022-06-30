


const selectedButton = document.createElement("div");
const tagAllButton = document.createElement("div");


const observer = new MutationObserver(function (mutations, mutationInstance) {
  const thread_list = document.querySelectorAll(
    '[data-testid="mwthreadlist-item"]'
  );
  if (thread_list.length > 0) {
    thread_list.forEach((thread) => {
      let thread_input = document.createElement("input");
      thread_input.setAttribute("class", "thread_input");
      thread_input.setAttribute("type", "checkbox");

      let tag_container = document.createElement("button");
      tag_container.setAttribute("class", "tag-container");

      thread.appendChild(thread_input);
      thread.appendChild(tag_container);
      mutationInstance.disconnect();
    });
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
});