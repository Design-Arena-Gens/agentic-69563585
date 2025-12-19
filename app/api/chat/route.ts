import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages, agent } = await req.json()

    // Demo response - In production, integrate with actual AI API
    const response = {
      role: 'assistant',
      content: `${agent.name} demo yanıtı: Gerçek AI entegrasyonu için API anahtarları gereklidir. Son mesajınız: "${messages[messages.length - 1]?.content}"`
    }

    return NextResponse.json({ message: response })
  } catch (error) {
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}
