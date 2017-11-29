document.addEventListener('DOMContentLoaded', function () {

    let counter;
    let buttonElem = document.getElementById('button');
    buttonElem.addEventListener('click', async () => {
        counter++;
        try{
            console.log('sending value:', counter);
            let res = await fetch('https://us-central1-firestore-rules-issue.cloudfunctions.net/updateConversation?counter=' + counter);
            console.log(`function returned: "${await res.text()}"`);
        } catch (e) {
            console.log('fetch error', e);
        }
    });
    try {
        let listElem = document.getElementsByClassName("list")[0];

        firebase.firestore().doc('/conversations/a-conversation').onSnapshot(snapshot => {
            if (counter === undefined) {
                counter = snapshot.data().counter;
                buttonElem.disabled = false;
            }
            let newItem = document.createElement('li');
            newItem.innerHTML = '' + snapshot.data().counter;
            listElem.appendChild(newItem);
            console.log('received db update:', snapshot.data().counter);
        }, error => {
            console.log('error on snapshot', error);
        });
    } catch (e) {
        console.log('error', e);
    }
});