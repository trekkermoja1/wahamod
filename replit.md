# WAHA - WhatsApp HTTP API

## Overview
WAHA (WhatsApp HTTP API) is a self-hosted WhatsApp API service built with NestJS. It provides a RESTful API to interact with WhatsApp, including sending messages, managing sessions, contacts, groups, channels, and more.

## Project Architecture
- **Framework**: NestJS (Node.js backend framework)
- **Language**: TypeScript
- **Package Manager**: Yarn 4.9.2 (Berry) via corepack
- **Build System**: NestJS CLI (`nest build`)
- **Engine**: NOWEB (lightweight, no browser needed)
- **Port**: 5000 (configured via WHATSAPP_API_PORT)

## Key Directories
- `src/` - Source code (TypeScript)
- `src/api/` - API controllers
- `src/core/` - Core modules, engine, auth, config
- `src/structures/` - Data structures and DTOs
- `src/dashboard/` - Dashboard static files (served by NestJS)
- `dist/` - Compiled JavaScript output

## Running the App
- **Build**: `export PATH=~/bin:$PATH && yarn install && npx nest build`
- **Start**: `export PATH=~/bin:$PATH && node dist/main`
- Yarn Berry is enabled via corepack in `~/bin`

## Environment Variables
- `WHATSAPP_API_PORT` - API server port (set to 5000)
- `WHATSAPP_API_HOSTNAME` - Server hostname (set to 0.0.0.0)
- `WHATSAPP_DEFAULT_ENGINE` - WhatsApp engine (NOWEB)
- `WAHA_DASHBOARD_ENABLED` - Enable dashboard UI
- `WAHA_SWAGGER_ENABLED` - Enable Swagger API docs
- `WAHA_API_KEY` - API key for authentication
- `WAHA_DASHBOARD_USERNAME` / `WAHA_DASHBOARD_PASSWORD` - Dashboard credentials

## Recent Changes
- 2026-02-08: Initial Replit setup - configured Yarn Berry, env vars, build, and workflow
