import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { subject, body } = await req.json()
  console.log("Difyに送信中:", { subject, body })

  const workflowId = process.env.DIFY_WORKFLOW_ID
  const apiKey = process.env.DIFY_API_KEY

  if (!workflowId || !apiKey) {
    return NextResponse.json(
      { error: 'Missing Dify config' },
      { status: 500 }
    )
  }

  const url = `https://cloud.dify.ai/v1/workflows/${workflowId}/execute`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: { subject, body },
        response_mode: 'blocking',
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("Dify API error:", errorText)
      return NextResponse.json({ error: true, detail: errorText }, { status: 500 })
    }

    const data = await res.json()
    console.log("Difyレスポンス:", data) // ←② ここ！
    return NextResponse.json(data)

  } catch (err) {
    console.error("Unexpected error:", err)
    console.error("Dify APIエラー:", err)
    return NextResponse.json({ error: true, message: 'Internal error' }, { status: 500 })
  }
}
