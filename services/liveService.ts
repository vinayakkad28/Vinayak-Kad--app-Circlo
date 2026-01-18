
import { GoogleGenAI, Modality } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let nextStartTime = 0;
let inputAudioContext: AudioContext | null = null;
let outputAudioContext: AudioContext | null = null;
let outputNode: GainNode | null = null;
let sources = new Set<AudioBufferSourceNode>();

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export class CircloLiveSession {
  private session: any = null;
  private stream: MediaStream | null = null;

  async start(onTranscription: (text: string, type: 'input' | 'output') => void) {
    inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    outputNode = outputAudioContext.createGain();
    outputNode.connect(outputAudioContext.destination);

    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    this.session = await ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks: {
        onopen: () => {
          const source = inputAudioContext!.createMediaStreamSource(this.stream!);
          const scriptProcessor = inputAudioContext!.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const l = inputData.length;
            const int16 = new Int16Array(l);
            for (let i = 0; i < l; i++) {
              int16[i] = inputData[i] * 32768;
            }
            const pcmBlob = {
              data: encode(new Uint8Array(int16.buffer)),
              mimeType: 'audio/pcm;rate=16000',
            };
            this.session.sendRealtimeInput({ media: pcmBlob });
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputAudioContext!.destination);
        },
        onmessage: async (message) => {
          if (message.serverContent?.outputTranscription) {
            onTranscription(message.serverContent.outputTranscription.text, 'output');
          } else if (message.serverContent?.inputTranscription) {
            onTranscription(message.serverContent.inputTranscription.text, 'input');
          }

          const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64EncodedAudioString) {
            nextStartTime = Math.max(nextStartTime, outputAudioContext!.currentTime);
            const audioBuffer = await decodeAudioData(decode(base64EncodedAudioString), outputAudioContext!, 24000, 1);
            const sourceNode = outputAudioContext!.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.connect(outputNode!);
            sourceNode.start(nextStartTime);
            nextStartTime += audioBuffer.duration;
            sources.add(sourceNode);
          }

          if (message.serverContent?.interrupted) {
            for (const s of sources) s.stop();
            sources.clear();
            nextStartTime = 0;
          }
        },
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
        outputAudioTranscription: {},
        inputAudioTranscription: {},
        systemInstruction: "You are Circlo's live voice companion. Speak naturally and helpfully about connections."
      },
    });
  }

  stop() {
    this.session?.close();
    this.stream?.getTracks().forEach(t => t.stop());
    inputAudioContext?.close();
    outputAudioContext?.close();
  }
}
