const { Client } = require('@notionhq/client');

export default async function handler(req, res) {
  const { id } = req.body
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_INTEGRATION_TOKEN })
  const response = await notion.blocks.delete({
    block_id: id
  })

  return res.json(response)
}
