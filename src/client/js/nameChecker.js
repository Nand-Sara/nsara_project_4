function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = inputText.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(names === null) {
        return false;
    }
    else{
        return true;
    }
}

export { checkForName }