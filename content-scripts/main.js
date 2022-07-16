//function updateDom = chrome.runtime.getURL("content-scripts/utils/updateDom.js");



let sortBy = "example"
import './main.css'

let thread_list = ''
//let thread_count_previous = thread_list.length
let friends = []


let friendsData = window.location.href;


let modal = document.createElement('div')
modal.classList.add('modal')
modal.setAttribute('id', 'myModal' )
let modal_content = document.createElement('div')
modal_content.classList.add('modal-content')
const close = document.createElement('span')
close.classList.add('close')
const p = document.createElement('p')
p.textContent = 'Some text in the Modal..'

modal_content.appendChild(close)
modal_content.appendChild(p)
modal.appendChild(modal_content)

close.addEventListener('click', () => {
  modal.style.display = "none";
} )


//document.querySelector('.rq0escxv .l9j0dhe7 .du4w35lb').appendChild(modal)

//document.querySelector('.rq0escxv .l9j0dhe7 .du4w35lb').addEventListener('click', () => { 
 //   if(window.getComputedStyle(modal).display === "block") {
 //     modal.style.display = "none";
 //   }
 //   else {
 //     modal.style.display = "block";
 //   }
 // })



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    sessionStorage.setItem('tags', request.message)
    console.log('request' + sessionStorage.getItem('tags'))
  }
);

const addTag = (tag_name, color, people) => { 
  chrome.runtime.sendMessage({type: "addTag", tag_name: tag_name, color: color, people: people});
}

const saveTags = (tags) => {
  chrome.runtime.sendMessage({type: "saveTags", tags: tags})
}

const updateTag = (type, tag_name, value) => {
  if( type === 'addFriend') {
    chrome.runtime.sendMessage({type: "addFriend", tag_name: tag_name, friend_name: value})
  }
  if(type === 'removeFriend') {
    chrome.runtime.sendMessage({type: "removeFriend", tag_name: tag_name, friend_name: value})
  }
  if(type === 'changeTagName') {
    chrome.runtime.sendMessage({type: "changeTagName", tag_name: tag_name, new_tag_name: value})
  }
}

//const syncExtension() = () => {
//  console.log('test')
//}

function start(data){
    sessionStorage.setItem('tags', data)
    console.log(sessionStorage.getItem('tags'))
}

function updateDom() {
  let tags = []
  tags = JSON.parse(sessionStorage.getItem('tags'))

  
  
  console.log(tags)
 
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


    thread_list.forEach((thread) => {
      
      if(!thread.querySelector('.thread_input')) {

        let thread_input = document.createElement("input");
        thread_input.setAttribute("class", "thread_input");
        thread_input.setAttribute("type", "checkbox")
        let tag_container = document.createElement("div");
        tag_container.setAttribute("class", "tag-container");
        
        // Collect friend nickname from div
        let friend_name = thread.children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].textContent
        let friend = {
          "friend_name": friend_name,
          "tags": [],
        }

        
        
        // download tags from vue app (popup)
        


         // if friend is inside tags then: 1.append this tag to this friend, 2. add this tag to div as class.
         friend.tags = []
         // saving test

        // Testing adding tag

        


        
        // Testing adding friend to tag
        //updateTag('addFriend', "Tesstingtag", friend.friend_name )
        // Testing removing friend from tag
        thread.setAttribute('id', friend_name)
        
        tags = tags.forEach(tag => {

          if(tag.people.find((person) => person.realname === friend_name)) {
            console.log("okk")
            
            friend.tags.push(tag.tag_name)
            thread.classList.add(tag.tag_name)
            
          }
        })
        // Add friend to friend list
        friends.push(friend)

        let ul = document.createElement("ul");

        let li = document.createElement("li");
        let a = document.createElement("a");
        a.textContent = friend.tags
        a.setAttribute("class", 'tag-a')
        let ul2 = document.createElement("ul");
        ul2.setAttribute("class", "dropdown");
        let li2 = document.createElement("li");
        let a2 = document.createElement("a");
        a2.textContent = 'Notes'
        li2.appendChild(a2)
        ul2.appendChild(li2)
        li.appendChild(a)
        li.appendChild(ul2)
        ul.appendChild(li)
        tag_container.appendChild(ul)
        
      
        
       
        
        
        console.log(friend)

        

        

        // when user click at tags-container then open tags modal
        tag_container.addEventListener('click', () => {
          console.log(friend.friend_name)
          modal.style.display = "block";
          updateTag('addFriend', "Tesstingtag", friend.friend_name )

          updateDom()
        })
        

        //append checkbox and tag-container to thread

        if(thread.querySelector('.tag-container')) {
            let e = thread.querySelector('.tag-container')
            thread.removeChild(e)
            thread.appendChild(tag_container);
          } else {
            thread.appendChild(thread_input);
            thread.appendChild(tag_container);
          }
        
  

        
     
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
        } else {
          let tags = JSON.parse(sessionStorage.getItem('tags'))
          let tag_a = thread.querySelector('.tag-container').querySelector('ul').querySelector('li').querySelector('a')

            console.log('a :' + tag_a.textContent)

            let friend_name = thread.getAttribute('id')

            
            
            tags = tags.forEach(tag => {

              let person = tag.people.find((person) => person.realname === friend_name)
              if(person) {
                console.log("okk: " + person.realname)
                
                thread.classList.add(tag.tag_name)
                tag_a.textContent = tag.tag_name
                
              }
            })
            

          
          

        }
    });
    chrome.storage.local.set({'friends':friends});
    
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

