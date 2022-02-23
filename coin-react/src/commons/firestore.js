import * as app from './firebase';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
const db = getFirestore();

export const addUser = async (uid, email, name, address) => {
  const usersCol = collection(db, 'users');
  const res = await addDoc(usersCol, {
    uid,
    email,
    name,
    address,
  });
  return res;
};

export const getUser = async (uid) => {
  const usersCol = query(collection(db, 'users'), where('uid', '==', uid));
  const res = await getDocs(usersCol);
  return res;
};

export const getCreators = async () => {
  const collections = query(collection(db, 'creators'));
  const res = await getDocs(collections);
  return res.docs.map((creator) => {
    return {
      id: creator.id,
      ...creator.data(),
    };
  });
};

export const getMintingInfo = async (uid) => {
  const collections = query(collection(db, 'minting'), where('creator_id', '==', uid));
  const res = await getDocs(collections);
  return res.docs.map((mintingInfo) => {
    return {
      id: mintingInfo.id,
      ...mintingInfo.data(),
    };
  });
};

export const findCreators = async (uid) => {
  const collections = query(collection(db, 'creators'), where('user_id', '==', uid));
  const res = await getDocs(collections);
  return res.docs.map((creator) => {
    return {
      id: creator.id,
      ...creator.data(),
    };
  });
};

export const addCreator = async (user_id, description, link, channel_id, apply_flag, image_url, name) => {
  const creatorCol = collection(db, 'creators');
  const res = await addDoc(creatorCol, {
    user_id,
    description,
    link,
    channel_id,
    apply_flag,
    image_url,
    name
  });
  return res;
};

export const addTest = async () => {
  console.log('test');
  const citiesCol = collection(db, 'cities');
  const res = await addDoc(citiesCol, {
    test: 123,
  });
  console.log(res);
};
