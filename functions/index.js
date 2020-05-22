const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.updatePoints = functions.pubsub
  .schedule("every 5 minutes")
  .onRun((context) => {
    console.log(context);
    let db = admin.firestore();
    let batch = db.batch();
    let postRef = db.collection("posts");
    postRef
      .where(
        "dateCreated",
        "<",
        admin.firestore.Timestamp.fromDate(new Date(Date.now() - 3600000))
      )
      .orderBy("points", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          batch.update(doc, {
            points: admin.firestore.FieldValue.increment(-1),
          });
          console.log(`update ${doc.id}`);
        });

        return batch.commit();
      })
      .catch((err) => {
        console.log(err);
      });
  });
