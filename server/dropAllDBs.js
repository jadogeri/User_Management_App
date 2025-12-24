const databasesToSkip = ['admin', 'local', 'config'];

db.getMongo().getDBNames().forEach((dbname) => {
  if (databasesToSkip.includes(dbname)) {
    print(`Skipping ${dbname}`);
  } else {
    print(`Dropping ${dbname}...`);
    db.getMongo().getDB(dbname).dropDatabase();
  }
});
