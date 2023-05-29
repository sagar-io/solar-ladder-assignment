import {createContext} from 'react'

const FirestoreContext = createContext(null)

const withFirestore = (Component) => (props) => (
    <FirestoreContext.Consumer>
      {firestore => <Component {...props} firestore={firestore}/>}
    </FirestoreContext.Consumer>
)

export {withFirestore}
export default FirestoreContext