#Mangoose

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

## Models

```javascript
const User = mongoose.model("User", {
  name: String,
  age: Number,
});
```

## Queries

```javascript
const users = await User.find();
```

## Middleware

```javascript
User.pre("save", function (next) {
  this.age = this.age + 1;
  next();
});
```

## Validation

```javascript
UserSchema.validate(function (v) {
  if (v.name.length < 3) {
    return false;
  }
  return true;
});
```

## select

```javascript
const users = await User.find().select("name age");
```

## insertMany

```javascript
const users = await User.insertMany([
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
]);
```
