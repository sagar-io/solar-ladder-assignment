import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  updateDoc,
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBp6pKkWIOcfi74ZXJxZx_LSYGe-1lHUY",
  authDomain: "solar-ladder-db.firebaseapp.com",
  projectId: "solar-ladder-db",
  storageBucket: "solar-ladder-db.appspot.com",
  messagingSenderId: "498846212932",
  appId: "1:498846212932:web:5a7b74da4384d2b7776d11",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

class FireStore {
  addData = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "inventories"), data);
      return docRef.id;
    } catch (err) {
      console.log("Error while adding Data", err);
    }
  };

  uploadImgs = async (imgFiles, data) => {
    let imgDownloadUrls = [];
    await Promise.all(
      imgFiles.map(async (img) => {
        const imgRef = ref(storage, `inventories/${img.path}`);
        await uploadBytes(imgRef, img);
        const downloadURL = await getDownloadURL(imgRef);
        imgDownloadUrls.push(downloadURL);
      })
    );
    data["images"] = JSON.parse(JSON.stringify(imgDownloadUrls));
    await this.addData(data);
  };

  getData = (setInventoryData) => {
    const unSub = onSnapshot(
      collection(db, "inventories"),
      (snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
          const obj = doc.data();
          Object.assign(obj, { id: doc.id });
          data.push(obj);
        });
        setInventoryData(data);
      },
      (error) => {
        console.log(error);
      }
    );
     return unSub;
  };
  updateDoc = async (id, imgFiles, preImageUrls, updatedData) => {
    let imgDownloadUrls = [...preImageUrls]
    await Promise.all(
      imgFiles.map(async (img) => {
        const imgRef = ref(storage, `inventories/${img.path}`);
        await uploadBytes(imgRef, img);
        const downloadURL = await getDownloadURL(imgRef);
        // console.log("downloadurl", downloadURL);
        imgDownloadUrls.push(downloadURL);
      })
    );
    updatedData["images"] = JSON.parse(JSON.stringify(imgDownloadUrls));
    try {
      const docRef = doc(db, "inventories", id);
      const res = await updateDoc(docRef, updatedData);
      // console.log(res)
    } catch (error) {
      console.log("Error while Updating: ", error);
    }
  };
  adjustDoc = async (id, updatedData) => {
    try {
      const docRef = doc(db, "inventories", id);
      const res = await updateDoc(docRef, updatedData);
      console.log(res);
    } catch (error) {
      console.log("Error while Updating: ", error);
    }
  };

  deleteItems = async (id) => {
    try {
      await deleteDoc(doc(db, "inventories", id));
    } catch (error) {
      console.log("Error while Deleting", error);
    }
  };
}
export default FireStore;
