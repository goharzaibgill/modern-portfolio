exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { messages } = JSON.parse(event.body);

    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Messages array required' }) };
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'API key not configured' }) };
    }

    const systemPrompt = `You are an AI assistant for Gohar Zaib Gill's portfolio. He is a Full-Stack Developer & BSIT student at Superior University Faisalabad. CGPA 3.77, Honhaar Scholar. Projects: Election System (React/Node/PostgreSQL/WebSockets), Software House site, NGO Platform, CGPA Calculator, Resume Builder. Skills: HTML, CSS, JS, React, Node.js, Express, PostgreSQL, Supabase, C++, PHP, SQL. Contact: masharfgill229@gmail.com | +92 307 4851435 | github.com/goharzaibgill. Keep answers short (2-4 sentences), friendly and professional.`;

    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: chatMessages,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenRouter API error:', response.status, err);
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'AI service unavailable', details: err }) };
    }

    const data = await response.json();
    console.log('OpenRouter response status:', response.status, 'Model:', data.model, 'Usage:', data.usage);
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error('Function error:', err.message, err.stack);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal server error', details: err.message }) };
  }
};
