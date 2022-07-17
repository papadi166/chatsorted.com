import uniqid from 'uniqid';

const addTag = (tag_name, color, people) => { 
    //chrome.runtime.sendMessage({type: "addTag", tag_name: tag_name, color: color, people: people});
    if (!tags.some(e => e.tag_name === tag_name)) {
        tags.push({
          id: uniqid(), tag_name: tag_name, color: color, folded: false, editing: true, people: people })
      } else {
        console.log('this tag already exists')
      }
}

const deleteTag = (tag_name) => {
    tags = tags.filter(tag => {
        return tag.tag_name != tag.tag_name;
      });
}

const saveTags = (tags) => {
    chrome.runtime.sendMessage({type: "saveTags", tags: tags})
}

const updateTag = (type, tag_name, value) => {
    let tags = JSON.parse(sessionStorage.getItem('tags'))
    if( type === 'addFriend') {
        //chrome.runtime.sendMessage({type: "addFriend", tag_name: tag_name, friend_name: value})
        // locals
        let friend_name = value
        let focusingTag = tags.find((tag) => tag.tag_name === tag_name)
          if (focusingTag.people.some(e => e.realname === friend_name)) {
            console.log('this tag already has this friend')
          } else {
            focusingTag.people.push({realname: friend_name})
          }
        
        //sessionStorage.setItem('tags', data)
    }
    if(type === 'removeFriend') {
        //chrome.runtime.sendMessage({type: "removeFriend", tag_name: tag_name, friend_name: value})
        // locals
        let focusingTag = tags.find((tag) => tag.tag_name === tag_name)
          focusingTag.people = focusingTag.people.filter(person => person.realname != friend_name)
    }
    if(type === 'changeTagName') {
        chrome.runtime.sendMessage({type: "changeTagName", tag_name: tag_name, new_tag_name: value})
    }
    tags = JSON.stringify(tags)
    sessionStorage.setItem('tags', tags)
}

export { addTag, deleteTag, saveTags, updateTag }