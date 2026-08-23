/**
 * Modular AI provider architecture — spec §14.
 *
 * The OS must never be tightly coupled to one vendor. Every generation call
 * goes through one of these interfaces; concrete adapters (OpenAI, Anthropic,
 * ElevenLabs, HeyGen, Kling, Runway, …) land in Phase 10 and register
 * themselves in `registry.ts`. Nothing above this layer imports a vendor SDK.
 */

export type ProviderCapability = "text" | "image" | "video" | "voice";

export interface ProviderInfo {
  /** Stable key used in config and stored on generated assets. */
  id: string;
  label: string;
  capabilities: ProviderCapability[];
  /** False when the required credentials are absent from the environment. */
  configured: boolean;
}

export interface TextRequest {
  prompt: string;
  system?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface TextResult {
  text: string;
  providerId: string;
  model?: string;
}

export interface ImageRequest {
  prompt: string;
  negativePrompt?: string;
  /** Character reference images that pin visual consistency (spec §18). */
  referenceUrls?: string[];
  aspectRatio?: "9:16" | "1:1" | "16:9";
}

export interface VideoRequest {
  prompt: string;
  negativePrompt?: string;
  referenceUrls?: string[];
  durationSeconds?: number;
  aspectRatio?: "9:16" | "1:1" | "16:9";
}

export interface VoiceRequest {
  text: string;
  /** Provider-side voice identifier stored on the Character Bible. */
  voiceId: string;
}

export interface MediaResult {
  url?: string;
  storagePath?: string;
  providerId: string;
  /** Async providers return a job id the OS polls. */
  jobId?: string;
  status: "completed" | "pending" | "failed";
  error?: string;
}

export interface TextProvider  { info: ProviderInfo; generateText(req: TextRequest): Promise<TextResult> }
export interface ImageProvider { info: ProviderInfo; generateImage(req: ImageRequest): Promise<MediaResult> }
export interface VideoProvider { info: ProviderInfo; generateVideo(req: VideoRequest): Promise<MediaResult> }
export interface VoiceProvider { info: ProviderInfo; generateVoice(req: VoiceRequest): Promise<MediaResult> }

export type AnyProvider = TextProvider | ImageProvider | VideoProvider | VoiceProvider;
