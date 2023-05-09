import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../utils/firebase-config"

function useAllTags(uid) {
    const [list, setList] = useState([])

    useEffect(() => {
        if (!uid) return

        return onSnapshot(
            collection(db, "customers", uid, "allTags"),
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

export default useAllTags
