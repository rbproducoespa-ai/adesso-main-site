/**
 * Provider registry — spec §14.
 *
 * Phase 1 ships the registry empty on purpose: the contract exists so later
 * phases can plug vendors in without touching the modules that call them.
 * Adapters register here in Phase 10.
 */

import type {
  AnyProvider, ImageProvider, ProviderCapability, ProviderInfo,
  TextProvider, VideoProvider, VoiceProvider,
} from "./types";

const registry = new Map<string, AnyProvider>();

export function registerProvider(provider: AnyProvider): void {
  registry.set(provider.info.id, provider);
}

export function listProviders(capability?: ProviderCapability): ProviderInfo[] {
  return [...registry.values()]
    .map((p) => p.info)
    .filter((info) => !capability || info.capabilities.includes(capability));
}

function get<T extends AnyProvider>(id: string, capability: ProviderCapability): T | null {
  const provider = registry.get(id);
  if (!provider || !provider.info.capabilities.includes(capability)) return null;
  return provider as T;
}

export const getTextProvider  = (id: string) => get<TextProvider>(id, "text");
export const getImageProvider = (id: string) => get<ImageProvider>(id, "image");
export const getVideoProvider = (id: string) => get<VideoProvider>(id, "video");
export const getVoiceProvider = (id: string) => get<VoiceProvider>(id, "voice");
