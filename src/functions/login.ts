const login = async () => {
    await fetch('https://chatsorter.herokuapp.com/auth/login/', {
        mode: "cors",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: "alex", password: "Mandragora11"})
    })
    .then((res) => res.json())
    .then((data) => {console.log(data)})

    // now save key somewhere yea?
};


export { login }