# Phase 56 Planning Brief - Private Request Center And Anti-Spam

**Status:** Routed; not authorized for implementation.
**Date:** 2026-07-10.

Phase 56 should add participant-owned incoming/outgoing private Practice request management, lifecycle notifications, direct game entry, private-request preferences, individual blocks, and server-enforced anti-spam limits while preserving the functional shell.

Required first-version contract:

- newest-first incoming and outgoing request views;
- status, timestamp, settings, counterpart safe public name, and direct actions;
- accept, decline, cancel, and enter-created-game actions;
- in-app notification integration and a private-request notification preference;
- a setting to reject new incoming private Practice requests;
- individual player blocks enforced by trusted RPC/RLS rules;
- one active requested row per requester-target-mode, with OG and GO independent;
- existing per-user active/recent rate limits preserved or strengthened;
- no chat, friends, social graph, public block list, private Daily, service-worker push, or presence system.

This phase requires a separate implementation-ready audit and likely an additive migration/RPC/RLS contract. It must not be folded into Phase 55 source work merely as notification UI.
