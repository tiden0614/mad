var db_url = null;
if (process.env.SERVICES) {
  db_url = JSON.parse(process.env.SERVICES).url;
}

module.exports = {
  db: db_url || 'mongodb://6f5dd9e1-0965-4048-a573-6a6321fbe169:1ef2ac2d-b55a-4a6c-8d24-30d4af5fb7fe@192.155.243.27:10023/db',
  port: 3000,
  env: 'bluemix'
};