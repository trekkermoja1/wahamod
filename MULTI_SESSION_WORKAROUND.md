# Quick Guide: Enable Multi-Session Without Custom Build

## Option 1: Use "default" Session Name (Immediate)

For WAHA Core, always use session name "default":

```bash
# Start session
curl -X POST http://localhost:3000/api/sessions/start \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{"name": "default"}'

# Or use implicit default:
curl -X POST http://localhost:3000/api/default/start \
  -H "X-API-Key: your-api-key"
```

## Option 2: Wait for Custom Image (Recommended)

Custom image `ghcr.io/ariaerendev/wahamod:latest` will unlock all Plus features including multi-session support.

**Status:** GitHub Actions build is failing due to complex Dockerfile. 

**ETA:** We need to simplify the build process or build locally.

## Option 3: Build Locally & Push (Advanced)

If you have Docker on your machine:

```bash
# 1. Clone repo
git clone https://github.com/ariaerendev/wahamod.git
cd wahamod

# 2. Build image
docker build -t ghcr.io/ariaerendev/wahamod:latest .

# 3. Login to GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u ariaerendev --password-stdin

# 4. Push image
docker push ghcr.io/ariaerendev/wahamod:latest

# 5. Update Coolify to use the image
```

## Option 4: Direct Modification (Not Recommended)

You could modify the running container, but changes will be lost on restart.

---

**Current Recommendation:** Use session name "default" until we fix the GitHub Actions build.
