// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require('@notionhq/client');

export default async function handler(req, res) {
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_INTEGRATION_TOKEN })
  const pages = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_CALENDAR_DATABASE_ID,
    sorts:[
      {
        property: "Date",
        direction: "ascending"
      },
    ]
  })
  // return res.json(pages.results)

  let array = []

  pages.results.map((i)=>{
    let data = {
      id:i.id,
      date:i.properties.Date.date.start,
      title:i.properties.Name.title[0].text.content
    }
    array.push(data)
  })

  return res.json(array)
}
