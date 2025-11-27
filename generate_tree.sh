#!/bin/bash

find . \
  -not -path "./node_modules/*" \
  -not -path "./.venv/*" \
  -not -path "./.turbo/*" \
  -not -path "./dist/*" \
  -not -path "./.next/*" \
  -not -path "./__pycache__/*" \
  -not -path "./env/*" \
  -not -path "./build/*" \
  -not -path "./.git/*"
