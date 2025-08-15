#Mangoose

Mangoose is a Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model your application data.

prisma is a database-agnostic, type-safe database toolkit for Node.js and TypeScript. it is also the ORM for mongodb.

## Installation

```bash
npm install --save mongoose
```

## Usage

```javascript
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

## Models [for creating documents]

```javascript
const User = mongoose.model("User", {
  name: String,
  age: Number,
}); 
```
## Schema [for defining the structure of documents]

```javascript
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
```

## Queries [for fetching documents]

```javascript
const users = await User.find();
```

## Middleware [for modifying documents]

```javascript
User.pre("save", function (next) {
  this.age = this.age + 1;
  next();
});
```

## Validation [for validating documents]

```javascript
UserSchema.validate(function (v) {
  if (v.name.length < 3) {
    return false;
  }
  return true;
});
```

## select [for including or excluding fields]

```javascript
const users = await User.find().select("name age");
```

## insertMany [for inserting multiple documents]

```javascript
const users = await User.insertMany([
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
]);
```
