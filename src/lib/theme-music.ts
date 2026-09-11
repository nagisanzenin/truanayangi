import { musicKitIds, defaultMusicKit } from './music-kits';

/**
 * A single looping <audio> element, not a decoded Web Audio buffer: these
 * tracks run ~2 minutes and streaming keeps memory flat regardless of kit.
 */
export class ThemeMusic {
 private el?: HTMLAudioElement;
 private kit = defaultMusicKit;
 private muted = false;
 private disposed = false;
 private activated = false;
 private ducked = false;
 private static readonly VOLUME = .45;
 constructor(private base: string) {}
 private element() {
  if (this.el) return this.el;
  const el = new Audio();
  el.loop = true;
  el.volume = ThemeMusic.VOLUME;
  el.preload = 'auto';
  this.el = el;
  return el;
 }
 /** Lower the theme under the crate-open sting, then bring it back. */
 duck(down: boolean) {
  this.ducked = down;
  if (this.el) this.el.volume = down ? ThemeMusic.VOLUME * .2 : ThemeMusic.VOLUME;
 }
 setKit(kit: string) {
  this.kit = musicKitIds.has(kit) ? kit : defaultMusicKit;
  const el = this.element();
  const wasPlaying = !el.paused;
  el.src = `${this.base}/sounds/music/${this.kit}.mp3`;
  el.volume = this.ducked ? ThemeMusic.VOLUME * .2 : ThemeMusic.VOLUME;
  if (wasPlaying || this.activated) void el.play().catch(() => {});
 }
 // Call synchronously from a click/tap so the browser's autoplay gesture still counts.
 unlock() {
  if (this.disposed || this.muted) return;
  this.activated = true;
  const el = this.element();
  if (!el.src) el.src = `${this.base}/sounds/music/${this.kit}.mp3`;
  if (el.paused) void el.play().catch(() => {});
 }
 recover() { if (this.activated && !this.muted) this.unlock(); }
 pause() { this.el?.pause(); }
 setMuted(muted: boolean) {
  this.muted = muted;
  if (muted) this.pause(); else this.unlock();
 }
 dispose() {
  this.disposed = true;
  if (this.el) { this.el.pause(); this.el.src = ''; this.el = undefined; }
 }
}
