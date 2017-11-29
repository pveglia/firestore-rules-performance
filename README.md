# firestore-rules-performance
Simple project to reproduce an performance issue with firestore and security rules.

An live example is available at https://firestore-rules-issue.firebaseapp.com/

This is a minimal example to reproduce the issue describe at https://stackoverflow.com/questions/47554645/firestore-updates-are-received-with-high-latency-when-security-rules-are-enabled.

## Reproduce

Create a new firebase project with hosting, functions and firestore. In the firestore administration page create a new document
at `/conversations/a-conversation` with the following data:

```
{
    counter: 1,
    token: "123456"
}
```

Clone this repository, cd to `./functions` and install dependencies with `npm install`.

Deploy web application and function with `firebase deploy`.