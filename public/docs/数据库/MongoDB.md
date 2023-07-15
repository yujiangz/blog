- [MongoDB](http://mongodb.github.io/node-mongodb-native/)
- [Perform CRUD Operations](https://www.mongodb.com/docs/mongodb-shell/crud/)



## 注意事项

- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/5.6/#connect-to-mongodb)
- [How to Use TypeScript with MongoDB Atlas]([TypeScript Integration With MongoDB Guide | MongoDB](https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial))

在运行命令前，需要指定数据库所在文件夹，默认为 `所在盘:/data/db`，没有则需要创建

```shell
$ mongod --dbpath=/data
```



## 数据库命令

```shell
# 查看所有数据库
$ show dbs

# 切换、如果没有则创建
$ use 数据库名

# 显示所在数据库
$ db

# 删除数据库，如 jiang
$ use jiang
$ db.dropDatabase()
```



## 集合命令

```shell
# 创建集合
$ db.createCollection(集合名称)

# 显示当前数据库的所有集合
$ show collections

# 删除某个集合
$ db.集合名.drop()

# 重命名集合
$ db.集合名.renameCollection(新名)
```



## 文档命令

```shell
# 插入文档对象
$ db.集合.insertOne(文档对象)
$ db.集合.insertMany([{}, {}])

# 查询文档
$ db.集合.find(查询条件)

# 更新文档
$ db.集合.update(查询条件, 新的文档)
$ db.集合.update({}, {})

# 删除文档
$ db.集合.remove(查询条件)
```

```shell
$ use jiang
$ db.createCollections('user');
$ db.user.insert({name: '张航', gender: '男', age: 25})
$ db.user.insert({name: '江', gender: '男', age: 25})
$ db.user.find({name: '江'})
# { "_id" : ObjectId("..."), name, '江', gender: '男', age: 25 }
$ db.user.update({name: '江'}, {age: 18})

```



## 和 ts

```typescript
import { MongoClient, Db, Collection } from "mongodb";
import dbconfig from "./dbconfig";

const collections: { users?: Collection } = {};

async function connectToDatabase() {
  const client: MongoClient = new MongoClient(dbconfig.DB_CONN_STRING);
  await client.connect();
  const db: Db = client.db(dbconfig.DB_NAME);
  const collection: Collection = db.collection(dbconfig.USERS_COLLECTION_NAME);
  collections.users = collection;
  //   const insertResult = await collection.insertMany([{ a: 9 }, { a: 3 }]);
  //   console.log("Inserted documents =>", insertResult);

  // const filteredDocs = await collection.find({}).toArray();
  // console.log("Found documents filtered by { } =>", filteredDocs);

  //   const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
  //   console.log("Updated documents =>", updateResult);

  //   const deleteResult = await collection.deleteMany({ a: 3 });
  //   console.log("Deleted documents =>", deleteResult);

  //   const indexName = await collection.createIndex({ a: 1 });
  //   console.log("index name =", indexName);

  return "done.";
}

connectToDatabase()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

```

