const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const book = require("./Schemas/book-Schema");
const user = require("./Schemas/user-Schema");
const cart = require("./Schemas/cart-Schema");

mongoose
  .connect(
    "mongodb+srv://admin:admin@bookhub.xq1w6fg.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("CONNECTED TO DATABASE!!"))
  .catch((err) => console.log(err));


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/app/showAllBooks", (req, res) => {
  book
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showAllUsers", (req, res) => {
  user
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showCart", (req, res) => {
  cart
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showBook/:id", (req, res) => {
  book
    .findOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showBooksBySeller/:sid", (req, res) => {
  book
    .find({ sid: req.params.sid })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showUser/:id", (req, res) => {
  user
    .findOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showCart/:id", (req, res) => {
  cart
    .find({ userid: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/getCartId", (req, res) => {
  cart
    .find()
    .then((data) => {
      let arr = data;
      let n = data.length - 1;
      res.status(200).send(arr[n]);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/getNameById/:id", (req, res) => {
  let id = req.body;
  let n = id.length;
  let names = [];
  console.log(id);

  console.log(names);
  res.status(200).send(names);
});

app.post("/app/addBook", (req, res) => {
  let newbook = new book({
    id: req.body.id,
    sid: req.body.sid,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    page: req.body.pages,
    cover: req.body.cover,
    sname: req.body.sname,
  });
  newbook
    .save()
    .then((book) => {
      res.status(201).send(book);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.post("/app/addUser", (req, res) => {
  let newuser = new user({
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  });
  newuser
    .save()
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.post("/app/addToCart/:uid/:bid", (req, res) => {
  let newcart = new cart({
    userid: req.params.uid,
    bookid: req.params.bid,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    page: req.body.page,
    cid: req.body.cid,
    quantity: 1,
  });
  newcart
    .save()
    .then((cart) => {
      res.status(201).send(cart);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put("/app/updateBook/:id", (req, res) => {
  let updatebook = {};
  if (req.body.name) {
    updatebook.name = req.body.name;
  }
  if (req.body.price) {
    updatebook.price = req.body.price;
  }
  if (req.body.description) {
    updatebook.description = req.body.description;
  }
  if (req.body.pages) {
    updatebook.page = req.body.pages;
  }
  if (req.body.cover) {
    updatebook.cover = req.body.cover;
  }

  book
    .updateOne({ id: req.params.id }, { $set: updatebook })
    .then(() => {
      res.status(200).send(updatebook);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put("/app/bookSell/:id/:cid", async (req, res) => {
  let ibook = 0;
  const name = req.body.buyer;
  const quantity = req.body.quantity;

  await book
    .findOne({ id: req.params.id })
    .then((book) => {
      ibook = book;
    })
    .catch((err) => {
      console.log(err);
    });

  let buid = ibook.buyerid;
  let buquantity = ibook.buyerquantity;

  let updateBook = {};
  let flag = true;

  let names = ibook.buyerid;
  let quan = ibook.buyerquantity;

  if (names === undefined && quan === undefined) {
    (names = ""), (quan = "");
  } else {
    names = names.split(",");
    quan = quan.split(",");
  }

  for (let i = 0; i < names.length; i++) {
    if (names[i] === name) {
      flag = false;
      quan[i] = (Number(quantity) + Number(quan[i])).toString();
    }
  }
  if (flag) {
    names = names + name.toString() + ",";
    quan = quan + quantity.toString() + ",";
  } else {
    names = names + "";
    quan = quan + "";
  }

  updateBook.selling = ibook.selling + 1 * quantity;
  updateBook.buyerid = names;
  updateBook.buyerquantity = quan;

  book
    .updateOne({ id: req.params.id }, { $set: updateBook })
    .then((updatedBook) => {
      res.status(200).send(updatedBook);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put("/app/updateUser/:id", (req, res) => {
  let updateuser = {};
  if (req.body.firstname != undefined) {
    updateuser.firstname = req.body.firstname;
  }
  if (req.body.lastname != undefined) {
    updateuser.lastname = req.body.lastname;
  }
  if (req.body.email != undefined) {
    updateuser.email = req.body.email;
  }
  if (req.body.role != undefined) {
    updateuser.role = req.body.role;
  }
  if (req.body.password != undefined) {
    updateuser.password = req.body.password;
  }
  user
    .updateOne({ id: req.params.id }, { $set: updateuser })
    .then((updatedUser) => {
      res.status(200).send(updatedUser);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put("/app/updateCartQuantity/:cid", (req, res) => {
  let updateCartBook = {};
  if (req.body.quantity != undefined) {
    updateCartBook.quantity = req.body.quantity;
  }

  cart
    .updateOne({ cid: req.params.cid }, { $set: updateCartBook })
    .then(() => {
      res.status(200).send(updateCartBook);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/app/deleteBook/:id", (req, res) => {
  book
    .deleteOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.delete("/app/deleteUser/:id", (req, res) => {
  user
    .deleteOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.delete("/app/deleteCart/:uid/:bid", (req, res) => {
  cart
    .deleteOne({ userid: req.params.uid } && { bookid: req.params.bid })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.listen(4000, () => console.log("Listening on port 4000"));
