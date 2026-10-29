// Local-only graphic exports. SVG sources use escaped text and contain no remote assets.
export const escapeSvg = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const safeFile = (name: string) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'diseno';

export function downloadSvg(svg: string, filename: string): void {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = safeFile(filename) + '.svg';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function downloadPng(svg: string, filename: string, width = 1000, height = 1000): Promise<void> {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
  try {
    const image = new Image();
    image.decoding = 'async';
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('No se pudo generar la imagen PNG.'));
      image.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = Math.min(3200, width * 2);
    canvas.height = Math.min(4200, height * 2);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Tu navegador no permite exportar PNG.');
    context.scale(canvas.width / width, canvas.height / height);
    context.drawImage(image, 0, 0, width, height);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(value => value ? resolve(value) : reject(new Error('Error al crear el PNG.')), 'image/png')
    );
    const pngUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = pngUrl;
    anchor.download = safeFile(filename) + '.png';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(pngUrl), 2000);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function printSvg(svg: string): boolean {
  const popup = window.open('', '_blank', 'width=900,height=1000');
  if (!popup) return false;
  popup.document.open();
  popup.document.write('<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Molde de letras</title><style>@page{size:A4;margin:0}html,body{margin:0;background:white}svg{display:block;width:210mm;height:297mm;max-width:100%}@media screen{body{display:flex;justify-content:center;background:#eee}svg{box-shadow:0 2px 14px #ccc}}</style></head><body>' + svg + '</body></html>');
  popup.document.close();
  popup.focus();
  let printed = false;
  const printOnce = () => {
    if (printed || popup.closed) return;
    printed = true;
    popup.print();
  };
  popup.addEventListener('load', printOnce, { once: true });
  window.setTimeout(printOnce, 500);
  return true;
}
