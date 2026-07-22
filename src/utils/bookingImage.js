export function generateBookingSVG(booking) {
  const { id, service, date, time, name, segment } = booking;
  const shortId = (id || '').slice(0, 8).toUpperCase();
  const displaySegment = segment || 'Any Available';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="340" viewBox="0 0 500 340">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#090909"/>
          <stop offset="100%" stop-color="#111111"/>
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#C9A96E"/>
          <stop offset="100%" stop-color="#D4B87A"/>
        </linearGradient>
      </defs>
      <rect width="500" height="340" rx="16" fill="url(#bg)" stroke="#C9A96E" stroke-width="1.5" opacity="0.95"/>
      <rect x="1" y="1" width="498" height="60" rx="15" fill="url(#gold)" opacity="0.12"/>
      <text x="250" y="28" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="3" fill="#C9A96E">KASHA MULTIMEDIA</text>
      <text x="250" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" letter-spacing="1.5" fill="#888888">BOOKING CONFIRMATION</text>
      <line x1="40" y1="72" x2="460" y2="72" stroke="#C9A96E" stroke-width="0.5" opacity="0.3"/>
      <text x="40" y="100" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">BOOKING ID</text>
      <text x="40" y="118" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#C9A96E">${shortId}</text>
      <text x="280" y="100" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">SEGMENT</text>
      <text x="280" y="118" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#f5f5f5">${service || 'Content'}</text>
      <text x="40" y="155" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">DATE</text>
      <text x="40" y="173" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#f5f5f5">${date || 'N/A'}</text>
      <text x="200" y="155" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">TIME</text>
      <text x="200" y="173" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#f5f5f5">${time || 'N/A'}</text>
      <text x="360" y="155" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">SEGMENT</text>
      <text x="360" y="173" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#f5f5f5">${displaySegment}</text>
      <text x="40" y="210" font-family="Arial, sans-serif" font-size="10" fill="#888888" letter-spacing="1">CLIENT</text>
      <text x="40" y="228" font-family="Arial, sans-serif" font-size="14" font-weight="600" fill="#f5f5f5">${name || 'Guest'}</text>
      <line x1="40" y1="245" x2="460" y2="245" stroke="#C9A96E" stroke-width="0.5" opacity="0.3"/>
      <rect x="160" y="255" width="180" height="42" rx="8" fill="url(#gold)" opacity="0.15" stroke="#C9A96E" stroke-width="0.8"/>
      <text x="250" y="281" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="800" fill="#C9A96E" letter-spacing="4">CONFIRMED</text>
      <text x="250" y="325" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="#555555" letter-spacing="1">Kasha Multimedia • Rooted in Heritage, Built to Broadcast</text>
    </svg>`;
  return svg;
}

export function svgToPngDataUrl(svgString) {
  return new Promise((resolve) => {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 500;
      canvas.height = 340;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 500, 340);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

export async function createBookingImage(booking) {
  const svg = generateBookingSVG(booking);
  const dataUrl = await svgToPngDataUrl(svg);
  return dataUrl || svg;
}
