# WAHA MOD - Patched Image
# Extends official WAHA image with Plus features unlocked
# Strategy: Patch compiled JS files directly (no compilation needed)
# Build time: <10 seconds

FROM devlikeapro/waha:latest

USER root
WORKDIR /app

# Patch 1: Force PLUS version in dist/version.js
RUN sed -i 's/return hasPlusDirectory() ? WAHAVersion.PLUS : WAHAVersion.CORE;/return WAHAVersion.PLUS;/g' /app/dist/version.js

# Patch 2: Remove OnlyDefaultSessionIsAllowed check in dist/core/manager.core.js  
# Comment out the onlyDefault() call that blocks multi-session
RUN sed -i 's/this\.onlyDefault(name);/\/\/ this.onlyDefault(name); \/\/ PATCHED: Allow multi-session/g' /app/dist/core/manager.core.js

# Patch 3: Create Plus module that re-exports Core
RUN mkdir -p /app/dist/plus && \
    echo '"use strict";' > /app/dist/plus/app.module.plus.js && \
    echo 'Object.defineProperty(exports, "__esModule", { value: true });' >> /app/dist/plus/app.module.plus.js && \
    echo 'exports.AppModulePlus = void 0;' >> /app/dist/plus/app.module.plus.js && \
    echo 'const app_module_core_1 = require("../core/app.module.core");' >> /app/dist/plus/app.module.plus.js && \
    echo 'exports.AppModulePlus = app_module_core_1.AppModuleCore;' >> /app/dist/plus/app.module.plus.js

USER waha

# Keep original WAHA configurations
ENV PUPPETEER_SKIP_DOWNLOAD=True
ENV CHOKIDAR_USEPOLLING=1
ENV CHOKIDAR_INTERVAL=5000
ENV WAHA_ZIPPER=ZIPUNZIP
ENV GODEBUG=netdns=cgo

WORKDIR /app
EXPOSE 3000

# Use original WAHA entrypoint
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["/entrypoint.sh"]
