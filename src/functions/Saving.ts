import uniqid from 'uniqid';

const chrome = window.chrome

const addTag = (tag_name: string, color: string, people: Array<String>) => { 
  let tags = JSON.parse(sessionStorage.getItem('tags') as string)

    //chrome.runtime.sendMessage({type: "addTag", tag_name: tag_name, color: color, people: people});
    if (!tags.some((e: any )=> e.tag_name === tag_name)) {
        tags.push({
          id: uniqid(), tag_name: tag_name, color: color, folded: false, editing: true, people: people })
      } else {
        console.log('this tag already exists')
      }
}

const deleteTag = (tag_name: string) => {
  let tags = JSON.parse(sessionStorage.getItem('tags') as string)
 
    tags = tags.filter((tag: any) => {
        return tag.tag_name != tag_name;
      });
}

const saveTags = (tags: any) => {
    chrome.runtime.sendMessage({type: "saveTags", tags: JSON.stringify(tags)})
}

const updateTag = (type: string, tag_name: string, value: any) => {
    let tags = JSON.parse(sessionStorage.getItem('tags') as string)
    if( type === 'addFriend') {
      console.log('adding friend: ' + value + '   to tag: ' + tag_name)
      //chrome.runtime.sendMessage({type: "addFriend", tag_name: tag_name, friend_name: value})
      // locals
      const friend_name = value
      let focusingTag = tags.find((tag: any) => tag.tag_name === tag_name)
      if(focusingTag) {
        console.log('fct: ')
        console.log( focusingTag)
        if (focusingTag.people.some((e: any) => e.realname === friend_name)) {
          console.log('this tag already has this friend')
        } else {
          focusingTag.people.push({realname: friend_name})
          console.log('added friend to tag`s people array:  ')
        }
      } else console.log('this Tag doesnt exists: ' + tag_name)
      
      
      //sessionStorage.setItem('tags', data)
    }
    if(type === 'removeFriend') {
      console.log('removing friend: ' + value + ' from tag: ' + tag_name)
        //chrome.runtime.sendMessage({type: "removeFriend", tag_name: tag_name, friend_name: value})
        // locals
        const friend_name = value
        let focusingTag = tags.find((tag: any) => tag.tag_name === tag_name)
        focusingTag.people = focusingTag.people.filter((person: any )=> person.realname != friend_name)
    }
    if(type === 'changeTagName') {
        chrome.runtime.sendMessage({type: "changeTagName", tag_name: tag_name, new_tag_name: value})
    }
    tags = JSON.stringify(tags)
    sessionStorage.setItem('tags', tags)
    console.log('tags saved, strintyfied, result: ')
    console.log(JSON.parse(sessionStorage.getItem('tags') as string))
    
}

const updateFriend = (friend_name: string, tags_names: Array<any>) => {
  // is looking for tags which contains friend_name and for this tags check if its chcked, if not then delete and if yes then add
  let tags = JSON.parse(sessionStorage.getItem('tags') as string)
  let tags_to_add: Array<string> = []
  let tags_to_delete: Array<string> = []
  tags.forEach((tag: any) => {
    if(tags_names.find((tg) => tg === tag.tag_name)) tags_to_add.push(tag)
    else tags_to_delete.push(tag)
  })

  console.log('tags to delete: ')
  console.log(tags_to_delete)
  console.log('tags to add: ' + tags_to_add)
  console.log(tags_to_add)

  tags_to_add.forEach((tag: any) => {
    console.log('tag to add, tag-name: ' + tag.tag_name + " friend_name: " + friend_name)
    updateTag('addFriend', tag.tag_name, friend_name)
  })

  tags_to_delete.forEach((tag: any) => {
    console.log('tag to delete, tag-name: ' + tag.tag_name + " friend_name: " + friend_name)
    updateTag('removeFriend', tag.tag_name, friend_name)
  })


  console.log("friend updated as: ")
  console.log(JSON.parse(sessionStorage.getItem('tags') as string))
  sessionStorage.setItem('tags', sessionStorage.getItem('tags') as string)

  //chrome.runtime.sendMessage({type: "updateFriend", friend_name: friend_name, tags: tags})
}

export { addTag, deleteTag, saveTags, updateTag, updateFriend }