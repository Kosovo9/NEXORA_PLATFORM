// src/app/api/support/route.ts
import { NextRequest, NextResponse } from 'next/server'

// Base de conocimiento (puedes mover a Supabase si crece)
const KB = [
  {
    product: "SaaS-in-a-Box",
    info: "Incluye código fuente completo (Next.js + Tailwind), dashboard de administración, integración con Lemon Squeezy, y documentación técnica. Precio: $297 one-time."
  },
  {
    product: "AI Agent Suite",
    info: "Agentes autónomos para ventas (WhatsApp/LinkedIn), soporte post-compra y analytics en Slack. Precio: $197 one-time."
  },
  {
    product: "Funnel Pro",
    info: "Funnels de alto rendimiento: Lead Magnet, Webinar, High-Ticket Offer, Upsell. Incluye plantillas + automatización. Precio: $147 one-time."
  },
  {
    product: "Nexora Pro",
    info: "Acceso mensual a todas las herramientas + AMAs semanales. Precio: $29/mo con prueba gratis de 7 días."
  }
]

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  // Busca coincidencias simples (mejorable con embeddings)
  const productMatch = KB.find(k => 
    message.toLowerCase().includes(k.product.toLowerCase())
  )

  const context = productMatch ? productMatch.info : "No tengo información específica sobre eso."

  // Llama a Hugging Face (ej: DeepSeek-7B)
  try {
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/deepseek-ai/deepseek-coder-7b-instruct",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `Eres Nexora Support. Responde en el idioma del usuario. Usa SOLO esta info:\n${context}\n\nPregunta: ${message}\nRespuesta:`
        })
      }
    )

    const hfData = await hfRes.json()
    const reply = hfData?.generated_text?.split("Respuesta:")[1]?.trim() || 
                  "Gracias por tu pregunta. ¿Podrías reformularla?"

    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json({ 
      reply: "Voy a conectar con un humano. ¿Puedes dejarnos tu email o WhatsApp?" 
    })
  }
}