
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

// The audio encoding and decoding logic follows Gemini Live API requirements.
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
  private inputAudioContext: AudioContext | null = null;
  private outputAudioContext: AudioContext | null = null;
  private nextStartTime = 0;
  private sources = new Set<AudioBufferSourceNode>();

  async start(onTranscription: (text: string, type: 'input' | 'output') => void) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const outputNode = this.outputAudioContext.createGain();
    outputNode.connect(this.outputAudioContext.destination);

    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Use a promise to handle the session connection as per guidelines to avoid race conditions.
    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks: {
        onopen: () => {
          const source = this.inputAudioContext!.createMediaStreamSource(this.stream!);
          const scriptProcessor = this.inputAudioContext!.createScriptProcessor(4096, 1, 1);
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
            // Solely rely on sessionPromise resolves to send realtime input.
            sessionPromise.then((session) => {
              session.sendRealtimeInput({ media: pcmBlob });
            });
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(this.inputAudioContext!.destination);
        },
        onmessage: async (message: LiveServerMessage) => {
          if (message.serverContent?.outputTranscription) {
            onTranscription(message.serverContent.outputTranscription.text, 'output');
          } else if (message.serverContent?.inputTranscription) {
            onTranscription(message.serverContent.inputTranscription.text, 'input');
          }

          const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64EncodedAudioString && this.outputAudioContext) {
            this.nextStartTime = Math.max(this.nextStartTime, this.outputAudioContext.currentTime);
            const audioBuffer = await decodeAudioData(decode(base64EncodedAudioString), this.outputAudioContext, 24000, 1);
            const sourceNode = this.outputAudioContext.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.connect(outputNode);
            sourceNode.start(this.nextStartTime);
            this.nextStartTime += audioBuffer.duration;
            this.sources.add(sourceNode);
            sourceNode.onended = () => this.sources.delete(sourceNode);
          }

          if (message.serverContent?.interrupted) {
            for (const s of this.sources) {
              try { s.stop(); } catch (e) {}
            }
            this.sources.clear();
            this.nextStartTime = 0;
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

    this.session = await sessionPromise;
  }

  stop() {
    this.session?.close();
    this.stream?.getTracks().forEach(t => t.stop());
    this.inputAudioContext?.close();
    this.outputAudioContext?.close();
    this.sources.forEach(s => { try { s.stop(); } catch (e) {} });
    this.sources.clear();
  }
}
