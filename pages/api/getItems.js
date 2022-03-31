// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Client } = require('@notionhq/client');


export default async function handler(req, res) {
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_INTEGRATION_TOKEN })
  const pages = await notion.databases.query({
    database_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID
  })

  const data = pages.results
  let output = []
  
  await Promise.all(data.map(async(i)=>{
    let page = {
      id: i.id,
      title: i.properties.Name.title[0].plain_text,
      date: i.properties.date.date.start,
      done: i.properties.done.checkbox,
      priority: i.properties.priority.select.name,
      status: i.properties.status.select.name,
      subtasks:[],
    }


    const blocks = await notion.blocks.children.list({
      block_id: i.id,
    });

    blocks.results.map((j)=>{
      page.subtasks.push(j.to_do.rich_text[0].text.content)
    })


    output.push(page)
  }))

  return res.json(output)
}
