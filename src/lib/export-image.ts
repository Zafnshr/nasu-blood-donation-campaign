import { toPng } from "html-to-image";

export function isIosDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua)) return true;
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const commaIdx = dataUrl.indexOf(",");
  if (commaIdx === -1) {
    throw new Error("Invalid data URL");
  }
  const header = dataUrl.slice(0, commaIdx);
  const mimeMatch = /data:([^;]+);base64/.exec(header);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const binary = atob(dataUrl.slice(commaIdx + 1));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

async function waitForFontsReady(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  try {
    await Promise.race([
      document.fonts.ready,
      new Promise<void>((resolve) => window.setTimeout(resolve, 1500)),
    ]);
  } catch {
    // Proceed cleanly if fonts.ready rejects
  }
}

export async function renderElementToPng(
  node: HTMLElement
): Promise<{ dataUrl: string; blob: Blob }> {
  await waitForFontsReady();

  let dataUrl = "";
  try {
    const opts = { pixelRatio: 2, cacheBust: false };
    await toPng(node, opts);
    dataUrl = await toPng(node, opts);
  } catch {
    const fallbackOpts = { pixelRatio: 2, cacheBust: false, skipFonts: true };
    await toPng(node, fallbackOpts);
    dataUrl = await toPng(node, fallbackOpts);
  }

  return {
    dataUrl,
    blob: dataUrlToBlob(dataUrl),
  };
}

export function downloadBlobFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 15000);
}
