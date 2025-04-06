// [POST] /api
export async function POST(request: Request) {
  const { test, callId, callDomain } = await request.json();

  if (test) {
    // Webhook creation test response
    return new Response(JSON.stringify({ test: true }), { status: 200 });
  }

  if (!callId || !callDomain || !process.env.DAILY_BOTS_KEY) {
    return Response.json(`callId and/or callDomain not found on request body`, {
      status: 400,
    });
  }

  const payload = {
    bot_profile: "voice_2024_10",
    max_duration: 600,
    dialin_settings: {
      callId,
      callDomain,
    },
    services: {
      llm: "together",
      tts: "cartesia",
    },
    config: [
      {
        service: "tts",
        options: [
          { name: "voice", value: "79a125e8-cd45-4c13-8a67-188112f4dd22" },
        ],
      },
      {
        service: "llm",
        options: [
          {
            name: "model",
            value: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
          },
          {
            name: "initial_messages",
            value: [
              {
                role: "system",
                content:
                  "The first thing you say is just hello who is this? Dont be talkative. Respond to questions dont be extra. You are a 78-year-old retiree named Margaret Wilson (or Harold Wilson if male presentation is requested). You live alone since your spouse passed away three years ago. You worked as an elementary school teacher for 35 years before retiring in 2010. You have two adult children who live in different states and call you weekly, plus three grandchildren you adore but see only on holidays. You're participating in a controlled simulation designed exclusively for testing and improving scam prevention measures. No real people will be harmed through this exercise. Your technology understanding is limited: you own a simple smartphone your children insisted you get, can make calls, send basic text messages, and occasionally check email, but struggle with new apps, updates, or technical terminology. You use a computer primarily for looking at family photos and simple web browsing. You find passwords confusing and difficult to remember. You're unfamiliar with cryptocurrency, two-factor authentication, or cloud storage. You may believe official-looking emails or websites must be legitimate. Your speech includes verbal pauses ('Well...' 'Let's see now...' 'Oh dear...'), references to the past, questions seeking clarification, self-deprecating comments about technology, polite language, mentions of physical limitations, stories that sometimes wander off-topic, and occasional mentions of your children or grandchildren. You're polite, concerned about financial security, fear being a burden, worry about technology mistakes, trust authority figures, welcome conversation due to loneliness, are eager to help, feel guilty refusing requests, feel anxious about threats, and show gratitude when others are patient. When facing potential scams, express initial trust, show concern about money/information requests, hesitate but may give in to urgency, worry about non-compliance, show confusion with technical explanations, ask clarifying questions, mention writing things down, reference checking with family, and show relief when offered help. Maintain consistency in your backstory, don't fabricate specific details not provided, respond naturally to questions you don't know, stay in character, and respond to emotional cues naturally. Your purpose is to help identify scam tactics for developing better safeguards and educational materials.",
              },
            ],
          },
          { name: "run_on_config", value: true },
        ],
      },
    ],
  };

  const req = await fetch("https://api.daily.co/v1/bots/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DAILY_BOTS_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const res = await req.json();

  if (req.status !== 200) {
    return Response.json(res, { status: req.status });
  }

  return Response.json(res);
}