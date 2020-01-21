import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCako2LK4vKFgRME9sFxlJ76ib-80lW3Fc',
        authDomain: 'chatmap-785dc.firebaseapp.com',
        databaseURL: 'https://chatmap-785dc.firebaseio.com',
        projectId: 'chatmap-785dc',
        storageBucket: 'chatmap-785dc.appspot.com',
        messagingSenderId: '220595875082',
        appId: '1:220595875082:web:1fdf259b5cbf2bc9e8def3',
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged(users => {
      if (!users) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = messages => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        users: item.users,
      };

      this.db.push(message);
    });
  };

  parse = message => {
    const {users, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      users,
    };
  };

  get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref('messages');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
