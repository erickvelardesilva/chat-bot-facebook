const { Router } = require("express");

const router = Router();
const verify_token = process.env.VERIFY_TOKEN;

router.get("/hello", (_req, res) => {
  res.json({ message: "hello world" });
});

router.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === verify_token) {
    console.log("webhook verified");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("verification failed. Token mismatch.");
    res.sendStatus(403);
  }
});

router.post("/webhook", (req, res) => {
  if (req.body.object === "page") {
    for (const entry of req.body.entry) {
      for (const event of entry.messaging) {
        console.log(event);
        if (event.postback) {
          processPostback(event);
        } else if (event.message) {
          processMessage(event);
        }
      }
    }
    res.sendStatus(200);
  }
});

module.exports = router;
//
// const processPostback = require("./postback");
// const processMessage = require("./messages");
// module.exports = function (router, chalk) {
//   router.get("/hello", function (_req, res) {
//     res.json({ message: "hello world" });
//   });
//
//   router.get("/webhook", function (req, res) {
//     if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
//       console.log("webhook verified");
//       res.status(200).send(req.query["hub.challenge"]);
//     } else {
//       console.error("verification failed. Token mismatch.");
//       res.sendStatus(403);
//     }
//   });
//
//   router.post("/webhook", function (req, res) {
//     //checking for page subscription.
//     if (req.body.object === "page") {
//       [> Iterate over each entry, there can be multiple entries
//        if callbacks are batched. */ req.body.entry.forEach(function (entry) {
//         // Iterate over each messaging event
//         entry.messaging.forEach(function (event) {
//           console.log(event);
//           if (event.postback) {
//             processPostback(event);
//           } else if (event.message) {
//             processMessage(event);
//           }
//         });
//       });
//       res.sendStatus(200);
//     }
//   });
// };
