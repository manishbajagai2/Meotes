import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../utils/firebase-config"

function useAllNotes(uid) {
    const [list, setList] = useState([])

    useEffect(() => {
        if (!uid) return

        return onSnapshot(
            collection(db, "customers", uid, "allNotes"),
            (snapshot) => {
                setList(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                )
            }
        )
    }, [uid])

    return list
}

export default useAllNotes
