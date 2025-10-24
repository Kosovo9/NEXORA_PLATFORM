import os, time, tempfile
from PIL import Image, ImageDraw, ImageFont
import numpy as np, cv2, requests

API_BASE = os.environ.get("API_BASE", "http://localhost:3000")

def lease_job():
    r = requests.post(f"{API_BASE}/api/studio/jobs/lease")
    if r.status_code == 204: return None
    r.raise_for_status(); return r.json()

def finish_job(job_id, ok, result_url=None, result_urls=None, error=None):
    payload = {"id": job_id, "ok": ok, "resultUrl": result_url, "error": error}
    if result_urls: payload["resultUrls"] = result_urls
    requests.post(f"{API_BASE}/api/studio/jobs/finish", json=payload)

def upload(local_path, job_id):
    with open(local_path, "rb") as f:
        files = {"file": (os.path.basename(local_path), f, "application/octet-stream")}
        data = {"jobId": job_id}
        r = requests.post(f"{API_BASE}/api/studio/upload", files=files, data=data, timeout=300)
        r.raise_for_status(); return r.json()["url"]

def gen_img(text, w=1024, h=576):
    im = Image.new("RGB", (w,h), (20,24,38))
    d = ImageDraw.Draw(im)
    try: font = ImageFont.truetype("DejaVuSans.ttf", 32)
    except: font = ImageFont.load_default()
    d.text((24,24), text, font=font, fill=(255,255,255))
    return im

def main():
    print("Worker FAST listo. API_BASE=", API_BASE)
    while True:
        job = lease_job()
        if not job: time.sleep(1.5); continue
        try:
            params = job.get("params") or {}
            w = int(params.get("width") or 1024); h = int(params.get("height") or 576)
            if job["type"] == "image":
                im = gen_img(job["prompt"], w, h)
                tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False); im.save(tmp.name)
                url = upload(tmp.name, job["id"]); finish_job(job["id"], True, url, None, None)
            else:
                fps = int(params.get("fps") or 14); frames = int(params.get("frames") or 28)
                out = cv2.VideoWriter("out.mp4", cv2.VideoWriter_fourcc(*"mp4v"), fps, (w,h))
                for i in range(frames):
                    im = gen_img(f"{job['prompt']} — frame {i+1}/{frames}", w, h)
                    out.write(cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR))
                out.release()
                url = upload("out.mp4", job["id"]); finish_job(job["id"], True, url, [url], None)
        except Exception as e:
            print("Error:", e); finish_job(job["id"], False, None, None, str(e)); time.sleep(2)

if __name__ == "__main__":
    main()
