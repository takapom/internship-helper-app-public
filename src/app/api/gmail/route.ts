import { NextRequest, NextResponse } from "next/server"

type GmailMessage = {
  id: string
}

type GmailHeader = {
  name: string
  value: string
}

type GmailPart = {
  mimeType: string
  body?: {
    data?: string
  }
}

export async function POST(req: NextRequest) {
  const { accessToken } = await req.json()

  const listRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&q=is:inbox",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const listData = await listRes.json()
  console.log("🔍 Gmail list response:", JSON.stringify(listData, null, 2))

  const messages: GmailMessage[] = listData.messages || []

  if (messages.length === 0) {
    console.log("⚠️ メッセージが見つかりません")
    return NextResponse.json([])
  }

  const detailedMessages = await Promise.all(
    messages.map(async (msg) => {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const msgData = await msgRes.json()

      // 件名の取得
      const headers = msgData.payload.headers as GmailHeader[]
      const subjectHeader = headers.find((h) => h.name === "Subject")
      const subject = subjectHeader ? subjectHeader.value : "（件名なし）"

      // 本文の取得（base64）
      let body = ""
      if (msgData.payload.parts) {
        const parts = msgData.payload.parts as GmailPart[]
        const part = parts.find((p) => p.mimeType === "text/plain")
        if (part?.body?.data) {
          body = Buffer.from(part.body.data, "base64").toString("utf-8")
        }
      } else if (msgData.payload.body?.data) {
        body = Buffer.from(msgData.payload.body.data, "base64").toString("utf-8")
      }

      return {
        id: msg.id,
        subject,
        body,
      }
    })
  )

  return NextResponse.json(detailedMessages)
}
