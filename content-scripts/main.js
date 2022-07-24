
import { saveTags, updateTag, updateFriend } from '../src/functions/Saving'

let sortBy = "example"
import './main.css'

let thread_list = ''
//let thread_count_previous = thread_list.length
let friends = []
let content_lived_before = false

const loadTags = () => {

  try {
    tags = JSON.parse(sessionStorage.getItem('tags'))
    console.log("tags parsed as")
    console.log(JSON.parse(sessionStorage.getItem('tags')))
    
  } catch {
    tags = sessionStorage.getItem('tags')
    console.log("tags not parsed as")
    console.log(tags)
  }

}

let tags = ''
loadTags()


if(tags === null || tags === 'undefined' || typeof(tags) === 'string') {
  // if tags are undefined then user first time run the extension, so create starting template for him
  // load tags from extension if session Storage Tags are not defined
 

    tags = [
      { id: 1, tag_name: "konstruktorzy", color: 'red', folded: true, editing: true, people: [
        {realname: 'Dawid Kudrel'},
        {realname: 'example example'}
      ] },
      { id: 2, tag_name: "example example2", color: 'blue', people: [
        {realname: 'test2a a '}
      ]  },
    ]
    content_lived_before = false
    console.log(tags)
    sessionStorage.setItem('tags', JSON.stringify(tags))

    console.log('tags saved as new')

  } else {
    console.log('tags saved from session storage')
    content_lived_before = true
  }

  saveTags(tags)
  console.log('tags: ' + tags)


let modal = document.createElement('div')
modal.classList.add('modal')
modal.setAttribute('id', 'myModal' )
let modal_content = document.createElement('div')
modal_content.classList.add('modal-content')
let modal_head = document.createElement('div')
modal_head.setAttribute('id', 'modal-head')
const close = document.createElement('span')
close.textContent = "X"
close.classList.add('close')
const p = document.createElement('a')
p.textContent = 'title'
p.setAttribute('id', 'modal-title')
modal_head. appendChild(p)
modal_head.appendChild(close)
let modal_input = document.createElement('input')
modal_input.setAttribute('id', 'modal-input')
modal_input.setAttribute('placeholder', 'Search Tag')
let modal_button = document.createElement('button')
modal_button.setAttribute('id', 'modal-button')
modal_button.textContent = 'Add Tag'
let modal_header = document.createElement('div')
modal_header.setAttribute('id', 'modal-header')
modal_header.appendChild(modal_input)
modal_header.appendChild(modal_button)
let modal_tag = document.createElement('div')
modal_tag.classList.add('modal-tag')
let modal_tag_container = document.createElement('div')
modal_tag_container.classList.add('modal-tag-container')







modal_content.appendChild(modal_head)
modal_content.appendChild(modal_header)
modal_content.appendChild(modal_tag)

modal.appendChild(modal_content)

// closing modal only if clicked element is modal background and ...
modal.addEventListener('click', ($event) => {
  if($event.target.classList.contains('modal-content')) {
    console.log('test okk')
  } else if($event.target.classList.contains('modal')) {
    modal.style.display = "none"
  }
  
})
// closing modal if closing button clicked
close.addEventListener('click', () => {
  if(window.getComputedStyle(modal).display === "block") {
    modal.style.display = "none";
  }
  
} )


const showModal = (event) => {
  let title = p
  let contact_name = ''
  if(event.target.parentNode.parentNode.parentNode.id === '') contact_name = event.target.parentNode.parentNode.id, title.textContent = contact_name
  else contact_name = event.target.parentNode.parentNode.parentNode.id, title.textContent = contact_name
  
  let modal_update_button = document.createElement('button')
  modal_update_button.setAttribute('id', 'modal-update-button')
  modal_update_button.textContent = 'Update Tag'

  loadTags()
  console.log(tags)
  modal_tag_container.innerHTML = ''
  
  tags.forEach(tag => {
    let modal_tag = document.createElement('div')
    modal_tag.classList.add('modal-tag')
    

    let modal_tag_p = document.createElement('p')
    modal_tag_p.textContent = tag.tag_name
    modal_tag_p.classList.add('modal-tag-p')
    
    
    let modal_tag_checkbox = document.createElement('input')
    modal_tag_checkbox.setAttribute('type', 'checkbox')
    modal_tag_checkbox.classList.add('modal-tag-checkbox')
    modal_tag.appendChild(modal_tag_checkbox)
    modal_tag.appendChild(modal_tag_p)
    
    modal_tag_container.appendChild(modal_tag)
    modal_content.append(modal_tag_container)
    
    
  })
  
  // delete old modal_update_button
  const old_update_button = document.querySelector('#modal-update-button')
  if(old_update_button) {
    old_update_button.remove()
  }
  
  modal_content.appendChild(modal_update_button)

  modal_update_button.addEventListener('click', () => {
    modal.style.display = "none";
    let selected_tags = []
    let modal_tags = modal_tag_container.querySelectorAll('.modal-tag-checkbox')
    console.log('modal tags: ' + modal_tags)
    modal_tags.forEach(checkbox => {
      if(checkbox.checked) {

        selected_tags.push(checkbox.parentNode.querySelector(".modal-tag-p").textContent)
      }
    })
    console.log('selected tags: ')
    console.log(selected_tags)
    
    console.log('updating friend:   ' + contact_name)
    updateFriend(contact_name, selected_tags)
    console.log("friend updated as: ")
    console.log(JSON.parse(sessionStorage.getItem('tags')))

  })
}


let modal_hook = null
if(document.querySelector('.rq0escxv .l9j0dhe7 .du4w35lb')) {
  document.querySelector('.rq0escxv .l9j0dhe7 .du4w35lb').appendChild(modal)
} else {
  const interval = setInterval(function() {
    if(document.querySelector('.rq0escxv .l9j0dhe7 .du4w35lb')) {
      modal_hook = document.querySelector('.rq0escxv .l9j0dhe7 .du4w35lb')
      modal_hook.appendChild(modal)
      clearInterval(interval)
    }
  }, 100)

}



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type === 'giveMeTags') {
      if(content_lived_before) {
        chrome.runtime.sendMessage({type: 'saveTags', tags: JSON.stringify(tags)});
      } else {
        chrome.runtime.sendMessage({type: 'saveTags', tags: null});
      }
      
    } else {
      let t = request.message
      //console.log('setting item: ' + JSON.parse(t) )
      sessionStorage.setItem('tags', JSON.stringify(request.message))
      console.log('request' + typeof(t))

    }
    
  }
);



//const syncExtension() = () => {
//  console.log('test')
//}


function updateDom() {
  loadTags()
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
        let friend_name = thread.children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].textContent

        let thread_input = document.createElement("input");
        thread_input.setAttribute("class", "thread_input");
        thread_input.setAttribute("type", "checkbox")
        let tag_container = document.createElement("div");
        tag_container.classList.add("tag-container");
        console.log(friend_name)

        tag_container.setAttribute("id", friend_name)
        
        // Collect friend nickname from div
        
        let friend = {
          "friend_name": friend_name,
          "tags": [],
        }

        
        
        // download tags from vue app (popup)
        


         // if friend is inside tags then: 1.append this tag to this friend, 2. add this tag to div as class.
         friend.tags = []
         // saving test





        
        // Testing adding friend to tag
        //updateTag('addFriend', "Tesstingtag", friend.friend_name )
        // Testing removing friend from tag
        thread.setAttribute('id', friend_name)

        loadTags()
        console.log(tags)
        
        tags = tags.forEach(tag => {

          if(tag.people.find((person) => person.realname === friend_name)) {
            console.log("okk")
            
            friend.tags.push(tag.tag_name)
            thread.classList.add(tag.tag_name.replace(/\s+/g, '-').toLowerCase())
            
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
        tag_container.addEventListener('click', (event) => {
          console.log(friend.friend_name)
          modal.style.display = "block";
          showModal(event)
          //updateTag('addFriend', "Tesstingtagds", friend.friend_name )

          updateDom()
        })
        

        //append checkbox and tag-container to thread

        if(thread.querySelector('.tag-container')) {
            // if tag container already exists, first remove old tag container then add another
            let e = thread.querySelector('.tag-container')
            thread.removeChild(e)
            thread.appendChild(tag_container);
          } else {
            // if tag container doesn't exist then add tag container and thread input
            thread.appendChild(thread_input);
            thread.appendChild(tag_container);
          }

          document.querySelector('.tag-container').addEventListener('click', () => { 
            if(window.getComputedStyle(modal).display === "block") {
              modal.style.display = "none";
            }
            else {
              modal.style.display = "block";
            }
          })

  

        
     
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

            let friend_name = thread.getAttribute('id')

            //'looping trought tags to find person inside from thread and give the thread attributes'
            tags = tags.forEach(tag => {

              let person = tag.people.find((person) => person.realname === friend_name)
              if(person) {
                
                
                thread.classList.add(tag.tag_name.replace(/\s+/g, '-').toLowerCase())
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
  console.log('running observer')
  updateDom()
  
});

observer.observe(document, {
  childList: true,
  subtree: true,
});

console.log(friends)

