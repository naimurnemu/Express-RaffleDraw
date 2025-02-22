const fs = require('fs');
const dbPath = "../data/db.json";


exports.readFile = async () => {
  const data = await fs.readFile(dbPath);
  return JSON.parse(data);
}

exports.writeFile = async (data) => {
  await fs.writeFile(dbPath, JSON.stringify(data))
}