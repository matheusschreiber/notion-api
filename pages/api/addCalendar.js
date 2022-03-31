const { Client } = require('@notionhq/client');

export default async function handler(req, res) {
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_INTEGRATION_TOKEN })
  const { title, date, time } = req.body


  const data = await notion.pages.create({
    parent:{
      database_id: process.env.NEXT_PUBLIC_NOTION_CALENDAR_DATABASE_ID
    },
    properties:{
      Name:{
        title:[{
          type: "text",
          text: {
            content: `${time} ${title}`
          }
        }]
      },
      Date:{
        date:{
          start: date
        }
      }
    }
  })

  return res.json(data)
}
