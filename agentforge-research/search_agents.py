#!/usr/bin/env python3
import json, subprocess, sys, os

EXISTING_FILE = "/root/.openclaw/workspace/agentforge-research/all_existing_ids.txt"
RESULTS_DIR = "/root/.openclaw/workspace/agentforge-research"

# Load existing IDs
with open(EXISTING_FILE) as f:
    existing_ids = set(line.strip() for line in f if line.strip())

# Define all 22 categories with search terms
categories = {
    "batch1": {
        "categories": ["Marketing", "Business", "Coding", "Data", "AI & ML", "Productivity"],
        "searches": [
            "new AI marketing automation tools 2025 2026",
            "AI business automation agents launched 2025",
            "new AI coding assistants tools 2025 2026",
            "new AI data analysis platforms 2025",
            "new AI machine learning platforms tools 2025",
            "AI productivity tools launched 2025 2026",
        ]
    },
    "batch2": {
        "categories": ["Sales", "Customer Support", "HR & Recruiting", "Finance", "E-commerce", "Legal"],
        "searches": [
            "new AI sales tools agents 2025 2026",
            "AI customer support chatbots tools 2025",
            "new AI HR recruiting tools 2025 2026",
            "AI finance tools fintech agents 2025",
            "new AI ecommerce tools 2025 2026",
            "AI legal tools contract analysis 2025",
        ]
    },
    "batch3": {
        "categories": ["Creative", "Voice AI", "Gaming", "Real Estate", "Health", "Education"],
        "searches": [
            "new AI creative design tools 2025 2026",
            "AI voice generation TTS tools 2025",
            "new AI gaming tools NPCs 2025",
            "AI real estate tools 2025 2026",
            "new AI health medical tools 2025",
            "AI education learning tools 2025 2026",
        ]
    },
    "batch4": {
        "categories": ["Cybersecurity", "DevOps & Infrastructure", "Logistics & Supply Chain", "Research & Knowledge"],
        "searches": [
            "new AI cybersecurity tools 2025 2026",
            "AI DevOps infrastructure tools 2025",
            "AI logistics supply chain tools 2025",
            "new AI research knowledge tools 2025 2026",
        ]
    }
}

print(f"Existing agents loaded: {len(existing_ids)}")
print("Search framework ready. Sub-agents will execute searches.")
