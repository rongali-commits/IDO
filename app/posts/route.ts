const goneHeaders = {
  "Content-Type": "text/plain; charset=utf-8",
  "X-Robots-Tag": "noindex, noarchive, nosnippet",
};

export function GET() {
  return new Response("This old Noerong posts archive has been removed. Current essays live at https://noerong.com/essays.", {
    status: 410,
    headers: goneHeaders,
  });
}
