import sys, os, json
sys.path.append(os.path.dirname(__file__))
import acciones

from http.server import HTTPServer, BaseHTTPRequestHandler

class TARSHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/interpret':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                user_message = data.get('message', '').strip()
                response_text = acciones.procesar_comando(user_message)
                acciones.guardar_log(f"Usuario: {user_message}")
                acciones.guardar_log(f"TARS: {response_text}")
            except Exception as e:
                response_text = f"Error interno: {str(e)}"

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({"message": response_text}, ensure_ascii=False).encode('utf-8'))
        else:
            self.send_error(404)

    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            with open('index.html', 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_error(404)

if __name__ == '__main__':
    server = HTTPServer(('127.0.0.1', 8000), TARSHandler)
    print("🚀 TARS instalado y listo.")
    server.serve_forever()
