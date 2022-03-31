const { Client } = require('@notionhq/client');


export default async function handler(req, res) {
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_INTEGRATION_TOKEN })
  const { title, priority, status, date, done, subtasks } = req.body

  let array = []
  subtasks.map((i)=>{
    const data = {
      object: 'block',
      type: "to_do",
      to_do: {
        rich_text: [{
          type: "text",
          text: {
            content: i,
          }
        }],
        checked: false,
        color: "default",
      }
    }
    array.push(data)
  })

  const data = await notion.pages.create({
    parent:{
      database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID
    },
    properties:{
      Name:{
        title:[{
          type: "text",
          text: {
            content: title
          }
        }]
      },
      priority:{
        select:{
          name: priority
        }
      },
      status:{
        select:{
          name: status
        }
      },
      date:{
        date:{
          start: date
        }
      },
      done:{
        checkbox: done
      }

    },
    children: array
  })

  return res.json(data)
}
