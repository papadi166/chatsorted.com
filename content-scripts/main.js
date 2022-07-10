//function updateDom = chrome.runtime.getURL("content-scripts/utils/updateDom.js");



let sortBy = "example"
import './main.css'

let thread_list = ''
//let thread_count_previous = thread_list.length
let friends = []
let chatsContainer = document.querySelector('.l9j0dhe7')



function updateDom() {
  
 
  console.log("updating Dom")
  //let thread_count = 0
  //thread_count_previous = thread_count

  thread_list = document.querySelectorAll(
    '[data-testid="mwthreadlist-item"]')

  let selected_button = document.createElement("div")
  selected_button.classList.add('selected-button')
  let selected_button_input = document.createElement("input")
  selected_button_input.setAttribute("type", 'checkbox')
  selected_button.appendChild(selected_button_input)
  let text = document.createElement("a")
  let i = 0
  text.textContent = `Selected: ${i}`
  selected_button.appendChild(text)
  let tagAll_button = document.createElement("div")
  tagAll_button.classList.add('tagAll-button')
  tagAll_button.textContent = 'Tag All'

  if (thread_list.length > 0) {
    chatsContainer = thread_list[0].parentNode.parentNode
    //for(let i = (thread_count - thread_count_previous)-1; i === 0; i-- )
    thread_list.forEach((thread) => {
      if(!thread.querySelector('.thread_input')) {
        let thread_input = document.createElement("input");
        thread_input.setAttribute("class", "thread_input");
        thread_input.setAttribute("type", "checkbox");
        let friend_name = thread.children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].textContent
        let friend = {
          "friend_name": friend_name,
          "tags": ["example", "constructors"],
        }

        friends.push(friend)
        const friendData = friends.find(friend => friend.friend_name === friend.friend_name)

        let tag_container = document.createElement("div");
        tag_container.setAttribute("class", "tag-container");
        let dropdown_content = document.createElement("div");
        dropdown_content.setAttribute("class", "dropdown-content");
        let p = document.createElement("p");
        p.textContent = "test"
        dropdown_content.appendChild(p)
        tag_container.appendChild(dropdown_content)
        tag_container.textContent = friendData.tags

        console.log(friendData)

        let test = document.createElement('div')

        if(friendData.tags.length <= 0) {
          test.innerHTML = `
            <div class="tag-container">
            <ul>
            <li ><a>+</a>
              <ul class="dropdown">
                <li><a>Notes</a></li>
              </ul>
            </li>
          </ul>
          </div>
            `
        } else {
          test.innerHTML = `
          <div class="tag-container">
            <ul>
              <li ><a>${friendData.tags}</a>
                <ul class="dropdown">
                  <li><a>Notes</a></li>
                </ul>
              </li>
            </ul>
          </div>
            `
        }
        

        //let addTagModal = document.createElement('div')

        thread.appendChild(thread_input);
        thread.appendChild(test);

        chatsContainer.classList.add('chats-container')
        console.log('chatContainer: ' + chatsContainer)
        
     
        let i = 1

        thread_list = Array.from(thread_list)
        thread_list.filter((thread) => {
          if(!thread.classList.contains('osnr6wyh')) {
            return thread
          }
        })

        thread_list.forEach((chat) => {
          chat.parentElement.setAttribute("style", `order: ${i}` )
          i++
         
        })
        }
    });
  }
}




// 1. When user login to facebook then runs facebook/messenger API and looks for friends, download their ids, names, etc and adds tags.
// 2. Data is saved to browser session storage, and saves data in firebase?, then script is using it to render tags and sort friends

const observer = new MutationObserver(() => {
  updateDom()
  
});

observer.observe(document, {
  childList: true,
  subtree: true,
});

console.log(friends)

