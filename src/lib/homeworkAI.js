const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

const CATEGORY_LABELS = {
  'general': 'General',
  'journaling': 'Journaling',
  'parts-work': 'Parts Work',
  'meditation': 'Meditation',
  'exercise': 'Exercise',
  'reading': 'Reading',
  'self-care': 'Self-Care',
};

function getApiKey() {
  return import.meta.env.VITE_PERPLEXITY_API_KEY || null;
}

async function generateHomework({ woundType, secondaryWound, category, guidance, clientName }) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('AI features require a Perplexity API key. Add VITE_PERPLEXITY_API_KEY to your environment.');
  }

  const systemPrompt = `You are an expert Internal Family Systems (IFS) therapist creating homework assignments for clients. 
You create specific, actionable, compassionate homework that helps clients engage with their inner parts and healing journey.
All assignments should be grounded in IFS concepts (parts, Self-energy, exiles, protectors, unburdening).
Keep instructions clear and approachable — clients are doing self-therapy, not clinical work.
Do not diagnose or give medical advice.`;

  const categoryInstruction = category && category !== 'general'
    ? `The homework should be in the "${CATEGORY_LABELS[category] || category}" category.`
    : 'Choose the most appropriate category from: General, Journaling, Parts Work, Meditation, Exercise, Reading, Self-Care.';

  const woundContext = woundType
    ? `The client's primary wound is "${woundType}"${secondaryWound ? ` with a secondary wound of "${secondaryWound}"` : ''}. Tailor the homework to address this wound pattern.`
    : 'No specific wound type is identified yet. Create general IFS-based homework.';

  const guidanceNote = guidance
    ? `The advisor has these additional notes: "${guidance}"`
    : '';

  const userPrompt = `Create a single homework assignment for an IFS self-therapy client.

${woundContext}
${categoryInstruction}
${guidanceNote}

Respond in EXACTLY this format (keep labels on their own lines):
TITLE: [A clear, engaging title for the assignment]
CATEGORY: [One of: general, journaling, parts-work, meditation, exercise, reading, self-care]
PRIORITY: [One of: low, normal, high]
DESCRIPTION: [Detailed, step-by-step instructions for the client. 3-6 sentences. Be specific and compassionate. Include what they should do, how long it might take, and what to reflect on afterward.]`;

  const response = await fetch(PERPLEXITY_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 400,
      temperature: 0.8,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`AI request failed (${response.status}): ${errText || 'Unknown error'}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('AI returned an empty response. Please try again.');
  }

  return parseSingleHomework(content);
}

async function generateHomeworkBatch({ woundType, secondaryWound, guidance, clientName, count = 4 }) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('AI features require a Perplexity API key. Add VITE_PERPLEXITY_API_KEY to your environment.');
  }

  const systemPrompt = `You are an expert Internal Family Systems (IFS) therapist creating homework assignments for clients. 
You create specific, actionable, compassionate homework that helps clients engage with their inner parts and healing journey.
All assignments should be grounded in IFS concepts (parts, Self-energy, exiles, protectors, unburdening).
Keep instructions clear and approachable — clients are doing self-therapy, not clinical work.
Each assignment should be different in category and approach to give the advisor variety to choose from.
Do not diagnose or give medical advice.`;

  const woundContext = woundType
    ? `The client's primary wound is "${woundType}"${secondaryWound ? ` with a secondary wound of "${secondaryWound}"` : ''}. Tailor assignments to address this wound pattern.`
    : 'No specific wound type is identified yet. Create general IFS-based homework.';

  const guidanceNote = guidance
    ? `The advisor has these additional notes: "${guidance}"`
    : '';

  const userPrompt = `Create ${count} different homework assignments for an IFS self-therapy client. Use a variety of categories.

${woundContext}
${guidanceNote}

For EACH assignment, use EXACTLY this format (separate each assignment with a blank line):

TITLE: [A clear, engaging title]
CATEGORY: [One of: general, journaling, parts-work, meditation, exercise, reading, self-care]
PRIORITY: [One of: low, normal, high]
DESCRIPTION: [Detailed instructions, 3-5 sentences. Be specific and compassionate.]

---

TITLE: [Next assignment title]
CATEGORY: ...
PRIORITY: ...
DESCRIPTION: ...`;

  const response = await fetch(PERPLEXITY_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 1500,
      temperature: 0.85,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`AI request failed (${response.status}): ${errText || 'Unknown error'}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('AI returned an empty response. Please try again.');
  }

  return parseBatchHomework(content);
}

function parseSingleHomework(text) {
  const title = extractField(text, 'TITLE');
  const category = normalizeCategory(extractField(text, 'CATEGORY'));
  const priority = normalizePriority(extractField(text, 'PRIORITY'));
  const description = extractField(text, 'DESCRIPTION');

  if (!title || !description) {
    throw new Error('AI response was not in the expected format. Please try again.');
  }

  return { title, category, priority, description };
}

function parseBatchHomework(text) {
  const blocks = text.split(/---+|\n\n(?=TITLE:)/i).filter(b => b.trim());
  const results = [];

  for (const block of blocks) {
    try {
      const title = extractField(block, 'TITLE');
      const category = normalizeCategory(extractField(block, 'CATEGORY'));
      const priority = normalizePriority(extractField(block, 'PRIORITY'));
      const description = extractField(block, 'DESCRIPTION');

      if (title && description) {
        results.push({ title, category, priority, description });
      }
    } catch {
      continue;
    }
  }

  if (results.length === 0) {
    throw new Error('Could not parse any homework suggestions from the AI response. Please try again.');
  }

  return results;
}

function extractField(text, fieldName) {
  const regex = new RegExp(`${fieldName}:\\s*(.+?)(?=\\n(?:TITLE|CATEGORY|PRIORITY|DESCRIPTION):|---+|$)`, 'is');
  const match = text.match(regex);
  if (!match) return '';
  return match[1].trim().replace(/^\*\*|\*\*$/g, '').replace(/^["']|["']$/g, '').trim();
}

function normalizeCategory(raw) {
  if (!raw) return 'general';
  const lower = raw.toLowerCase().replace(/\s+/g, '-');
  const valid = ['general', 'journaling', 'parts-work', 'meditation', 'exercise', 'reading', 'self-care'];
  if (valid.includes(lower)) return lower;
  for (const v of valid) {
    if (lower.includes(v.replace('-', '')) || lower.includes(v)) return v;
  }
  return 'general';
}

function normalizePriority(raw) {
  if (!raw) return 'normal';
  const lower = raw.toLowerCase();
  if (lower.includes('high')) return 'high';
  if (lower.includes('low')) return 'low';
  return 'normal';
}

export { generateHomework, generateHomeworkBatch };
