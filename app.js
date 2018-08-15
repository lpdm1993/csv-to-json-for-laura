const fs = require('fs')
const parse = require('csv-parse/lib/sync')

const csvFilePath = './data.csv'
const jsonOutputPath = './payload.json'

let contents = fs.readFileSync(csvFilePath, 'utf8')
let results = parse(contents, { columns: true })

var now = new Date();

payload = {
  meta: {
    created_at: now.toISOString(),
    feed_name: 'The corporations'
  },
  settings: {
    version: "0.0.1"
  },
  data: {
    companies: []
  }
}

results.forEach(x => {
  let address = {
    line_1: x.address_line1,
    line_2: x.address_line2,
    postal_code: x.postal_code
  }
 
  let company = {
    object_type: "company",
    external_id: x.id,
    status: "live",
    name: x.name,
    last_modified: now.toISOString(),
    address: address,
    timezone: x.timezone
  }

  payload.data.companies.push(company)
})

fs.writeFileSync(jsonOutputPath, JSON.stringify(payload,null,4));
