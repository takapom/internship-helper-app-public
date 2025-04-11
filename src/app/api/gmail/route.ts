// // app/api/gmail/route.ts
// import { NextRequest, NextResponse } from "next/server"

// export async function POST(req: NextRequest) {
//   const { accessToken } = await req.json()

//   // 1. メールID一覧を取得
//   const listRes = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5", {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   })

//   const listData = await listRes.json()
//   const messages = listData.messages || []

//   const detailedMessages = await Promise.all(
//     messages.map(async (msg: any) => {
//       const msgRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       const msgData = await msgRes.json()

//       // 件名の取得
//       const headers = msgData.payload.headers
//       const subjectHeader = headers.find((h: any) => h.name === "Subject")
//       const subject = subjectHeader ? subjectHeader.value : "（件名なし）"

//       // 本文の取得（プレーンテキスト or HTMLのbase64データ）
//       let body = ""
//       if (msgData.payload.parts) {
//         const part = msgData.payload.parts.find((p: any) => p.mimeType === "text/plain")
//         if (part?.body?.data) {
//           body = Buffer.from(part.body.data, "base64").toString("utf-8")
//         }
//       } else if (msgData.payload.body?.data) {
//         body = Buffer.from(msgData.payload.body.data, "base64").toString("utf-8")
//       }

//       return {
//         id: msg.id,
//         subject,
//         body,
//       }
//     })
//   )

//   return NextResponse.json(detailedMessages)
// }


// app/api/gmail/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { accessToken } = await req.json()

  // 1. メールID一覧を取得
  const listRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&q=is:inbox",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const listData = await listRes.json()
  console.log("🔍 Gmail list response:", JSON.stringify(listData, null, 2)) // ← ここで中身確認

  const messages = listData.messages || []

  if (messages.length === 0) {
    console.log("⚠️ メッセージが見つかりません")
    return NextResponse.json([])
  }

  const detailedMessages = await Promise.all(
    messages.map(async (msg: any) => {
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
      const headers = msgData.payload.headers
      const subjectHeader = headers.find((h: any) => h.name === "Subject")
      const subject = subjectHeader ? subjectHeader.value : "（件名なし）"

      // 本文の取得（base64）
      let body = ""
      if (msgData.payload.parts) {
        const part = msgData.payload.parts.find((p: any) => p.mimeType === "text/plain")
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
