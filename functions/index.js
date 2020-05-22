const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.updatePointsOnHour = functions.pubsub
  .schedule("every 2 minutes")
  .onRun((context) => {
    console.log(context);
    let db = admin.firestore();
    let batch = db.batch();
    let postRef = db.collection("posts");
    return db
      .collection("posts")
      .where(
        "dateCreated",
        "<",
        admin.firestore.Timestamp.fromDate(new Date(Date.now() - 3600000))
      )
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log(`down voting ${doc.id}`);
          batch.update(doc, {
            points: admin.firestore.FieldValue.increment(-1),
          });
        });
        console.log("down voting batched");
        return batch.commit();
      })
      .catch((err) => {
        console.error("error");
        console.error(JSON.stringify(err, undefined, 4));
      });
  });
