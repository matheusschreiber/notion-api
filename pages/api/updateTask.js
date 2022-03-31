const { Client } = require('@notionhq/client');

export default async function handler(req, res) {
  const { id, title, priority, status, date, done, subtasks } = req.body
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_INTEGRATION_TOKEN })
  
  const blocksResponseID = await notion.blocks.children.list({
    block_id: id,
    page_size: 50,
  })
  if (blocksResponseID.results.length>0){
    await Promise.all(blocksResponseID.results.map(async(i)=>{
      await notion.blocks.delete({ block_id: i.id })
    }))
  }
  
  const response = await notion.pages.update({
    page_id: id,
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
          name: done?"Completed":status
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
    }
  })

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

  const blocksResponse = await notion.blocks.children.append({
    block_id: id,
    children: array,
  })


  return res.json({response, blocksResponse})
}
