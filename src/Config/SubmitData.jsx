import { collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "./Firebase.jsx";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc } from "firebase/firestore";

async function submitDataToFirestore(dataModel, name) {
  const uuid = uuidv4();
  dataModel.id = uuid;

  //Saving data into Firestore
  const docRef = await setDoc(doc(db, name, uuid), dataModel);
}

export default submitDataToFirestore;
