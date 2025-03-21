export const defaultBotProfile = "voice_2024_10";

export const defaultServices = {
  stt: "deepgram",
  llm: "anthropic",
  tts: "cartesia",
};

export const defaultServiceOptions = {
  service_options: {
    deepgram: {
      model: "nova-2-general",
      language: "en",
    },
    anthropic: {
      model: "claude-3-5-sonnet-latest",
    },
  },
};

export const defaultConfig = [
  {
    service: "tts",
    options: [{ name: "voice", value: "d46abd1d-2d02-43e8-819f-51fb652c1c61" }],
  },
  {
    service: "llm",
    options: [
      {
        name: "initial_messages",
        value: [
          {
            // anthropic: user; openai: system

            role: "system",
            content: "You are a helpful voice bot.",
          },
        ],
      },
      { name: "run_on_config", value: true },
    ],
  },
];

// These are your app's endpoints, which are used to initiate the /bots/start
// API call or initiate actions
export const defaultEndpoints = {
  connect: "/connect",
  actions: "/actions",
};