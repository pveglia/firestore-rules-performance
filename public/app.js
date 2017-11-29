document.addEventListener('DOMContentLoaded', function () {

    let counter;
    let buttonElem = document.getElementById('button');
    buttonElem.addEventListener('click', async () => {
        counter++;
        console.log('click', counter);
        try{
            let res = await fetch('https://us-central1-firestore-rules-issue.cloudfunctions.net/updateConversation?counter=' + counter);
            console.log('fetch result', res);
        } catch (e) {
            console.log('fetch error', e);
        }
    });
    try {
        let listElem = document.getElementsByClassName("list")[0];

        firebase.firestore().doc('/conversations/a-conversation').onSnapshot(snapshot => {
            console.log('snapshot', snapshot.data());
            if (counter === undefined) {
                counter = snapshot.data().counter;
                buttonElem.disabled = false;
            }
            let newItem = document.createElement('li');
            newItem.innerHTML = '' + snapshot.data().counter;
            listElem.appendChild(newItem); 
        }, error => {
            console.log('error on snapshot', error);
        });
    } catch (e) {
        console.log('error', e);
    }
});